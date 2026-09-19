import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { router } from 'expo-router'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

const NoTransactionsUI = () => {
    return (
        <View className="bg-white dark:bg-[#1E1E1E] border border-[#F0EBE6] dark:border-[#2C2C2C] rounded-3xl p-8 items-center justify-center my-2 shadow-sm">
            {/* Receipt Icon Container */}
            <View className="mb-4">
                <MaterialCommunityIcons name="text-box-outline" size={56} color="#8B5A3C" />
            </View>

            {/* Title */}
            <Text className="text-lg font-bold text-[#3B2820] dark:text-[#E0E0E0] mb-2 text-center">
                No transactions yet
            </Text>

            {/* Subtitle */}
            <Text className="text-xs text-[#8C827A] dark:text-[#A0A0A0] text-center mb-6 leading-5 px-4">
                Start tracking your finances by adding your first transaction
            </Text>

            {/* Add Transaction Button */}
            <Pressable
                onPress={() => router.push('/(home)/CreateTransaction')}
                className="bg-[#8B5A3C] dark:bg-[#A06A48] flex-row items-center px-6 py-3 rounded-full"
            >
                <MaterialCommunityIcons name="plus-circle-outline" size={18} color="#FFFFFF" className="mr-2" />
                <Text className="text-white font-semibold text-sm ml-2">Add Transaction</Text>
            </Pressable>
        </View>
    )
}

export default NoTransactionsUI