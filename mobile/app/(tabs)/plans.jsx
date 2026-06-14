import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Alert, ScrollView, Platform, Text, TouchableOpacity, View } from "react-native";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useAuth } from "../../context/AuthContext";
import { useComics } from "../../context/ComicsContext";
import styles from "../../styles/plans.styles.jsx";

const PLANS = [
  {
    id: "marvel",
    nome: "Marvel Fan",
    preco: "R$ 45,00/mês",
    desc: "Aluguel grátis para todos os quadrinhos da Marvel.",
    features: ["Acesso antecipado", "Selos exclusivos", "Frete grátis"],
  },
  {
    id: "dc",
    nome: "DC Enthusiast",
    preco: "R$ 45,00/mês",
    desc: "Aluguel grátis para todos os quadrinhos da DC Comics.",
    features: ["Conteúdo bônus", "Suporte prioritário", "Frete grátis"],
  },
  {
    id: "superhero",
    nome: "Multiverso Hero",
    preco: "R$ 85,00/mês",
    desc: "O plano definitivo. Aluguel grátis para TODO o catálogo.",
    features: [
      "Tudo dos planos anteriores",
      "Frete grátis",
      "Convite para eventos",
    ],
  },
];

export default function PlansScreen() {
  const router = useRouter();

  const { usuarioAtual, setPlanoUsuario } = useComics();
  const { isAuthenticated, user } = useAuth();

  const planoAtual = usuarioAtual?.plano || user?.plano || null;

  async function confirmarAssinatura(plan) {
  const success = await setPlanoUsuario(plan.id);

   if (success) {
    if (Platform.OS === "web") {
      window.alert(`Agora você é um ${plan.nome}! Aproveite seus benefícios.`);
    } else {
      Alert.alert(
        "Sucesso!",
        `Agora você é um ${plan.nome}! Aproveite seus benefícios.`
      );
    }
  } else {
    if (Platform.OS === "web") {
      window.alert("Não foi possível assinar o plano. Faça login novamente.");
    } else {
      Alert.alert(
        "Erro",
        "Não foi possível assinar o plano. Faça login novamente."
      );
    }
  }
}

    function handleSubscribe(plan) {
     if (!isAuthenticated || !user) {
       if (Platform.OS === "web") {
      window.alert("Faça login ou cadastre-se para assinar um plano.");
    } else {
      Alert.alert(
        "Login necessário",
        "Faça login ou cadastre-se para assinar um plano."
      );
    }

    router.replace("/login");
    return;
  }

     if (planoAtual === plan.id) {
      if (Platform.OS === "web") {
      window.alert("Você já possui esse plano.");
    } else {
      Alert.alert("Plano ativo", "Você já possui esse plano.");
    }

    return;
  }

     if (Platform.OS === "web") {
    const confirmou = window.confirm(
      `Deseja confirmar a assinatura do plano ${plan.nome}?`
    );

     if (confirmou) {
      confirmarAssinatura(plan);
    }

    return;
  }

     Alert.alert(
      "Assinar Plano",
      `Deseja confirmar a assinatura do plano ${plan.nome}?`,
    [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Confirmar",
        onPress: async () => {
          await confirmarAssinatura(plan);
        },
      },
    ]
  );
}

  return (
    <ProtectedRoute>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#e8e6f0" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Nossos Planos</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {PLANS.map((plan) => {
            const planoAtivo = planoAtual === plan.id;

            return (
              <View
                key={plan.id}
                style={[styles.card, planoAtivo && styles.activeCard]}
              >
                <View style={styles.planHeader}>
                  <Text style={styles.planName}>{plan.nome}</Text>
                  <Text style={styles.planPrice}>{plan.preco}</Text>
                </View>

                <Text style={styles.planDesc}>{plan.desc}</Text>

                <View style={{ gap: 6 }}>
                  {plan.features.map((feature, index) => (
                    <View key={index} style={styles.featureRow}>
                      <Ionicons
                        name="checkmark-circle"
                        size={16}
                        color="#4ade80"
                      />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity
                  style={[styles.button, planoAtivo && styles.buttonDisabled]}
                  onPress={() => handleSubscribe(plan)}
                  disabled={planoAtivo}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      planoAtivo && styles.buttonTextDisabled,
                    ]}
                  >
                    {planoAtivo ? "Plano Atual" : "Assinar Agora"}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </ProtectedRoute>
  );
}