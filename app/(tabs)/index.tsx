import {Redirect} from 'expo-router'
import {useAuth} from '@clerk/clerk-expo'
import {Text, View} from '@/components/Themed'
import {SafeAreaView} from 'react-native-safe-area-context'
import StudyingSvg from '@/assets/svg/StudyingSvg'
import {Center} from '@/components/ui/center'
import {Fab, FabIcon, FabLabel} from '@/components/ui/fab'
import {AddIcon, SearchIcon} from '@/components/ui/icon'
import {Input, InputField, InputIcon, InputSlot} from '@/components/ui/input'
import {VStack} from '@/components/ui/vstack'
import {Link} from '@/components/ui/link'
import React from 'react'


export default function Home() {
    const {isSignedIn,} = useAuth()

    if (!isSignedIn) {
        return <Redirect href={'/welcome'}/>
    }

    return (
        <View>
            <Fab
                size="xl"
                placement="bottom right"
                isHovered={false}
                isDisabled={false}
                isPressed={false}
            >
                <FabIcon as={AddIcon}/>
            </Fab>
            <SafeAreaView className={'p-5'}>
                <VStack>
                    <Input>
                        <InputSlot className={'pl-3'}>
                            <InputIcon as={SearchIcon}/>
                        </InputSlot>
                        <InputField placeholder="Найти книгу..."/>
                    </Input>
                    <Center>
                        <StudyingSvg width={'90%'} height={'90%'}/>
                    </Center>
                </VStack>
            </SafeAreaView>
        </View>
    )
}
