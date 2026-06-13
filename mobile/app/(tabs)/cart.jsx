import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useComics } from '../../context/ComicsContext'

export default function CartScreen() {
  const {
    carrinho,
    removeFromCart,
    updateQuantidade,
    limparCarrinho,
    usuarioAtual,
    calcularPrecoAluguel,
    calcularFrete,
    PRECO_COMPRA,
  } = useComics()

  // Calcula o preço de cada item conforme a ação (compra ou aluguel)
  const precoItem = (item) => {
    if (item.acao === 'buy') return PRECO_COMPRA
    return calcularPrecoAluguel(usuarioAtual, item.publisherId)
  }

  const subtotal = carrinho.reduce((acc, item) => acc + precoItem(item) * item.quantidade, 0)
  const frete = carrinho.length > 0 ? calcularFrete(usuarioAtual) : 0
  const total = subtotal + frete

  // Carrinho vazio
  if (carrinho.length === 0) {
    return (
      <View style={styles.empty}>
        <Ionicons name="cart-outline" size={64} color="#6b6a82" />
        <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
      </View>
    )
  }

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.imagem }} style={styles.thumb} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName} numberOfLines={2}>{item.titulo}</Text>
        <Text style={styles.itemType}>
          {item.acao === 'rent' ? '📦 Aluguel' : '🛒 Compra'}
        </Text>
        <Text style={styles.itemPrice}>
          {precoItem(item) === 0 ? 'Grátis' : `R$ ${precoItem(item).toFixed(2)}`}
        </Text>

        {/* Controle de quantidade */}
        <View style={styles.qtyRow}>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantidade(item.cartKey, -1)}>
            <Ionicons name="remove" size={16} color="#e8e6f0" />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.quantidade}</Text>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantidade(item.cartKey, 1)}>
            <Ionicons name="add" size={16} color="#e8e6f0" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => removeFromCart(item.cartKey)}>
        <Ionicons name="trash-outline" size={20} color="#f87171" />
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Carrinho</Text>
        <TouchableOpacity onPress={limparCarrinho}>
          <Text style={styles.limpar}>Limpar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={carrinho}
        keyExtractor={(item) => item.cartKey}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 220 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Resumo do pedido */}
      <View style={styles.summary}>
        <View style={styles.row}>
          <Text style={styles.label}>Subtotal</Text>
          <Text style={styles.value}>R$ {subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Frete</Text>
          <Text style={[styles.value, frete === 0 && { color: '#4ade80' }]}>
            {frete === 0 ? 'Grátis' : `R$ ${frete.toFixed(2)}`}
          </Text>
        </View>
        <View style={[styles.row, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.checkout}>
          <Text style={styles.checkoutText}>Finalizar pedido</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0f' },
  empty: { flex: 1, backgroundColor: '#0a0a0f', alignItems: 'center', justifyContent: 'center', gap: 12 },
  emptyText: { color: '#6b6a82', fontSize: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 60, paddingBottom: 12 },
  headerTitle: { fontSize: 26, fontWeight: '900', color: '#ef4444' },
  limpar: { color: '#f87171', fontSize: 14 },
  item: {
    flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16,
    backgroundColor: '#12121a', borderRadius: 10, padding: 12,
    borderWidth: 1, borderColor: '#1c1c2e',
  },
  thumb: { width: 56, height: 80, borderRadius: 6, resizeMode: 'cover', backgroundColor: '#0a0a0f' },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 13, fontWeight: '600', color: '#e8e6f0', marginBottom: 4 },
  itemType: { fontSize: 11, color: '#9896b0', marginBottom: 4 },
  itemPrice: { fontSize: 13, color: '#ef4444', fontWeight: '600', marginBottom: 8 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  qtyBtn: { width: 26, height: 26, borderRadius: 6, backgroundColor: '#1c1c2e', alignItems: 'center', justifyContent: 'center' },
  qtyText: { color: '#e8e6f0', fontSize: 14, fontWeight: '600', minWidth: 20, textAlign: 'center' },
  summary: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#12121a', borderTopWidth: 1, borderTopColor: '#1c1c2e',
    padding: 20, gap: 8,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  label: { fontSize: 14, color: '#9896b0' },
  value: { fontSize: 14, color: '#e8e6f0' },
  totalRow: { marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#1c1c2e' },
  totalLabel: { fontSize: 16, fontWeight: '700', color: '#e8e6f0' },
  totalValue: { fontSize: 18, fontWeight: '700', color: '#ef4444' },
  checkout: { marginTop: 12, height: 50, backgroundColor: '#dc2626', borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  checkoutText: { color: '#fff', fontWeight: '700', fontSize: 16 },
})