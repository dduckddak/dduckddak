import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Loading from '../../components/Loading';

const ScriptScreen = () => {
  return (
    <View style={styles.Container}>
      <Loading />
    </View>
  );
};

export default ScriptScreen;

const styles = StyleSheet.create({
  Container: { alignItems: 'center', justifyContent: 'center', flex: 1 },
});
