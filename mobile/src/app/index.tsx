import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View >
      <Text className="font-bold dark:text-white text-2xl">Ok thats fine</Text>
      {/* <Link href={'/(home)'}><Text className="dark:text-white text-black"> Home</Text></Link> */}
    </View>
  );
}
