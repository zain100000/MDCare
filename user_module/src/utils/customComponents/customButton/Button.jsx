import React from 'react';
import {TouchableOpacity, Text, ActivityIndicator, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {globalStyles} from '../../../styles/globalStyles';

const Button = ({
  onPress,
  title,
  loading,
  style,
  textStyle,
  width,
  disabled,
  textColor,
}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[
          {
            width: width || 'auto',
            borderRadius: 10, // Adjust border radius if needed
          },
          style,
        ]}
        activeOpacity={0.9}>
        <LinearGradient
          colors={['#07BBC6', '#035B60']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={[
            globalStyles.buttonPrimary,
            {width: '100%', borderRadius: 10},
          ]}>
          {loading ? (
            <ActivityIndicator color={textColor || '#fff'} size={25} />
          ) : (
            <Text
              style={[
                globalStyles.buttonText,
                textStyle,
                {color: textColor || '#fff'},
              ]}>
              {title}
            </Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
