import { useState } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Platform,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as Location from 'expo-location'
import { useComics } from '../../context/ComicsContext'
import styles from '../../styles/cart.styles.jsx'

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

  const [cep, setCep] = useState('')
  const [freteCalculado, setFreteCalculado] = useState(null)
  const [endereco, setEndereco] = useState(null)
  const [loadingLocation, setLoadingLocation] = useState(false)

  const precoItem = (item) => {
    if (item.acao === 'buy') return PRECO_COMPRA
    return calcularPrecoAluguel(usuarioAtual, item.publisherId)
  }

  const subtotal = carrinho.reduce(
    (acc, item) => acc + precoItem(item) * item.quantidade,
    0
  )

  const freteBase = carrinho.length > 0 ? calcularFrete(usuarioAtual) : 0
  const frete = freteCalculado !== null ? freteCalculado : freteBase
  const total = subtotal + frete

  function calcularFretePorCep(cepInformado) {
    const cepLimpo = cepInformado.replace(/\D/g, '')

    if (cepLimpo.length !== 8) {
      Alert.alert('CEP inválido', 'Digite um CEP com 8 números.')
      return
    }

    const prefixo = Number(cepLimpo.slice(0, 2))

    let valorFrete = 18

    if (prefixo >= 20 && prefixo <= 28) {
      valorFrete = 8
    } else if (prefixo >= 30 && prefixo <= 39) {
      valorFrete = 12
    }

    setFreteCalculado(valorFrete)
  }

  async function usarLocalizacaoAtual() {
    try {
      setLoadingLocation(true)

      const { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        Alert.alert(
          'Permissão negada',
          'Não foi possível acessar sua localização.'
        )
        return
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      })

      const { latitude, longitude } = location.coords

      const resultado = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      })

      const primeiroEndereco = resultado[0]

      setEndereco(primeiroEndereco)

      const regiao = primeiroEndereco?.region || ''
      const cidade = primeiroEndereco?.city || ''

      let valorFrete = 18

      if (
        regiao.toLowerCase().includes('rio') ||
        cidade.toLowerCase().includes('rio')
      ) {
        valorFrete = 8
      } else if (
        regiao.toLowerCase().includes('minas') ||
        regiao.toLowerCase().includes('mg')
      ) {
        valorFrete = 12
      }

      setFreteCalculado(valorFrete)
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível obter a localização.')
    } finally {
      setLoadingLocation(false)
    }
  }

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
        <Text style={styles.itemName} numberOfLines={2}>
          {item.titulo}
        </Text>

        <Text style={styles.itemType}>
          {item.acao === 'rent' ? '📦 Aluguel' : '🛒 Compra'}
        </Text>

        <Text style={styles.itemPrice}>
          {precoItem(item) === 0 ? 'Grátis' : `R$ ${precoItem(item).toFixed(2)}`}
        </Text>

        <View style={styles.qtyRow}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => updateQuantidade(item.cartKey, -1)}
          >
            <Ionicons name="remove" size={16} color="#e8e6f0" />
          </TouchableOpacity>

          <Text style={styles.qtyText}>{item.quantidade}</Text>

          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => updateQuantidade(item.cartKey, 1)}
          >
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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Carrinho</Text>

        <TouchableOpacity onPress={limparCarrinho}>
          <Text style={styles.limpar}>Limpar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.shippingBox}>
        <Text style={styles.shippingTitle}>Calcular frete</Text>

        <TextInput
          style={styles.cepInput}
          placeholder="Digite seu CEP"
          placeholderTextColor="#6b6a82"
          value={cep}
          onChangeText={setCep}
          keyboardType="numeric"
          maxLength={9}
        />

        <TouchableOpacity
          style={styles.shippingButton}
          onPress={() => calcularFretePorCep(cep)}
        >
          <Text style={styles.shippingButtonText}>Calcular pelo CEP</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.locationButton}
          onPress={usarLocalizacaoAtual}
          disabled={loadingLocation}
        >
          <Ionicons name="location-outline" size={18} color="#ef4444" />
          <Text style={styles.locationButtonText}>
            {loadingLocation ? 'Buscando localização...' : 'Usar minha localização'}
          </Text>
        </TouchableOpacity>

        {endereco ? (
          <Text style={styles.addressText}>
            Localização: {endereco.city || 'Cidade não identificada'} -{' '}
            {endereco.region || 'Região não identificada'}
          </Text>
        ) : null}
      </View>

      <FlatList
        data={carrinho}
        keyExtractor={(item) => item.cartKey}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 240 }}
        showsVerticalScrollIndicator={false}
      />

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
