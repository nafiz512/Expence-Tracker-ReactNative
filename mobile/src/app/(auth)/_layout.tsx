import { useUser } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

export default function AuthRoutesLayout() {
    const { isSignedIn } = useUser();
    if (isSignedIn) return <Redirect href={"/(home)"} />;
    return <Stack screenOptions={{ headerShown: false }} />
}