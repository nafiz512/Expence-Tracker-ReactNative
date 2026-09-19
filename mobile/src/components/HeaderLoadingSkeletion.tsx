import { View, Text } from 'react-native'
import React from 'react'

const HeaderLoadingSkeletion = () => {
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

export default HeaderLoadingSkeletion