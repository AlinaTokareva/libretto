import {Tabs} from 'expo-router'
import React from 'react'
import {Colors} from '@/constants/Colors'
import {useColorScheme} from '@/components/useColorScheme'
import {FavouriteIcon, Icon} from '@/components/ui/icon'
import {BookIcon, HomeIcon} from 'lucide-react-native'


export default function TabLayout() {
    const colorScheme = useColorScheme()

    return (
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                    headerShown: false,
                }}>
                <Tabs.Screen
                    name={'index'}
                    options={{
                        title: 'Главная',
                        tabBarIcon: ({color,}) => <Icon size={28} as={HomeIcon} color={color}/>,
                    }}
                />
                <Tabs.Screen
                    name={'library'}
                    options={{
                        title: 'Библиотека',
                        headerShown: false,
                        tabBarIcon: ({color,}) => <Icon size={28} as={BookIcon} color={color}/>,
                    }}
                />
                <Tabs.Screen
                    name={'favorite'}
                    options={{
                        title: 'Избранное',
                        headerShown: false,
                        tabBarIcon: ({color,}) => <Icon size={28} as={FavouriteIcon} color={color}/>,
                    }}
                />
                <Tabs.Screen
                    name={'profile'}
                    options={{
                        title: 'Профиль',
                        headerShown: false,
                        tabBarIcon: ({color,}) => <Icon size={28} as={HomeIcon} color={color}/>,
                    }}
                />
            </Tabs>
    )
}
