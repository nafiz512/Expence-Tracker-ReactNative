import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { Alert, Pressable, Text, View } from 'react-native'
import { formatDate } from '../../lib/utils.js'

type transactionType = {
    amount: number;
    title: string;
    created_at: string;
    category: string;
    id: number
}

type TransitionCardProps = {
    item: transactionType;
    deleteTransaction: (id: number) => void;
}

const TransitionCard = ({ item, deleteTransaction }: TransitionCardProps) => {
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
    return (
        <View
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
    )
}

export default TransitionCard