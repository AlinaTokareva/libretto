import React from 'react'
import {View, Text} from 'react-native'
import {SignedIn, SignedOut, useUser} from '@clerk/clerk-expo'
import {SignOutButton} from '@/components/SignOutButton'
import {Link} from 'expo-router'
import {SafeAreaView} from 'react-native-safe-area-context'

const Profile = () => {
    const {user,} = useUser()

    return (
        <View>
            <SafeAreaView>

                <SignedIn>
                    <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
                    <SignOutButton/>
                </SignedIn>
                <SignedOut>
                    <Link href="../(auth)/sign-in">
                        <Text>Sign in</Text>
                    </Link>
                    <Link href="../(auth)/sign-up">
                        <Text>Sign up</Text>
                    </Link>
                </SignedOut>
            </SafeAreaView>
        </View>
    )
}

export default Profile
