import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';
import {globalStyles} from '../../../styles/globalStyles';
import {theme} from '../../../styles/theme';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('screen');

const ArticleCard = ({title, content, imageSource, onPress}) => {
  return (
    <SafeAreaView style={[globalStyles.container, styles.primaryContainer]}>
      <LinearGradient
        colors={['#AE9352', '#88835B']}
        style={styles.contentContainer}>
        <View style={styles.imgContainer}>
          <Image source={imageSource} style={styles.image} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default ArticleCard;

const styles = StyleSheet.create({
  primaryContainer: {
    padding: height * 0.02,
  },

  contentContainer: {
    padding: height * 0.02,
    borderRadius: theme.borderRadius.large,
    borderTopLeftRadius: 0,
    position: 'relative',
  },

  title: {
    fontSize: width * 0.05,
    fontFamily: theme.typography.fontFamilyRegular,
    color: theme.colors.white,
    marginLeft: width * 0.14,
  },

  content: {
    fontSize: width * 0.036,
    fontFamily: theme.typography.fontFamilyRegular,
    color: theme.colors.white,
    marginLeft: width * 0.14,
    textAlign: 'justify',
  },

  imgContainer: {
    position: 'absolute',
    marginTop: -height * 0.02,
    left: -width * 0.02,
    zIndex: 2,
  },

  image: {
    width: width * 0.18,
    height: width * 0.18,
    borderRadius: (width * 0.3) / 2,
    resizeMode: 'contain',
  },
});
