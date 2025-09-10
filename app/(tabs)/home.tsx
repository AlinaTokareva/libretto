import {View} from '@/components/Themed'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Fab, FabIcon} from '@/components/ui/fab'
import {AddIcon, SearchIcon} from '@/components/ui/icon'
import {Input, InputField, InputIcon, InputSlot} from '@/components/ui/input'
import {VStack} from '@/components/ui/vstack'
import {Heading} from '@/components/ui/heading'
import {Card} from '@/components/ui/card'
import {Image} from '@/components/ui/image'
import {HStack} from '@/components/ui/hstack'
import {Progress, ProgressFilledTrack} from '@/components/ui/progress'
import {Text} from '@/components/ui/text'
import {Box} from '@/components/ui/box'
import {TouchableOpacity} from 'react-native'
import {useRouter} from 'expo-router'


export default function Home() {
    const router = useRouter()

    return (
        <View>
            <Fab
                size="xl"
                placement="bottom right"
                isHovered={false}
                isDisabled={false}
                isPressed={false}
            >
                <FabIcon as={AddIcon}/>
            </Fab>
            <SafeAreaView className={'p-5'}>
                <Box className={'gap-3'}>
                    <Input>
                        <InputSlot className={'pl-3'}>
                            <InputIcon as={SearchIcon}/>
                        </InputSlot>
                        <InputField placeholder="Найти книгу..."/>
                    </Input>

                    <Heading size={'xl'}>Читаю сейчас</Heading>
                    <TouchableOpacity onPress={() => router.push('/books/1')}>
                        <Card size={'md'} className={'rounded-lg'} variant={'filled'}>
                            <HStack className="gap-3">
                                <Box className={'justify-between flex-col flex-1'}>
                                    <Box>
                                        <Text size={'xs'}>Lemony Snicket</Text>
                                        <Heading size="md" className="mb-1">
                                            The Austere Academy
                                        </Heading>
                                        <Text size={'sm'}>
                                            Based on the books, what happened with the Baudelaire parents, Count Olaf,
                                            and
                                            this
                                            mysterious VFD? The unresolved ending also left me unsatisfied.
                                        </Text>

                                    </Box>
                                    <Box className={'gap-1'}>
                                        <Progress value={24} size="md" orientation="horizontal">
                                            <ProgressFilledTrack/>
                                        </Progress>
                                        <Box className={'justify-between flex-row'}>
                                            <Text size={'xs'}>24%</Text>
                                            <Text size={'xs'}>130/422</Text>
                                        </Box>
                                    </Box>
                                </Box>
                                <VStack>
                                    <Image
                                        source={require('@/assets/images/book_covers/unnamed.jpg')}
                                        className="w-[140px] h-[200px] rounded-md aspect-cover"
                                        alt="book"
                                    />
                                </VStack>
                            </HStack>
                        </Card>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('/books/1')}>
                        <Card size={'md'} className={'rounded-lg'} variant={'filled'}>
                            <HStack className="gap-3">
                                <Box className={'justify-between flex-col flex-1'}>
                                    <Box>
                                        <Text size={'xs'}>Ф.М. Достоевский</Text>
                                        <Heading size="md" className="mb-1">
                                            Преступление и наказание
                                        </Heading>
                                        <Text size={'sm'}>
                                            Родион Раскольников — стеснённый в средствах студент. Он ютится в крохотной
                                            комнате и размышляет о справедливости.
                                        </Text>

                                    </Box>
                                    <Box className={'gap-1'}>
                                        <Progress value={79} size="md" orientation="horizontal">
                                            <ProgressFilledTrack/>
                                        </Progress>
                                        <Box className={'justify-between flex-row'}>
                                            <Text size={'xs'}>79%</Text>
                                            <Text size={'xs'}>510/684</Text>
                                        </Box>
                                    </Box>
                                </Box>
                                <VStack>
                                    <Image
                                        source={require('@/assets/images/book_covers/e47f1f07-f763-4bef-bdd4-bb1cdff613db.jpg')}
                                        className="w-[140px] h-[200px] rounded-md aspect-cover"
                                        alt="book"
                                    />
                                </VStack>
                            </HStack>
                        </Card>
                    </TouchableOpacity>
                </Box>
            </SafeAreaView>
        </View>
    )
}
