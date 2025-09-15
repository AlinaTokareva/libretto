import React, {useEffect, useState} from 'react'
import {View} from '@/components/Themed'
import {Fab, FabIcon} from '@/components/ui/fab'
import {AddIcon} from '@/components/ui/icon'
import * as ImagePicker from 'expo-image-picker'
import {supabase} from '@/config/supabase'
import {decode} from 'base64-arraybuffer'
import {useAuth} from '@/providers/AuthProvider'
import {Image} from '@/components/ui/image'
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context'
import {ScrollView} from 'react-native'
import {FileObject} from '@supabase/storage-js'
import {Heading} from '@/components/ui/heading'


type Wish = {
    id: string,
    source: { uri: string }
}

type WishRecord = {
    id: string,
    author?: string,
    title?: string
}

const Profile = () => {
    const {user,} = useAuth()

    const [wishes, setWishes,] = useState<Wish[]>([])

    useEffect(() => {
        initData()
    }, [])

    const initData = async () => {
        const {data, error,} = await supabase
            .from('Wish')
            .select()

        if (error) console.error(error)
        console.log(data)

        data?.forEach(item => loadImage(item))
    }


    const loadImage = async (record: WishRecord) => {
        supabase.storage
            .from('Files')
            .download(`${user!.id}/wishlist/${record.id}`)
            .then(({data,}) => {
                const fr = new FileReader()
                fr.readAsDataURL(data!)
                fr.onload = () => {
                    const newWish = {
                        id: record.id,
                        source: {
                            uri: fr.result as string,
                        },
                    }

                    setWishes([...wishes, newWish,])
                }
            })


    }

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images',],
            allowsEditing: false,
            base64: true,
            quality: 1,
        })

        if (!result.canceled) {
            const {data: dataInsert, error: errorInsert,} = await supabase
                .from('Wish')
                .insert({user: user!.id,})
                .select({
                    id: true,
                })

            console.log(dataInsert)

            if (errorInsert) {
                console.error(errorInsert)
            }

            const img = result.assets[0]
            const base64 = img.base64 as string
            const filePath = `${user!.id}/wishlist/${dataInsert?.[0].id}.png`
            const contentType = 'image/png'

            const {error,} = await supabase.storage.from('Files').upload(
                filePath,
                decode(base64),
                {
                    contentType,
                })

            if (error) {
                console.error(error)
            }

            loadImage(dataInsert)
        }
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
                    <Heading size={'2xl'}>Вишлист</Heading>
                    <ScrollView className={'flex-wrap flex-col'}>
                        {wishes.map(item =>
                            <Image
                                key={item.id}
                                source={item.source}
                                className={'h-[200px] aspect-cover rounded-md'}
                                alt={'wish'}
                            />
                        )}
                    </ScrollView>
                </SafeAreaView>
            </View>
        </SafeAreaProvider>
    )
}

export default Profile
