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
import GameCard from '../../utils/customComponents/CustomGameCard/GameCard';

const {width, height} = Dimensions.get('screen');

const staticGames = [
  {
    _id: '1',
    title: 'Math Quiz',
    description: 'Test your math skills with quick questions!',
    image: require('../../assets/gameIcons/math.png'),
    route: 'MathQuizGame',
  },
  {
    _id: '2',
    title: 'Spelling Bee',
    description: 'Improve your spelling with fun word games!',
    image: require('../../assets/gameIcons/spelling.png'),
    route: 'SpellingBeeGame',
  },
  {
    _id: '3',
    title: 'Memory Match',
    description: 'Boost memory by finding matching cards!',
    image: require('../../assets/gameIcons/memory.png'),
    route: 'MemoryMatchGame',
  },
  {
    _id: '4',
    title: 'Color Sort',
    description: 'Learn colors while sorting objects by color!',
    image: require('../../assets/gameIcons/color.png'),
    route: 'ColorSortGame',
  },
];

const Games = () => {
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredGames = staticGames.filter(
    item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderGame = ({item}) => (
    <GameCard
      title={item.title}
      description={item.description}
      imageSource={item.image}
      onPress={() => navigation.navigate(item.route)}
    />
  );

  return (
    <SafeAreaView style={[globalStyles.container, styles.primaryContainer]}>
      <View style={styles.headerContainer}>
        <SecondaryHeader
          headerTitle="GAMES"
          headerSubtitle="ENJOY, ENJOY, ENJOY"
          titleColor="#D5664B"
          subtitleColor="#D5664B"
        />

        <View style={styles.searchContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name={'search'} size={width * 0.05} color={'#D5664B'} />
          </View>
          <InputField
            placeholder="Search"
            placeholderTextColor={'#D5664B'}
            backgroundColor={theme.colors.white}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.secondaryContainer}>
        <FlatList
          data={filteredGames}
          renderItem={renderGame}
          keyExtractor={item => item._id}
          contentContainerStyle={{paddingBottom: height * 0.26}}
        />
      </View>
    </SafeAreaView>
  );
};

export default Games;

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
