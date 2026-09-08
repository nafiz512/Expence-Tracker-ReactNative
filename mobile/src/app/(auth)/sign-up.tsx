import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import * as React from 'react'
import { Image, Pressable, Text, TextInput, View } from 'react-native'

export default function Page() {
    const { isLoaded, signUp, setActive } = useSignUp()
    const router = useRouter()

    const [emailAddress, setEmailAddress] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [pendingVerification, setPendingVerification] = React.useState(false)
    const [code, setCode] = React.useState('')

    // Handle submission of sign-up form
    const onSignUpPress = async () => {
        if (!isLoaded) return

        // Start sign-up process using email and password provided
        try {
            await signUp.create({
                emailAddress,
                password,
            })

            // Send user an email with verification code
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

            // Set 'pendingVerification' to true to display second form
            // and capture code
            setPendingVerification(true)
        } catch (err) {
            // See https://clerk.com/docs/guides/development/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
        }
    }

    // Handle submission of verification form
    const onVerifyPress = async () => {
        if (!isLoaded) return

        try {
            // Use the code the user provided to attempt verification
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code,
            })

            // If verification was completed, set the session to active
            // and redirect the user
            if (signUpAttempt.status === 'complete') {
                await setActive({
                    session: signUpAttempt.createdSessionId,
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
                // If the status is not complete, check why. User may need to
                // complete further steps.
                console.error(JSON.stringify(signUpAttempt, null, 2))
            }
        } catch (err) {
            // See https://clerk.com/docs/guides/development/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
        }
    }

    if (pendingVerification)
    // if (true)
    {
        return (
            <View className="flex-1 bg-[#FAF6F0] justify-center px-6">
                <View className="mb-2">
                    <Text className="text-2xl font-bold text-[#3B2820] text-center">Verify your email</Text>
                </View>
                <View className="mb-6">
                    <Text className="text-sm text-[#8C827A] text-center">A verification code has been sent to your email.</Text>
                </View>
                <TextInput
                    className="w-full bg-white border border-[#E6DDD6] rounded-2xl p-4 text-base text-[#3B2820] mb-4"
                    value={code}
                    placeholder="Enter your verification code"
                    placeholderTextColor="#A89F91"
                    onChangeText={(code) => setCode(code)}
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
                source={require('../../../assets/images/revenue-i2.png')}
                className="w-64 h-64 mb-6"
                resizeMode="contain"
            />

            {/* Title */}
            <Text className="text-3xl font-bold text-[#3B2820] mb-6">
                Create Account
            </Text>

            {/* Form */}
            <View className="w-full flex flex-col gap-3">
                <TextInput
                    className="w-full bg-white border border-[#E6DDD6] rounded-2xl p-4 text-base text-[#3B2820]"
                    autoCapitalize="none"
                    value={emailAddress}
                    placeholder="Enter email"
                    placeholderTextColor="#A89F91"
                    onChangeText={(email) => setEmailAddress(email)}
                    keyboardType="email-address"
                />
                <TextInput
                    className="w-full bg-white border border-[#E6DDD6] rounded-2xl p-4 text-base text-[#3B2820]"
                    value={password}
                    placeholder="Enter password"
                    placeholderTextColor="#A89F91"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
                <Pressable
                    className={`w-full bg-[#8B5A3C] rounded-2xl py-4 items-center mt-2 ${!emailAddress || !password ? 'opacity-60' : 'active:opacity-80'
                        }`}
                    onPress={onSignUpPress}
                    disabled={!emailAddress || !password}
                >
                    <Text className="text-white font-semibold text-lg">Sign Up</Text>
                </Pressable>
            </View>

            {/* Navigation Link */}
            <View className="flex-row items-center mt-6">
                <Text className="text-[#8C827A] text-sm">Already have an account? </Text>
                <Link href="/sign-in">
                    <Text className="text-[#8B5A3C] font-semibold text-sm">Sign in</Text>
                </Link>
            </View>
        </View>
    )
}