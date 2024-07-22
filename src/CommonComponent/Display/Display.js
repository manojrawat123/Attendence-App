import { ScrollView, Text, View } from 'react-native'
import DisplaySupport from './DisplaySupport'

const Display = ({ topTableHeading, getFunc, tabelObj, query, 
    // EditModal,
     url_route, title }) => {
    return (
        <ScrollView contentContainerStyle={{
            flexGrow: 1,
        }} showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View className='my-5 mx-4'>
            <>
                <View>
                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: 'bold',
                            marginBottom: 24,
                            textAlign: 'center',
                            color: '#4A4A4A'
                        }}>
                        {title}
                    </Text>
                </View>
                <View>
                    {tabelObj?.map((element, index) => {
                        return <DisplaySupport row_data={element} topTableHeading={topTableHeading} 
                        // EditModal={EditModal}
                         url_route={url_route} getFunc={getFunc} query={query} />
                    })}
                </View>
            </>

        </View>
        </ScrollView>
    )
}

export default Display
