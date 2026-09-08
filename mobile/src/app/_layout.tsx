import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';
import "../../global.css"
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { ClerkProvider } from '@clerk/expo'
// import { tokenCache } from '@clerk/expo/token-cache'

import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  return <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
          }
        }}>
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} /> */}

      </Stack>
    </ThemeProvider>
  </ClerkProvider>;
}