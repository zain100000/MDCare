import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';

const words = [
  {correct: 'Elephant', options: ['Elefant', 'Elephant', 'Elaphant']},
  {correct: 'Banana', options: ['Banena', 'Banana', 'Bannana']},
  {correct: 'Giraffe', options: ['Giraff', 'Giraffe', 'Girafe']},
];

const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

const SpellingBeeGame = () => {
  const [wordData, setWordData] = useState(getRandomWord());

  const handlePress = option => {
    if (option === wordData.correct) {
      Alert.alert('🎉 Correct!', '', [
        {text: 'Next', onPress: () => setWordData(getRandomWord())},
      ]);
    } else {
      Alert.alert('❌ Try again');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>🔤 Spelling Game</Text>
      <Text style={styles.wordPrompt}>Choose correct spelling</Text>
      {wordData.options.map((opt, index) => (
        <TouchableOpacity
          key={index}
          style={styles.option}
          onPress={() => handlePress(opt)}>
          <Text style={styles.optionText}>{opt}</Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

export default SpellingBeeGame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {fontSize: 24, fontWeight: 'bold', marginBottom: 30},
  wordPrompt: {fontSize: 18, marginBottom: 20},
  option: {
    backgroundColor: '#cdeffd',
    padding: 16,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
  },
  optionText: {fontSize: 20, textAlign: 'center'},
});
