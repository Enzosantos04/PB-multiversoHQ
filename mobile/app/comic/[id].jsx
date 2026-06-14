import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useComics } from '../../context/ComicsContext'
import ProtectedRoute from '../../components/ProtectedRoute'
import styles from '../../styles/comicDetails.styles.jsx'

export default function ComicDetailsScreen() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const { marvel, dc, recent, iconic, addToCart, usuarioAtual, calcularPrecoAluguel, PRECO_COMPRA } = useComics()
  const [comic, setComic] = useState(null)

  // Busca o quadrinho nas listas já carregadas
  useEffect(() => {
    const todos = [...marvel, ...dc, ...recent, ...iconic]
    const encontrado = todos.find((c) => String(c.id) === String(id))
    setComic(encontrado)
  }, [id, marvel, dc, recent, iconic])

  if (!comic) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#ef4444" />
      </View>
    )
  }

  const precoAluguel = calcularPrecoAluguel(usuarioAtual, comic.publisherId)

  return (
    <ProtectedRoute>
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Botão voltar */}
      <TouchableOpacity style={styles.back} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#e8e6f0" />
      </TouchableOpacity>

      <Image source={{ uri: comic.imagem }} style={styles.cover} />

      <View style={styles.info}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{comic.categoria}</Text>
        </View>

        <Text style={styles.title}>{comic.titulo}</Text>

        {comic.description ? (
          <Text style={styles.desc}>
            {comic.description.replace(/<[^>]+>/g, '').slice(0, 300)}...
          </Text>
        ) : null}

        {/* Preços */}
        <View style={styles.precos}>
          <View style={styles.precoBox}>
            <Text style={styles.precoLabel}>Compra</Text>
            <Text style={styles.precoValor}>R$ {PRECO_COMPRA.toFixed(2)}</Text>
          </View>
          <View style={styles.precoBox}>
            <Text style={styles.precoLabel}>Aluguel</Text>
            <Text style={styles.precoValor}>
              {precoAluguel === 0 ? 'Grátis' : `R$ ${precoAluguel.toFixed(2)}`}
            </Text>
          </View>
        </View>

        {/* Botões */}
        <TouchableOpacity style={styles.btnPrimary} onPress={() => addToCart(comic, 'buy')}>
          <Ionicons name="cart-outline" size={20} color="#fff" />
          <Text style={styles.btnText}>Comprar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSecondary} onPress={() => addToCart(comic, 'rent')}>
          <Text style={styles.btnTextSec}>Alugar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </ProtectedRoute>
  )
}
