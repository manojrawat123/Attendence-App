import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import Background from '../../component/Background';
import Btn, { Btn2, Btn3 } from '../../component/Btn';
import { darkGreen, green } from '../../component/Constants';
import * as Location from "expo-location";
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataContext } from '../../context';
import Toast from 'react-native-toast-message';
import LoadingSpinner from '../../component/LoadingSpinner/LoadingSpinner';

const Profile = (m_props) => {
    const { checkinId, getCheckInId, showErrorToast, showSuccessToast, handleErrorFunc ,setAttendenceObj} = useContext(DataContext);
    const [button, setButton] = useState(false);
    const [position, setPosition] = useState();
    const [token, setToken] = useState();
    const [employee, setEmployee] = useState();
    const [id, setId] = useState();

    useEffect(() => {
        async function fetchData() {
            await getPermissions();
            await getCheckInId();
        }
        fetchData();
    }, []);

    const getPermissions = async () => {

        let { status } = await Location.requestForegroundPermissionsAsync();
        const accessToken = await AsyncStorage.getItem('accessToken');
        const userId = await AsyncStorage.getItem('id');
        const user = await AsyncStorage.getItem('user')
        console.log(user);
        const employee =  user ? JSON.parse(user) : null;
        setId(userId);
        setToken(accessToken);
        setEmployee(employee);
        if (status !== "granted") {
            showErrorToast("Error", "Please Grant Location Permission");
            return;
        }
        let currentLocation = await Location.getCurrentPositionAsync({});
        setPosition(currentLocation); 
    }

    const checkInFunc = async () => {
        setButton(true)
        try {
            axios.post(`${API_BASE_URL}/checkin/`, {
                latitude: position?.coords?.latitude,
                longitude: position?.coords?.longitude,
                user: id
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(async (response) => {
                await AsyncStorage.setItem("attendence_id", `${response.data?.attendence_id}`);
                await getCheckInId();
                showSuccessToast("Congratulation", "You Checked In Successfully");
            }).catch((error) => {
                handleErrorFunc(error);
            }).finally(() => {
                setButton(false)
            });
        } catch (error) {
            handleErrorFunc(error);
            setButton(false);
        }
    }

    const checkOutFunc = async () => {
        setButton(true);
        try {
            const attendanceId = await AsyncStorage.getItem("attendence_id");
            axios.put(`${API_BASE_URL}/checkin/${attendanceId}/`, {
                user: id,
                latitude: position?.coords.latitude,
                longitude: position?.coords.longitude,
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(async (response) => {
                await AsyncStorage.removeItem("attendence_id");
                await getCheckInId();
                showSuccessToast("Congratulation", "You Checked Out Successfully")
            }).catch(async (error) => {
                if(error.response){
                    if (error.response.status == 400) {
                        if (error.response.data.error == "Checkout should on the same day") {
                            await AsyncStorage.removeItem("attendence_id");
                            await getCheckInId();
                        }
                    }
                }
                handleErrorFunc(error);
            }).finally(() => {
                setButton(false);
            })
        } catch (error) {
            handleErrorFunc(error);
            setButton(false);
        }
    }

    if(!employee){
        return <LoadingSpinner />
    }

    return (
        <Background>
            <View style={{ marginHorizontal: 40, marginTop: 100 }}>
                <Text style={{ color: 'white', fontSize: 64 }}>Let's start</Text>
                <Text style={{ color: 'white', fontSize: 64, marginBottom: 40 }}>Future</Text>
                <Toast ref={(ref) => Toast.setRef(ref)} />
                {
                    checkinId ?
                        button ? <LoadingSpinner /> : <Btn bgColor='white' textColor={darkGreen} btnLabel="Checkout" Press={checkOutFunc} />
                        :
                        button ? <LoadingSpinner /> : <Btn bgColor={green} textColor='white' btnLabel="Check In" Press={checkInFunc} />
                }
            </View>
            {!button ? 
            <View style={{marginHorizontal : 40}}>
                <Btn3 textColor={"white"} btnLabel="Take Leave" Press={() => {
                    m_props.navigation.navigate("Leave");
                }} width={"100%"} />
                <Btn3 textColor={"white"} btnLabel="My Detail" Press={() => {
                    setAttendenceObj(false)
                    m_props.navigation.navigate("Attendence", { employee });
                }} width={"100%"} />
                {employee.is_superuser ? <Btn3 textColor={"white"} btnLabel="Employee Detail" Press={() => {
                    m_props.navigation.navigate("EmployeeList");
                }} width={"100%"} /> : null}
            </View> : null
            }
        </Background>
    );
}

export default Profile;