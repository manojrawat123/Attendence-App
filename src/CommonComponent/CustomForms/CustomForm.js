import React, { useContext, useState } from 'react';
import { View, Text, Touchable, TouchableOpacity, TextInput, Button, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';
import { Formik } from 'formik';
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Btn from '../../component/Btn';
import { darkGreen } from '../../component/Constants';
import Background from '../../component/Background';
import generateValidationSchema from '../../component/GenrateValidationSchema/genrateValidationSchema';
import genrateInitalValues from '../../component/genrateInitialValues/InitialValues';
import { DataContext } from '../../context';
import HelpingText from '../../component/HelpingText/HelpingText';
import { Picker } from '@react-native-picker/picker';


const CustomForms = ({ heading, fieldsArr, navigation, route }) => {

    const validationSchema = generateValidationSchema(fieldsArr);
    const initialValues = genrateInitalValues(fieldsArr);
    const [button, setButton] = useState(false);
    const { handleErrorFunc } = useContext(DataContext);


    return (
        <Background>
            <View style={{
                marginTop: "15%"
            }}>
                <Toast ref={(ref) => Toast.setRef(ref)} />
            </View>
            <ScrollView contentContainerStyle={{
                flexGrow: 1,
                padding: 10,
            }} showsVerticalScrollIndicator={false} style={{ marginBottom: 120 }}>
                <View style={{ alignItems: 'center', width: 400, marginTop: "" }}>
                    <HelpingText text1={heading} text2={''} />
                    <View
                        style={{
                            backgroundColor: 'white',
                            height: 700,
                            width: 370,
                            borderTopLeftRadius: 30,
                            paddingTop: 30,
                            alignItems: 'center',
                        }}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {

                            }}
                        >
                            {props => (
                                <View>
                                    {fieldsArr?.map((element, index) => {
                                        const borderColor = props.errors[element.name] ? { color: "red", borderSz: 2 } : props.touched[element.name] ? { color: 'green', borderSz: 2 } : { color: 'black', borderSz: 1 }
                                        if (["option", "apioption", "dynamicoption"].includes(element.type)) {
                                            return (<>
                                                <Text >{element.placeholder}</Text>
                                                <Picker
                                                    // selectedValue={selectedValue}
                                                    // onValueChange={onValueChange}
                                                    // style={styles.picker}
                                                    style={
                                                        { borderRadius: 10, color: darkGreen, paddingHorizontal: 10, backgroundColor: 'rgb(220,220, 220)', marginVertical: 10, borderColor: borderColor.color, borderWidth: borderColor.borderSz }
                                                    }
                                                >
                                                    {element.option.map((element, index) => {
                                                        return <Picker.Item label={element.label} value={element.value} />
                                                    })}
                                                </Picker>
                                            </>
                                            )
                                        }
                                        return (
                                            <>
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
                                                        height: "8%"
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
                                        : <Btn textColor='white' bgColor={darkGreen} btnLabel={heading} Press={props.handleSubmit} />
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

export default CustomForms;