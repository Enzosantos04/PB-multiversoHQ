# Multiverso HQ 📚🚀

Bem-vindo ao **Multiverso HQ**, uma plataforma e-commerce moderna e imersiva dedicada aos amantes de quadrinhos Marvel e DC. Este projeto foi desenvolvido como parte de um desafio de desenvolvimento web, utilizando tecnologias modernas para criar uma experiência de usuário fluida e responsiva.

## 👥 Equipe de Desenvolvimento

Este projeto foi realizado em grupo pelos alunos:
*   **Enzo**
*   **Matheus**
*   **Samuel**
*   **Raphael**

---

## 🛠️ Tecnologias Utilizadas

*   **React.js**: Biblioteca principal para construção da interface.
*   **Vite**: Ferramenta de build e servidor de desenvolvimento ultra-rápido.
*   **React Router Dom**: Gerenciamento de rotas e navegação SPA.
*   **CSS Modules**: Estilização isolada e modular para componentes.
*   **Comic Vine API**: Fonte oficial de dados para o vasto catálogo de volumes.
*   **Context API**: Gerenciamento de estado global (Carrinho, Autenticação Mock e Dados).

---

## ✨ Principais Funcionalidades

-   **Catálogo Dinâmico**: Exploração de volumes da Marvel e DC integrados diretamente com a API Comic Vine.
-   **Busca Inteligente**: Barra de pesquisa com sugestões em tempo real e redirecionamento direto.
-   **Página de Detalhes**: Informações completas sobre cada quadrinho, incluindo capas originais e descrições oficiais.
-   **Sistema de Carrinho**: Adição de itens para compra ou aluguel, com controle de quantidade e persistência em memória.
-   **Regras de Negócio de Planos**: 
    -   Simulação de usuários com diferentes planos (Marvel, DC, Superhero).
    -   Cálculo automático de descontos e frete grátis baseado no perfil do usuário.
-   **Tema Dark/Light**: Interface adaptável à preferência do usuário.
-   **Responsividade**: Design otimizado para dispositivos móveis e desktops.

---

## 🚀 Como Executar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/pb-multiversohq.git
    ```

2.  **Acesse a pasta do projeto:**
    ```bash
    cd pb-multiversohq
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na raiz do projeto e adicione sua chave da API Comic Vine:
    ```env
    VITE_COMIC_VINE_API_KEY=sua_chave_aqui
    ```

5.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

---

## 📁 Estrutura do Projeto

*   `src/components`: Componentes reutilizáveis (Header, Footer, Cards, etc).
*   `src/pages`: Páginas completas da aplicação.
*   `src/context`: Lógica global de dados e regras de negócio.
*   `src/images`: Assets visuais e logotipos.
*   `src/pages/modules`: Estilos CSS específicos por página.

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais. Sinta-se à vontade para explorar e aprender com o código!
