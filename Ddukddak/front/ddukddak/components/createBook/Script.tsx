import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ScriptScreen = () => {
  const [showScript, setShowScript] = useState(false);

  const handleButtonPress = () => {
    setShowScript(!showScript);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
        <Text style={styles.buttonText}>Show Script</Text>
      </TouchableOpacity>

      {showScript && (
        <View style={styles.scriptContainer}>
          <Text style={styles.scriptText}>책만들기 사용설명서</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
  },
  scriptContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5,
  },
  scriptText: {
    fontSize: 18,
  },
});

export default ScriptScreen;
