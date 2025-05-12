/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  mediaDevices,
} from 'react-native-webrtc';
import io from 'socket.io-client';
import {AppState, Platform} from 'react-native';
import inCallManager from 'react-native-incall-manager';
import {navigate, navigationRef} from '../navigation/NavigationService';
import RNCallKeep from 'react-native-callkeep';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
const options = {
  ios: {
    appName: 'My app name',
  },
  android: {
    alertTitle: 'Permissions required',
    alertDescription: 'This application needs to access your phone accounts',
    cancelButton: 'Cancel',
    okButton: 'ok',
    additionalPermissions: [],
    foregroundService: {
      channelId: 'call',
      channelName: 'Foreground service for my app',
      notificationTitle: 'My app is running on background',
      notificationIcon: 'Path to the resource icon of the notification',
    },
  },
};

const SOCKET_SERVER_URL = 'http://10.0.2.2:8000';

const WebRTCContext = createContext(null);

export const WebRTCProvider = ({children}) => {
  const appState = useRef(AppState.currentState);

  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [myId, setMyId] = useState('');
  const otherUserId = useRef(null);
  const peerConnection = useRef(null);
  const socket = useRef(null);
  const remoteRTCMessage = useRef(null);
  const [localMicOn, setLocalMicOn] = useState(true);
  const [localWebcamOn, setLocalWebcamOn] = useState(true);

  const senderId = useSelector(state => state.auth.user?.id);

  useEffect(() => {
    if (senderId) {
      setMyId(senderId);
    }
  }, [senderId]);
  

  useEffect(() => {
    const handleAppStateChange = nextAppState => {
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    RNCallKeep.addEventListener('answerCall', async ({ callUUID }) => {
      try {
        const pendingCallId = await AsyncStorage.getItem('pendingCall');
        if (pendingCallId === callUUID) {
          await processAccept(callUUID);
          RNCallKeep.backToForeground();
          await AsyncStorage.removeItem('pendingCall');
        }
      } catch (error) {
        console.error('Error handling answerCall:', error);
      }
    });
  
    RNCallKeep.addEventListener('endCall', ({ callUUID }) => {
      leave();
    });
  
    return () => {
      RNCallKeep.removeEventListener('answerCall');
      RNCallKeep.removeEventListener('endCall');
    };
  }, []);
  
  useEffect(() => {
    RNCallKeep.setup(options)
      .then(accepted => {
        if (accepted) {
          RNCallKeep.setAvailable(true);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (!myId) return; // wait for myId to be set
  
    socket.current = io(SOCKET_SERVER_URL, {
      transports: ['websocket'],
      query: { callerId: myId },
    });
  
    socket.current.on('connect', () => {
      console.log('Connected to signaling server');
    });
  
    socket.current.on('callEnded', () => {
      leave(true);
    });
  
    socket.current.on('newCall', async data => {
      remoteRTCMessage.current = data.rtcMessage;
      otherUserId.current = data.callerId;
      const callUUID = data.roomId;
  
      try {
        await AsyncStorage.setItem('pendingCall', callUUID);
  
        if (appState.current !== 'active') {
          RNCallKeep.displayIncomingCall(
            callUUID,
            data.callerId || 'Unknown Caller',
            'Incoming Video Call',
            'generic',
            true,
          );
        } else {
          navigate('Receiving', { otherId: data.callerId });
        }
      } catch (error) {
        console.error('Failed to store pending call ID', error);
      }
    });
  
    socket.current.on('callAnswered', data => {
      remoteRTCMessage.current = data.rtcMessage;
      peerConnection.current?.setRemoteDescription(
        new RTCSessionDescription(remoteRTCMessage.current),
      );
      navigate('InCall', {});
    });
  
    socket.current.on('ICEcandidate', data => {
      if (peerConnection.current) {
        peerConnection.current
          .addIceCandidate(new RTCIceCandidate(data.rtcMessage))
          .then(() => console.log('ICE candidate added'))
          .catch(err => console.error('Error adding ICE candidate:', err));
      }
    });
  
    return () => {
      socket.current?.disconnect();
    };
  }, [myId]);
  

  const setupMediaStream = async () => {
    try {
      const mediaConstraints = {
        audio: true,
        video: localWebcamOn
          ? {
              mandatory: {
                minWidth: 500,
                minHeight: 300,
                minFrameRate: 30,
              },
              facingMode: 'user',
            }
          : false,
      };
      const stream = await mediaDevices.getUserMedia(mediaConstraints);
      setLocalStream(stream);
      stream.getTracks().forEach(track => {
        peerConnection.current?.addTrack(track, stream);
      });
      return stream;
    } catch (error) {
      console.error('Error getting media stream:', error);
    }
  };

  const processCall = async roomId => {
    try {
      if (!peerConnection.current) {
        initializePeerConnection();
      }
      await setupMediaStream();
      const offer = await peerConnection.current?.createOffer({});
      await peerConnection.current?.setLocalDescription(offer);
      socket.current?.emit('call', {
        calleeId: otherUserId.current,
        rtcMessage: offer,
        roomId,
      });
    } catch (error) {
      console.log('error-processCall', error);
    }
  };

  const processAccept = async roomId => {
    if (!peerConnection.current) {
      initializePeerConnection();
    }
    await setupMediaStream();

    await peerConnection.current?.setRemoteDescription(
      new RTCSessionDescription(remoteRTCMessage.current),
    );
    const answer = await peerConnection.current?.createAnswer();
    await peerConnection.current?.setLocalDescription(answer);
    socket.current?.emit('answerCall', {
      callerId: otherUserId.current,
      rtcMessage: answer,
      roomId,
    });

    setTimeout(() => {
      navigate('InCall', {otherId: roomId});
    }, 500);
  };

  const initializePeerConnection = () => {
    peerConnection.current = new RTCPeerConnection({
      iceServers: [
        {urls: 'stun:stun.l.google.com:19302'},
        {urls: 'stun:stun1.l.google.com:19302'},
        {urls: 'stun:stun2.l.google.com:19302'},
      ],
    });

    peerConnection.current.onicecandidate = event => {
      if (event.candidate) {
        socket.current?.emit('ICEcandidate', {
          calleeId: otherUserId.current,
          rtcMessage: {
            candidate: event.candidate.candidate,
            sdpMid: event.candidate.sdpMid,
            sdpMLineIndex: event.candidate.sdpMLineIndex,
          },
        });
      }
    };

    peerConnection.current.ontrack = event => {
      if (event.streams && event.streams[0]) {
        setRemoteStream(event.streams[0]);
      }
    };
  };

  const leave = (isSocket, roomId) => {
    localStream?.getTracks().forEach(track => track.stop());

    peerConnection.current?.getTransceivers().forEach(transceiver => {
      transceiver.stop();
    });
    peerConnection.current?.close();
    peerConnection.current = null;
    setLocalStream(null);
    setRemoteStream(null);
    inCallManager.stop();
    if (!isSocket) {
      socket.current?.emit('endCall', {
        calleeId: otherUserId.current,
        roomId,
      });
    }
    otherUserId.current = null;

    if (roomId) {
      RNCallKeep.endCall(roomId);
    }

    setTimeout(() => {
      navigationRef?.navigate('ConsultantDetail');
    }, 500);
  };

  const switchCamera = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track._switchCamera();
      });
    }
  };

  const toggleCamera = () => {
    if (localStream) {
      setLocalWebcamOn(prev => {
        localStream.getVideoTracks().forEach(track => {
          track.enabled = !prev;
        });
        return !prev;
      });
    }
  };

  const toggleMic = () => {
    if (localStream) {
      setLocalMicOn(prev => {
        localStream.getAudioTracks().forEach(track => {
          track.enabled = !prev;
        });
        return !prev;
      });
    }
  };

  const value = {
    localStream,
    remoteStream,
    callerId: myId,
    otherUserId: otherUserId.current,
    setOtherUserId: id => {
      otherUserId.current = id;
    },
    processCall,
    processAccept,
    leave,
    switchCamera,
    toggleCamera,
    toggleMic,
    localMicOn,
    localWebcamOn,
  };

  return (
    <WebRTCContext.Provider value={value}>{children}</WebRTCContext.Provider>
  );
};

export const useWebRTC = () => {
  const context = useContext(WebRTCContext);
  if (!context) {
    throw new Error('useWebRTC must be used within a WebRTCProvider');
  }
  return context;
};
