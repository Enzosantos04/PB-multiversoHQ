import AsyncStorage from '@react-native-async-storage/async-storage'
import * as LocalAuthentication from 'expo-local-authentication'
import { createContext, useContext, useEffect, useReducer } from 'react'
import { Platform } from 'react-native'

const AuthContext = createContext()

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
}

function authReducer(state, action) {
  switch (action.type) {
    case 'RESTORE_SESSION':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
      }

    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      }

    case 'LOGOUT':
      return {
        ...initialState,
        isLoading: false,
      }

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      }

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    async function loadSession() {
      try {
        const storedUser = await AsyncStorage.getItem('@MultiversoHQ:user')

        if (storedUser) {
          dispatch({
            type: 'RESTORE_SESSION',
            payload: JSON.parse(storedUser),
          })
        } else {
          dispatch({
            type: 'RESTORE_SESSION',
            payload: null,
          })
        }
      } catch {
        dispatch({
          type: 'RESTORE_SESSION',
          payload: null,
        })
      }
    }

    loadSession()
  }, [])

  async function login(email, password) {
    dispatch({ type: 'CLEAR_ERROR' })

    if (!email || !password) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Informe e-mail e senha.',
      })
      return false
    }

    const fakeUser = {
      id: 1,
      nome: 'Usuário MultiversoHQ',
      email,
    }

    await AsyncStorage.setItem('@MultiversoHQ:user', JSON.stringify(fakeUser))

    dispatch({
      type: 'LOGIN',
      payload: fakeUser,
    })

    return true
  }

  async function loginWithBiometrics() {
    dispatch({ type: 'CLEAR_ERROR' })

    const hasHardware = await LocalAuthentication.hasHardwareAsync()

    if (!hasHardware) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Este dispositivo não possui biometria disponível.',
      })
      return false
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync()

    if (!isEnrolled) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Nenhuma biometria foi cadastrada no dispositivo.',
      })
      return false
    }

    const promptMessage =
      Platform.OS === 'ios'
        ? 'Autenticar com Face ID ou Touch ID'
        : 'Autenticar com biometria'

    const fallbackLabel =
      Platform.OS === 'ios'
        ? 'Usar senha do aparelho'
        : 'Usar PIN'

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage,
      fallbackLabel,
      cancelLabel: 'Cancelar',
    })

    if (!result.success) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Autenticação biométrica cancelada ou não autorizada.',
      })
      return false
    }

    const storedUser = await AsyncStorage.getItem('@MultiversoHQ:user')

    if (!storedUser) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Faça login com e-mail e senha primeiro para ativar a biometria.',
      })
      return false
    }

    dispatch({
      type: 'LOGIN',
      payload: JSON.parse(storedUser),
    })

    return true
  }

  async function logout() {
    await AsyncStorage.removeItem('@MultiversoHQ:user')
    dispatch({ type: 'LOGOUT' })
  }

  async function register(nome, email, password) {
    dispatch({ type: 'CLEAR_ERROR' })

    if (!nome || !email || !password) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Preencha todos os campos.',
      })
      return false
    }

    // Simulando persistência do novo usuário
    const newUser = {
      id: Math.floor(Math.random() * 1000),
      nome,
      email,
    }

    await AsyncStorage.setItem('@MultiversoHQ:user', JSON.stringify(newUser))
    return true
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        loginWithBiometrics,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}