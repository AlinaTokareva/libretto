import {StatusBar} from 'expo-status-bar'
import '@/global.css'
import {GluestackUIProvider} from '@/components/ui/gluestack-ui-provider'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native'
import {useFonts} from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import {useEffect} from 'react'
import {Slot, useRouter} from 'expo-router'
import {useColorScheme} from '@/components/useColorScheme'
import {AuthProvider, useAuth} from '@/providers/AuthProvider'


export {ErrorBoundary} from 'expo-router'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const router = useRouter()
    const {session, initialized,} = useAuth()

    const colorScheme = useColorScheme()
    const [loaded, error,] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    })

    useEffect(() => {
        if (error) throw error
    }, [error,])


    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync()
        }
    }, [loaded,])


    useEffect(() => {
        if (!initialized) return
        console.log(session)
        if (!session) {
            //Редирект на экран приветствия
            router.replace('/')

        } else {
            //Редирект авторизованных пользователей на домашний экран
            router.replace('/home')
        }
    }, [session, initialized,])

    return (
        <AuthProvider>
            <GluestackUIProvider mode={colorScheme || 'light'}>
                <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                    <Slot/>
                    <StatusBar/>
                </ThemeProvider>
            </GluestackUIProvider>
        </AuthProvider>
    )
}