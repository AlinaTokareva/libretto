import React, {useState} from 'react'
import {View} from '@/components/Themed'
import {Fab, FabIcon, FabLabel} from '@/components/ui/fab'
import {AddIcon} from '@/components/ui/icon'
import * as ImagePicker from 'expo-image-picker'
import {Image} from '@/components/ui/image'
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context'
import {Heading} from '@/components/ui/heading'
import {Grid, GridItem} from '@/components/ui/grid'
import {ScrollView} from 'react-native'


type Wish = {
    id: string,
    source: {
        uri: string
    }
}

const Wishlist = () => {
    const [wishes, setWishes,] = useState<Wish[]>([])


    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images',],
            allowsEditing: false,
            allowsMultipleSelection: true,
        })

        const uploadedWishes: Wish[] = result?.assets?.map(item => ({
            id: item.assetId as string,
            source: {
                uri: item.uri as string,
            },
        })) || []

        setWishes([...wishes, ...uploadedWishes,])
    }

    return (
        <SafeAreaProvider>
            <View>
                <Fab
                    size={'md'}
                    placement={'bottom right'}
                    onPress={pickImage}
                >
                    <FabIcon as={AddIcon}/>
                    <FabLabel>Загрузить фото</FabLabel>
                </Fab>

                <SafeAreaView className={'pr-5 pl-5 pt-5 flex-1'}>

                    <Heading size={'2xl'} className={'mb-3'}>Вишлист</Heading>
                    <ScrollView>
                        <Grid
                            className={'gap-3 mb-5'}
                            _extra={{
                                className: 'grid-cols-3 sm:grid-cols-4 md:grid-cols-6',
                            }}
                        >
                            {wishes.map(item =>
                                <GridItem
                                    key={item.source.uri}
                                    _extra={{
                                        className: 'col-span-1',
                                    }}
                                >
                                    <Image
                                        source={item.source}
                                        className={'w-full h-auto rounded-lg aspect-cover'}
                                        alt={'wish'}
                                    />
                                </GridItem>
                            )}
                        </Grid>
                    </ScrollView>
                </SafeAreaView>
            </View>
        </SafeAreaProvider>
    )
}

export default Wishlist
