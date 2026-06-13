import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useComics } from '../../context/ComicsContext'

export default function CatalogScreen() {
  const router = useRouter()
  const { marvel, dc, recent, searchTerm, setSearchTerm, searchResults } = useComics()

  // Se tem busca, mostra resultados. Senão, mostra todos os quadrinhos.
  const todosQuadrinhos = [...recent, ...marvel, ...dc]
  // Remove duplicados por id
  const unicos = Array.from(new Map(todosQuadrinhos.map(c => [c.id, c])).values())

  const listaExibida = searchTerm ? searchResults : unicos

  const renderComic = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/comic/${item.id}`)}
    >
      <Image source={{ uri: item.imagem }} style={styles.cover} />
      <Text style={styles.comicName} numberOfLines={2}>{item.titulo}</Text>
      <Text style={styles.publisher}>{item.categoria}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Catálogo</Text>
      </View>

      {/* Barra de busca */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={18} color="#6b6a82" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar quadrinhos..."
          placeholderTextColor="#6b6a82"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        {searchTerm ? (
          <TouchableOpacity onPress={() => setSearchTerm('')}>
            <Ionicons name="close-circle" size={18} color="#6b6a82" />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Grid de quadrinhos */}
      {searchTerm && searchResults.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Nenhum resultado encontrado</Text>
        </View>
      ) : (
        <FlatList
          data={listaExibida}
          keyExtractor={(item, index) => `${item.id}_${index}`}
          renderItem={renderComic}
          numColumns={2}
          columnWrapperStyle={{ gap: 12, paddingHorizontal: 16 }}
          contentContainerStyle={{ gap: 12, paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0f' },
  header: { paddingHorizontal: 16, paddingTop: 60, paddingBottom: 12 },
  headerTitle: { fontSize: 26, fontWeight: '900', color: '#ef4444' },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    marginHorizontal: 16, marginBottom: 16, padding: 12,
    backgroundColor: '#12121a', borderRadius: 10,
    borderWidth: 1, borderColor: '#1c1c2e',
  },
  searchInput: { flex: 1, color: '#e8e6f0', fontSize: 15 },
  card: {
    flex: 1,
    backgroundColor: '#12121a',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1c1c2e',
  },
  cover: { width: '100%', aspectRatio: 0.67, resizeMode: 'cover', backgroundColor: '#0a0a0f' },
  comicName: { fontSize: 13, fontWeight: '600', color: '#e8e6f0', padding: 10, paddingBottom: 2 },
  publisher: { fontSize: 11, color: '#9896b0', paddingHorizontal: 10, paddingBottom: 10 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { color: '#6b6a82', fontSize: 15 },
})