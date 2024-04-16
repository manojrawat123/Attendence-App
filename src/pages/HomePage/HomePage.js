import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Background from '../../component/Background';
import { darkGreen , green } from '../../component/Constants';
import Btn from '../../component/Btn';

const Home = (props) => {
  return (
    <Background>
      <View style={{ marginHorizontal: 40, marginVertical: 100 }}>
      <Text style={{ color: 'white', fontSize: 47 }}>Attendence</Text>
      <Text style={{ color: 'white', fontSize: 47, marginBottom: 40 }}>App</Text>
      <Btn bgColor={green} textColor='white' btnLabel="Login" Press={() => props.navigation.navigate("Login")} />
      <Btn bgColor='white' textColor={darkGreen} btnLabel="Signup" Press={() => props.navigation.navigate("Signup")} />
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({})

export default Home;