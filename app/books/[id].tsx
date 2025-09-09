import React from 'react'
import {View} from '@/components/Themed'
import {ImageBackground} from '@/components/ui/image-background'
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context'
import {Text} from '@/components/ui/text'
import {Heading} from '@/components/ui/heading'
import {Dimensions, ScrollView, TouchableOpacity} from 'react-native'
import {ArrowLeftIcon, Icon, MenuIcon} from '@/components/ui/icon'
import {Box} from '@/components/ui/box'
import {Image} from '@/components/ui/image'
import {useRouter} from 'expo-router'
import {Center} from '@/components/ui/center'
import {lorem} from '@/assets/lorem'


const Book = () => {
    const router = useRouter()
    const {height,} = Dimensions.get('screen')

    return (
        <SafeAreaProvider>
            <SafeAreaView edges={['left', 'right', 'bottom',]}>
                <View>
                    <ImageBackground
                        blurRadius={12}
                        source={require('@/assets/images/book_covers/unnamed.jpg')}
                        className={'w-full h-1/3'}
                        alt={'background cover'}
                    >
                        <SafeAreaView edges={['top',]}>
                            <Box className={'p-5 flex-row justify-between'}>
                                <TouchableOpacity onPress={() => router.back()}>
                                    <Icon as={ArrowLeftIcon} className={'color-background-100 w-6 h-6'}/>
                                </TouchableOpacity>
                                <Icon as={MenuIcon} size="xl" className={'color-background-100 w-6 h-6'}/>
                            </Box>
                            <Center style={{
                                // marginTop: -(height * 0.1),
                            }}>
                                <Image
                                    source={require('@/assets/images/book_covers/unnamed.jpg')}
                                    className={'w-1/2 h-full aspect-[5/8] rounded-md'}
                                    alt={'book'}
                                />
                            </Center>
                        </SafeAreaView>
                    </ImageBackground>
                    <View
                        className={'flex-1 rounded-2xl p-5'}
                        style={{
                            marginTop: -(height * 0.02),
                        }}
                    >
                        <Center>
                            <Text size={'sm'}>Lemony Snicket</Text>
                            <Heading size="xl" className="mb-1">
                                The Austere Academy
                            </Heading>
                        </Center>
                        <ScrollView>
                            <Text>
                                {lorem}
                            </Text>
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default Book