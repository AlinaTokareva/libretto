import {Tabs} from 'expo-router'
import React from 'react'
import {Colors} from '@/constants/Colors'
import {useColorScheme} from '@/components/useColorScheme'
import {FavouriteIcon, Icon} from '@/components/ui/icon'
import {BookIcon, HomeIcon} from 'lucide-react-native'
import {MaterialIcons} from '@expo/vector-icons'


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
                        tabBarIcon: ({color,}) => <MaterialIcons color={color} size={28} name={'home'} />,
                    }}
                />
                <Tabs.Screen
                    name={'library'}
                    options={{
                        title: 'Библиотека',
                        headerShown: false,
                        tabBarIcon: ({color,}) => <MaterialIcons color={color} size={28} name={'book'} />,
                    }}
                />
                <Tabs.Screen
                    name={'favorite'}
                    options={{
                        title: 'Избранное',
                        headerShown: false,
                        tabBarIcon: ({color,}) => <MaterialIcons color={color} size={28} name={'favorite'} />,
                    }}
                />
                <Tabs.Screen
                    name={'profile'}
                    options={{
                        title: 'Профиль',
                        headerShown: false,
                        tabBarIcon: ({color,}) => <MaterialIcons color={color} size={28} name={'person'} />,
                    }}
                />
            </Tabs>
    )
}
