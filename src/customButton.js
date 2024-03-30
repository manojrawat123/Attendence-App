import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const MyButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#800080', 
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal : 20
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff', 
    fontWeight: 'bold',
  },
});

export default MyButton;
