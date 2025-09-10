import React from 'react'
import {View} from '@/components/Themed'
import {ImageBackground} from '@/components/ui/image-background'
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context'
import {Text} from '@/components/ui/text'
import {Heading} from '@/components/ui/heading'
import {Dimensions, ScrollView, TouchableOpacity} from 'react-native'
import {ArrowLeftIcon, Icon, MenuIcon} from '@/components/ui/icon'
import {Box} from '@/components/ui/box'
import {useRouter} from 'expo-router'
import {Center} from '@/components/ui/center'
import {lorem} from '@/assets/lorem'
import * as ImagePicker from 'expo-image-picker'
import {HStack} from '@/components/ui/hstack'
import {BookImageIcon, BookOpenIcon} from 'lucide-react-native'
import {Image} from '@/components/ui/image'
import {Fab, FabIcon, FabLabel} from '@/components/ui/fab'


const Book = () => {
    const router = useRouter()
    const {height,} = Dimensions.get('screen')

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images',],
            allowsEditing: true,
            aspect: [5, 8,],
            quality: 1,
        })

        if (!result.canceled) {
            console.log(result)
        }
    }

    let source = {uri: 'https://imo10.labirint.ru/books/925681/cover.jpg/236-0',}
    return (
        <SafeAreaProvider>
            <SafeAreaView edges={['left', 'right', 'bottom',]}>
                <Fab placement={'bottom center'} className={'mb-3'}>
                    <FabIcon as={BookOpenIcon} className={'ml-3'}/>
                    <FabLabel>Читать</FabLabel>
                </Fab>
                <View>
                    <ImageBackground
                        blurRadius={4}
                        source={source}
                        className={'w-full h-full'}
                        alt={'background cover'}
                    >
                        <SafeAreaView edges={['top',]}>
                            <Box className={'p-5 flex-row justify-between'}>
                                <TouchableOpacity onPress={() => router.back()}>
                                    <Icon as={ArrowLeftIcon} className={'color-background-100 w-6 h-6'}/>
                                </TouchableOpacity>
                                <HStack className={'gap-3'}>
                                    <TouchableOpacity onPress={pickImageAsync}>
                                        <Icon as={BookImageIcon} size="xl" className={'color-background-100 w-6 h-6'}/>
                                    </TouchableOpacity>
                                    <Icon as={MenuIcon} size="xl" className={'color-background-100 w-6 h-6'}/>
                                </HStack>
                            </Box>
                        </SafeAreaView>

                        <View
                            className={'flex-1 rounded-t-2xl p-5 pb-0 mt-32 gap-3'}
                        >
                            <Center
                                style={{
                                    marginTop: -(height * 0.15),
                                }}
                            >
                                <Image
                                    source={source}
                                    className={'h-[270px] aspect-cover rounded-md'}
                                    alt={'book'}
                                />

                            </Center>
                            <Center>
                                <Text size={'sm'}>Луиза Мэй Олкотт</Text>
                                <Heading size="xl" className="mb-1">
                                    Маленькие женщины
                                </Heading>
                            </Center>

                            <ScrollView>
                                <Text>
                                    {lorem}
                                </Text>
                            </ScrollView>
                        </View>
                    </ImageBackground>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default Book