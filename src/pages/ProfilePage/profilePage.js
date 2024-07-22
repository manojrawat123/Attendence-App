import { View, Text } from "react-native"
import LoadingSpinner from "../../component/LoadingSpinner/LoadingSpinner"
import Background from "../../component/Background"
import HelpingText from "../../component/HelpingText/HelpingText"
import { useContext, useEffect, useState } from "react"
import { DataContext } from "../../context"
import Btn, { Btn3 } from "../../component/Btn"
import { darkGreen } from "../../component/Constants"
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage"


const Profile = (m_props) => {

    const [button, setButton] = useState(false);
    const [employee, setEmployee] = useState();
    const [position, setPosition] = useState();

    const {
        profileGetFunc,
        profileObj
    } = useContext(DataContext);

    useEffect(() => {
        async function fetchData() {
            await getPermissions();
        }
        fetchData();
    }, []);

    useEffect(() => {
        profileGetFunc();
    }, [])

    const getPermissions = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        const user = await AsyncStorage.getItem('user');
        const t_employee = user ? JSON.parse(user) : null;
        setEmployee(t_employee);
        if (status !== "granted") {
            showErrorToast("Error", "Please Grant Location Permission");
            return;
        }
        let currentLocation = await Location.getCurrentPositionAsync({});
        setPosition(currentLocation);
    }


    if (!profileObj) {
        return <LoadingSpinner />
    }


    return (
        <Background>
            <View style={{ marginHorizontal: 30, marginTop: 60 }}>
                <HelpingText text1={`Let's start`} text2={'Future'} />
                {
                    profileObj?.checkin_id ?
                        button ? <LoadingSpinner /> : <Btn bgColor='white' textColor={darkGreen} btnLabel="Checkout" Press={() => { }} />
                        :
                        button ? <LoadingSpinner /> : <Btn bgColor={'green'} textColor='white' btnLabel="Check In"
                            Press={() => { }} />
                }
            </View>
            {!button ?
                <View style={{ marginHorizontal: 40 }}>
                    <Btn3 textColor={"white"} btnLabel="Take Leave" Press={() => {
                        if (!employee) {
                            showErrorToast("Error", "Not Authenticated");
                            return;
                        }
                        m_props.navigation.navigate("Leave");
                    }} width={"100%"} />
                    <Btn3 textColor={"white"} btnLabel="My Detail" Press={() => {
                        m_props.navigation.navigate("Attendence", { employee, "year": new Date().getFullYear() });
                    }} width={"100%"} />
                    <Btn3 textColor={"white"} btnLabel="Manage Batch" Press={() => {
                        m_props.navigation.navigate("ManageBatch");
                    }} width={"100%"} />
                    {employee?.is_superuser ? <Btn3 textColor={"white"} btnLabel="Employee Detail" Press={() => {
                        m_props.navigation.navigate("EmployeeList");
                    }} width={"100%"} /> : null}
                </View> : null
            }
        </Background>
    )

}

export default Profile