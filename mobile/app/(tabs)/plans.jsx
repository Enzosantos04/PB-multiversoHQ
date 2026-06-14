import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useComics } from '../../context/ComicsContext'
import styles from '../../styles/plans.styles.jsx'
import ProtectedRoute from '../../components/ProtectedRoute'

const PLANS = [
  {
    id: 'marvel',
    nome: 'Marvel Fan',
    preco: 'R$ 14,90/mês',
    desc: 'Aluguel grátis para todos os quadrinhos da Marvel.',
    features: ['Acesso antecipado', 'Selos exclusivos', 'Frete Grátis'],
  },
  {
    id: 'dc',
    nome: 'DC Enthusiast',
    preco: 'R$ 14,90/mês',
    desc: 'Aluguel grátis para todos os quadrinhos da DC Comics.',
    features: ['Conteúdo bônus', 'Suporte prioritário', 'Frete Grátis'],
  },
  {
    id: 'superhero',
    nome: 'Multiverso Hero',
    preco: 'R$ 29,90/mês',
    desc: 'O plano definitivo. Aluguel grátis para TODO o catálogo.',
    features: ['Tudo dos planos anteriores', 'Frete GRÁTIS', 'Convite para eventos'],
  },
]

export default function PlansScreen() {
  const router = useRouter()
  const { usuarioAtual, setPlanoUsuario } = useComics()

  function handleSubscribe(plan) {
    if (usuarioAtual.plano === plan.id) return

    Alert.alert(
      'Assinar Plano',
      `Deseja confirmar a assinatura do plano ${plan.nome}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: () => {
            setPlanoUsuario(plan.id)
            Alert.alert('Sucesso!', `Agora você é um ${plan.nome}! Aproveite seus benefícios.`)
          },
        },
      ]
    )
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
          {PLANS.map((plan) => (
            <View 
              key={plan.id} 
              style={[styles.card, usuarioAtual.plano === plan.id && styles.activeCard]}
            >
              <View style={styles.planHeader}>
                <Text style={styles.planName}>{plan.nome}</Text>
                <Text style={styles.planPrice}>{plan.preco}</Text>
              </View>
              
              <Text style={styles.planDesc}>{plan.desc}</Text>

              <View style={{ gap: 6 }}>
                {plan.features.map((feature, idx) => (
                  <View key={idx} style={styles.featureRow}>
                    <Ionicons name="checkmark-circle" size={16} color="#4ade80" />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity
                style={[styles.button, usuarioAtual.plano === plan.id && styles.buttonDisabled]}
                onPress={() => handleSubscribe(plan)}
                disabled={usuarioAtual.plano === plan.id}
              >
                <Text style={[styles.buttonText, usuarioAtual.plano === plan.id && styles.buttonTextDisabled]}>
                  {usuarioAtual.plano === plan.id ? 'Plano Atual' : 'Assinar Agora'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </ProtectedRoute>
  )
}
