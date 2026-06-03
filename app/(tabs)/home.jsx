import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useComics } from '../../context/ComicsContext'

export default function HomeScreen() {
  const router = useRouter()
  const { marvel, dc, recent, iconic, loading, usuarioAtual, logout } = useComics()

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
  },
  loading: {
    flex: 1,
    backgroundColor: '#0a0a0f',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    color: '#9896b0',
    fontSize: 14,
  },
   header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
  },
  perfilBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#ef4444',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#9896b0',
  },
  secao: {
    marginBottom: 24,
  },
  secaoTitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e8e6f0',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  card: {
    width: 120,
  },
  cover: {
    width: 120,
    height: 180,
    borderRadius: 8,
    backgroundColor: '#12121a',
    resizeMode: 'cover',
  },
  comicName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#e8e6f0',
    marginTop: 8,
  },
})