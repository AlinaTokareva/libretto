import {Button, ButtonIcon, ButtonText} from '@/components/ui/button'
import {useRouter} from 'expo-router'
import {SafeAreaView} from 'react-native-safe-area-context'
import WelcomeSvg from '@/components/svg/WelcomeSvg'
import {Heading} from '@/components/ui/heading'
import {Text} from '@/components/ui/text'
import {Center} from '@/components/ui/center'
import {View} from '@/components/Themed'
import {ArrowRight} from 'lucide-react-native'


export default function Home() {
    const router = useRouter()

    return (
        <View>
            <SafeAreaView className={'flex-1'}>
                <Center className={'h-[100vh] gap-2'}>
                    <WelcomeSvg width={350} height={350}/>
                    <Heading size={'4xl'}>Libretto</Heading>
                    <Text>Твой помощник в книжных делах</Text>
                    <Button
                        className={'mt-4'}
                        size={'lg'}
                        onPress={() => {
                            router.push('/sign-in')
                        }}
                    >
                        <ButtonText>Приступить</ButtonText>
                        <ButtonIcon as={ArrowRight} />
                    </Button>
                </Center>
            </SafeAreaView>
        </View>
    )
}
