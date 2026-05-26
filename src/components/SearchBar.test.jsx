import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
<<<<<<< HEAD
=======
import { BrowserRouter } from 'react-router-dom';
>>>>>>> master
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
  it('deve renderizar o campo de busca corretamente', () => {
<<<<<<< HEAD
    // Passamos props mockadas para o componente
    render(<SearchBar value="" onChange={() => {}} />);
=======
    // Passamos props mockadas para o componente e envolvemos em um Router
    render(
      <BrowserRouter>
        <SearchBar value="" onChange={() => {}} />
      </BrowserRouter>
    );
>>>>>>> master
    
    // Verifica se o campo de busca está no documento pelo placeholder
    const searchInput = screen.getByPlaceholderText(/BUSCAR MARVEL OU DC/i);
    
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('type', 'text');
  });
});
