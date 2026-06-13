import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useComics } from '../../context/ComicsContext'
import ProtectedRoute from '../../components/ProtectedRoute'

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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0f' },
  loading: { flex: 1, backgroundColor: '#0a0a0f', alignItems: 'center', justifyContent: 'center' },
  back: { position: 'absolute', top: 50, left: 16, zIndex: 10, backgroundColor: 'rgba(10,10,15,0.7)', borderRadius: 20, padding: 8 },
  cover: { width: '100%', height: 420, resizeMode: 'cover' },
  info: { padding: 20 },
  badge: { alignSelf: 'flex-start', paddingVertical: 4, paddingHorizontal: 12, backgroundColor: 'rgba(239, 68, 68, 0.15)', borderWidth: 1, borderColor: 'rgba(239, 68, 68, 0.3)', borderRadius: 16, marginBottom: 12 },
  badgeText: { color: '#dc2626', fontSize: 11, fontWeight: '700' },
  title: { fontSize: 24, fontWeight: '900', color: '#e8e6f0', marginBottom: 14 },
  desc: { fontSize: 14, color: '#9896b0', lineHeight: 22, marginBottom: 24 },
  precos: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  precoBox: { flex: 1, backgroundColor: '#12121a', borderRadius: 10, borderWidth: 1, borderColor: '#1c1c2e', padding: 14, alignItems: 'center' },
  precoLabel: { fontSize: 12, color: '#9896b0', marginBottom: 4 },
  precoValor: { fontSize: 18, fontWeight: '700', color: '#ef4444' },
  btnPrimary: { flexDirection: 'row', gap: 8, height: 52, backgroundColor: '#dc2626', borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  btnSecondary: { height: 52, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderWidth: 1, borderColor: 'rgba(239, 68, 68, 0.3)' },
  btnTextSec: { color: '#dc2626', fontWeight: '700', fontSize: 16 },
})