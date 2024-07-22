import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import HelpingText from '../../component/HelpingText/HelpingText';



const MenuButton = ({ buttonArr , navigation}) => {
    return (
        <View style={{ marginHorizontal: 30, marginTop: 60 }}>
            <HelpingText text1={`Let's start`} text2={'Future'} />
            <View style={styles.container}>
                <View style={styles.content}>
                    {/* <HeadingO mainHeading={"Simply 2 Cloud"} subHeading={"Attendence App"} /> */}
                    {buttonArr.map((element, index) => (
                        <TouchableOpacity key={index} style={[styles.button, {backgroundColor : element.style}]} onPress={() => navigation.navigate(element.link)}>
                            <Text style={styles.buttonText}>{element.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2', // Adjust background color as needed
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop : 20,
        shadowColor : "white",
        shadowOpacity : 5,
        borderRadius :  22
    },
    content: {
        // backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width : "100%"
    },
    button: {
        // backgroundColor: '', // Adjust button color as needed
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});

// Assuming you have a navigation setup, replace this with your implementation
const navigate = (link) => {
    // Handle navigation logic here using React Navigation
};

export default MenuButton;
