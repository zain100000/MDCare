import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {useNavigation} from '@react-navigation/native';
import {globalStyles} from '../../styles/globalStyles';
import {theme} from '../../styles/theme';
import Button from '../../utils/customComponents/customButton/Button';

const {width, height} = Dimensions.get('screen');

const slides = [
  {
    key: '1',
    headerImage: require('../../assets/onBoarding/onBoard_1.png'),
    title: 'Connecting abilities Inspiring possibilities',
  },

  {
    key: '2',
    headerImage: require('../../assets/onBoarding/onBoard_2.png'),
    title: 'Support, Growth, and Community at your fingertips.',
  },
];

const OnBoarding = () => {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);

  const handleOnComplete = () => {
    navigation.replace('Signin');
  };

  const handleSlideChange = index => {
    setActiveIndex(index);
  };

  const goToNextSlide = () => {
    if (sliderRef.current && activeIndex < slides.length - 1) {
      const nextIndex = activeIndex + 1;
      sliderRef.current.goToSlide(nextIndex);
      setActiveIndex(nextIndex);
    } else {
      handleOnComplete();
    }
  };

  const renderItem = ({item, index}) => {
    const words = item.title.split(' ');
    return (
      <SafeAreaView style={[globalStyles.container, styles.primaryContainer]}>
        <View style={styles.headerImageContainer}>
          <Image source={item.headerImage} style={styles.headerImage} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[globalStyles.textBlack, styles.title]}>
            <Text style={{color: theme.colors.primary}}>{words[0]} </Text>
            {words.slice(1).join(' ')}
          </Text>
        </View>

        <View style={styles.btnContainer}>
          {index === slides.length - 1 ? (
            <Button
              title="Get Started"
              width={390}
              onPress={handleOnComplete}
              loading={false}
              textColor={theme.colors.white}
            />
          ) : (
            <>
              <Button
                title="Next"
                width={390}
                onPress={goToNextSlide}
                textColor={theme.colors.white}
              />
            </>
          )}
        </View>
      </SafeAreaView>
    );
  };

  const renderPagination = () => (
    <View style={styles.paginationContainer}>
      {slides.map((_, index) => (
        <View
          key={index}
          style={[styles.dot, activeIndex === index && styles.activeDot]}
        />
      ))}
    </View>
  );

  return (
    <>
      <AppIntroSlider
        ref={sliderRef}
        renderItem={renderItem}
        data={slides}
        onSlideChange={handleSlideChange}
        renderPagination={renderPagination}
        showSkipButton={false}
        showDoneButton={false}
        showNextButton={false}
      />
    </>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  primaryContainer: {
    backgroundColor: theme.colors.white,
    flex: 1,
  },

  headerImage: {
    width: '100%',
    height: height * 0.5,
    resizeMode: 'contain',
  },

  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: height * 0.52,
    width: '100%',
    gap: theme.gap(0.4),
  },

  dot: {
    width: width * 0.03,
    height: width * 0.03,
    borderRadius: width * 0.015,
    backgroundColor: theme.colors.gray,
  },

  activeDot: {
    backgroundColor: theme.colors.primary,
  },

  textContainer: {
    marginTop: height * 0.1,
    alignItems: 'center',
  },

  title: {
    fontSize: width * 0.062,
    fontFamily: theme.typography.fontFamilyRegular,
    textAlign: 'center',
  },

  btnContainer: {
    position: 'absolute',
    bottom: height * 0.03,
    width: '100%',
    paddingHorizontal: width * 0.05,
    alignItems: 'center',
  },
});
