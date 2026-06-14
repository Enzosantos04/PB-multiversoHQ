import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useState } from 'react'
import {
  Alert,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native'
import { useAuth } from '../context/AuthContext'
import styles from '../styles/login.styles.jsx'

export default function LoginScreen() {
  const { login, loginWithBiometrics, error } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin() {
    const success = await login(email, password)

    if (success) {
      router.replace('/(tabs)/home')
    }
  }

  async function handleBiometricLogin() {
    const success = await loginWithBiometrics()

    if (success) {
      router.replace('/(tabs)/home')
    } else {
      Alert.alert('Biometria', 'Não foi possível autenticar com biometria.')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Multiverso HQ</Text>
      <Text style={styles.subtitle}>Acesse sua conta</Text>

      <View style={styles.card}>
        <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#6b6a82"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete={Platform.OS === 'ios' ? 'email' : 'email'}
        textContentType={Platform.OS === 'ios' ? 'emailAddress' : 'none'}
        importantForAutofill={Platform.OS === 'android' ? 'yes' : 'auto'}
/>

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#6b6a82"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete={Platform.OS === 'ios' ? 'password' : 'password'}
          textContentType={Platform.OS === 'ios' ? 'password' : 'none'}
          importantForAutofill={Platform.OS === 'android' ? 'yes' : 'auto'}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </Pressable>

        <Pressable style={styles.biometricButton} onPress={handleBiometricLogin}>
          <Ionicons name="finger-print-outline" size={20} color="#ef4444" />
          <Text style={styles.biometricText}>
            {Platform.OS === 'ios'
              ? 'Entrar com Face ID / Touch ID'
              : 'Entrar com biometria'}
          </Text>
        </Pressable>

        <Text style={styles.hint}>
          Faça login uma vez com e-mail e senha para ativar o acesso por biometria.
        </Text>
      </View>
    </View>
  )
}
