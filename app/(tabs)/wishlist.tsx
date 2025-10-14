import React, {useState} from 'react'
import {View} from '@/components/Themed'
import {Fab, FabIcon, FabLabel} from '@/components/ui/fab'
import {AddIcon} from '@/components/ui/icon'
import * as ImagePicker from 'expo-image-picker'
import {Image} from '@/components/ui/image'
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context'
import {Heading} from '@/components/ui/heading'
import {Grid, GridItem} from '@/components/ui/grid'
import {ScrollView, TouchableOpacity} from 'react-native'
import {Text} from '@/components/ui/text'
import {Center} from '@/components/ui/center'
import {HStack} from '@/components/ui/hstack'
import {Badge, BadgeText} from '@/components/Badge'
import BookModal from '@/components/modals/BookModal'


type Wish = {
    id: string,
    source: {
        uri: string
    }
}

const Wishlist = () => {
    const [wishes, setWishes,] = useState<Wish[]>([])
    const [showModal, setShowModal,] = useState(false)

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

        // fetch('/api/create', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         page: 1,
        //         name: 'Книжка какая-то love',
        //     }),
        // })
        //     .then(function (response) {
        //         if (response.ok) {
        //             response.json().then(json => {
        //                 console.log(json)
        //             })
        //         } else {
        //             console.log('Network failed with response ' + response.status + ': ' + response.statusText)
        //         }
        //     })
        //     .catch(function (resp) {
        //         console.log(resp)
        //     })
    }

    return (
        <SafeAreaProvider>
            <BookModal setShowModal={setShowModal} showModal={showModal}/>
            <View>
                <Fab
                    size={'md'}
                    placement={'bottom right'}
                    onPress={pickImage}
                >
                    <FabIcon as={AddIcon}/>
                    <FabLabel>Загрузить фото</FabLabel>
                </Fab>

                <SafeAreaView className={'pr-5 pl-5 pt-5 gap-3 flex-1'}>
                    <Heading size={'2xl'}>Вишлист</Heading>

                    <HStack className={'gap-2'}>
                        <TouchableOpacity onPress={() => setShowModal(true)}>

                            <Badge action={'error'}>
                                <BadgeText>Классика</BadgeText>
                            </Badge>
                        </TouchableOpacity>
                        <Badge>
                            <BadgeText>Фантастика</BadgeText>
                        </Badge>
                    </HStack>

                    {!wishes.length ? (
                        <Center className={'m-auto'}>
                            <Text className={'color-background-500'}>Здесь ничего нет</Text>
                            <Text className={'color-background-500'}>Нужно только пожелать!</Text>
                        </Center>
                    ) : (
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
                    )}
                </SafeAreaView>
            </View>
        </SafeAreaProvider>
    )
}

export default Wishlist
