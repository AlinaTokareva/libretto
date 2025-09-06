import {Redirect} from 'expo-router'
import {useAuth} from '@clerk/clerk-expo'
import {Text, View} from '@/components/Themed'
import {AlertText} from '@/components/ui/alert'
import {SafeAreaView} from 'react-native-safe-area-context'


export default function Home() {
    const {isSignedIn,} = useAuth()

    if (!isSignedIn) {
        return <Redirect href={'/welcome'}/>
    }

    return (
        <View className={'h-full'}>
            <SafeAreaView>

            <Text>Ура</Text>
            </SafeAreaView>
        </View>
    )
}
