import LoadingSpinner from '../../../component/LoadingSpinner/LoadingSpinner';
import addBatchArr from './AddBatchArr';
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Touchable, TouchableOpacity, TextInput, Button, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';
import { Formik } from 'formik';
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Btn from '../../../component/Btn';
import { darkGreen } from '../../../component/Constants';
import Background from '../../../component/Background';
import generateValidationSchema from '../../../component/GenrateValidationSchema/genrateValidationSchema';
import genrateInitalValues from '../../../component/genrateInitialValues/InitialValues';
import { DataContext } from '../../../context';
import HelpingText from '../../../component/HelpingText/HelpingText';
import { Picker } from '@react-native-picker/picker';
import MultiSelect from 'react-native-multiple-select';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddBatch = () => {
    const [button, setButton] = useState(false);
    const [selectedDays, setSelectedDays] = useState([]);
    const [showTime1, setShowTime1] = useState(false);
    const [showTime2, setShowTime2] = useState(false);
    const [time1Value, setTime1Value] = useState(new Date());
    const [time1FormatedValue, setTime1FormatedValue] = useState('--:--');
    const [time2FormatedValue, setTime2FormatedValue] = useState('--:--');
    const [time2Value, setTime2Value] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);

    const {
        getBatchPageFunc,
        addBatchPageObj, commonPostApiFunc
    } = useContext(DataContext);

    useEffect(() => {
        getBatchPageFunc({ 'page': 'page' });
    }, []);

    if (!addBatchPageObj) {
        return <LoadingSpinner />
    }

    const updatedArr = addBatchArr.map((element, index) => {
        if (element.type == "dynamicoption") {
            if (element.name == "assigned_to") {
                element['option'] = addBatchPageObj?.user?.map((u_el, index) => {
                    return {
                        'label': u_el.name,
                        'value': u_el.id
                    }
                })
            }
            if (element.name == "brand") {
                element['option'] = addBatchPageObj?.brand?.map((b_el, bin) => {
                    return {
                        "label": b_el.brand_name,
                        "value": b_el.id
                    }
                })
            }
        }
        return element;
    })

    const validationSchema = generateValidationSchema(updatedArr);
    const initialValues = genrateInitalValues(updatedArr);

    return (
        <Background>
            {
                isLoading ? <LoadingSpinner /> : null
            }
            <View style={{
                marginTop: "10%"
            }}>
                <Toast ref={(ref) => Toast.setRef(ref)} />
            </View>
            <ScrollView contentContainerStyle={{
                flexGrow: 1,
                padding: 10
            }}
                showsVerticalScrollIndicator={false}
                style={{ marginBottom: 120 }}>
                <View style={{ alignItems: 'center', width: 400, marginTop: 70 }}>
                    <View
                        style={{
                            backgroundColor: 'white',
                            height: 700,
                            width: 370,
                            borderTopLeftRadius: 30,
                            paddingTop: 30,
                            alignItems: 'center',
                        }}>
                        <Text style={{
                            color: "green",
                            fontSize: 25,
                            borderBottomColor: "green",
                            fontWeight: 10
                        }}>Add Batch</Text>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={(values, actions) => {
                                setIsLoading(true);
                                commonPostApiFunc('batch', values, setIsLoading);
                            }}
                        >
                            {props => (
                                <View>
                                    {updatedArr?.map((element, index) => {
                                        const borderColor = props.errors[element.name] ? { color: "red", borderSz: 2 } : props.touched[element.name] ? { color: 'green', borderSz: 2 } : { color: 'black', borderSz: 1 }
                                        if (element.type == "array") {
                                            return (
                                                <MultiSelect
                                                    hideTags
                                                    items={element.option}
                                                    uniqueKey="id"
                                                    //   ref={(component) => { this.multiSelect = component }}
                                                    onSelectedItemsChange={(selectedItems) => {
                                                        props.setFieldValue(element.name, selectedItems);
                                                    }}
                                                    selectedItems={props.values[element.name]}
                                                    selectText={element.placeholder}
                                                    searchInputPlaceholderText="Add Days..."
                                                    onChangeInput={(text) => console.log(text)}
                                                    altFontFamily="ProximaNova-Light"
                                                    tagRemoveIconColor="#CCC"
                                                    tagBorderColor="#CCC"
                                                    tagTextColor="#CCC"
                                                    selectedItemTextColor="#CCC"
                                                    selectedItemIconColor="#CCC"
                                                    itemTextColor="#000"
                                                    displayKey="name"
                                                    searchInputStyle={{ color: '#CCC' }}
                                                    submitButtonColor="#CCC"
                                                    submitButtonText="Add"
                                                />
                                            )
                                        }
                                        if (["option", "apioption", "dynamicoption"].includes(element.type)) {
                                            return (<>
                                                <Text >{element.placeholder}</Text>
                                                <Picker
                                                    selectedValue={props.values[element.name]}
                                                    onValueChange={(p_sv) => {
                                                        props.setFieldValue(element.name, p_sv);
                                                        console.log(props.values);
                                                    }}
                                                    // style={styles.picker}
                                                    style={
                                                        { borderRadius: 10, color: darkGreen, paddingHorizontal: 10, backgroundColor: 'rgb(220,220, 220)', marginVertical: 10, borderColor: borderColor.color, borderWidth: borderColor.borderSz }
                                                    }
                                                >
                                                    <Picker.Item label='Please select' value={""} />
                                                    {element.option.map((element, index) => {
                                                        return <Picker.Item label={element.label} value={element.value} />
                                                    })}
                                                </Picker>
                                            </>
                                            )
                                        }

                                        if (element.name == "batch_start_timing") {
                                            return <>{
                                                showTime1 && (
                                                    <DateTimePicker
                                                        testID="dateTimePicker"
                                                        value={time1Value}
                                                        mode="time"
                                                        display="spinner"
                                                        // minimumDate={new Date()}
                                                        onChange={(event, selectedTime) => {
                                                            if (event.type === 'set') {
                                                                setShowTime1(false);
                                                                const selectedDate = new Date(selectedTime);
                                                                const hours = selectedDate.getHours().toString().padStart(2, '0');
                                                                const minutes = selectedDate.getMinutes().toString().padStart(2, '0');
                                                                setTime1FormatedValue(`${hours}:${minutes}`);
                                                                props.setFieldValue(element.name, `${hours}:${minutes}`)
                                                                setTime1Value(selectedDate);
                                                            } else {
                                                                setShowTime1(false);
                                                            }
                                                        }}
                                                    />
                                                )
                                            }
                                                <Text>{element.placeholder}</Text>
                                                <TouchableOpacity onPress={() => {
                                                    setShowTime1(true);
                                                }} style={{}}>
                                                    <TextInput
                                                        style={{ borderRadius: 10, color: darkGreen, paddingHorizontal: 10, backgroundColor: 'rgb(220,220, 220)', marginVertical: 10, borderColor: "green", borderWidth: 2, width: 250, height: 45 }}
                                                        placeholder="Select Leave Date"
                                                        editable={false}
                                                        value={time1FormatedValue}
                                                    />
                                                </TouchableOpacity>
                                            </>
                                        }
                                        if (element.name == "batch_end_timing") {
                                            return <>{
                                                showTime2 && (
                                                    <DateTimePicker
                                                        testID="dateTimePicker"
                                                        value={time2Value}
                                                        mode="time"
                                                        display="spinner"
                                                        // minimumDate={new Date()}
                                                        onChange={(event, selectedTime) => {
                                                            if (event.type === 'set') {
                                                                setShowTime2(false);
                                                                const selectedDate = new Date(selectedTime);
                                                                const hours = selectedDate.getHours().toString().padStart(2, '0');
                                                                const minutes = selectedDate.getMinutes().toString().padStart(2, '0');
                                                                setTime2FormatedValue(`${hours}:${minutes}`);
                                                                props.setFieldValue(element.name, `${hours}:${minutes}`)
                                                                setTime2Value(selectedDate);
                                                            } else {
                                                                setShowTime2(false);
                                                            }
                                                        }}
                                                    />
                                                )
                                            }
                                                <Text>{element.placeholder}</Text>
                                                <TouchableOpacity onPress={() => {
                                                    setShowTime2(true);
                                                }} style={{}}>
                                                    <TextInput
                                                        style={{ borderRadius: 10, color: darkGreen, paddingHorizontal: 10, backgroundColor: 'rgb(220,220, 220)', marginVertical: 10, borderColor: "green", borderWidth: 2, width: 250, height: 45 }}
                                                        placeholder="Select Leave Date"
                                                        editable={false}
                                                        value={time2FormatedValue}
                                                    />
                                                </TouchableOpacity>
                                            </>
                                        }
                                        return (
                                            <>
                                                <Text>{element.placeholder}</Text>
                                                <TextInput
                                                    key={index} // Added key prop to satisfy React's requirements
                                                    style={{
                                                        borderRadius: 10,
                                                        color: darkGreen,
                                                        paddingHorizontal: 10,
                                                        backgroundColor: 'rgb(220,220, 220)',
                                                        marginVertical: 10,
                                                        borderColor: borderColor.color,
                                                        borderWidth: borderColor.borderSz,
                                                        height: 40
                                                    }}
                                                    placeholder={element.placeholder}
                                                    onChangeText={props.handleChange(element.name)}
                                                    onFocus={() => {
                                                        props.setFieldTouched(element.name, true);
                                                    }}
                                                    onBlur={() => {
                                                        props.handleBlur(element.name);
                                                        props.setFieldTouched(element.name, false);
                                                    }}
                                                    secureTextEntry={element.name === "password"}
                                                />
                                                {props.errors[element.name] ? (
                                                    <Text style={{ color: "red" }}>{props.errors[element.name]}</Text>
                                                ) : null}
                                            </>
                                        );
                                    })}
                                    {button ?
                                        <LoadingSpinner />
                                        : <Btn textColor='white' bgColor={darkGreen} btnLabel={'Add Batch'} Press={props.handleSubmit} />
                                    }
                                </View>
                            )}
                        </Formik>
                    </View>
                </View>
            </ScrollView>
        </Background>
    );
};

export default AddBatch;