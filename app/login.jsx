import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { useComics } from '../context/ComicsContext'

export default function LoginScreen() {
  const router = useRouter()
  const { login } = useComics()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  const handleLogin = () => {
    const resultado = login(email, senha)
    if (resultado.success) {
      router.replace('/(tabs)/home')
    } else {
      setErro(resultado.message)
    }
  }

  const entrarComoVisitante = () => {
    router.replace('/(tabs)/home')
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Glow top */}
      <View style={styles.glowTop} />
      {/* Glow bottom */}
      <View style={styles.glowBottom} />

      <View style={styles.content}>
        <Text style={styles.logo}>🦸</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>MULTIVERSO HQ</Text>
        </View>

        <Text style={styles.title}>Sua loja de{'\n'}quadrinhos</Text>
        <Text style={styles.subtitle}>Faça login para acessar seu universo</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#6b6a82"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#6b6a82"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        {erro ? <Text style={styles.erro}>{erro}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSecondary} onPress={entrarComoVisitante}>
          <Text style={styles.buttonSecondaryText}>Entrar como visitante</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
  },
  glowTop: {
    position: 'absolute',
    top: '10%',
    left: '10%',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
  },
  glowBottom: {
    position: 'absolute',
    bottom: '10%',
    right: '10%',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(239, 68, 68, 0.06)',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    fontSize: 56,
    marginBottom: 20,
  },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    borderRadius: 20,
    marginBottom: 20,
  },
  badgeText: {
    color: '#dc2626',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 14,
    color: '#9896b0',
    marginBottom: 36,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#12121a',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1c1c2e',
    paddingHorizontal: 16,
    color: '#e8e6f0',
    marginBottom: 12,
    fontSize: 15,
  },
  erro: {
    color: '#f87171',
    fontSize: 13,
    marginBottom: 12,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    backgroundColor: '#dc2626',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonSecondary: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  buttonSecondaryText: {
    color: '#dc2626',
    fontSize: 15,
    fontWeight: '600',
  },
})