import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
  Text,
  FlatList,
} from 'react-native';
import {theme} from '../../styles/theme';
import {globalStyles} from '../../styles/globalStyles';
import {useNavigation} from '@react-navigation/native';
import SecondaryHeader from '../../utils/customComponents/customHeaders/SecondaryHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputField from '../../utils/customComponents/customInputField/InputField';
import {useDispatch, useSelector} from 'react-redux';
import {getArticles} from '../../redux/slices/articleSlice';
import ArticleCard from '../../utils/customComponents/customArticleCard/ArticleCard';

const {width, height} = Dimensions.get('screen');

const Articles = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const articles = useSelector(state => state.articles.articles);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(getArticles());
  }, [dispatch]);

  useEffect(() => {
    console.log('Fetched Articles:', articles);
  }, [articles]);

  const filteredArticles = articles.filter(
    item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderArticle = ({item}) => (
    <ArticleCard
      title={item.title}
      content={item.content}
      imageSource={require('../../assets/placeHolder/img_placeholder.png')}
    />
  );

  return (
    <SafeAreaView style={[globalStyles.container, styles.primaryContainer]}>
      <View style={styles.headerContainer}>
        <SecondaryHeader
          headerTitle="ARTICLES & BLOGS"
          headerSubtitle="Together we educate"
          titleColor="#AE9352"
          subtitleColor="#AE9352"
        />

        <View style={styles.searchContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name={'search'} size={width * 0.05} color={'#AE9352'} />
          </View>
          <InputField
            placeholder="Search"
            placeholderTextColor={'#AE9352'}
            backgroundColor={theme.colors.white}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.secondaryContainer}>
        <FlatList
          data={filteredArticles}
          renderItem={renderArticle}
          keyExtractor={item => item._id}
          contentContainerStyle={{paddingBottom: height * 0.26}}
        />
      </View>
    </SafeAreaView>
  );
};

export default Articles;

const styles = StyleSheet.create({
  primaryContainer: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },

  secondaryContainer: {
    marginTop: height * 0.02,
  },

  searchContainer: {
    paddingHorizontal: width * 0.024,
    paddingVertical: height * 0.02,
  },

  iconContainer: {
    position: 'absolute',
    left: width * 0.04,
    transform: [{translateY: width * 0.12}],
    zIndex: 8,
  },
});
