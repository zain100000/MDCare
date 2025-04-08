import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';

const generateQuestion = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const isAddition = Math.random() > 0.5;

  const question = isAddition
    ? `${num1} + ${num2}`
    : `${Math.max(num1, num2)} - ${Math.min(num1, num2)}`;

  const correctAnswer = isAddition ? num1 + num2 : Math.abs(num1 - num2);

  const options = [correctAnswer, correctAnswer + 1, correctAnswer - 1].sort(
    () => Math.random() - 0.5,
  );

  return {question, correctAnswer, options};
};

const MathQuizGame = () => {
  const [quiz, setQuiz] = useState(generateQuestion());
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const handleAnswer = answer => {
    if (answer === quiz.correctAnswer) {
      setScore(score + 1);
      Alert.alert('🎉 Correct!', 'Great job!', [
        {text: 'Next', onPress: nextQuestion},
      ]);
    } else {
      Alert.alert('❌ Oops!', 'Try the next one!', [
        {text: 'Next', onPress: nextQuestion},
      ]);
    }
    setAttempts(attempts + 1);
  };

  const nextQuestion = () => {
    setQuiz(generateQuestion());
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>🧠 Math Quiz Game</Text>

      <Text style={styles.score}>
        Score: {score} / {attempts}
      </Text>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{quiz.question}</Text>
      </View>

      <View style={styles.optionsContainer}>
        {quiz.options.map((option, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.optionButton}
            onPress={() => handleAnswer(option)}>
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default MathQuizGame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef6e4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ff8906',
  },
  score: {
    fontSize: 18,
    marginBottom: 20,
    color: '#1c1c1c',
  },
  questionContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    elevation: 3,
    marginBottom: 30,
  },
  questionText: {
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    color: '#1c1c1c',
  },
  optionsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  optionButton: {
    backgroundColor: '#ffdd00',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 24,
    color: '#1c1c1c',
    fontWeight: '500',
  },
});
