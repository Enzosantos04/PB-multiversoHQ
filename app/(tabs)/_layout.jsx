import { Drawer } from 'expo-router/drawer'
import { Ionicons } from '@expo/vector-icons'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerStyle: { backgroundColor: '#0a0a0f' },
          headerTintColor: '#ef4444',
          headerTitleStyle: { fontWeight: '700' },
          drawerStyle: { backgroundColor: '#12121a' },
          drawerActiveTintColor: '#ef4444',
          drawerInactiveTintColor: '#9896b0',
          drawerActiveBackgroundColor: 'rgba(239, 68, 68, 0.1)',
        }}
      >
        <Drawer.Screen
          name="home"
          options={{
            title: 'Início',
            drawerIcon: ({ color }) => <Ionicons name="home-outline" size={20} color={color} />,
          }}
        />
        <Drawer.Screen
          name="catalog"
          options={{
            title: 'Catálogo',
            drawerIcon: ({ color }) => <Ionicons name="grid-outline" size={20} color={color} />,
          }}
        />
        <Drawer.Screen
          name="cart"
          options={{
            title: 'Carrinho',
            drawerIcon: ({ color }) => <Ionicons name="cart-outline" size={20} color={color} />,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  )
}