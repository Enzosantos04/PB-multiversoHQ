
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ComicsProvider } from '../context/ComicsContext';
import RegisterForm from './RegisterForm';

// Mock do window.alert (Vitest)
window.alert = vi.fn();

const renderWithProviders = (ui) => {
  return render(
    <ComicsProvider>
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </ComicsProvider>
  );
};

describe('RegisterForm Component', () => {
  it('deve permitir preencher o formulário e clicar no botão de cadastrar', () => {
    renderWithProviders(<RegisterForm />);

    const nameInput = screen.getByPlaceholderText(/Seu nome/i);
    const emailInput = screen.getByPlaceholderText(/voce@exemplo.com/i);
    const passwordInput = screen.getByPlaceholderText(/Escolha uma senha/i);
    const confirmPasswordInput = screen.getByPlaceholderText(/Repita sua senha/i);
    const submitButton = screen.getByRole('button', { name: /Cadastrar/i });

    // Simula o preenchimento dos campos
    fireEvent.change(nameInput, { target: { value: 'Novo Usuário' } });
    fireEvent.change(emailInput, { target: { value: 'novo@email.com' } });
    fireEvent.change(passwordInput, { target: { value: 'senha123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'senha123' } });

    // Simula o clique no botão de cadastro
    fireEvent.click(submitButton);

    // Verifica se o alerta de sucesso foi disparado
    expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('Cadastro realizado com sucesso'));
  });

  it('deve exibir mensagem de erro quando as senhas são diferentes', () => {
    renderWithProviders(<RegisterForm />);

    const nameInput = screen.getByPlaceholderText(/Seu nome/i);
    const emailInput = screen.getByPlaceholderText(/voce@exemplo.com/i);
    const passwordInput = screen.getByPlaceholderText(/Escolha uma senha/i);
    const confirmPasswordInput = screen.getByPlaceholderText(/Repita sua senha/i);
    const submitButton = screen.getByRole('button', { name: /Cadastrar/i });

    fireEvent.change(nameInput, { target: { value: 'Usuário Teste' } });
    fireEvent.change(emailInput, { target: { value: 'teste@email.com' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: '456' } });

    fireEvent.click(submitButton);

    // Verifica se a mensagem de erro aparece na tela
    const errorMessage = screen.getByText(/As senhas não coincidem/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
