import { Stack } from 'expo-router'
import { ComicsProvider } from '../context/ComicsContext'

export default function RootLayout() {
  return (
    <ComicsProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ComicsProvider>
  )
}