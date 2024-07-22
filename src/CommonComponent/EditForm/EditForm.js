import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { Formik, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import { DataContext } from '../../context';
// import EditConfirm from '../../component/ConfirmButton/ConfirmEdit';
import generateInitialValues from '../../component/genrateInitialValues/InitialValues';
import generateValidationSchema from '../../component/GenrateValidationSchema/genrateValidationSchema';

const EditForms = ({ row_data, setIsModalOpen, topTableHeading, getFunc, url_route, query }) => {
    const [button, setAddButton] = useState(false);
    const [confirmEdit, setConfirmEdit] = useState(false);
    const [editData, setEditData] = useState();
    const formArr = topTableHeading?.map((element) => ({
        ...element,
        value: row_data[element.name],
    }));

    const initialValues = generateInitialValues(formArr);
    const validationSchema = generateValidationSchema(formArr);
    const { authHeader } = useContext(DataContext);

    return (
        <View style={styles.container}>
            {/* {confirmEdit ? (
                <EditConfirm
                    url_route={url_route}
                    id={row_data.id}
                    getFunc={getFunc}
                    query={query}
                    setConfirmEdit={setConfirmEdit}
                    editData={editData}
                    setIsModalOpen={setIsModalOpen}
                />
            ) : null} */}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    setEditData(values);
                    setConfirmEdit(true);
                }}
            >
                {({ handleSubmit, setFieldValue, errors, touched }) => (
                    <View>
                        {topTableHeading.map((element, index) => {
                            if (element.name === 'Action') return null;
                            return (
                                <View key={index} style={styles.fieldContainer}>
                                    <Text style={styles.label}>
                                        {element.placeholder}
                                        {element.required ? (
                                            <Text style={styles.required}>*</Text>
                                        ) : (
                                            <Text style={styles.optional}>(Optional)</Text>
                                        )}
                                    </Text>
                                    {['option', 'select', 'array', 'dynamicoption'].includes(element.type) ? (
                                        element.type === 'array' ? (
                                            <RNPickerSelect
                                                onValueChange={(value) => setFieldValue(element.name, value)}
                                                items={element.option.map((opt) => ({ label: opt.label, value: opt.value }))}
                                                placeholder={{ label: element.placeholder, value: null }}
                                                value={row_data[element.name]}
                                                isMulti
                                            />
                                        ) : (
                                            <RNPickerSelect
                                                onValueChange={(value) => setFieldValue(element.name, value)}
                                                items={element.option.map((opt) => ({ label: opt.label, value: opt.value }))}
                                                placeholder={{ label: element.placeholder, value: null }}
                                                value={row_data[element.name]}
                                            />
                                        )
                                    ) : (
                                        <TextInput
                                            style={styles.input}
                                            placeholder={element.placeholder}
                                            value={row_data[element.name]}
                                            onChangeText={(value) => setFieldValue(element.name, value)}
                                            maxLength={['invoice_to_date', 'payment_date'].includes(element.name) ? new Date().toISOString().split('T')[0] : undefined}
                                        />
                                    )}
                                    {errors[element.name] && touched[element.name] ? (
                                        <Text style={styles.error}>{errors[element.name]}</Text>
                                    ) : null}
                                </View>
                            );
                        })}
                        <Button onPress={handleSubmit} title="Update" color="#000" />
                        {button && <ActivityIndicator size="small" color="#0000ff" />}
                    </View>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
    },
    fieldContainer: {
        marginBottom: 16,
    },
    label: {
        marginBottom: 8,
        fontSize: 16,
        color: '#333',
    },
    required: {
        color: 'red',
    },
    optional: {
        color: '#999',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        borderRadius: 4,
    },
    error: {
        color: 'red',
        marginTop: 4,
    },
});

export default EditForms;
