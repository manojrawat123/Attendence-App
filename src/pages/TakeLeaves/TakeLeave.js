import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { darkGreen } from '../../component/Constants';
import Btn, { Btn2, Btn3 } from '../../component/Btn';
import Background from '../../component/Background';
import LoadingSpinner from '../../component/LoadingSpinner/LoadingSpinner';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import Toast from 'react-native-toast-message';
import { DataContext } from '../../context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format, parseISO } from 'date-fns';

const ProfessionalDatePicker = () => {
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [formattedDate, setFormattedDate] = useState('');
    const [button, setButton] = useState(false);
    const { showSuccessToast, handleErrorFunc } = useContext(DataContext);

    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 2);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
        setFormattedDate(formatDate(currentDate));
    };
    const formatDate = (date) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const takeLeaveFunc = async () => {
        setButton(true);
        const token = await AsyncStorage.getItem('accessToken');
        const c_date = new Date(date);
        const dateString = c_date.toISOString(); 
        const formattedDate = dateString.substring(0,10)
        console.log(formattedDate)
        axios.post(`${API_BASE_URL}/leave/`, {
            date : formattedDate 
        }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(async (response) => {
            showSuccessToast("Congratulation", "Leave Granted Successfully")
        }).catch((error) => { 
            handleErrorFunc(error);
        }).finally(() => {
            setButton(false);
        });
    }

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    return (
        <Background>
            <View style={{ marginHorizontal: 40, marginTop: 100 }}>
                <Text style={{ color: 'white', fontSize: 64 }}>Let's start</Text>
                <Text style={{ color: 'white', fontSize: 64, marginBottom: 40 }}>Future</Text>
                <Toast ref={(ref) => Toast.setRef(ref)} />
                <View style={styles.container}>
                    <TouchableOpacity onPress={showDatepicker} style={{}}>
                        <TextInput
                            style={{ borderRadius: 10, color: darkGreen, paddingHorizontal: 10, backgroundColor: 'rgb(220,220, 220)', marginVertical: 10, borderColor: "green", borderWidth: 2, width: 250, height: 45 }}
                            placeholder="Select Leave Date"
                            editable={false}
                            value={formattedDate}
                        />
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode="date"
                            display="spinner"
                            minimumDate={new Date()}
                            onChange={onChange}
                            maximumDate={maxDate}
                        />
                    )}
                   {
                    button ? <LoadingSpinner /> :  <Btn textColor={"white"} bgColor={darkGreen} btnLabel="Take a leave" Press={takeLeaveFunc} width={"100%"} />
                   }
                </View>
            </View>
        </Background>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    datePickerButton: {
        backgroundColor: '#E4E6EB',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    datePickerButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    input: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        width: '80%',
        fontSize: 16,
    },
});

export default ProfessionalDatePicker;
