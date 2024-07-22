import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { createContext, useState } from "react";
import Toast, { SuccessToast } from "react-native-toast-message";
import { API_BASE_URL } from "./config";
import { useNavigation } from '@react-navigation/native';

const DataContext = createContext();

const DataProviderFuncComp = ({ children }) => {

  const [token, setToken] = useState(false);
  const [attendenceObj, setAttendenceObj] = useState();
  const [employeesDetail, setEmployeeDetail] = useState();
  const [employeeMonthData, setEmployeeMonthData] = useState();
  const [profileObj, setProfileObj] = useState();
  const [addBatchPageObj, setAddBatchPageObj] = useState();
  const [batchDisplayPageArr, setBatchDisplayPageArr] = useState();

  const logoutFunc = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('sessionid');
      await AsyncStorage.removeItem('id');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error removing data:', error);
    }
  };

  const showSuccessToast = (text1, text2) => {
    Toast.show(
      {
        type: 'success',
        text1: text1,
        text2: text2,
        text1Style: { fontSize: 20, fontWeight: 'bold', color: 'green' },
        text2Style: { fontSize: 16, color: 'green' },
        style: { backgroundColor: '#007bff', borderRadius: 10 },
        topOffset: 0
      }
    )
  };

  const handleErrorFunc = (error) => {
    console.log(error);
    if (error.response) {
      if (error.response.status == 400) {
        console.log(error.response.data.error);
        if (error.response.data.error) {
          showErrorToast("Error", error.response.data.error)
        }

        else {
          const responseData = error.response.data;
          if (responseData) {
            Object.keys(responseData).forEach(field => {
              const errorMessages = responseData[field].join('\n');
              if (field == "non_field_errors") {
                showErrorToast("Validation Error", `${errorMessages}`);
              }
              else {
                showErrorToast("Validation Error", `${field}: ${errorMessages}`);
              }
            });

          }
        }

      }
      else if (error.response.status == 500) {
        showErrorToast("Error", "Internal Server Error");
      }
      else if (error.response.status == 401) {
        showErrorToast("Error", "Unauthorized User");
      }
      else {
        showErrorToast("Error", "Some Error Occured");
      }
    }
    else {
      showErrorToast("Error", error);
      setInterval(() => {
        showErrorToast("Error", error.message);
      }, 4000);
    }
  }

  const commonGetApi = async (route, setParamsData) => {
    setParamsData();
    const token = await AsyncStorage.getItem('accessToken');
    axios.get(`${API_BASE_URL}/${route}/`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((value) => {
      setParamsData(value.data);
    }).catch((err) => {
      handleErrorFunc(err);
      logoutFunc();
    });
  }

  const profileGetFunc = () => {
    commonGetApi('profile', setProfileObj);
  }

  const commonGetParamsApi = async (route, query, setParamsData) => {
    try {
        setParamsData();
        const token = await AsyncStorage.getItem('accessToken');
        axios.get(`${API_BASE_URL}/${route}/`, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
            params: query
        }).then((value)=>{
          setParamsData(value.data)
        });
    } catch (err) {
        handleErrorFunc(err);
    }
}


  const getBatchPageFunc = (query) => {
    commonGetParamsApi('batch', query, setAddBatchPageObj);
  }

  const getBatchDisplayFunc = (query) => {
    commonGetParamsApi('batch', query, setBatchDisplayPageArr);
  }

  const getAttendenceDetailByYear = async (id, year) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      axios.get(`${API_BASE_URL}/checkin/${id}/`, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
        params: {
          year: year
        }
      }).then((response) => {
        setAttendenceObj(response.data);
      }).catch((error) => {
        handleErrorFunc(error);
      })
    } catch (error) {
      handleErrorFunc(error);
    }
  }

  const getUserAdmin = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      axios.get(`${API_BASE_URL}/get_employee_detail/`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then(async (response) => {
        setEmployeeDetail(response.data)
      }).catch((error) => {
        console.log(error)
      })
    } catch (error) {
      handleErrorFunc(error);
      setButton(false);
    }
  }

  const showErrorToast = (text1, text2) => {
    Toast.show(
      {
        type: 'error',
        text1: text1,
        text2: text2,
        text1Style: { fontSize: 14, fontWeight: 'bold', color: 'red' },
        text2Style: { fontSize: 10, color: 'red' },
        style: { backgroundColor: '#007bff', borderRadius: 10 },
        topOffset: 0
      }
    )
  };

  const getUserToken = async () => {
    AsyncStorage.getItem("accessToken").then((value) => {
      setToken(value);
      if (value == null) {
        setToken("0")
      }
    })
  }



  const monthDataFunc = async (year, month, employee_id) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      axios.get(`${API_BASE_URL}/get_month_data/${employee_id}/`, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
        params: {
          year: year,
          month: month
        }
      }).then(async (response) => {
        setEmployeeMonthData(response.data);
      }).catch((error) => {
        console.log(error);
      })
    } catch (error) {
      handleErrorFunc(error);
      setButton(false);
    }
  }

  const commonPostApiFunc = async (route, data, setIsLoading, pageFunc = null, query = null) => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem('accessToken');
    axios.post(`${API_BASE_URL}/${route}/`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((value) => {
      console.log('run');
      showSuccessToast("Successfully Updated!", 'Batch Added Successfully!');
      console.log(value);
      if (pageFunc) {
        if (query) {
          pageFunc(query);
        }
        else {
          pageFunc();
        }
        console.log('run');
      }
    }).catch((err) => {
      console.log(err);
      handleErrorFunc();
    }).finally(() => {
      setIsLoading(false);
    })
  }



  return (
    <DataContext.Provider
      value={{
        // checkinId,
        // getCheckInId,
        token,
        getUserToken,
        showErrorToast,
        showSuccessToast,
        handleErrorFunc,
        getAttendenceDetailByYear,
        attendenceObj,
        getUserAdmin,
        employeesDetail,
        setAttendenceObj,
        monthDataFunc,
        employeeMonthData,
        setEmployeeMonthData,
        profileGetFunc,
        profileObj,
        getBatchDisplayFunc,
        batchDisplayPageArr,
        getBatchPageFunc,
        addBatchPageObj,
        commonPostApiFunc,

      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataProviderFuncComp, DataContext };