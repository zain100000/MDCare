import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
  Text,
  ScrollView,
} from 'react-native';
import {theme} from '../../styles/theme';
import {globalStyles} from '../../styles/globalStyles';
import SecondaryHeader from '../../utils/customComponents/customHeaders/SecondaryHeader';

const {width, height} = Dimensions.get('screen');

const ArticleDetail = ({route}) => {
  const {article} = route.params;

  return (
    <SafeAreaView style={[globalStyles.container, styles.primaryContainer]}>
      <View style={styles.headerContainer}>
        <SecondaryHeader
          headerTitle="ARTICLES & BLOGS"
          headerSubtitle="Together we educate"
          titleColor="#AE9352"
          subtitleColor="#AE9352"
        />
      </View>

      <ScrollView style={styles.contentContainer}>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.content}>{article.content}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ArticleDetail;

const styles = StyleSheet.create({
  primaryContainer: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },

  headerContainer: {
    marginBottom: height * 0.02,
  },

  contentContainer: {
    paddingHorizontal: width * 0.05,
    marginTop: height * 0.04
  },

  title: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.MontserratfontFamilySemiBold,
    color: '#AE9352',
    marginBottom: height * 0.02,
  },

  content: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.MontserratfontFamilyRegular,
    color: theme.colors.black,
    lineHeight: 24,
    textAlign:'justify'
  },
});
