import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useState } from 'react'
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { useAuth } from '../context/AuthContext'

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 40 : 60,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#9896b0',
    textAlign: 'center',
    marginBottom: 32,
  },
  card: {
    backgroundColor: '#12121a',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1c1c2e',

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  input: {
  backgroundColor: '#0a0a0f',
  borderWidth: 1,
  borderColor: '#1c1c2e',
  borderRadius: 10,
  color: '#e8e6f0',
  fontSize: 15,
  marginBottom: 12,
  height: 52,
  paddingHorizontal: 14,
  paddingVertical: 0,
  textAlignVertical: 'center',

  ...Platform.select({
    ios: {
      paddingVertical: 14,
      paddingHorizontal: 14,
      height: 50,
    },
    android: {
      paddingVertical: 10,
      paddingHorizontal: 14,
      height: 52,
      textAlignVertical: 'center',
    },
  }),
  },
  error: {
    color: '#f87171',
    textAlign: 'center',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#dc2626',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  biometricButton: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ef4444',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    flexDirection: 'row',
    gap: 8,
  },
  biometricText: {
    color: '#ef4444',
    fontWeight: '700',
    fontSize: 15,
  },
  hint: {
    color: '#6b6a82',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 18,
  },
})