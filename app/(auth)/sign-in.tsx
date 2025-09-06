import {useState} from 'react'
import {useSignIn} from '@clerk/clerk-expo'
import {Link, useRouter} from 'expo-router'
import {Text, View} from 'react-native'
import {Input, InputField, InputIcon, InputSlot} from '@/components/ui/input'
import {Button, ButtonIcon, ButtonText} from '@/components/ui/button'
import {VStack} from '@/components/ui/vstack'
import {EyeIcon, EyeOffIcon} from '@/components/ui/icon'
import {HStack} from '@/components/ui/hstack'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Center} from '@/components/ui/center'


export default function Page() {
    const {signIn, setActive, isLoaded,} = useSignIn()
    const router = useRouter()

    const [emailAddress, setEmailAddress,] = useState('')
    const [password, setPassword,] = useState('')

    const [showPassword, setShowPassword,] = useState(false)
    const handleState = () => {
        setShowPassword((showState) => {
            return !showState
        })
    }

    //Кнопка "Войти"
    const onSignInPress = async () => {
        if (!isLoaded) return

        //Запуск процесса входа, через электронную почту и пароль
        try {
            const signInAttempt = await signIn.create({
                identifier: emailAddress,
                password,

            })

            //Добавление сессии и редирект
            if (signInAttempt.status === 'complete') {
                await setActive({session: signInAttempt.createdSessionId,})
                router.replace('/')
            } else {
                console.error(JSON.stringify(signInAttempt, null, 2))
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2))
        }
    }

    return (
        <SafeAreaView>
            <VStack className={'gap-5 p-5'}>
                <Input>
                    <InputField
                        value={emailAddress}
                        placeholder="Введите email"
                        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
                    />
                </Input>
                <Input>
                    <InputField
                        value={password}
                        placeholder="Введите пароль"
                        type={showPassword ? 'text' : 'password'}
                        onChangeText={(password) => setPassword(password)}
                    />
                    <InputSlot className="pr-3" onPress={handleState}>
                        <InputIcon as={showPassword ? EyeIcon : EyeOffIcon}/>
                    </InputSlot>
                </Input>
                <Button onPress={onSignInPress}>
                    <ButtonText>Войти</ButtonText>
                </Button>
                <View style={{display: 'flex', flexDirection: 'row', gap: 3,}}>
                    <Link href="/sign-up">
                        <Text>Зарегистрироваться</Text>
                    </Link>
                    <Link href="/welcome">
                        <Text>Назад</Text>
                    </Link>
                </View>
            </VStack>
        </SafeAreaView>
    )
}