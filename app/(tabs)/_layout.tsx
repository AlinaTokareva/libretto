import {Tabs} from 'expo-router'
import React from 'react'
import {Colors} from '@/constants/Colors'
import {useColorScheme} from '@/components/useColorScheme'
import {Ionicons, MaterialIcons, Octicons} from '@expo/vector-icons'


export default function TabLayout() {
    const colorScheme = useColorScheme()

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
            }}>
            <Tabs.Screen
                name={'home'}
                options={{
                    title: 'Главная',
                    tabBarIcon: ({color,}) => <MaterialIcons color={color} size={28} name={'home'}/>,
                }}
            />
            <Tabs.Screen
                name={'library'}
                options={{
                    title: 'Библиотека',
                    headerShown: false,
                    tabBarIcon: ({color,}) => <MaterialIcons color={color} size={28} name={'book'}/>,
                }}
            />
            <Tabs.Screen
                name={'wishlist'}
                options={{
                    title: 'Вишлист',
                    headerShown: false,
                    tabBarIcon: ({color,}) => <Octicons color={color} size={28} name={'sparkles-fill'}/>,
                }}
            />
            <Tabs.Screen
                name={'profile'}
                options={{
                    title: 'Профиль',
                    headerShown: false,
                    tabBarIcon: ({color,}) => <MaterialIcons color={color} size={28} name={'person'}/>,
                }}
            />
        </Tabs>
    )
}
