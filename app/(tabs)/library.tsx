import {Image, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {View} from '@/components/Themed'
import {Center} from '@/components/ui/center'


const Library = () => {


    return (
        <View>
            <SafeAreaView>
                <Center className={'w-full flex-row flex-wrap'}>

                </Center>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        overflow: 'scroll',
        gap: 10,
    },
})

export default Library