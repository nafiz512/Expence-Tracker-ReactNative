import { useSignIn } from '@clerk/clerk-expo'
import type { EmailCodeFactor } from '@clerk/types'
import { Link, useRouter } from 'expo-router'
import * as React from 'react'
import { useCallback, useState } from 'react'
import { Image, Pressable, Text, TextInput, View } from 'react-native'

export default function Page() {
    const { signIn, setActive, isLoaded } = useSignIn()
    const router = useRouter()

    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')
    const [code, setCode] = useState('')
    const [showEmailCode, setShowEmailCode] = useState(false)
    const [error, setError] = useState('')

    // Handle the submission of the sign-in form
    const onSignInPress = useCallback(async () => {
        if (!isLoaded) return
        setError('')

        // Start the sign-in process using the email and password provided
        try {
            const signInAttempt = await signIn.create({
                identifier: emailAddress,
                password,
            })

            // If sign-in process is complete, set the created session as active
            // and redirect the user
            if (signInAttempt.status === 'complete') {
                await setActive({
                    session: signInAttempt.createdSessionId,
                    navigate: async ({ session }) => {
                        if (session?.currentTask) {
                            // Handle pending session tasks
                            // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
                            console.log(session?.currentTask)
                            return
                        }

                        router.replace('/')
                    },
                })
            } else if (signInAttempt.status === 'needs_second_factor') {
                // Check if email_code is a valid second factor
                // This is required when Client Trust is enabled and the user
                // is signing in from a new device.
                // See https://clerk.com/docs/guides/secure/client-trust
                const emailCodeFactor = signInAttempt.supportedSecondFactors?.find(
                    (factor): factor is EmailCodeFactor => factor.strategy === 'email_code',
                )

                if (emailCodeFactor) {
                    await signIn.prepareSecondFactor({
                        strategy: 'email_code',
                        emailAddressId: emailCodeFactor.emailAddressId,
                    })
                    setShowEmailCode(true)
                }
            } else {
                // If the status is not complete, check why. User may need to
                // complete further steps.
                console.error(JSON.stringify(signInAttempt, null, 2))
                setError('Sign-in incomplete. Please check your credentials.')
            }
        } catch (err: any) {
            // See https://clerk.com/docs/guides/development/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
            const errorMessage = err?.errors?.[0]?.longMessage || err?.errors?.[0]?.message || 'An error occurred during sign in.'
            setError(errorMessage)
        }
    }, [isLoaded, signIn, setActive, router, emailAddress, password])

    // Handle the submission of the email verification code
    const onVerifyPress = React.useCallback(async () => {
        if (!isLoaded) return
        setError('')

        try {
            const signInAttempt = await signIn.attemptSecondFactor({
                strategy: 'email_code',
                code,
            })

            if (signInAttempt.status === 'complete') {
                await setActive({
                    session: signInAttempt.createdSessionId,
                    navigate: async ({ session }) => {
                        if (session?.currentTask) {
                            // Handle pending session tasks
                            // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
                            console.log(session?.currentTask)
                            return
                        }

                        router.replace('/')
                    },
                })
            } else {
                console.error(JSON.stringify(signInAttempt, null, 2))
                setError('Verification incomplete. Please try again.')
            }
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2))
            const errorMessage = err?.errors?.[0]?.longMessage || err?.errors?.[0]?.message || 'Invalid verification code.'
            setError(errorMessage)
        }
    }, [isLoaded, signIn, setActive, router, code])

    // Display email code verification form
    if (showEmailCode) {
        return (
            <View className="flex-1 bg-[#FAF6F0] justify-center px-6">
                <View className="mb-2">
                    <Text className="text-2xl font-bold text-[#3B2820] text-center">Verify your email</Text>
                </View>
                <View className="mb-6">
                    <Text className="text-sm text-[#8C827A] text-center">A verification code has been sent to your email.</Text>
                </View>

                {/* Error Banner */}
                {!!error && (
                    <View className="mb-4 p-3 bg-red-100 border border-red-300 rounded-xl">
                        <Text className="text-red-700 text-sm text-center font-medium">{error}</Text>
                    </View>
                )}

                <TextInput
                    className="w-full bg-white border border-[#E6DDD6] rounded-2xl p-4 text-base text-[#3B2820] mb-4"
                    value={code}
                    placeholder="Enter verification code"
                    placeholderTextColor="#A89F91"
                    onChangeText={(code) => {
                        setCode(code)
                        if (error) setError('')
                    }}
                    keyboardType="numeric"
                />
                <Pressable
                    className="w-full bg-[#8B5A3C] rounded-2xl py-4 items-center active:opacity-80"
                    onPress={onVerifyPress}
                >
                    <Text className="text-white font-semibold text-base">Verify</Text>
                </Pressable>
            </View>
        )
    }

    return (
        <View className="flex-1 bg-[#FAF6F0] pt-20 items-center px-6">
            {/* Header Image */}
            <Image
                source={require('../../../assets/images/revenue-i4.png')}
                className="w-64 h-64 mb-6"
                resizeMode="contain"
            />

            {/* Title */}
            <Text className="text-3xl font-bold text-[#3B2820] mb-6">
                Welcome Back
            </Text>

            {/* Form */}
            <View className="w-full flex flex-col gap-3">
                {/* Error Banner */}
                {!!error && (
                    <View className="p-3 bg-red-100 border border-red-300 rounded-xl mb-1">
                        <Text className="text-red-700 text-sm text-center font-medium">{error}</Text>
                    </View>
                )}

                <TextInput
                    className="w-full bg-white border border-[#E6DDD6] rounded-2xl p-4 text-base text-[#3B2820]"
                    autoCapitalize="none"
                    value={emailAddress}
                    placeholder="Enter email"
                    placeholderTextColor="#A89F91"
                    onChangeText={(emailAddress) => {
                        setEmailAddress(emailAddress)
                        if (error) setError('')
                    }}
                    keyboardType="email-address"
                />
                <TextInput
                    className="w-full bg-white border border-[#E6DDD6] rounded-2xl p-4 text-base text-[#3B2820]"
                    value={password}
                    placeholder="Enter password"
                    placeholderTextColor="#A89F91"
                    secureTextEntry={true}
                    onChangeText={(password) => {
                        setPassword(password)
                        if (error) setError('')
                    }}
                />
                <Pressable
                    className={`w-full bg-[#8B5A3C] rounded-2xl py-4 items-center mt-2 ${!emailAddress || !password ? 'opacity-60' : 'active:opacity-80'
                        }`}
                    onPress={onSignInPress}
                    disabled={!emailAddress || !password}
                >
                    <Text className="text-white font-semibold text-lg">Sign In</Text>
                </Pressable>
            </View>

            {/* Navigation Link */}
            <View className="flex-row items-center mt-6">
                <Text className="text-[#8C827A] text-sm">Don't have an account? </Text>
                <Link href="/sign-up">
                    <Text className="text-[#8B5A3C] font-semibold text-sm">Sign up</Text>
                </Link>
            </View>
        </View>
    )
}