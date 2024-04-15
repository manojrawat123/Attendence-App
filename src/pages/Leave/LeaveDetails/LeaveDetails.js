import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing, ScrollView, Button } from 'react-native';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingSpinner from '../../../component/LoadingSpinner/LoadingSpinner';
import { API_BASE_URL } from '../../../config';
import { DataContext } from '../../../context';
import Toast from 'react-native-toast-message';


const LeaveDetails = ({ navigation }) => {

  const [button, setButton] = useState(false);
  const { 
    getLeaveDetailFunc,
    leaveData,
    showSuccessToast
    } = useContext(DataContext);
  const animatedValue = new Animated.Value(0);
  useEffect(() => {
    getLeaveDetailFunc();
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true
    }).start();
  }, []);

  const deleteLeaveFunc = async (id) => {
    setButton(true);
    try {
      const token = await AsyncStorage.getItem("accessToken");
      await axios.delete(`${API_BASE_URL}/leave/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      getLeaveDetailFunc();
      showSuccessToast("Leave Deleted Successfully", "");
      console.log("Leave deleted successfully.");
    } catch (error) {
      console.log("error");
    } finally {
      setButton(false);
    }
  };
  

  if (!leaveData) {
    return (<LoadingSpinner />)
  }

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-20, 0]
  });

  return (
    <View style={{ ...styles.container }}>
         <Toast ref={(ref) => Toast.setRef(ref)} />
                  {button ? <LoadingSpinner /> : ""}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 20 }}>
          {leaveData?.map((employee, index) => (
            <Animated.View key={index} style={[styles.employeeItem, { transform: [{ translateY }] }]}>
              <TouchableOpacity
                style={[styles.touchable, index % 2 === 0 ? styles.purpleBackground : styles.customBackground]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ flex: 1, fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: '' }}>
                    {employee.date} {employee.leave_type ? employee.leave_type : "(Full Day)"}
                  </Text>
                  {employee?.is_editable ?
                      <Button title="Cancel" color="red" onPress={() => deleteLeaveFunc(employee.id)} />
                    : ""
                  }
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
    marginTop: 50,

  },
  employeeItem: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
  },
  touchable: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  employeeEmail: {
    fontSize: 14,
    color: 'white',
  },
  purpleBackground: {
    borderColor: "gray",
    borderRadius: 10
  },
  customBackground: {
    borderColor: "gray",
    borderRadius: 10
  },
});

export default LeaveDetails;
