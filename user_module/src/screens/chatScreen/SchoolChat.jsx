import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {GiftedChat} from 'react-native-gifted-chat';
import {theme} from '../../styles/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('screen');

const SchoolChat = () => {
  const route = useRoute();
  const {
    Id = '',
    schoolName = 'Unknown',
    schoolImage = '',
  } = route.params || {};

  const [messages, setMessages] = useState();
  const [inputText, setInputText] = useState('');

  const onSend = () => {
    if (inputText && inputText.trim()) {
      const newMessage = {
        _id: Math.round(Math.random() * 1000000),
        text: inputText.trim(),
        createdAt: new Date(),
        user: {
          _id: 1,
        },
      };
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, newMessage),
      );
      setInputText('');
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

      <View style={styles.messageList}>
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
      </LinearGradient>
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
