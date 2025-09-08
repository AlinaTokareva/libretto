import React from 'react'
import {useUser} from '@clerk/clerk-expo'
import {SignOutButton} from '@/components/SignOutButton'
import {SafeAreaView} from 'react-native-safe-area-context'
import {View} from '@/components/Themed'
import {Heading} from '@/components/ui/heading'
import {Box} from '@/components/ui/box'

const Profile = () => {
    const {user,} = useUser()

    return (
        <View>
            <SafeAreaView className={'p-5'}>
                <Box className={'gap-3'}>
                    <Heading size={'lg'}>Привет, {user?.firstName || user?.emailAddresses[0].emailAddress}!</Heading>
                    <SignOutButton/>
                </Box>
            </SafeAreaView>
        </View>
    )
}

export default Profile
