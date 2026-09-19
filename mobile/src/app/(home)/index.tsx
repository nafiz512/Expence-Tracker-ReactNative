import { SignOutButton } from '@/components/sign-out-button'
import { Text } from '@/components/ui/text'
import useTransactions from '@/hooks/useTransactions'
import { SignedIn, SignedOut, useSession, useUser } from '@clerk/clerk-expo'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { Link, router } from 'expo-router'
import { useEffect } from 'react'
import { Alert, Image, Pressable, ScrollView, View } from 'react-native'
import { formatDate } from '../../../lib/utils.js'

type transactionType = {
    amount: number;
    title: string;
    created_at: string;
    category: string;
    id: number
}
type TransactionProps = transactionType[]

export default function Page() {
    const { user } = useUser()
    const { session } = useSession()
    const { loading, summary, transactions, loadData, deleteTransaction } = useTransactions("u2i4s5r")
    useEffect(() => {
        loadData();
    }, [])
    // console.log(transactions);

    const handleDelete = (id: number) => {
        Alert.alert(
            "Delete",
            "Are you sure, you want to delete this transaction.",
            [
                { text: "Cancel" },
                { text: "OK", onPress: () => deleteTransaction(id) }
            ]
        )
    }
    if (loading) {
        return (
            <View className="flex-1 bg-[#FAF6F0] dark:bg-[#121212] px-5 pt-14">
                {/* Header Skeleton */}
                <View className="flex-row items-center justify-between mb-6">
                    <View className="flex-row items-center gap-3">
                        <View className="w-12 h-12 bg-[#E6DDD6] dark:bg-[#2C2C2C] rounded-full animate-pulse" />
                        <View className="gap-2">
                            <View className="w-16 h-3 bg-[#E6DDD6] dark:bg-[#2C2C2C] rounded animate-pulse" />
                            <View className="w-24 h-4 bg-[#E6DDD6] dark:bg-[#2C2C2C] rounded animate-pulse" />
                        </View>
                    </View>
                    <View className="flex-row items-center gap-2">
                        <View className="w-16 h-9 bg-[#E6DDD6] dark:bg-[#2C2C2C] rounded-full animate-pulse" />
                        <View className="w-9 h-9 bg-[#E6DDD6] dark:bg-[#2C2C2C] rounded-full animate-pulse" />
                    </View>
                </View>

                {/* Balance Card Skeleton */}
                <View className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 border border-[#F0EBE6] dark:border-[#2C2C2C] mb-6 shadow-sm">
                    <View className="w-24 h-3 bg-[#E6DDD6] dark:bg-[#2C2C2C] rounded mb-2 animate-pulse" />
                    <View className="w-36 h-8 bg-[#E6DDD6] dark:bg-[#2C2C2C] rounded mb-6 animate-pulse" />
                    <View className="flex-row justify-between items-center pt-2">
                        <View className="flex-1 gap-1">
                            <View className="w-12 h-3 bg-[#E6DDD6] dark:bg-[#2C2C2C] rounded animate-pulse" />
                            <View className="w-20 h-5 bg-[#E6DDD6] dark:bg-[#2C2C2C] rounded animate-pulse" />
                        </View>
                        <View className="w-[1px] h-8 bg-[#E6DDD6] dark:bg-[#2C2C2C] mx-4" />
                        <View className="flex-1 gap-1">
                            <View className="w-16 h-3 bg-[#E6DDD6] dark:bg-[#2C2C2C] rounded animate-pulse" />
                            <View className="w-20 h-5 bg-[#E6DDD6] dark:bg-[#2C2C2C] rounded animate-pulse" />
                        </View>
                    </View>
                </View>

                {/* Transactions Section Header Skeleton */}
                <View className="w-40 h-5 bg-[#E6DDD6] dark:bg-[#2C2C2C] rounded mb-4 animate-pulse" />

                {/* Transaction List Skeleton Items */}
                <View className="gap-3">
                    {[1, 2, 3, 4].map((item) => (
                        <View
                            key={item}
                            className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-4 flex-row items-center justify-between border border-[#F0EBE6] dark:border-[#2C2C2C]"
                        >
                            <View className="flex-row items-center gap-3">
                                <View className="w-10 h-10 bg-[#E6DDD6] dark:bg-[#2C2C2C] rounded-full animate-pulse" />
                                <View className="gap-2">
                                    <View className="w-28 h-4 bg-[#E6DDD6] dark:bg-[#2C2C2C] rounded animate-pulse" />
                                    <View className="w-16 h-3 bg-[#E6DDD6] dark:bg-[#2C2C2C] rounded animate-pulse" />
                                </View>
                            </View>
                            <View className="gap-2 items-end">
                                <View className="w-16 h-4 bg-[#E6DDD6] dark:bg-[#2C2C2C] rounded animate-pulse" />
                                <View className="w-12 h-3 bg-[#E6DDD6] dark:bg-[#2C2C2C] rounded animate-pulse" />
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        )
    }
    return (
        <View className="flex-1 bg-[#FAF6F0] dark:bg-[#121212] rounded-lg">
            <SignedOut>
                <View className="flex-1 justify-center items-center px-6">
                    <Text className="text-3xl font-bold text-[#3B2820] dark:text-[#E0E0E0] mb-8">Welcome!</Text>

                    <View className="w-full space-y-4">
                        <Link href="/(auth)/sign-in" asChild>
                            <Pressable className="w-full bg-[#8B5A3C] dark:bg-[#A06A48] rounded-2xl py-4 items-center">
                                <Text className="text-white font-semibold text-base">Sign In</Text>
                            </Pressable>
                        </Link>
                        <Link href="/(auth)/sign-up" asChild>
                            <Pressable className="w-full border border-[#8B5A3C] dark:border-[#A06A48] rounded-2xl py-4 items-center">
                                <Text className="text-[#8B5A3C] dark:text-[#D4A373] font-semibold text-base">Sign Up</Text>
                            </Pressable>
                        </Link>
                    </View>
                </View>
            </SignedOut>

            <SignedIn>
                <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
                    {/* Header */}
                    <View className="flex-row items-center justify-between mb-6 border-b border-[#E6DDD6]/40 dark:border-[#2A2A2A]">
                        <View className="flex-row items-center gap-3">
                            <Image
                                source={require('../../../assets/images/logo.png')}
                                className="w-12 h-12 rounded-full"
                                resizeMode="contain"
                            />
                            <View>
                                <Text className="text-xs text-[#8C827A] dark:text-[#A0A0A0]">Welcome...</Text>

                                <Text className="text-base font-bold text-[#3B2820] dark:text-[#E0E0E0]">
                                    {user?.username || user?.firstName || user?.emailAddresses[0]?.emailAddress?.split('@')[0] || 'User'}
                                </Text>
                            </View>
                        </View>

                        <View className="flex-row items-center gap-2">
                            <Pressable onPress={() => router.push('/(home)/CreateTransaction')} className="bg-[#8B5A3C] dark:bg-[#A06A48] flex-row items-center px-4 py-2.5 rounded-full">
                                <Text className="text-white font-semibold text-sm mr-1">+</Text>
                                <Text className="text-white font-semibold text-sm">Add</Text>
                            </Pressable>

                            {/* Sign Out Button Wrapper */}
                            <View className="bg-black dark:bg-[#252525] p-2.5 rounded-full border border-[#E6DDD6] dark:border-[#333333]">
                                <SignOutButton />
                            </View>
                        </View>
                    </View>

                    {/* Balance Card */}
                    <View className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 shadow-sm border border-[#F0EBE6] dark:border-[#2C2C2C] mb-6">
                        <Text className="text-xs text-[#8C827A] dark:text-[#A0A0A0] mb-1 font-medium">Total Balance</Text>
                        <Text className="text-3xl font-extrabold text-[#3B2820] dark:text-[#F0F0F0] mb-6">${summary.balance}</Text>

                        <View className="flex-row justify-between items-center pt-2">
                            {/* Income */}
                            <View className="flex-1">
                                <Text className="text-xs text-[#8C827A] dark:text-[#A0A0A0] mb-1">Income</Text>
                                <Text className="text-base font-bold text-[#2EC4B6] dark:text-[#38E0CF]">+${summary.income}</Text>
                            </View>

                            {/* Vertical Divider */}
                            <View className="w-[1px] h-8 bg-[#E6DDD6] dark:bg-[#333333] mx-4" />

                            {/* Expenses */}
                            <View className="flex-1">
                                <Text className="text-xs text-[#8C827A] dark:text-[#A0A0A0] mb-1">Expenses</Text>
                                <Text className="text-base font-bold text-[#E76F51] dark:text-[#FF8A65]">-${summary.expence}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Recent Transactions Header */}
                    <Text className="text-base font-bold text-[#3B2820] dark:text-[#E0E0E0] mb-3">
                        Recent Transactions
                    </Text>

                    {/* Transactions List */}
                    <View className="flex flex-col gap-3 pb-12">
                        {(transactions as TransactionProps).map((item, index) => (
                            <View
                                key={index}
                                className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-4 flex-row items-center justify-between border border-[#F0EBE6] dark:border-[#2C2C2C]"
                            >
                                <View className="flex-row items-center gap-3">
                                    <View className="w-10 h-10 bg-[#FAF6F0] dark:bg-[#282828] rounded-full items-center justify-center">
                                        {
                                            item.amount > 0 ? <MaterialCommunityIcons name="cash-plus" size={24} color="#2EC4B6" /> : <MaterialCommunityIcons name="cash-minus" size={24} color="#E76F51" />
                                        }

                                    </View>
                                    <View>
                                        <Text className="text-sm font-bold text-[#3B2820] dark:text-[#E0E0E0]">{item.title}</Text>
                                        <Text className="text-xs text-[#8C827A] dark:text-[#A0A0A0]">{item.category}</Text>
                                    </View>
                                </View>

                                <View className="flex-row items-center gap-3">
                                    <View className="items-end">
                                        <Text
                                            className={`text-sm font-bold ${item.amount > 0 ? 'text-[#2EC4B6] dark:text-[#38E0CF]' : 'text-[#E76F51] dark:text-[#FF8A65]'
                                                }`}
                                        >
                                            {item.amount}
                                        </Text>
                                        <Text className="text-[10px] text-[#A89F91] dark:text-[#808080]">{formatDate(item.created_at)}</Text>
                                    </View>

                                    {/* Divider & Delete Icon */}
                                    <View className="w-[1px] h-6 bg-[#E6DDD6] dark:bg-[#333333] ml-1" />
                                    <Pressable onPress={() => handleDelete(item.id)} className="p-1">
                                        <Text className="text-xl">🗑️</Text>
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