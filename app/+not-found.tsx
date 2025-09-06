import React from 'react'
import { Stack } from 'expo-router'
import { Text } from '@/components/ui/text'
import { Center } from '@/components/ui/center'
import {Link} from '@/components/ui/link'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!', }} />
      <Center className="flex-1">
        <Text className="text-secondary-200">Данный экран не существует</Text>
        <Link href="/" style={{ marginTop: 10, }}>
          <Text className="text-primary-500">На главную!</Text>
        </Link>
      </Center>
    </>
  )
}
