import React from 'react';
import {View, ImageBackground, Image} from 'react-native';
import leaves from "../../assets/leaves.jpg";
import logo from "../../assets/logo.jpg";
import logo2 from "../../assets/logo2.png";
import logo3 from "../../assets/logo3.jpg";
import logo4 from "../../assets/logo4.png";

const Background = ({ children }) => {
  return (
    <>
      <ImageBackground source={leaves} style={{ height: '100%' }} />
      <View style={{ position: "absolute" }}>
        {children}
        <View style={{
          flexDirection : "row",
          gap : 10, 
          marginHorizontal : 20
        }}>
        <Image source={logo3} style={{ width: 100 ,height : 50, resizeMode : "contain"}}/>
        <Image source={logo}  style={{ width: 100 ,height : 50, resizeMode : "contain"}} />
        <Image source={logo4}  style={{ width: 100 ,height : 50, resizeMode : "contain"}}/>

        </View>
      </View>
    </>
  );
}

export default Background;