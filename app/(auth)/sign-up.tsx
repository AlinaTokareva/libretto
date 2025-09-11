import React, {useEffect, useState} from 'react'
import {useRouter} from 'expo-router'
import {Input, InputField, InputIcon, InputSlot} from '@/components/ui/input'
import {AlertCircleIcon, AtSignIcon, EyeIcon, EyeOffIcon} from '@/components/ui/icon'
import {Button, ButtonSpinner, ButtonText} from '@/components/ui/button'
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
import {Text, View} from '@/components/Themed'
import {Center} from '@/components/ui/center'
import {Heading} from '@/components/ui/heading'
import {HStack} from '@/components/ui/hstack'
import {SafeAreaView} from 'react-native-safe-area-context'
import {VStack} from '@/components/ui/vstack'
import {useToggle} from '@/components/hooks/useToggle'
import RecipeBook from '@/assets/svg/RecipeBook'
import {LockKeyholeOpenIcon} from 'lucide-react-native'
import {TouchableOpacity} from 'react-native'
import {supabase} from '@/config/initSupabase'


const SignUp = () => {
    const router = useRouter()

    const [emailAddress, setEmailAddress,] = useState('')
    const [password, setPassword,] = useState('')
    const [firstName, setFirstName,] = useState('')
    const [lastName, setLastName,] = useState('')

    const [pendingVerification, setPendingVerification,] = useState(false)
    const [code, setCode,] = useState('')

    // const [errors, setErrors,] = useState<[]>([])
    const [isValid, setIsValid,] = useState(false)
    const [showPassword, toggleShowPassword,] = useToggle(false)
    const [loading, setLoading,] = useState(false)
    const [loadingVerify, setLoadingVerify,] = useState(false)

    useEffect(() => {
        setIsValid(password.length > 0 && emailAddress.length > 0)
    }, [password, emailAddress,])


    //Верификация
    // const onVerifyPress = async () => {
    //     setErrors([])
    //
    //     if (!isLoaded) return
    //     setLoadingVerify(true)
    //
    //     try {
    //         const signUpAttempt = await signUp.attemptEmailAddressVerification({
    //             code,
    //         })
    //
    //         //Добавление сессии и редирект
    //         if (signUpAttempt.status === 'complete') {
    //             await setActive({session: signUpAttempt.createdSessionId,})
    //             router.replace('/')
    //         } else {
    //             console.log(JSON.stringify(signUpAttempt, null, 2))
    //             setLoadingVerify(false)
    //         }
    //     } catch (err) {
    //         if (isClerkAPIResponseError(err)) setErrors(err.errors)
    //         console.log(JSON.stringify(err, null, 2))
    //         setLoadingVerify(false)
    //     }
    // }


    //Кнопка "Зарегистрироваться"
    const onSignUpPress = async () => {
        if (!isValid) return
        if (loading) return

        setLoading(true)

        const emailAddressN = emailAddress.trim().toLowerCase()

        const {error,} = await supabase.auth.signUp({
            email: emailAddressN,
            password: password,
        })

        if (error) {
            // setErrors(error)
            console.log(JSON.stringify(error, null, 2))
            setLoading(false)
        }

        //Отправка пользователю email с кодом проверки
        // await signUp.prepareEmailAddressVerification({strategy: 'email_code',})

        // setPendingVerification(true)

    }

    return (
        <View>
            <SafeAreaView className={'p-[30px]'}>
                <VStack className={'gap-3'}>
                    <Center>
                        <RecipeBook style={{
                            width: 300,
                            height: 250,
                        }}/>
                    </Center>
                    <Heading size={'3xl'}>Регистрация</Heading>

                    {!pendingVerification ? (
                        <>

                            <FormControl
                                // isInvalid={!!errors?.length}
                            >
                                <HStack className={'flex gap-3'}>
                                    <VStack className={'flex-1'}>
                                        <FormControlLabel>
                                            <FormControlLabelText>Фамилия</FormControlLabelText>
                                        </FormControlLabel>
                                        <Input>
                                            <InputField
                                                value={lastName}
                                                placeholder="Введите фамилию"
                                                onChangeText={(lastName) => setLastName(lastName)}
                                            />
                                        </Input>
                                    </VStack>
                                    <VStack className={'flex-1'}>
                                        <FormControlLabel>
                                            <FormControlLabelText>Имя</FormControlLabelText>
                                        </FormControlLabel>
                                        <Input>
                                            <InputField
                                                value={firstName}
                                                placeholder="Введите имя"
                                                onChangeText={(firstName) => setFirstName(firstName)}
                                            />
                                        </Input>
                                    </VStack>
                                </HStack>
                            </FormControl>
                            <FormControl
                                // isInvalid={!!errors?.length}
                                isRequired={true}
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
                                // isInvalid={!!errors?.length}
                                isRequired={true}
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
                                        placeholder="Введите пароль"
                                        type={showPassword ? 'text' : 'password'}
                                        onChangeText={(password) => setPassword(password)}
                                    />
                                    <InputSlot className="pr-3" onPress={toggleShowPassword}>
                                        <InputIcon as={showPassword ? EyeIcon : EyeOffIcon}/>
                                    </InputSlot>
                                </Input>
                                <FormControlHelper>
                                    <FormControlHelperText>
                                        Пароль должен содержать не менее 8 символов
                                    </FormControlHelperText>
                                </FormControlHelper>
                            </FormControl>

                            {/*<FormControl*/}
                            {/*    isInvalid={!!errors?.length}*/}
                            {/*>*/}
                            {/*    {errors?.map(error => (*/}
                            {/*        <FormControlError key={error.code}>*/}
                            {/*            <FormControlErrorIcon as={AlertCircleIcon} className={'text-red-500'}/>*/}
                            {/*            <FormControlErrorText className={'text-red-500'}>*/}
                            {/*                {error.longMessage}*/}
                            {/*            </FormControlErrorText>*/}
                            {/*        </FormControlError>*/}
                            {/*    ))}*/}
                            {/*</FormControl>*/}

                            <Button
                                className={'mt-2'}
                                onPress={onSignUpPress}
                                isDisabled={!isValid}
                            >
                                {loading ? (
                                    <>
                                        <ButtonSpinner color={'gray'}/>
                                        <ButtonText className={'font-medium'}> Загрузка... </ButtonText>
                                    </>
                                ) : (
                                    <ButtonText>Дальше</ButtonText>
                                )}
                            </Button>
                        </>
                    ) : (
                        <>
                            <Text>Введите код подтверждения, отправленный на ваш email</Text>
                            <FormControl
                                // isInvalid={!!errors?.length}
                            >
                                <FormControlLabel>
                                    <FormControlLabelText>Код</FormControlLabelText>
                                </FormControlLabel>
                                <Input>
                                    <InputField
                                        value={code}
                                        placeholder={'Введите код подтверждения'}
                                        onChangeText={(code) => setCode(code)}
                                    />
                                </Input>
                            </FormControl>
                            {/*<FormControl*/}
                            {/*    isInvalid={!!errors?.length}*/}
                            {/*>*/}
                            {/*    {errors?.map(error => (*/}
                            {/*        <FormControlError key={error.code}>*/}
                            {/*            <FormControlErrorIcon as={AlertCircleIcon} className={'text-red-500'}/>*/}
                            {/*            <FormControlErrorText className={'text-red-500'}>*/}
                            {/*                {error.longMessage}*/}
                            {/*            </FormControlErrorText>*/}
                            {/*        </FormControlError>*/}
                            {/*    ))}*/}
                            {/*</FormControl>*/}

                            <Button
                                className={'mt-2'}
                                // onPress={onVerifyPress}
                                isDisabled={!code.length}
                            >
                                {loadingVerify ? (
                                    <>
                                        <ButtonSpinner color={'gray'}/>
                                        <ButtonText className={'font-medium'}> Проверяем... </ButtonText>
                                    </>
                                ) : (
                                    <ButtonText>Подтвердить</ButtonText>
                                )}
                            </Button>
                        </>
                    )}

                    {!pendingVerification && (
                        <HStack className={'gap-1.5'}>
                            <Text>Уже есть аккаунт?</Text>
                            <TouchableOpacity onPress={() => router.push('/sign-in')}>
                                <Text className={'underline'}>Войти</Text>
                            </TouchableOpacity>
                        </HStack>
                    )}
                </VStack>
            </SafeAreaView>
        </View>

    )
}

export default SignUp