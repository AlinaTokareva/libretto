import {View} from '@/components/Themed'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Center} from '@/components/ui/center'
import {Fab, FabIcon} from '@/components/ui/fab'
import {AddIcon, SearchIcon} from '@/components/ui/icon'
import {Input, InputField, InputIcon, InputSlot} from '@/components/ui/input'
import {VStack} from '@/components/ui/vstack'
import ReadingWomanSvg from '@/assets/svg/ReadingWomanSvg'


export default function Home() {

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
                        <ReadingWomanSvg width={'90%'} height={'90%'}/>
                    </Center>
                </VStack>
            </SafeAreaView>
        </View>
    )
}
