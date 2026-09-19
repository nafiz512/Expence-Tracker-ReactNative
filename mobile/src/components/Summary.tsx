import { View, Text } from 'react-native'
import React from 'react'

type summaryProps = {
    balance: number;
    income: number;
    expence: number;
}

const Summary = ({ summary }: { summary: summaryProps }) => {
    return (
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
    )
}

export default Summary