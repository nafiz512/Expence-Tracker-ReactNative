import { useState } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native'

type summaryProps = {
    balance: number;
    income: number;
    expence: number;
}
type props = {
    summary: summaryProps;
    loadData: () => void;
}

const Summary = ({ summary, loadData }: props) => {
    const [refresh, setRefresh] = useState(false);
    const handleRefresh = async () => {
        setRefresh(true);
        await loadData()
        setRefresh(false)
    }
    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refresh} onRefresh={handleRefresh}></RefreshControl>} className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 shadow-sm border border-[#F0EBE6] dark:border-[#2C2C2C] mb-6">
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
                    <Text className="text-base font-bold text-[#E76F51] dark:text-[#FF8A65]">-${Math.abs(summary.expence)}</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default Summary