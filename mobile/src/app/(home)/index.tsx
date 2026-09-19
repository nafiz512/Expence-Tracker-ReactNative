import HeaderLoadingSkeletion from '@/components/HeaderLoadingSkeletion'
import { SignOutButton } from '@/components/sign-out-button'
import Summary from '@/components/Summary'
import { Text } from '@/components/ui/text'
import useTransactions from '@/hooks/useTransactions'
import { SignedIn, useUser } from '@clerk/clerk-expo'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { FlatList, Image, Pressable, RefreshControl, View } from 'react-native'
import NoTransactionsUI from '@/components/NoTransactionsUI'
import TransitionCard from '@/components/TransitionCard'

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
    const { loading, summary, transactions, loadData, deleteTransaction } = useTransactions(user?.id ?? '');

    useEffect(() => {
        loadData();
    }, [])
    if (loading) {
        return (
            <HeaderLoadingSkeletion></HeaderLoadingSkeletion>
        )
    }
    return (
        <View className="flex-1 bg-[#FAF6F0] dark:bg-[#121212] rounded-lg">
            <SignedIn>
                <View className="flex-1 px-5 pt-6">
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

                    {/* summary section */}
                    <Summary summary={summary} loadData={loadData}></Summary>

                    {/* Recent Transactions Header */}
                    <Text className="text-base font-bold text-[#3B2820] dark:text-[#E0E0E0] mb-3">
                        Recent Transactions
                    </Text>

                    {/* Transactions List */}
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={transactions as TransactionProps}
                        keyExtractor={(_, index) => index.toString()}
                        contentContainerStyle={{ paddingBottom: 48 }}
                        ItemSeparatorComponent={() => <View className="h-3" />}
                        ListEmptyComponent={<NoTransactionsUI></NoTransactionsUI>}
                        renderItem={({ item }) => (<TransitionCard item={item} deleteTransaction={deleteTransaction}></TransitionCard>
                        )}
                    />
                </View>
            </SignedIn>
        </View>
    )
}