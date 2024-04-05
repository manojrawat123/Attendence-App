import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage for local storage
import { DataContext } from '../../context';
import LoadingSpinner from '../../component/LoadingSpinner/LoadingSpinner';
import { Button, Card } from 'react-native-paper';
import MyButton from '../../customButton';
import { useRoute } from '@react-navigation/native';

const AttendanceScreen = ({ navigation }) => {

  
  const { getAttendenceDetailByYear, attendenceObj,setEmployeeMonthData } = useContext(DataContext);
  const route = useRoute();
  const { employee, year } = route.params;
  const [selectedYear, setSelectedYear] = useState(year);
console.log(route)
  useEffect(() => {
    getAttendenceDetailByYear(employee.id, year);
    setSelectedYear(year);
  }, []);

  useEffect(() => {
    if (attendenceObj) {
      AsyncStorage.setItem('attendenceData', JSON.stringify(attendenceObj));
    }
  }, [attendenceObj]);
   
  if (!attendenceObj) {
    return <LoadingSpinner />;
  }

  return (
    <View style={{
      marginTop : 50
    }}>
      <MyButton title={employee.name} onPress={()=>{}} />
      <MyButton title={new Date().getFullYear()} onPress={()=>{}} />
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} style={{marginBottom : 120}}>
      {Object.entries(attendenceObj).map(([month, stats], index) => (
        <Card key={index} style={styles.card} 
        onPress={()=>{
  setEmployeeMonthData(null);
          navigation.navigate('MonthData', { month, "year" : selectedYear , employee_id : employee.id});
        }}
        >
          <Card.Content>
            <Text style={styles.monthText}>{month}</Text>
            <View style={styles.statsContainer}>
              <Text style={styles.statText}>Present: {stats.present}</Text>
              <Text style={styles.statText}>Half Days: {stats.half_days}</Text>
              <Text style={styles.statText}>Leave: {stats.leave}</Text>
            </View>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
  },
  card: {
    marginBottom: 20,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statText: {
    fontSize: 16,
    marginRight: "auto",
  },
});

export default AttendanceScreen;
