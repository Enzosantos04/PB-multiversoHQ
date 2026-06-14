import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import { createContext, useContext, useEffect, useReducer } from "react";
import { Platform } from "react-native";

const AuthContext = createContext(null);

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case "RESTORE_SESSION":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
      };

    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };

    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };

    case "LOGOUT":
      return {
        ...initialState,
        isLoading: false,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    async function loadSession() {
      try {
        const storedUser = await AsyncStorage.getItem("@MultiversoHQ:user");

        dispatch({
          type: "RESTORE_SESSION",
          payload: storedUser ? JSON.parse(storedUser) : null,
        });
      } catch {
        dispatch({
          type: "RESTORE_SESSION",
          payload: null,
        });
      }
    }

    loadSession();
  }, []);

  async function login(email, password) {
    dispatch({ type: "CLEAR_ERROR" });

    if (!email || !password) {
      dispatch({
        type: "SET_ERROR",
        payload: "Informe e-mail e senha.",
      });
      return false;
    }

    const fakeUser = {
      id: Date.now(),
      nome: "Usuário MultiversoHQ",
      email,
      plano: null,
    };

    await AsyncStorage.setItem("@MultiversoHQ:user", JSON.stringify(fakeUser));
    await AsyncStorage.setItem(
      "@MultiversoHQ:biometricUser",
      JSON.stringify(fakeUser)
    );

    dispatch({
      type: "LOGIN",
      payload: fakeUser,
    });

    return true;
  }

  async function register(nome, email, password) {
    dispatch({ type: "CLEAR_ERROR" });

    if (!nome || !email || !password) {
      dispatch({
        type: "SET_ERROR",
        payload: "Preencha todos os campos.",
      });
      return false;
    }

    const newUser = {
      id: Date.now(),
      nome,
      email,
      plano: null,
    };

    await AsyncStorage.setItem("@MultiversoHQ:user", JSON.stringify(newUser));
    await AsyncStorage.setItem(
      "@MultiversoHQ:biometricUser",
      JSON.stringify(newUser)
    );

    dispatch({
      type: "LOGIN",
      payload: newUser,
    });

    return true;
  }

  async function updateUser(updates) {
    if (!state.user) return false;

    const updatedUser = {
      ...state.user,
      ...updates,
    };

    await AsyncStorage.setItem(
      "@MultiversoHQ:user",
      JSON.stringify(updatedUser)
    );

    await AsyncStorage.setItem(
      "@MultiversoHQ:biometricUser",
      JSON.stringify(updatedUser)
    );

    dispatch({
      type: "UPDATE_USER",
      payload: updatedUser,
    });

    return true;
  }

  async function loginWithBiometrics() {
    dispatch({ type: "CLEAR_ERROR" });

    const hasHardware = await LocalAuthentication.hasHardwareAsync();

    if (!hasHardware) {
      dispatch({
        type: "SET_ERROR",
        payload: "Este dispositivo não possui biometria disponível.",
      });
      return false;
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!isEnrolled) {
      dispatch({
        type: "SET_ERROR",
        payload: "Nenhuma biometria foi cadastrada no dispositivo.",
      });
      return false;
    }

    const promptMessage =
      Platform.OS === "ios"
        ? "Autenticar com Face ID ou Touch ID"
        : "Autenticar com biometria";

    const fallbackLabel =
      Platform.OS === "ios" ? "Usar senha do aparelho" : "Usar PIN";

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage,
      fallbackLabel,
      cancelLabel: "Cancelar",
    });

    if (!result.success) {
      dispatch({
        type: "SET_ERROR",
        payload: "Autenticação biométrica cancelada ou não autorizada.",
      });
      return false;
    }

    const biometricUser = await AsyncStorage.getItem(
      "@MultiversoHQ:biometricUser"
    );

    if (!biometricUser) {
      dispatch({
        type: "SET_ERROR",
        payload:
          "Faça login com e-mail e senha primeiro para ativar a biometria.",
      });
      return false;
    }

    const user = JSON.parse(biometricUser);

    await AsyncStorage.setItem("@MultiversoHQ:user", JSON.stringify(user));

    dispatch({
      type: "LOGIN",
      payload: user,
    });

    return true;
  }

  async function logout() {
    await AsyncStorage.removeItem("@MultiversoHQ:user");
    dispatch({ type: "LOGOUT" });
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        updateUser,
        loginWithBiometrics,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}