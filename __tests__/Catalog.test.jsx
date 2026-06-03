import React from 'react'
import { render, screen } from '@testing-library/react-native'
import { ComicsProvider } from '../context/ComicsContext'
import CatalogScreen from '../app/(tabs)/catalog'

jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn() }),
}))

const renderWithProvider = (ui) => render(<ComicsProvider>{ui}</ComicsProvider>)

describe('Tela de Catálogo', () => {
  it('deve renderizar o campo de busca corretamente', () => {
    renderWithProvider(<CatalogScreen />)
    const busca = screen.getByPlaceholderText(/Buscar quadrinhos/i)
    expect(busca).toBeTruthy()
  })
})