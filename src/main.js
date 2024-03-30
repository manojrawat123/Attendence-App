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
import TakeLeaveScreen from './pages/TakeLeaves/TakeLeave';
import AttendanceScreen from './pages/attendenceScreen/attendenceScreen';
import EmployeesList from './pages/EmployeeList/EmployeList';
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
                        // true
                         ?
                            <>
                                <Stack.Screen name="Home" component={Home} />
                                <Stack.Screen name="Signup" component={SignUpForm} />
                                <Stack.Screen name="Signup2" component={SignUpForm2} />
                                <Stack.Screen name="Signup3" component={SignUpForm4} />
                                <Stack.Screen name="Login" component={Login} />
                                <Stack.Screen name="Profile" component={Profile} />
                                <Stack.Screen name="Leave" component={TakeLeaveScreen} />
                            <Stack.Screen name="Attendence" component={AttendanceScreen} />
                            <Stack.Screen name="EmployeeList" component={EmployeesList} />
                            </>
                            :
                            <>
                            <Stack.Screen name="Profile" component={Profile} />
                            <Stack.Screen name="Leave" component={TakeLeaveScreen} />
                            <Stack.Screen name="Attendence" component={AttendanceScreen} />
                            <Stack.Screen name="EmployeeList" component={EmployeesList} />
                            </>
                    }
                </Stack.Navigator>
            </NavigationContainer>
        </DataProviderFuncComp>
    );
}

export default Main;