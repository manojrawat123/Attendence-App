import React from 'react';
import {View, ImageBackground} from 'react-native';
import leaves from "../../assets/leaves.jpg";

const Background = ({ children }) => {
  return (
    <>
      <ImageBackground source={leaves} style={{ height: '100%' }} />
      <View style={{ position: "absolute" }}>
        {children}
      </View>
    </>
  );
}

export default Background;