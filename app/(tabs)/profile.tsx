import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import {View} from '@/components/Themed'
import {Heading} from '@/components/ui/heading'
import {Box} from '@/components/ui/box'
import {Button, ButtonText} from '@/components/ui/button'
import {useAuth} from '@/providers/AuthProvider'
import {useRouter} from 'expo-router'

const Profile = () => {
    const {signOut, user,} = useAuth()
    const router = useRouter()

    return (
        <View>
            <SafeAreaView className={'p-5'}>
                <Box className={'gap-3'}>
                    <Heading size={'lg'}>Привет, {user?.user_metadata?.firstName}!</Heading>
                    <Button onPress={signOut}>
                        <ButtonText>Выход</ButtonText>
                    </Button>
                    <Button onPress={() => router.push('/sign-in')}>
                        <ButtonText>Вход</ButtonText>
                    </Button>
                </Box>
            </SafeAreaView>
        </View>
    )
}

export default Profile
