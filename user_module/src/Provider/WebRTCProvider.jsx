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
import { AppState } from 'react-native';
import RNCallKeep from 'react-native-callkeep';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { navigate, navigationRef } from '../navigation/NavigationService';

const SOCKET_SERVER_URL = 'http://10.0.2.2:8000';
const WebRTCContext = createContext(null);

export const WebRTCProvider = ({ children }) => {
  const appState = useRef(AppState.currentState);
  const iceCandidatesQueue = useRef([]);
  const otherUserId = useRef(null);
  const peerConnection = useRef(null);
  const socket = useRef(null);
  const remoteRTCMessage = useRef(null);

  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [myId, setMyId] = useState('');

  const senderId = useSelector(state => state.auth.user?.id);

  useEffect(() => {
    if (senderId) setMyId(senderId);
  }, [senderId]);

  useEffect(() => {
    const handleAppStateChange = nextAppState => {
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const setupCallKeep = async () => {
      try {
        await RNCallKeep.setup({
          ios: { appName: 'My app name' },
          android: {
            alertTitle: 'Permissions required',
            alertDescription: 'This app needs to access your phone accounts',
            cancelButton: 'Cancel',
            okButton: 'OK',
            foregroundService: {
              channelId: 'call',
              channelName: 'Foreground service for calls',
              notificationTitle: 'Call service active',
              notificationIcon: 'ic_launcher',
            },
          },
        });
        RNCallKeep.setAvailable(true);
      } catch (error) {
        console.error('CallKeep setup error:', error);
      }
    };

    setupCallKeep();
  }, []);

  useEffect(() => {
    const onAnswerCall = async ({ callUUID }) => {
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
    };

    const onEndCall = () => {
      leave();
    };

    RNCallKeep.addEventListener('answerCall', onAnswerCall);
    RNCallKeep.addEventListener('endCall', onEndCall);

    return () => {
      RNCallKeep.removeEventListener('answerCall');
      RNCallKeep.removeEventListener('endCall');
    };
  }, []);

  useEffect(() => {
    if (!myId) return;

    socket.current = io(SOCKET_SERVER_URL, {
      transports: ['websocket'],
      query: { callerId: myId },
    });

    socket.current.on('connect', () => console.log('Connected to signaling server'));
    socket.current.on('disconnect', () => console.warn('Disconnected from server'));
    socket.current.on('connect_error', err => console.error('Socket error:', err));

    socket.current.on('callEnded', () => {
      leave(true);
      const currentRoute = navigationRef?.getCurrentRoute()?.name;
      if (currentRoute === 'InCall' || currentRoute === 'Receiving') {
        navigationRef.navigate('ConsultantDetail');
      } else {
        navigationRef.navigate('Receiving');
      }
    });

    socket.current.on('newCall', async data => {
      remoteRTCMessage.current = data.rtcMessage;
      otherUserId.current = data.callerId;
      try {
        await AsyncStorage.setItem('pendingCall', data.roomId);
        if (appState.current !== 'active') {
          RNCallKeep.displayIncomingCall(
            data.roomId,
            data.callerId || 'Unknown Caller',
            'Incoming Video Call',
            'generic',
            true
          );
        } else {
          navigate('Receiving', { otherId: data.callerId });
        }
      } catch (err) {
        console.error('Failed to handle new call:', err);
      }
    });

    socket.current.on('callAnswered', data => {
      remoteRTCMessage.current = data.rtcMessage;
      peerConnection.current?.setRemoteDescription(
        new RTCSessionDescription(remoteRTCMessage.current)
      );
      navigate('InCall');
    });

    socket.current.on('ICEcandidate', data => {
      const candidate = new RTCIceCandidate(data.rtcMessage);
      if (peerConnection.current?.remoteDescription) {
        peerConnection.current.addIceCandidate(candidate).catch(console.error);
      } else {
        iceCandidatesQueue.current.push(candidate);
      }
    });

    return () => socket.current?.disconnect();
  }, [myId]);

  const initializePeerConnection = () => {
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }

    peerConnection.current = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' },
      ],
    });

    peerConnection.current.onicecandidate = event => {
      if (event.candidate) {
        socket.current.emit('ICEcandidate', {
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
      if (event.streams?.[0]) {
        setRemoteStream(event.streams[0]);
      }
    };
  };

  const setupMediaStream = async () => {
    try {
      const stream = await mediaDevices.getUserMedia({ audio: true, video: true });
      setLocalStream(stream);
      stream.getTracks().forEach(track => {
        peerConnection.current?.addTrack(track, stream);
      });
      return stream;
    } catch (error) {
      console.error('Media stream error:', error);
    }
  };

  const flushIceCandidates = () => {
    if (iceCandidatesQueue.current.length && peerConnection.current) {
      iceCandidatesQueue.current.forEach(candidate => {
        peerConnection.current
          .addIceCandidate(candidate)
          .catch(err => console.error('Flushing ICE error:', err));
      });
      iceCandidatesQueue.current = [];
    }
  };

  const processCall = async roomId => {
    try {
      initializePeerConnection();
      await setupMediaStream();
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);

      socket.current.emit('call', {
        calleeId: otherUserId.current,
        rtcMessage: offer,
        roomId,
      });

      flushIceCandidates();
    } catch (err) {
      console.log('processCall error:', err);
    }
  };

  const processAccept = async roomId => {
    try {
      initializePeerConnection();
      await setupMediaStream();

      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(remoteRTCMessage.current)
      );

      flushIceCandidates();

      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);

      socket.current.emit('answerCall', {
        callerId: otherUserId.current,
        rtcMessage: answer,
        roomId,
      });

      setTimeout(() => {
        navigate('InCall', { otherId: roomId });
      }, 500);
    } catch (err) {
      console.error('processAccept error:', err);
    }
  };

  const leave = (isSocketInitiated = false, roomId = null) => {
    console.log('Leaving call');
    console.log('Emit endCall to:', otherUserId.current, 'with roomId:', roomId);
  
    // Stop local tracks
    localStream?.getTracks().forEach(track => track.stop());
  
    // Close transceivers and peer connection
    if (peerConnection.current) {
      peerConnection.current.getTransceivers()?.forEach(transceiver => {
        try {
          transceiver.stop();
        } catch (e) {
          console.warn('Error stopping transceiver', e);
        }
      });
      peerConnection.current.close();
      peerConnection.current = null;
      console.log('Peer connection closed');
    }
  
    setLocalStream(null);
    setRemoteStream(null);
  
    // Emit endCall only if not socket-initiated
    if (!isSocketInitiated && otherUserId.current) {
      console.log('Emitting endCall event');
      socket.current?.emit('endCall', {
        calleeId: otherUserId.current,
        roomId,
      });
    } else {
      console.log('Not emitting endCall: either socket-initiated or no other user ID');
    }
  
    // Now clear the ID AFTER emit
    otherUserId.current = null;
  
    setTimeout(() => {
      navigationRef?.navigate('ConsultantDetail');
    }, 500);
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
