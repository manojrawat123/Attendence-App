import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing, ScrollView } from 'react-native';
import { DataContext } from '../../context';
import LoadingSpinner from '../../component/LoadingSpinner/LoadingSpinner';

const EmployeesList = ({ navigation }) => {

  const { getUserAdmin, employeesDetail,setAttendenceObj } = useContext(DataContext);
  const animatedValue = new Animated.Value(0);
  
  useEffect(() => {
    getUserAdmin();
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true
    }).start();
  }, [])

  if (!employeesDetail) {
   return (<LoadingSpinner />)
  } 
  
    const translateY = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-20, 0]
    });
  
    return (
      <View style={{...styles.container }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginTop : 20 }}>
        {employeesDetail.map((employee, index) => (
          <Animated.View key={index} style={[styles.employeeItem, { transform: [{ translateY }] }]}>
            <TouchableOpacity
            
              style={[styles.touchable, index % 2 === 0 ? styles.purpleBackground : styles.customBackground]}
              onPress={() => {
                setAttendenceObj(false);
                navigation.navigate('Attendence', { employee , "year" : new Date().getFullYear()});
              }}
            >
              <Text style={styles.employeeName}>{employee.name}</Text>
              <Text style={styles.employeeEmail}>{employee.email}</Text>
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
      marginTop : 50,
      
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
    employeeName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
      color: 'white',
    },
    employeeEmail: {
      fontSize: 14,
      color: 'white',
    },
    purpleBackground: {
      backgroundColor: '#800080',
    },
    customBackground: {
      backgroundColor: '#BA55D3',
    },
  });

export default EmployeesList;
