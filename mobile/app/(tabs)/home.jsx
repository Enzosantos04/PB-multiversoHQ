import { View, Text, FlatList, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useComics } from '../../context/ComicsContext'
import { useAuth } from '../../context/AuthContext'
import styles from '../../styles/home.styles.jsx'

export default function HomeScreen() {
  const router = useRouter()
  const { marvel, dc, recent, iconic, loading, usuarioAtual } = useComics()
  const { logout } = useAuth()

  const handleSair = () => {
    logout()
    router.replace('/login')
  }

  // Componente de um card de quadrinho
  const renderComic = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/comic/${item.id}`)}
    >
      <Image source={{ uri: item.imagem }} style={styles.cover} />
      <Text style={styles.comicName} numberOfLines={2}>{item.titulo}</Text>
    </TouchableOpacity>
  )

  // Componente de uma seção horizontal
  const Secao = ({ titulo, dados }) => (
    <View style={styles.secao}>
      <Text style={styles.secaoTitulo}>{titulo}</Text>
      <FlatList
        data={dados}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderComic}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
      />
    </View>
  )

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#ef4444" />
        <Text style={styles.loadingText}>Carregando quadrinhos...</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
     {/* Cabeçalho */}
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Multiverso HQ 🦸</Text>
          <Text style={styles.headerSubtitle}>
            Olá, {usuarioAtual.nome}
          </Text>
        </View>
        <TouchableOpacity style={styles.perfilBtn} onPress={handleSair}>
          <Ionicons name="log-out-outline" size={22} color="#ef4444" />
        </TouchableOpacity>
      </View>

      {/* Seções */}
      <Secao titulo="🔥 Recentes" dados={recent} />
      <Secao titulo="⭐ Icônicos" dados={iconic} />
      <Secao titulo="Marvel" dados={marvel} />
      <Secao titulo="DC Comics" dados={dc} />

      <View style={{ height: 24 }} />
    </ScrollView>
  )
}
