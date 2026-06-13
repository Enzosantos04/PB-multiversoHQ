import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react-native'

import { ComicsProvider } from '../context/ComicsContext'
import LoginScreen from '../app/login'

// Mock do expo-router (o teste não tem navegação real)
jest.mock('expo-router', () => ({
  useRouter: () => ({ replace: jest.fn(), push: jest.fn(), back: jest.fn() }),
}))

const renderWithProvider = (ui) => render(<ComicsProvider>{ui}</ComicsProvider>)

describe('Tela de Login', () => {
  it('deve renderizar o botão de entrar corretamente', () => {
    renderWithProvider(<LoginScreen />)
    const botao = screen.getByText('Entrar')
    expect(botao).toBeTruthy()
  })

  it('deve exibir erro ao tentar logar com email inválido', () => {
    renderWithProvider(<LoginScreen />)

    const emailInput = screen.getByPlaceholderText('E-mail')
    const senhaInput = screen.getByPlaceholderText('Senha')
    const botao = screen.getByText('Entrar')

    fireEvent.changeText(emailInput, 'naoexiste@email.com')
    fireEvent.changeText(senhaInput, '123')
    fireEvent.press(botao)

    const erro = screen.getByText(/incorretos/i)
    expect(erro).toBeTruthy()
  })
})