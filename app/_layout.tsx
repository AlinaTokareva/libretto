import {GluestackUIProvider} from '@/components/ui/gluestack-ui-provider'
import '@/global.css'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider
} from '@react-navigation/native'
import {useFonts} from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import {useEffect, useState} from 'react'
import {useColorScheme} from '@/components/useColorScheme'
import {Slot, usePathname} from 'expo-router'
import {ClerkProvider} from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary
} from 'expo-router'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
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
    return <RootLayoutNav/>
}

function RootLayoutNav() {
    const colorScheme = useColorScheme()

    return (
        <ClerkProvider tokenCache={tokenCache}>
            <GluestackUIProvider mode={colorScheme || 'light'}>
                <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                    <Slot/>
                </ThemeProvider>
            </GluestackUIProvider>
        </ClerkProvider>
    )
}
