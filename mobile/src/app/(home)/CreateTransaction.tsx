import useTransactions from '@/hooks/useTransactions';
import { useUser } from '@clerk/clerk-expo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View
} from 'react-native';

type TransactionType = 'expense' | 'income'

interface CategoryOption {
    id: string
    label: string
    icon: keyof typeof MaterialCommunityIcons.glyphMap
}

const CATEGORIES: CategoryOption[] = [
    { id: 'food', label: 'Food & Drinks', icon: 'silverware-fork-knife' },
    { id: 'shopping', label: 'Shopping', icon: 'cart-outline' },
    { id: 'transportation', label: 'Transportation', icon: 'car-outline' },
    { id: 'entertainment', label: 'Entertainment', icon: 'filmstrip' },
    { id: 'bills', label: 'Bills', icon: 'file-document-outline' },
    { id: 'income', label: 'Income', icon: 'cash-multiple' },
    { id: 'other', label: 'Other', icon: 'dots-horizontal' },
]

export default function NewTransactionScreen() {
    const [type, setType] = useState<TransactionType>('expense')
    const [amount, setAmount] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [selectedCategory, setSelectedCategory] = useState<string>('food')
    const { user } = useUser();
    const { createTransaction } = useTransactions(user?.id || '')

    const handleSave = () => {

        const payload = {
            user_id: user?.id || "ok",
            amount: parseFloat(amount) || 0,
            title,
            category: selectedCategory,
        }
        if (payload.user_id) {

            if (type == 'expense') {
                payload.amount *= -1;
            }
            createTransaction(payload)
        }
        // console.log('Saved Transaction:', payload)
        // Add your submit or navigation logic here

    }

    return (
        <View className="flex-1 bg-[#FAF6F0] dark:bg-[#121212]">
            {/* <StatusBar barStyle="default" /> */}

            {/* Top Header */}
            <View className="flex-row items-center justify-between px-5 py-4 border-b border-[#E6DDD6]/40 dark:border-[#2A2A2A]">
                <Pressable
                    onPress={() => router.canGoBack() && router.back()}
                    className="p-1 rounded-full active:opacity-60"
                >
                    <AntDesign name="arrow-left" size={24} color={'white'} className='px-2 rounded-lg dark:bg-[#b67953] bg-slate-600' />
                </Pressable>

                <Text className="text-lg font-semibold text-[#3B2820] dark:text-[#F0F0F0]">
                    New Transaction
                </Text>

                <Pressable
                    onPress={handleSave}
                    className="flex-row items-center gap-1 py-1 px-2 rounded-lg active:opacity-70"
                >
                    <Text className="text-base font-semibold text-[#8B5A3C] dark:text-[#D4A373]">
                        Save
                    </Text>
                    <Feather name="check" size={18} color="#8B5A3C" />
                </Pressable>
            </View>

            <ScrollView
                className="flex-1 px-4 pt-4"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                {/* Main Content Card */}
                <View className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-5 border border-[#F0EBE6] dark:border-[#2C2C2C] shadow-sm">
                    {/* Expense / Income Toggle */}
                    <View className="flex-row items-center gap-3 mb-6">
                        <Pressable
                            onPress={() => setType('expense')}
                            className={`flex-1 flex-row items-center justify-center gap-2 py-3.5 rounded-full border ${type === 'expense'
                                ? 'bg-[#8B5A3C] border-[#8B5A3C] dark:bg-[#A06A48] dark:border-[#A06A48]'
                                : 'bg-white border-[#E6DDD6] dark:bg-[#252525] dark:border-[#333]'
                                }`}
                        >
                            <View
                                className={`w-6 h-6 rounded-full items-center justify-center ${type === 'expense' ? 'bg-white/20' : 'bg-[#8B5A3C]/10 dark:bg-[#A06A48]/20'
                                    }`}
                            >
                                <Feather
                                    name="arrow-down-left"
                                    size={16}
                                    color={type === 'expense' ? '#FFFFFF' : '#8B5A3C'}
                                />
                            </View>
                            <Text
                                className={`font-semibold text-sm ${type === 'expense' ? 'text-white' : 'text-[#3B2820] dark:text-[#D0D0D0]'
                                    }`}
                            >
                                Expense
                            </Text>
                        </Pressable>

                        <Pressable
                            onPress={() => setType('income')}
                            className={`flex-1 flex-row items-center justify-center gap-2 py-3.5 rounded-full border ${type === 'income'
                                ? 'bg-[#2EC4B6] border-[#2EC4B6] dark:bg-[#2AA99D] dark:border-[#2AA99D]'
                                : 'bg-white border-[#E6DDD6] dark:bg-[#252525] dark:border-[#333]'
                                }`}
                        >
                            <View
                                className={`w-6 h-6 rounded-full items-center justify-center ${type === 'income' ? 'bg-white/20' : 'bg-[#2EC4B6]/10 dark:bg-[#2EC4B6]/20'
                                    }`}
                            >
                                <Feather
                                    name="arrow-up-right"
                                    size={16}
                                    color={type === 'income' ? '#FFFFFF' : '#2EC4B6'}
                                />
                            </View>
                            <Text
                                className={`font-semibold text-sm ${type === 'income' ? 'text-white' : 'text-[#3B2820] dark:text-[#D0D0D0]'
                                    }`}
                            >
                                Income
                            </Text>
                        </Pressable>
                    </View>

                    {/* Amount Display & Input */}
                    <View className="flex-row items-center border-b border-[#F0EBE6] dark:border-[#2C2C2C] pb-4 mb-6">
                        <Text className="text-3xl font-bold text-[#8B5A3C] dark:text-[#D4A373] mr-2">
                            $
                        </Text>
                        <TextInput
                            value={amount}
                            onChangeText={setAmount}
                            placeholder="0.00"
                            placeholderTextColor="#A89F91"
                            keyboardType="decimal-pad"
                            className="text-3xl font-bold text-[#3B2820] dark:text-[#FFFFFF] flex-1 p-0"
                        />
                    </View>

                    {/* Title Input */}
                    <View className="flex-row items-center border border-[#E6DDD6] dark:border-[#333333] rounded-2xl px-4 py-3.5 mb-6 bg-[#FAF6F0]/30 dark:bg-[#252525]">
                        <Feather name="edit-3" size={18} color="#8C827A" className="mr-3" />
                        <TextInput
                            value={title}
                            onChangeText={setTitle}
                            placeholder="Transaction Title"
                            placeholderTextColor="#8C827A"
                            className="flex-1 text-base text-[#3B2820] dark:text-[#FFFFFF] p-0"
                        />
                    </View>

                    {/* Category Section */}
                    <View className="mb-2">
                        <View className="flex-row items-center gap-2 mb-4">
                            <Feather name="tag" size={18} color="#8B5A3C" />
                            <Text className="text-base font-bold text-[#3B2820] dark:text-[#E0E0E0]">
                                Category
                            </Text>
                        </View>

                        {/* Category Chips Container */}
                        <View className="flex-row flex-wrap gap-2.5">
                            {CATEGORIES.map((cat) => {
                                const isSelected = selectedCategory === cat.id
                                return (
                                    <Pressable
                                        key={cat.id}
                                        onPress={() => setSelectedCategory(cat.id)}
                                        className={`flex-row items-center gap-2 px-4 py-2.5 rounded-full border ${isSelected
                                            ? 'border-[#8B5A3C] bg-[#8B5A3C]/10 dark:border-[#D4A373] dark:bg-[#D4A373]/20'
                                            : 'border-[#E6DDD6] bg-white dark:border-[#333333] dark:bg-[#252525]'
                                            }`}
                                    >
                                        <MaterialCommunityIcons
                                            name={cat.icon}
                                            size={18}
                                            color={isSelected ? '#8B5A3C' : '#8C827A'}
                                        />
                                        <Text
                                            className={`text-sm font-medium ${isSelected
                                                ? 'text-[#8B5A3C] dark:text-[#D4A373] font-semibold'
                                                : 'text-[#3B2820] dark:text-[#C0C0C0]'
                                                }`}
                                        >
                                            {cat.label}
                                        </Text>
                                    </Pressable>
                                )
                            })}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}