import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import Toast from 'react-native-toast-message';
import { Btn3 } from '../../../component/Btn';
import Background from '../../../component/Background';

const MainLeave = (m_props) => {
   
    return (
        <Background>
            <View style={{ marginHorizontal: 40, marginTop: 100 }}>
                <Text style={{ color: 'white', fontSize: 50 }}>Attendence</Text>
                <Text style={{ color: 'white', fontSize: 50, marginBottom: 40 }}>App</Text>
                <Toast ref={(ref) => Toast.setRef(ref)} />
            </View>
        
            <View style={{marginHorizontal : 40}}>
                <Btn3 textColor={"white"} btnLabel="Apply For One Day Leave" Press={() => {
                    m_props.navigation.navigate("OneDayLeave");
                }} width={"100%"} />
                <Btn3 textColor={"white"} btnLabel="Apply Custom Leave" Press={() => {
                    m_props.navigation.navigate("Leave");
                }} width={"100%"} />
                <Btn3 textColor={"white"} btnLabel="My Leave Detail" Press={() => {
                    m_props.navigation.navigate("LeaveDetails");
                }} width={"100%"} />
              
            </View> 
            
        </Background>
    );
}

export default MainLeave;