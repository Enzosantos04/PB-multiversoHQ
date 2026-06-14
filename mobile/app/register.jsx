import { router } from 'expo-router'
import { useState } from 'react'
import {
  Alert,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
  ScrollView,
} from 'react-native'
import { useAuth } from '../context/AuthContext'
import styles from '../styles/register.styles.jsx'

export default function RegisterScreen() {
  const { register, error } = useAuth()

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleRegister() {
    const success = await register(nome, email, password)

    if (success) {
      Alert.alert(
        'Sucesso',
        'Conta criada com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/login'),
          },
        ]
      )
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Text style={styles.title}>Multiverso HQ</Text>
        <Text style={styles.subtitle}>Crie sua conta</Text>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Nome Completo"
            placeholderTextColor="#6b6a82"
            value={nome}
            onChangeText={setNome}
            autoCapitalize="words"
          />

          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#6b6a82"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#6b6a82"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Pressable style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </Pressable>

          <Pressable style={styles.linkButton} onPress={() => router.back()}>
            <Text style={styles.linkText}>Já tem uma conta? Entre aqui</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  )
}
