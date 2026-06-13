import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import { ComicsProvider } from "../context/ComicsContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <ComicsProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </ComicsProvider>
    </AuthProvider>
  );
}