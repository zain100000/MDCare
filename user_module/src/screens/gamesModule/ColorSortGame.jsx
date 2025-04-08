import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';

const shapes = [
  {shape: '🔴', name: 'Circle'},
  {shape: '🔷', name: 'Diamond'},
  {shape: '⬛', name: 'Square'},
  {shape: '🔺', name: 'Triangle'},
];

const ColorSortGame = () => {
  const [question, setQuestion] = useState(
    shapes[Math.floor(Math.random() * shapes.length)],
  );

  const handleAnswer = name => {
    if (name === question.name) {
      Alert.alert('✅ Correct!', '', [
        {
          text: 'Next',
          onPress: () =>
            setQuestion(shapes[Math.floor(Math.random() * shapes.length)]),
        },
      ]);
    } else {
      Alert.alert('❌ Try Again');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>🧩 Shape Matching</Text>
      <Text style={styles.shape}>{question.shape}</Text>
      {shapes.map((item, i) => (
        <TouchableOpacity
          key={i}
          style={styles.option}
          onPress={() => handleAnswer(item.name)}>
          <Text style={styles.optionText}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

export default ColorSortGame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
  shape: {fontSize: 80, marginBottom: 30},
  option: {
    backgroundColor: '#fcd5ce',
    padding: 16,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
  },
  optionText: {fontSize: 20, textAlign: 'center'},
});
