import {Image, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {View} from '@/components/Themed'
import {Center} from '@/components/ui/center'


const Library = () => {
    const booksData = [
        {source: require('@/assets/images/book_covers/Винсент Ван Гог.jpg'), title: '',},
        {source: require('@/assets/images/book_covers/2.00x-thumb.png'), title: '',},
        {source: require('@/assets/images/book_covers/theAustereAcademy.jpg'), title: '',},
        {source: require('@/assets/images/book_covers/430fb8fa-689a-4fba-86ab-a2a446d9cb2f.jpg'), title: '',},
        {source: require('@/assets/images/book_covers/e47f1f07-f763-4bef-bdd4-bb1cdff613db.jpg'), title: '',},
        {source: require('@/assets/images/book_covers/unnamed.jpg'), title: '',},
        {source: require('@/assets/images/book_covers/unnamed (1).jpg'), title: '',},
    ]
    const books = booksData.map(item =>
        <Image
            source={item.source}
            style={{
                height: 170,
                width: 110,
                borderRadius: 10,
                margin: 5,
            }}
            key={item.source.toString()}
        />
    )

    return (
        <View>
            <SafeAreaView>
                <Center className={'w-full flex-row flex-wrap'}>
                    {/*<VStack style={styles.box}>*/}
                    {books}
                    {/*</VStack>*/}
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