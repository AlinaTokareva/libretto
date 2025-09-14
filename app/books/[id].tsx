import React, {useEffect, useState} from 'react'
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
import * as FileSystem from 'expo-file-system/legacy'
import {HStack} from '@/components/ui/hstack'
import {BookImageIcon, BookOpenIcon} from 'lucide-react-native'
import {Image} from '@/components/ui/image'
import {Fab, FabIcon, FabLabel} from '@/components/ui/fab'
import {useAuth} from '@/providers/AuthProvider'
import {supabase} from '@/config/supabase'
import {decode} from 'base64-arraybuffer'


const Book = () => {
    const router = useRouter()
    const {height,} = Dimensions.get('screen')

    const {user,} = useAuth()
    // const [files, setFiles,] = useState<FileObject[]>([])

    const [image, setImage,] = useState<string>('https://debmzclwmvddseqdgtex.supabase.co/storage/v1/object/sign/BookCovers/default.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wY2I0MjljMy1mMmE2LTQ0Y2YtYTQyZi05ODI5Y2JhN2RmMGYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJCb29rQ292ZXJzL2RlZmF1bHQuanBnIiwiaWF0IjoxNzU3NjE1NTQ5LCJleHAiOjE3NTgyMjAzNDl9.HHBCT8r83Jc5R2oAZL8lVPKrWk17LlTwZfW4mKMCQmc')
    const [imageLoading, setImageLoading,] = useState<boolean>(true)


    useEffect(() => {
        if (!user) return
        loadImages()
    }, [user,])

    const loadImages = async () => {
        const {data,} = await supabase.storage.from('BookCovers').list(user!.id)

        if (data) {
            supabase.storage
                .from('BookCovers')
                .download(`${user!.id}/${data[data.length - 1].name}`)
                .then(({data,}) => {
                    const fr = new FileReader()
                    fr.readAsDataURL(data!)
                    fr.onload = () => {
                        setImage(fr.result as string)
                        setImageLoading(false)
                    }
                })
        }
    }

    const pickImageAsync = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images',],
            allowsEditing: true,
            aspect: [5, 8,],
            quality: 1,
        })

        if (!result.canceled) {
            setImageLoading(true)
            const img = result.assets[0]
            const base64 = await FileSystem.readAsStringAsync(img.uri, {encoding: 'base64',})
            const filePath = `${user!.id}/${new Date().getTime()}.png` //todo - id'шник книги
            const contentType = img.type === 'image' ? 'image/png' : 'video/mp4'
            await supabase.storage.from('BookCovers').upload(filePath, decode(base64), {contentType,})
            await loadImages()
        }
    }

    let source = {uri: image,}
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