import { calcularPrecoAluguel, calcularFrete, MOCK_USERS } from '../context/ComicsContext'

describe('Regras de preço por plano', () => {
  it('visitante paga aluguel cheio', () => {
    const visitante = MOCK_USERS[0]
    expect(calcularPrecoAluguel(visitante, 31)).toBe(29.9)
  })

  it('plano Marvel tem aluguel Marvel grátis', () => {
    const anaMarvel = MOCK_USERS[2]
    expect(calcularPrecoAluguel(anaMarvel, 31)).toBe(0)
  })

  it('plano superhero tem tudo grátis', () => {
    const julia = MOCK_USERS[4]
    expect(calcularPrecoAluguel(julia, 10)).toBe(0)
  })

  it('plano ativo tem frete grátis', () => {
    const julia = MOCK_USERS[4]
    expect(calcularFrete(julia)).toBe(0)
  })
})