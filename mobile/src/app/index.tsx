import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View >
      <Text className="text-white text-2xl">Ok thats fine</Text>
      <Link href={'/about'}>
        <Text style={{ color: 'white' }}>About</Text>
      </Link>
    </View>
  );
}
