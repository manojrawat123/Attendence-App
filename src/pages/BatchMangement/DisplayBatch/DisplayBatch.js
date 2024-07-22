import { useContext, useEffect } from "react";
import { DataContext } from "../../../context";
import LoadingSpinner from "../../../component/LoadingSpinner/LoadingSpinner";
import displayBatchArr from "./DisplayBatchArr";
import { ScrollView, StyleSheet, View } from "react-native";
import Display from "../../../CommonComponent/Display/Display";


const DisplayBatch = () => {
    const {
        getBatchDisplayFunc,
        batchDisplayPageArr
    } = useContext(DataContext);

    useEffect(() => {
        getBatchDisplayFunc({ query: "query" });
    }, []);

    if (!batchDisplayPageArr) {
        return <LoadingSpinner />
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.container}>
                <Display
                    // EditModal={CustomEditModal}
                    getFunc={getBatchDisplayFunc}
                    tabelObj={batchDisplayPageArr}
                    topTableHeading={displayBatchArr}
                    url_route={'batch'}
                    title={'Batch Details'} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    scrollView: {
        flexGrow: 1,
    },
});

export default DisplayBatch