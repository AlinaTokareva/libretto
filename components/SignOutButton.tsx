import {useClerk} from '@clerk/clerk-expo'
import {useRouter} from 'expo-router'
import {Button, ButtonText} from '@/components/ui/button'

export const SignOutButton = () => {
    const {signOut,} = useClerk()
    const router = useRouter()

    const handleSignOut = async () => {
        try {
            await signOut()
            router.replace('/')
        } catch (err) {
            console.error(JSON.stringify(err, null, 2))
        }
    }

    return (
        <Button onPress={handleSignOut}>
            <ButtonText>Выход</ButtonText>
        </Button>
    )
}