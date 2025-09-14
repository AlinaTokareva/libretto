import {Redirect, Stack} from 'expo-router'
import {useAuth} from '@/providers/AuthProvider'


export default function AuthRoutesLayout() {
    const {session,} = useAuth()

    if (session) {
        return <Redirect href={'/home'}/>
    }

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        />
    )
}