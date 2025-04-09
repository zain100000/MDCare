/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {GiftedChat} from 'react-native-gifted-chat';
import {theme} from '../../styles/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import CONFIG from '../../redux/config/Config';
import {io} from 'socket.io-client';

const {width, height} = Dimensions.get('screen');

const SchoolChat = () => {
  const route = useRoute();
  const {
    senderId,
    schoolId,
    schoolName = 'Unknown',
    schoolImage = '',
  } = route.params || {};
  const {BASE_URL} = CONFIG;
  const [messages, setMessages] = useState([]); // Fixed empty array instead of undefined
  const [inputText, setInputText] = useState('');

  const socket = io('http://10.0.2.2:8000', {transports: ['websocket']});

  const fetchChatMessages = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/schoolChat/getChat/${senderId}/${schoolId}`,
      );
      //console.log('Chat Messages:', response.data);

      const formattedMessages = response.data.map(msg => ({
        _id: msg._id,
        text: msg.message,
        createdAt: new Date(msg.timestamp),
        user: {
          _id: msg.senderId === senderId ? 1 : 2,
          name: msg.senderId === senderId ? 'You' : schoolName,
        },
      }));

      setMessages(formattedMessages);
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };

  // ✅ Now, `fetchChatMessages` is available inside `useEffect`
  useEffect(() => {
    if (!schoolId) return;
    fetchChatMessages();
  }, [schoolId, senderId]);

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log('✅ Connected to server with ID:', socket.id);
      socket.emit('joinChat', {userId: senderId});
    });

    // 🔄 Listen for "fetchMessages" event from backend
    socket.on('newMessage', () => {
      console.log('🔄 Fetching updated messages...');
      fetchChatMessages(); // Fetch latest messages
    });

    return () => {
      socket.off('fetchMessages'); // Cleanup listener
      socket.off('connect');
    };
  }, [schoolId, senderId]);

  const onSend = async (newMessages = []) => {
    const messageToSend = newMessages[0];
    console.log('📝 Sending message:', messageToSend);

    if (messageToSend && messageToSend.text.trim()) {
      const messagePayload = {
        senderId: senderId,
        receiverId: schoolId,
        message: messageToSend.text.trim(),
      };

      console.log('📦 Message payload:', messagePayload);

      try {
        const response = await axios.post(
          `${BASE_URL}/schoolChat/saveMessage`,
          messagePayload,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        console.log('✅ Server response:', response);

        if (response.status === 201) {
          const responseData = response.data;

          console.log('📥 Saved message response:', responseData);

          setMessages(prevMessages =>
            GiftedChat.append(prevMessages, {
              _id: responseData._id,
              text: responseData.message,
              createdAt: new Date(responseData.timestamp),
              user: {_id: 1},
            }),
          );

          setInputText('');
          console.log('🚀 Message sent and input cleared');
        } else {
          console.error(
            '❌ Failed to send message. Response data:',
            response.data,
          );
        }
      } catch (error) {
        console.error('❌ Error sending message:', error);
      }
    } else {
      console.log('⚠️ Empty message. Not sending.');
    }
  };

  return (
    <SafeAreaView style={styles.chatContainer}>
      <LinearGradient
        colors={['#07BBC6', '#035B60']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.header}>
        {schoolImage ? (
          <Image source={{uri: schoolImage}} style={styles.headerImage} />
        ) : (
          <View style={styles.placeholderImage} />
        )}
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>{schoolName}</Text>
          <Text style={styles.headerSubtitle}>Online</Text>
        </View>
        <View style={styles.headerIcons}>
          <View style={styles.iconWrapper}>
            <Ionicons
              name="videocam"
              size={width * 0.08}
              color={theme.colors.white}
            />
          </View>
          <View style={styles.iconWrapper}>
            <Ionicons
              name="call"
              size={width * 0.06}
              color={theme.colors.white}
            />
          </View>
        </View>
      </LinearGradient>

      {/* <View style={styles.messageList}>
        <GiftedChat
          messages={messages}
          onSend={onSend}
          user={{
            _id: 1,
          }}
          renderBubble={props => (
            <LinearGradient
              colors={['#07BBC6', '#035B60']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.messageBubble}>
              <Text style={styles.messageText}>
                {props.currentMessage.text}
              </Text>
            </LinearGradient>
          )}
          renderInputToolbar={() => null}
        />
      </View>

      <LinearGradient
        colors={['#07BBC6', '#035B60']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Ionicons
            name="document-attach-outline"
            size={width * 0.06}
            color={theme.colors.secondary}
            style={styles.attachIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Type here..."
            value={inputText}
            onChangeText={setInputText}
            placeholderTextColor={theme.colors.secondary}
          />
          <TouchableOpacity onPress={onSend} style={styles.sendButton}>
            <Ionicons
              name="navigate"
              size={width * 0.06}
              color={theme.colors.secondary}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient> */}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust based on platform
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex: 1}}>
            {/* ✅ Scrollable messages so keyboard doesn’t overlap */}
            <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 0}}>
              <View style={styles.messageList}>
                <GiftedChat
                  messages={messages}
                  onSend={messages => onSend(messages)}
                  user={{
                    _id: 1,
                  }}
                  renderBubble={props => (
                    <LinearGradient
                      colors={['#07BBC6', '#035B60']}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={[
                        styles.messageBubble,
                        {minWidth: 50, maxWidth: '80%'},
                      ]}>
                      <View style={{padding: 10, flexShrink: 1}}>
                        <Text style={styles.messageText}>
                          {props.currentMessage.text}
                        </Text>
                      </View>
                    </LinearGradient>
                  )}
                  renderInputToolbar={() => null}
                  scrollToBottom
                  scrollToBottomComponent={() => (
                    <Ionicons name="chevron-down" size={24} color="#035B60" />
                  )}
                />
              </View>
            </ScrollView>
            <LinearGradient
              colors={['#07BBC6', '#035B60']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Ionicons
                  name="document-attach-outline"
                  size={width * 0.06}
                  color={theme.colors.secondary}
                  style={styles.attachIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Type here..."
                  value={inputText}
                  onChangeText={setInputText}
                  placeholderTextColor={theme.colors.secondary}
                />
                <TouchableOpacity
                  onPress={() =>
                    onSend([{text: inputText, _id: Math.random()}])
                  }
                  style={styles.sendButton}>
                  <Ionicons
                    name="navigate"
                    size={width * 0.06}
                    color={theme.colors.secondary}
                  />
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SchoolChat;

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.024,
    paddingHorizontal: width * 0.03,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.white,
    borderBottomLeftRadius: width * 0.04,
    borderBottomRightRadius: width * 0.04,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },

  headerImage: {
    width: width * 0.16,
    height: height * 0.08,
    borderRadius: theme.borderRadius.circle,
    marginRight: width * 0.03,
    borderWidth: 1,
    borderColor: theme.colors.white,
  },

  headerTextContainer: {
    flex: 1,
  },

  headerTitle: {
    fontSize: width * 0.05,
    fontFamily: theme.typography.RobotofontFamilySemiBold,
    color: theme.colors.white,
    top: height * 0.001,
  },

  headerSubtitle: {
    fontSize: width * 0.04,
    fontFamily: theme.typography.RobotofontFamilySemiBold,
    color: theme.colors.white,
    top: height * 0.006,
  },

  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.gap(2),
  },

  messageBubble: {
    padding: width * 0.03,
    borderRadius: width * 0.04,
    marginBottom: height * 0.01,
  },

  messageText: {
    fontSize: width * 0.04,
    color: theme.colors.white,
    fontFamily: theme.typography.RobotofontFamilyRegular,
  },

  messageList: {
    flex: 1,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.03,
    borderTopWidth: 1,
    borderTopColor: theme.colors.white,
    borderTopLeftRadius: width * 0.04,
    borderTopRightRadius: width * 0.04,
  },

  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: width * 0.04,
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.009,
  },

  attachIcon: {
    marginRight: width * 0.02,
  },

  input: {
    flex: 1,
    fontSize: width * 0.044,
    paddingVertical: height * 0.01,
    color: theme.colors.dark,
    fontFamily: theme.typography.MontserratfontFamilySemiBold,
  },

  sendButton: {
    padding: width * 0.03,
  },
});
