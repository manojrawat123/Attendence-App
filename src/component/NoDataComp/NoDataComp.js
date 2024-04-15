import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NoDataAvailable = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message || 'No data available'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    color: '#888',
  },
});

export default NoDataAvailable;
