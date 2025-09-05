import {useState} from 'react'
import {Text, TextInput, TouchableOpacity, View} from 'react-native'
import {useSignUp} from '@clerk/clerk-expo'
import {Link, useRouter} from 'expo-router'
import {Input, InputField, InputIcon, InputSlot} from "@/components/ui/input";
import {EyeIcon, EyeOffIcon} from "@/components/ui/icon";
import {Button, ButtonText} from "@/components/ui/button";

const SignUpScreen = () => {
    const {isLoaded, signUp, setActive,} = useSignUp()
    const router = useRouter()

    const [emailAddress, setEmailAddress,] = useState('')
    const [password, setPassword,] = useState('')
    const [pendingVerification, setPendingVerification,] = useState(false)
    const [code, setCode,] = useState('')

    const [showPassword, setShowPassword] = useState(false);
    const handleState = () => {
        setShowPassword((showState) => {
            return !showState;
        });
    };

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
                <Input
                    variant="underlined"
                >
                    <InputField
                        value={emailAddress}
                        placeholder="Введите email"
                        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
                    />
                </Input>
                <Input
                    variant="underlined"
                >
                    <InputField
                        value={password}
                        placeholder="Введите пароль"
                        type={showPassword ? 'text' : 'password'}
                        onChangeText={(password) => setPassword(password)}
                    />
                    <InputSlot className="pr-3" onPress={handleState}>
                        <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                    </InputSlot>
                </Input>
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