import React from 'react'
import {router, Stack} from 'expo-router'
import {Text} from '@/components/ui/text'
import {Center} from '@/components/ui/center'
import {View} from '@/components/Themed'
import Error404Svg from '@/assets/svg/Error404Svg'
import {Button, ButtonText} from '@/components/ui/button'

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{title: 'Oops!',}}/>
            <View>
                <Center className="flex-1">
                    <Error404Svg style={{
                        width: '100%',
                        height: 300,
                    }}/>
                    <Text className="text-secondary-900">Данный экран не существует!</Text>
                    <Button
                        className={'mt-4'}
                        size={'lg'}
                        onPress={() => {
                            router.push('/home')
                        }}
                    >
                        <ButtonText>На главную</ButtonText>
                    </Button>
                </Center>
            </View>
        </>
    )
}
