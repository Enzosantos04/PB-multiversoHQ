import { View, Text, TextInput, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useComics } from '../../context/ComicsContext'
import styles from '../../styles/catalog.styles.jsx'

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
