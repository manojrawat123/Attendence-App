import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DataContext, DataProviderFuncComp } from './context';
import Profile from './pages/ProfilePage/profilePage';
import Home from './pages/HomePage/HomePage';
import SignUpForm from './component/RegistrationPage/SignUpPages/SignUp';
import SignUpForm2 from './component/RegistrationPage/SignUpPages/SignUp2';
import SignUpForm4 from './component/RegistrationPage/SignUpPages/SignUp4';
import Login from './component/LoginPage/LoginPage';
import Btn from './component/Btn';
import { darkGreen } from './component/Constants';
import { ActivityIndicator, View } from 'react-native';
import Background from './component/Background';
import LoadingSpinner from './component/LoadingSpinner/LoadingSpinner';
import AttendanceScreen from './pages/attendenceScreen/attendenceScreen';
import EmployeesList from './pages/EmployeeList/EmployeList';
import EmployeeMonthData from './pages/EmployeeMonthData/EmpMonDataMain';
import LeaveDetails from './pages/Leave/LeaveDetails/LeaveDetails';
import MainLeave from './pages/Leave/LeaveDetails/MainLeave';
import OneDayLeave from './pages/Leave/TakeLeaves/OneDayLeave';
import TakeCustomLeave from './pages/Leave/TakeLeaves/TakeLeave';


const Stack = createNativeStackNavigator();

function Main() {

    const { token,
        getUserToken
    } = React.useContext(DataContext);

    React.useEffect(() => {
        getUserToken();
    }, [])


    if (!token) {
        return (
        <Background>
            <View style={{
  height : 700, width : 360,justifyContent: 'center', alignItems: 'center'  }}>
                <LoadingSpinner />
            </View>
        </Background>)
    }

    return (
        <DataProviderFuncComp>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {
                        token == "0"
                         ?
                            <>
                            <Stack.Screen name="Home" component={Home} />
                            <Stack.Screen name="Signup" component={SignUpForm} />
                            <Stack.Screen name="Signup2" component={SignUpForm2} />
                            <Stack.Screen name="Signup3" component={SignUpForm4} />
                            <Stack.Screen name="Login" component={Login} />
                            <Stack.Screen name="Profile" component={Profile} />
                            <Stack.Screen name="Attendence" component={AttendanceScreen} />
                            <Stack.Screen name="EmployeeList" component={EmployeesList} />
                            <Stack.Screen name="MonthData" component={EmployeeMonthData} />
                            {/* Leaves  Route */}
                            <Stack.Screen name="Leave" component={TakeCustomLeave} />
                            <Stack.Screen name="LeaveData" component={MainLeave} />
                            <Stack.Screen name="OneDayLeave" component={OneDayLeave} />
                            <Stack.Screen name="LeaveDetails" component={LeaveDetails} />
                            </>
                            :
                            <>
                            <Stack.Screen name="Profile" component={Profile} />
                            <Stack.Screen name="Attendence" component={AttendanceScreen} />
                            <Stack.Screen name="EmployeeList" component={EmployeesList} />
                            <Stack.Screen name="MonthData" component={EmployeeMonthData} />
                            {/* Leaves  Route */}

                            <Stack.Screen name="Leave" component={TakeCustomLeave} />
                            <Stack.Screen name="LeaveData" component={MainLeave} />
                            <Stack.Screen name="OneDayLeave" component={OneDayLeave} />
                            <Stack.Screen name="LeaveDetails" component={LeaveDetails} />
                            </>
                    }
                </Stack.Navigator>
            </NavigationContainer>
        </DataProviderFuncComp>
    );
}

export default Main;