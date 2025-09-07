import React, {useState} from 'react'
import {useSignIn} from '@clerk/clerk-expo'
import {Link, useRouter} from 'expo-router'
import {Input, InputField, InputIcon, InputSlot} from '@/components/ui/input'
import {Button, ButtonText} from '@/components/ui/button'
import {VStack} from '@/components/ui/vstack'
import {AlertCircleIcon, AtSignIcon, EyeIcon, EyeOffIcon} from '@/components/ui/icon'
import {SafeAreaView} from 'react-native-safe-area-context'
import {HStack} from '@/components/ui/hstack'
import {Text, View} from '@/components/Themed'
import {
    FormControl,
    FormControlError,
    FormControlErrorIcon,
    FormControlErrorText,
    FormControlHelper,
    FormControlHelperText,
    FormControlLabel,
    FormControlLabelText
} from '@/components/ui/form-control'
import {Center} from '@/components/ui/center'
import SignInSvg from '@/assets/svg/SignInSvg'
import {Heading} from '@/components/ui/heading'
import {LockKeyholeOpenIcon} from 'lucide-react-native'


const SignIn = () => {
    const {signIn, setActive, isLoaded,} = useSignIn()
    const router = useRouter()

    const [emailAddress, setEmailAddress,] = useState('')
    const [password, setPassword,] = useState('')

    const [isInvalid, setIsInvalid,] = useState(false)

    const [showPassword, setShowPassword,] = useState(false)
    const handleState = () => {
        setShowPassword((showState) => {
            return !showState
        })
    }

    //Кнопка "Войти"
    const onSignInPress = async () => {
        if (!isLoaded) return
        if (!password || !emailAddress) setIsInvalid(true)

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
        <View>
            <SafeAreaView className={'p-[30px]'}>
                <VStack className={'gap-3'}>
                    <Center>
                        <SignInSvg style={{
                            width: '100%',
                            height: 300,
                        }}/>
                    </Center>
                    <Heading size={'3xl'}>Войти</Heading>
                    <FormControl
                        isInvalid={isInvalid}
                        size={'md'}
                    >
                        <FormControlLabel>
                            <FormControlLabelText>Email</FormControlLabelText>
                        </FormControlLabel>
                        <Input>
                            <InputSlot className="pl-3">
                                <InputIcon as={AtSignIcon}/>
                            </InputSlot>
                            <InputField
                                value={emailAddress}
                                placeholder="Введите email"
                                onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
                            />
                        </Input>
                        <FormControlLabel>
                            <FormControlLabelText>Пароль</FormControlLabelText>
                        </FormControlLabel>
                        <Input>
                            <InputSlot className="pl-3">
                                <InputIcon as={LockKeyholeOpenIcon}/>
                            </InputSlot>
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
                        <FormControlHelper>
                            <FormControlHelperText>
                                Пароль должен содержать не менее 8 символов
                            </FormControlHelperText>
                        </FormControlHelper>
                        <FormControlError>
                            <FormControlErrorIcon as={AlertCircleIcon} className="text-red-500"/>
                            <FormControlErrorText className="text-red-500">
                                Пароль должен содержать не менее 8 символов
                            </FormControlErrorText>
                        </FormControlError>
                    </FormControl>

                    <Button onPress={onSignInPress}>
                        <ButtonText>Войти</ButtonText>
                    </Button>
                    <HStack className={'justify-between'}>
                        <Link href="/sign-up">
                            <Text>Зарегистрироваться</Text>
                        </Link>
                        <Link href="/">
                            <Text>Назад</Text>
                        </Link>
                    </HStack>
                </VStack>
            </SafeAreaView>
        </View>
    )
}

export default SignIn