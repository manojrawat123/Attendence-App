import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform, StyleSheet } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from '../../../component/Background';
import LoadingSpinner from '../../../component/LoadingSpinner/LoadingSpinner';
import Btn from '../../../component/Btn';
import { API_BASE_URL } from '../../../config';
import { DataContext } from '../../../context';
import { darkGreen } from '../../../component/Constants';

const OneDayLeave = () => {

    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [formattedDate, setFormattedDate] = useState('');
    const [leaveType, setLeaveType] = useState("full_day");
    const [button, setButton] = useState(false);
    const { showSuccessToast, handleErrorFunc } = useContext(DataContext);
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 2);

    const formatDate = (date) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    useEffect(() => {
        const c_date = new Date(date);
        const dateString = c_date.toISOString().substring(0, 10);
        setFormattedDate(dateString);
    }, []);

    const takeLeaveFunc = async () => {
        setButton(true);
        const token = await AsyncStorage.getItem('accessToken');
        const c_date = new Date(date);
        const dateString = c_date.toISOString();
        const formattedDate = dateString.substring(0, 10);
        axios.post(`${API_BASE_URL}/leave/`, {
            date: formattedDate,
            toDate : formattedDate,
            leave_type : leaveType
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

    return (
        <Background>
            <View style={{ marginHorizontal: 40, marginTop: 100 }}>
                <Text style={{ color: 'white', fontSize: 47 }}>Attendence </Text>
                <Text style={{ color: 'white', fontSize: 47, marginBottom: 40 }}>App</Text>
                <Toast ref={(ref) => Toast.setRef(ref)} />
                <View style={{ ...styles.container, backgroundColor: "white", padding: 25 }}>
                    <View>
                        <Text style={{ color: "green", fontSize: 16 }}>From</Text>
                        <TouchableOpacity onPress={()=>{
                             setShowDatePicker(true);
                        }} style={{}}>
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
                                onChange={(event, selectedDate) => {
                                    const currentDate = selectedDate || date;
                                    setShowDatePicker(Platform.OS === 'ios');
                                    setDate(currentDate);
                                    setFormattedDate(formatDate(currentDate));
                                }}
                                maximumDate={maxDate}
                            />
                        )}
                    </View>
                    <View>
                        <Picker
                            selectedValue={leaveType}
                            style={{
                                ...Platform.select({
                                    android: { borderRadius: 10, color: darkGreen, paddingHorizontal: 10, backgroundColor: 'rgb(220,220, 220)', marginVertical: 10, borderColor: "green", borderWidth: 2, width: 250, height: "" }
                                })
                            }}
                            mode={"dropdown"}
                            onValueChange={(itemValue) => setLeaveType(itemValue)}
                        >
                            <Picker.Item label="Full Day" value="full_day" />
                            <Picker.Item label="Half Day" value="half_day" />
                        </Picker>
                    </View>
                    {
                        button ? <LoadingSpinner /> : <Btn textColor={"white"} bgColor={darkGreen} btnLabel="Apply For Leave" Press={takeLeaveFunc} width={"100%"} />
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

export default OneDayLeave;
