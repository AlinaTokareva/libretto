import {Button, ButtonIcon, ButtonText} from '@/components/ui/button'
import {Redirect, useRouter} from 'expo-router'
import {SafeAreaView} from 'react-native-safe-area-context'
import WelcomeSvg from '@/assets/svg/WelcomeSvg'
import {Heading} from '@/components/ui/heading'
import {Text} from '@/components/ui/text'
import {Center} from '@/components/ui/center'
import {View} from '@/components/Themed'
import {ArrowRight} from 'lucide-react-native'
import React from 'react'


export default function Index() {
    const router = useRouter()


    return (
        <View>
            <SafeAreaView className={'p-5'}>
                <Center className={'h-[100vh] gap-2'}>
                    <WelcomeSvg
                        style={{
                            maxWidth: 600,
                            maxHeight: 400,
                            width: '100%',
                            height: '100%',
                        }}
                    />
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
                        <ButtonIcon as={ArrowRight}/>
                    </Button>
                </Center>
            </SafeAreaView>
        </View>
    )
}
