import React, {useState} from 'react'
import {View} from '@/components/Themed'
import {Fab, FabIcon} from '@/components/ui/fab'
import {AddIcon} from '@/components/ui/icon'
import * as ImagePicker from 'expo-image-picker'
import {Image} from '@/components/ui/image'
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context'
import {ScrollView} from 'react-native'
import {Heading} from '@/components/ui/heading'
import {VStack} from '@/components/ui/vstack'


type Wish = {
    id: string,
    source: {
        uri: string
    }
}

type WishRecord = {
    id: string,
    author?: string,
    title?: string
}

const Profile = () => {
    const [wishes, setWishes,] = useState<Wish[]>([])


    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images',],
            allowsEditing: false,
            // base64: true,
            quality: 1,
        })

        setWishes([...wishes, {
            id: result?.assets?.[0].assetId as string,
            source: {uri: result?.assets?.[0].uri as string,},
        },])
    }

    return (
        <SafeAreaProvider>
            <View>
                <Fab
                    size={'xl'}
                    placement={'bottom right'}
                    onPress={pickImage}
                >
                    <FabIcon as={AddIcon}/>
                </Fab>

                <SafeAreaView className={'p-5'}>
                    <Heading size={'2xl'} className={'mb-3'}>Вишлист</Heading>
                    <ScrollView>
                        <VStack
                            className={'flex-row flex-wrap'}
                        >

                            {wishes.map(item =>
                                <Image
                                    key={item.source.uri}
                                    source={item.source}
                                    className={'w-1/3 sm:w-1/4 md:w-1/5 aspect-cover rounded-md p-3'}
                                    alt={'wish'}
                                />
                            )}
                        </VStack>
                    </ScrollView>
                </SafeAreaView>
            </View>
        </SafeAreaProvider>
    )
}

export default Profile
