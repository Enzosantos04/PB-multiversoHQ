import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Contact from './Contact';

describe('Contact Component', () => {
  it('deve renderizar o botão de enviar mensagem corretamente', () => {
    render(<Contact />);
    
    // Verifica se o botão com o texto "ENVIAR MENSAGEM" está no documento
    const submitButton = screen.getByRole('button', { name: /ENVIAR MENSAGEM/i });
    
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute('type', 'submit');
  });
});