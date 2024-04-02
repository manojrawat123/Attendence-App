import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const EmployeeMonthDataSupport = ({ data }) => {

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      {Object.entries(data).map(([date, attendance], index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.date}>{date}:</Text>
        {attendance.leave ?  <Text style={{color : "red"}}>Leave </Text>:  <><Text>checkinTime: {attendance.checkinTime ? attendance.checkinTime : "---"}</Text>
          <Text>checkoutTime: {attendance.checkoutTime ? attendance.checkoutTime : "---"}</Text>
          </>  }  
        </View>
      ))}
    </ScrollView>
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

export default EmployeeMonthDataSupport;
