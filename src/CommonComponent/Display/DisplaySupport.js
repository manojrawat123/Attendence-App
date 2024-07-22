// import React, { useContext, useState } from 'react';
// import DeleteConfirm from '../../component/ConfirmButton/DeleteConfirm';
// import { NavLink } from 'react-router-dom';
// import { OpenInBrowser } from '@mui/icons-material';
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';

const DisplaySupport = ({ row_data, topTableHeading,
    // EditModal, url_route, getFunc, query
}) => {
    const [deleteButton, setDeleteButton] = useState();
    const [isModalOpen, setIsModalOpen] = useState();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const filterTabel = topTableHeading.filter(item => item.label !== "Action");

    return (
        <View
            style={{
                marginVertical: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 6,
                marginLeft: 14,
                marginRight: 14,
                borderColor: '#ddd',
                borderWidth: 1,
                borderRadius: 16,
                paddingHorizontal: 8,
            }}>
            {/* {confirmDelete ? <DeleteConfirm url_route={url_route} id={row_data.id} getFunc={getFunc} query={query} setConfirmDelete={setConfirmDelete} row_data={row_data} /> : null} */}
            {/* <EditModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                row_data={row_data}
                topTableHeading={filterTabel}
                getFunc={getFunc}
                query={query}
                url_route={url_route}
            /> */}
            {topTableHeading?.map((element, index) => {
                // if (element.label == "Action") {
                //     return <div className="py-2 px-4 border-b">
                //         <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 mr-2"
                //             onClick={() => {
                //                 setIsModalOpen(true);
                //             }}
                //         >Edit</button>
                //         <button className={` text-white py-1 px-3 rounded ${row_data.active == false && "active" in row_data ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
                //             onClick={() => {
                //                 setConfirmDelete(true);
                //             }}
                //         >{"active" in row_data ? row_data.active == false ? "Activate" : "De-Activate" : "Delete"}</button>
                //     </div>
                // }
                return <>
                    <View style={styles.container}>
                        {element.display !== false ? <Text style={styles.label}>
                            {element.label}
                        </Text> : null}
                        {element.display !== false ? <View style={styles.valueContainer}>
                            <Text style={styles.borderBottom}>

                                <Text
                                    style={element.link ? styles.link : null}
                                // Uncomment and set appropriate navigation if needed
                                // onPress={() => element.link && Linking.openURL(`${element.link.link}/${row_data.id}`)}
                                >

                                    {Array.isArray(row_data[element.name]) ? row_data[element.name].map((ar_el, index) => {
                                        return <>
                                            {ar_el}{index + 1 != ar_el.length - 1 ? ", " : null}
                                        </>;
                                    }) : row_data[element.name]}
                                </Text>
                            </Text>
                        </View> : null}
                    </View>
                </>
            })}

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 8,
        overflowX: 'auto',
    },
    label: {
        color: '#4a4a4a',
        fontWeight: 'bold',
        flex: 1,
    },
    valueContainer: {
        flex: 2,
        fontWeight: '600',
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    link: {
        color: '#1e90ff',
        textDecorationLine: 'underline',
    },
});


export default DisplaySupport



