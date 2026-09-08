import { SignOutButton } from '@/components/sign-out-button'
import { SignedIn, SignedOut, useSession, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import * as React from 'react'
import { Image, Pressable, ScrollView, Text, View } from 'react-native'

export default function Page() {
    const { user } = useUser()
    const { session } = useSession()

    // Sample transaction data matching the UI mockup
    const transactions = [
        { id: '1', title: 'Rent', category: 'Other', amount: '-$1200.00', date: 'May 17, 2025', isIncome: false, icon: '💬' },
        { id: '2', title: 'Salary', category: 'Income', amount: '+$2500.00', date: 'May 17, 2025', isIncome: true, icon: '💵' },
        { id: '3', title: 'Groceries', category: 'Food & Drinks', amount: '-$185.45', date: 'May 17, 2025', isIncome: false, icon: '🛒' },
        { id: '4', title: 'Phone Bill', category: 'Bills', amount: '-$75.00', date: 'May 17, 2025', isIncome: false, icon: '📄' },
        { id: '5', title: 'Freelance Work', category: 'Income', amount: '+$300.00', date: 'May 17, 2025', isIncome: true, icon: '💵' },
        { id: '6', title: 'Salary', category: 'Income', amount: '+$2500.00', date: 'May 17, 2025', isIncome: true, icon: '💵' },
        { id: '7', title: 'Groceries', category: 'Food & Drinks', amount: '-$185.45', date: 'May 17, 2025', isIncome: false, icon: '🛒' },
    ]

    return (
        <View className="flex-1 bg-[#FAF6F0]">
            <SignedOut>
                <View className="flex-1 justify-center items-center px-6">
                    <Text className="text-3xl font-bold text-[#3B2820] mb-8">Welcome!</Text>
                    <View className="w-full space-y-4">
                        <Link href="/(auth)/sign-in" asChild>
                            <Pressable className="w-full bg-[#8B5A3C] rounded-2xl py-4 items-center">
                                <Text className="text-white font-semibold text-base">Sign In</Text>
                            </Pressable>
                        </Link>
                        <Link href="/(auth)/sign-up" asChild>
                            <Pressable className="w-full border border-[#8B5A3C] rounded-2xl py-4 items-center">
                                <Text className="text-[#8B5A3C] font-semibold text-base">Sign Up</Text>
                            </Pressable>
                        </Link>
                    </View>
                </View>
            </SignedOut>

            <SignedIn>
                <ScrollView className="flex-1 px-5 pt-14" showsVerticalScrollIndicator={false}>
                    {/* Header */}
                    <View className="flex-row items-center justify-between mb-6">
                        <View className="flex-row items-center gap-3">
                            <Image
                                source={require('../../../assets/images/icon.png')}
                                className="w-12 h-12 rounded-full"
                                resizeMode="contain"
                            />
                            <View>
                                <Text className="text-xs text-[#8C827A]">Welcome,</Text>
                                <Text className="text-base font-bold text-[#3B2820]">
                                    {user?.username || user?.firstName || user?.emailAddresses[0]?.emailAddress?.split('@')[0] || 'User'}
                                </Text>
                            </View>
                        </View>

                        <View className="flex-row items-center gap-2">
                            <Pressable className="bg-[#8B5A3C] flex-row items-center px-4 py-2.5 rounded-full">
                                <Text className="text-white font-semibold text-sm mr-1">+</Text>
                                <Text className="text-white font-semibold text-sm">Add</Text>
                            </Pressable>

                            {/* Sign Out Button Wrapper */}
                            <View className="bg-black p-2.5 rounded-full border border-[#E6DDD6]">
                                <SignOutButton />
                            </View>
                        </View>
                    </View>

                    {/* Balance Card */}
                    <View className="bg-white rounded-3xl p-6 shadow-sm border border-[#F0EBE6] mb-6">
                        <Text className="text-xs text-[#8C827A] mb-1 font-medium">Total Balance</Text>
                        <Text className="text-3xl font-extrabold text-[#3B2820] mb-6">$1289.56</Text>

                        <View className="flex-row justify-between items-center pt-2">
                            {/* Income */}
                            <View className="flex-1">
                                <Text className="text-xs text-[#8C827A] mb-1">Income</Text>
                                <Text className="text-base font-bold text-[#2EC4B6]">+$2800.00</Text>
                            </View>

                            {/* Vertical Divider */}
                            <View className="w-[1px] h-8 bg-[#E6DDD6] mx-4" />

                            {/* Expenses */}
                            <View className="flex-1">
                                <Text className="text-xs text-[#8C827A] mb-1">Expenses</Text>
                                <Text className="text-base font-bold text-[#E76F51]">-$1510.44</Text>
                            </View>
                        </View>
                    </View>

                    {/* Recent Transactions Header */}
                    <Text className="text-base font-bold text-[#3B2820] mb-3">
                        Recent Transactions
                    </Text>

                    {/* Transactions List */}
                    <View className="flex flex-col gap-3 pb-12">
                        {transactions.map((item) => (
                            <View
                                key={item.id}
                                className="bg-white rounded-2xl p-4 flex-row items-center justify-between border border-[#F0EBE6]"
                            >
                                <View className="flex-row items-center gap-3">
                                    <View className="w-10 h-10 bg-[#FAF6F0] rounded-full items-center justify-center">
                                        <Text className="text-lg">{item.icon}</Text>
                                    </View>
                                    <View>
                                        <Text className="text-sm font-bold text-[#3B2820]">{item.title}</Text>
                                        <Text className="text-xs text-[#8C827A]">{item.category}</Text>
                                    </View>
                                </View>

                                <View className="flex-row items-center gap-3">
                                    <View className="items-end">
                                        <Text
                                            className={`text-sm font-bold ${item.isIncome ? 'text-[#2EC4B6]' : 'text-[#E76F51]'
                                                }`}
                                        >
                                            {item.amount}
                                        </Text>
                                        <Text className="text-[10px] text-[#A89F91]">{item.date}</Text>
                                    </View>

                                    {/* Divider & Delete Icon */}
                                    <View className="w-[1px] h-6 bg-[#E6DDD6] ml-1" />
                                    <Pressable className="p-1">
                                        <Text className="text-xs text-[#E76F51]">🗑️</Text>
                                    </Pressable>
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </SignedIn>
        </View>
    )
}