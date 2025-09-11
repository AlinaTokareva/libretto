import {GluestackUIProvider} from '@/components/ui/gluestack-ui-provider'
import '@/global.css'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native'
import {useFonts} from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import {useEffect} from 'react'
import {Slot, useRouter, useSegments} from 'expo-router'
import {useColorScheme} from '@/components/useColorScheme'
import {StatusBar} from 'expo-status-bar'
import {AuthProvider, useAuth} from '@/providers/AuthProvider'


export {ErrorBoundary} from 'expo-router'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const colorScheme = useColorScheme()
    const [loaded, error,] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    })

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error
    }, [error,])

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync()
        }
    }, [loaded,])


    const {session, initialized,} = useAuth()
    const segments = useSegments()
    const router = useRouter()

    useEffect(() => {
        if (!initialized) return

        // Check if the path/url is in the (auth) group
        const inAuthGroup = segments[0] === '(auth)'

        if (session && !inAuthGroup) {
            // Redirect authenticated users to the list page
            router.replace('/home')
        } else if (!session) {
            // Redirect unauthenticated users to the login page
            router.replace('/')
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