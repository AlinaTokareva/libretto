import React, {useState} from 'react'
import {Text, TextInput, TouchableOpacity, View} from 'react-native'
import {useSignUp} from '@clerk/clerk-expo'
import {Link, useRouter} from 'expo-router'
import {Input, InputField, InputIcon, InputSlot} from '@/components/ui/input'
import {AlertCircleIcon, EyeIcon, EyeOffIcon} from '@/components/ui/icon'
import {Button, ButtonText} from '@/components/ui/button'
import {
    FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText,
    FormControlHelper,
    FormControlHelperText,
    FormControlLabel,
    FormControlLabelText
} from '@/components/ui/form-control'

const SignUpScreen = () => {
    const {isLoaded, signUp, setActive,} = useSignUp()
    const router = useRouter()

    const [emailAddress, setEmailAddress,] = useState('')
    const [password, setPassword,] = useState('')
    const [pendingVerification, setPendingVerification,] = useState(false)
    const [code, setCode,] = useState('')

    const [showPassword, setShowPassword,] = useState(false)
    const handleState = () => {
        setShowPassword((showState) => {
            return !showState
        })
    }

    //Кнопка "Зарегистрироваться"
    const onSignUpPress = async () => {
        if (!isLoaded) return
        console.log(emailAddress, password)
        try {
            await signUp.create({
                emailAddress,
                password,
            })

            //Отправка пользователю email с кодом проверки
            await signUp.prepareEmailAddressVerification({strategy: 'email_code',})

            //Set 'pendingVerification' to true to display second form and capture OTP code
            setPendingVerification(true)
        } catch (err) {
            console.error(JSON.stringify(err, null, 2))
        }
    }

    //Верификация
    const onVerifyPress = async () => {
        if (!isLoaded) return

        try {
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code,
            })

            //Добавление сессии и редирект
            if (signUpAttempt.status === 'complete') {
                await setActive({session: signUpAttempt.createdSessionId,})
                router.replace('/')
            } else {
                console.error(JSON.stringify(signUpAttempt, null, 2))
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2))
        }
    }

    if (pendingVerification) {
        return (
            <>
                <Text>Verify your email</Text>
                <Input
                    variant="underlined"
                >
                    <InputField
                        value={code}
                        placeholder="Enter your verification code"
                        onChangeText={(code) => setCode(code)}
                    />
                </Input>
                <Button onPress={onVerifyPress}>
                    <ButtonText>Verify</ButtonText>
                </Button>
            </>
        )
    }

    return (
        <View>
            <>
                <FormControl
                    // isInvalid={isInvalid}
                    size={'md'}
                    isDisabled={false}
                    // isReadOnly={false}
                    isRequired={false}
                >
                    <FormControlLabel>
                        <FormControlLabelText>Email</FormControlLabelText>
                    </FormControlLabel>
                    <Input>
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
                <Button onPress={onSignUpPress}>
                    <ButtonText>Дальше</ButtonText>
                </Button>
                <View style={{display: 'flex', flexDirection: 'row', gap: 3,}}>
                    <Text>Уже есть аккаунт?</Text>
                    <Link href={'/sign-in'}>
                        <Text>Войти</Text>
                    </Link>
                </View>
            </>
        </View>
    )
}

export default SignUpScreen