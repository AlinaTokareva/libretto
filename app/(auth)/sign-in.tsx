import React, {useEffect, useState} from 'react'
import {isClerkAPIResponseError, useSignIn} from '@clerk/clerk-expo'
import {Link, useRouter} from 'expo-router'
import {Input, InputField, InputIcon, InputSlot} from '@/components/ui/input'
import {Button, ButtonSpinner, ButtonText} from '@/components/ui/button'
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
    FormControlLabel,
    FormControlLabelText
} from '@/components/ui/form-control'
import {Center} from '@/components/ui/center'
import SignInSvg from '@/assets/svg/SignInSvg'
import {Heading} from '@/components/ui/heading'
import {LockKeyholeOpenIcon} from 'lucide-react-native'
import {ClerkAPIError} from '@clerk/types'
import {useToggle} from '@/components/hooks/useToggle'
import {TouchableOpacity} from 'react-native'


const SignIn = () => {
    const {signIn, setActive, isLoaded,} = useSignIn()
    const router = useRouter()

    const [emailAddress, setEmailAddress,] = useState('')
    const [password, setPassword,] = useState('')

    const [errors, setErrors,] = useState<ClerkAPIError[]>([])
    const [isValid, setIsValid,] = useState(false)
    const [showPassword, toggleShowPassword,] = useToggle(false)
    const [loading, setLoading,] = useState(false)

    useEffect(() => {
        setIsValid(password.length > 0 && emailAddress.length > 0)
    }, [password, emailAddress,])


    //Кнопка "Войти"
    const onSignInPress = async () => {
        setErrors([])

        if (!isLoaded) return
        if (!isValid) return
        if (loading) return

        setLoading(true)

        const emailAddressN = emailAddress.trim().toLowerCase()

        //Запуск процесса входа, через электронную почту и пароль
        try {
            const signInAttempt = await signIn.create({
                identifier: emailAddressN,
                password,
            })

            //Добавление сессии и редирект
            if (signInAttempt.status === 'complete') {
                await setActive({session: signInAttempt.createdSessionId,})
                router.replace('/home')
            } else {
                console.log(JSON.stringify(signInAttempt, null, 2))
                setLoading(false)
            }
        } catch (err) {
            //Вывод ошибки
            if (isClerkAPIResponseError(err)) setErrors(err.errors)
            console.log(JSON.stringify(err, null, 2))
            setLoading(false)
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
                        isInvalid={!!errors?.length}
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
                    </FormControl>
                    <FormControl
                        isInvalid={!!errors?.length}
                    >
                        <FormControlLabel>
                            <FormControlLabelText>Пароль</FormControlLabelText>
                        </FormControlLabel>
                        <Input>
                            <InputSlot className={'pl-3'}>
                                <InputIcon as={LockKeyholeOpenIcon}/>
                            </InputSlot>
                            <InputField
                                value={password}
                                placeholder={'Введите пароль'}
                                type={showPassword ? 'text' : 'password'}
                                onChangeText={(password) => setPassword(password)}
                            />
                            <InputSlot className={'pr-3'} onPress={toggleShowPassword}>
                                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon}/>
                            </InputSlot>
                        </Input>
                    </FormControl>

                    <FormControl
                        isInvalid={!!errors?.length}
                    >
                        {errors?.map(error => (
                            <FormControlError key={error.code}>
                                <FormControlErrorIcon as={AlertCircleIcon} className={'text-red-500'}/>
                                <FormControlErrorText className={'text-red-500'}>
                                    {error.longMessage}
                                </FormControlErrorText>
                            </FormControlError>
                        ))}
                    </FormControl>

                    <Button
                        className={'mt-2'}
                        onPress={onSignInPress}
                        isDisabled={!isValid}
                    >
                        {loading ? (
                            <>
                                <ButtonSpinner color={'gray'}/>
                                <ButtonText className={'font-medium'}> Входим... </ButtonText>
                            </>
                        ) : (
                            <ButtonText>Войти</ButtonText>
                        )}
                    </Button>

                    <HStack className={'gap-1.5'}>
                        <Text>Нет аккаунта?</Text>
                        <TouchableOpacity onPress={() => router.push('/sign-up')}>
                            <Text className={'underline'}>Зарегистрироваться</Text>
                        </TouchableOpacity>
                    </HStack>
                </VStack>
            </SafeAreaView>
        </View>
    )
}

export default SignIn