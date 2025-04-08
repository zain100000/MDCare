import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';

const generateNumbers = () => {
  const nums = Array.from({length: 4}, () => Math.floor(Math.random() * 20));
  return nums;
};

const MemoryMatchGame = () => {
  const [numbers, setNumbers] = useState(generateNumbers());

  const checkOrder = () => {
    const isCorrect = [...numbers].every(
      (val, i, arr) => i === 0 || arr[i - 1] <= val,
    );
    if (isCorrect) {
      Alert.alert('✅ Correct Order!', '', [
        {text: 'Next', onPress: () => setNumbers(generateNumbers())},
      ]);
    } else {
      Alert.alert('❌ Wrong Order!', 'Try again!');
    }
  };

  const shuffle = () =>
    setNumbers([...numbers].sort(() => Math.random() - 0.5));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>🔢 Order the Numbers</Text>
      <View style={styles.numbersContainer}>
        {numbers.map((num, i) => (
          <View key={i} style={styles.numberBox}>
            <Text style={styles.number}>{num}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.btn} onPress={shuffle}>
        <Text>Shuffle</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={checkOrder}>
        <Text>Check Order</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MemoryMatchGame;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  header: {fontSize: 24, fontWeight: 'bold', marginBottom: 30},
  numbersContainer: {flexDirection: 'row', gap: 10, marginBottom: 20},
  numberBox: {backgroundColor: '#ffda77', padding: 20, borderRadius: 10},
  number: {fontSize: 22},
  btn: {backgroundColor: '#90ee90', padding: 12, margin: 10, borderRadius: 10},
});
