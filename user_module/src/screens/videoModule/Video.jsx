import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {theme} from '../../styles/theme';
import {globalStyles} from '../../styles/globalStyles';
import {useNavigation} from '@react-navigation/native';
import SecondaryHeader from '../../utils/customComponents/customHeaders/SecondaryHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputField from '../../utils/customComponents/customInputField/InputField';
import {useDispatch, useSelector} from 'react-redux';
import {getVideos} from '../../redux/slices/videoSlice';
import VideoCard from '../../utils/customComponents/customVideoCard/VideoCard';

const {width, height} = Dimensions.get('screen');

const Video = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {videos} = useSelector(state => state.video);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(getVideos());
  }, [dispatch]);

  useEffect(() => {
    console.log('Fetched Videos:', videos);
  }, [videos]);

  const filteredVideos = videos.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderVideo = ({item}) => (
    <VideoCard
      title={item.title}
      description={item.description}
      videoUrl={item.link}
    />
  );

  return (
    <SafeAreaView style={[globalStyles.container, styles.primaryContainer]}>
      <View style={styles.headerContainer}>
        <SecondaryHeader
          headerTitle="STUDY VIDEOS"
          headerSubtitle="Watch, discover and connect"
          titleColor="#A56E41"
          subtitleColor="#D3915C"
        />

        <View style={styles.searchContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name={'search'} size={width * 0.05} color={'#A56E41'} />
          </View>
          <InputField
            placeholder="Search"
            placeholderTextColor={'#A56E41'}
            backgroundColor={theme.colors.white}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.secondaryContainer}>
        <FlatList
          data={filteredVideos}
          renderItem={renderVideo}
          keyExtractor={item => item._id}
          contentContainerStyle={{paddingBottom: height * 0.26}}
        />
      </View>
    </SafeAreaView>
  );
};

export default Video;

const styles = StyleSheet.create({
  primaryContainer: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },

  secondaryContainer: {
    marginTop: height * 0.01,
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
