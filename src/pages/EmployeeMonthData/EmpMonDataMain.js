import React, { useContext, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import EmployeeMonthDataSupport from './EmployeeMonthDataSup';
import MyButton from '../../customButton';
import { useRoute } from '@react-navigation/native';
import { DataContext } from '../../context';
import LoadingSpinner from '../../component/LoadingSpinner/LoadingSpinner';

const EmployeeMonthData = ( {navigation } ) => {

    const route = useRoute();
    const { month, year, employee_id } = route.params;

    const { monthDataFunc, employeeMonthData } = useContext(DataContext); 

    useEffect(()=>{
        monthDataFunc(year, month, employee_id);
    },[]);
    
    if(!employeeMonthData){
        return <LoadingSpinner />
    }
  return (
    <>
    <View
    style={
        {
            marginTop : 30
        }
    }>
       <MyButton title={month} onPress={()=>{}} />

    </View>
      
    <EmployeeMonthDataSupport data={employeeMonthData} />
   </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingVertical: 20,
  },
  item: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default EmployeeMonthData;
