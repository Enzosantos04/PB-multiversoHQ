# Multiverso HQ 📚🚀

Bem-vindo ao **Multiverso HQ**, uma plataforma moderna e imersiva dedicada aos amantes de quadrinhos Marvel e DC.

O projeto está organizado em formato de **monorepo manual**, reunindo no mesmo repositório duas aplicações independentes:

* 🌐 **Web** — aplicação React com Vite
* 📱 **Mobile** — aplicação React Native com Expo Router

Essa organização permite manter a experiência do Multiverso HQ disponível em diferentes plataformas, separando as responsabilidades de cada aplicação e facilitando a manutenção do código.

---

## 👥 Equipe de Desenvolvimento

Este projeto foi realizado em grupo pelos alunos:

* Enzo
* Matheus
* Samuel
* Raphael

---

## 🛠️ Tecnologias Utilizadas

### 🌐 Web

* **React.js**: biblioteca principal para construção da interface.
* **Vite**: ferramenta de build e servidor de desenvolvimento rápido.
* **React Router DOM**: gerenciamento de rotas e navegação SPA.
* **CSS Modules**: estilização isolada e modular para componentes.
* **React Icons**: biblioteca de ícones utilizada na interface.
* **React Slick**: implementação de carrosséis e banners.
* **Slick Carousel**: estilos e recursos visuais para os carrosséis.
* **Comic Vine API**: fonte de dados para o catálogo de quadrinhos.
* **Context API**: gerenciamento de estado global.
* **Formspree**: integração do formulário de contato.
* **LocalStorage**: persistência local de dados como histórico de pedidos.

### 📱 Mobile

* **React Native**: desenvolvimento da aplicação mobile.
* **Expo SDK 54**: ambiente para execução e desenvolvimento mobile.
* **Expo Router**: navegação baseada em arquivos.
* **React Navigation**: suporte à navegação mobile.
* **AsyncStorage**: armazenamento local no dispositivo.
* **Context API**: gerenciamento global de autenticação, planos, carrinho e quadrinhos.
* **Expo Vector Icons**: biblioteca de ícones para interface mobile.
* **Expo Location**: recurso de localização do dispositivo.
* **Expo Local Authentication**: autenticação com biometria.
* **Expo Constants**: suporte a constantes e configurações do ambiente Expo.
* **EAS Build**: geração de APK para Android.

---

## ✨ Principais Funcionalidades

### 🌐 Aplicação Web

* **Catálogo Dinâmico**: exploração de volumes da Marvel e DC integrados com a API Comic Vine.
* **Busca Inteligente**: barra de pesquisa com sugestões em tempo real e redirecionamento direto.
* **Página de Detalhes**: exibição de informações completas sobre cada quadrinho, incluindo capas e descrições.
* **Sistema de Carrinho**: adição de itens para compra ou aluguel, com controle de quantidade.
* **Login e Cadastro**: fluxo de autenticação mockado.
* **Cadastro com Login Automático**: após criar conta, o usuário já fica autenticado.
* **Minha Conta**: área de usuário com nome, e-mail, plano ativo e botão para sair da conta.
* **Assinatura de Planos**: usuários logados podem assinar planos Marvel, DC ou SuperHerói.
* **Histórico de Pedidos**: pedidos finalizados ficam registrados na tela Minha Conta.
* **Finalização protegida**: o usuário precisa estar logado para finalizar uma compra ou aluguel.
* **Regras de Negócio de Planos**:

  * Usuário logado sem plano recebe desconto no aluguel.
  * Plano Marvel cobre aluguel de quadrinhos Marvel.
  * Plano DC cobre aluguel de quadrinhos DC.
  * Plano SuperHerói cobre aluguel de quadrinhos Marvel e DC.
  * Qualquer plano ativo possui frete grátis.
  * Usuário sem plano paga frete fixo.
* **Cálculo de Frete**: cálculo por CEP e localização, respeitando os benefícios do plano.
* **Tema Dark/Light**: interface adaptável à preferência do usuário.
* **Formulário de Contato**: envio de mensagens integrado com Formspree.
* **Responsividade**: layout otimizado para desktop e dispositivos móveis.

### 📱 Aplicação Mobile

* **Navegação Mobile**: estrutura organizada com Expo Router e Drawer Navigation.
* **Tela Inicial**: apresentação da aplicação e seções principais.
* **Catálogo Mobile**: listagem de quadrinhos na interface mobile.
* **Detalhes de Quadrinhos**: visualização individual de cada item.
* **Carrinho**: tela dedicada para itens selecionados.
* **Cálculo de Frete**: cálculo por CEP e localização do dispositivo.
* **Login e Cadastro**: autenticação no app mobile.
* **Cadastro com Login Automático**: após criar a conta, o usuário é autenticado e pode escolher um plano.
* **Assinatura de Planos**: usuários autenticados podem assinar planos dentro do app.
* **Sincronização de Usuário**: integração entre AuthContext e ComicsContext para manter plano, carrinho e frete consistentes.
* **Biometria**: autenticação com recurso nativo do dispositivo.
* **Rotas Protegidas**: controle de acesso às telas internas.
* **Compatibilidade Web/App**: fluxo de assinatura adaptado para APK e Expo Web.
* **Context API**: gerenciamento de dados globais de autenticação, planos, carrinho e quadrinhos.

---

## 📋 Regras de Planos e Frete

O projeto possui regras de negócio aplicadas tanto na versão Web quanto na versão Mobile.

### Usuário sem plano

* Pode navegar pelo catálogo.
* Precisa estar logado para finalizar pedidos.
* Paga frete fixo.
* Recebe desconto no aluguel por estar logado.

### Plano Marvel

* Aluguel gratuito para quadrinhos Marvel.
* Quadrinhos DC seguem a regra de aluguel comum.
* Frete grátis.

### Plano DC

* Aluguel gratuito para quadrinhos DC.
* Quadrinhos Marvel seguem a regra de aluguel comum.
* Frete grátis.

### Plano SuperHerói

* Aluguel gratuito para quadrinhos Marvel e DC.
* Frete grátis.

---

## 📁 Estrutura do Projeto

```txt
PB-multiversoHQ/
├── web/                  # Aplicação Web com React + Vite
├── mobile/               # Aplicação Mobile com React Native + Expo
├── package.json          # Scripts gerais do monorepo manual
├── README.md
└── .gitignore
```

### Principais pastas

* `web/src/components`: componentes reutilizáveis da aplicação web.
* `web/src/pages`: páginas completas da aplicação web.
* `web/src/context`: lógica global de dados, autenticação, carrinho, planos e regras de negócio da web.
* `web/src/images`: assets visuais e logotipos da web.
* `web/src/pages/modules`: estilos CSS específicos por página.
* `mobile/app`: telas e rotas da aplicação mobile com Expo Router.
* `mobile/context`: gerenciamento global de autenticação, quadrinhos, planos e carrinho no mobile.
* `mobile/components`: componentes reutilizáveis da aplicação mobile.
* `mobile/styles`: arquivos de estilo da aplicação mobile.
* `mobile/assets`: imagens e ícones da aplicação mobile.

---

## ⚙️ Configuração de Variáveis de Ambiente

O projeto utiliza variáveis de ambiente para acessar serviços externos.

### 🌐 Web

Crie um arquivo `.env` dentro da pasta `web/`:

```txt
web/.env
```

Exemplo:

```env
VITE_COMIC_VINE_API_KEY=sua_chave_aqui
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/seu_codigo_aqui
```

No Vite, variáveis de ambiente precisam começar com `VITE_`.

---

### 📱 Mobile

Crie um arquivo `.env` dentro da pasta `mobile/`:

```txt
mobile/.env
```

Exemplo:

```env
EXPO_PUBLIC_COMIC_VINE_API_KEY=sua_chave_aqui
```

No Expo, variáveis públicas precisam começar com `EXPO_PUBLIC_`.

> Importante: os arquivos `.env` não devem ser enviados para o GitHub.

---

## 🚀 Como Executar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/Enzosantos04/PB-multiversoHQ.git
```

### 2. Acesse a pasta do projeto

```bash
cd PB-multiversoHQ
```

---

## 🌐 Executando a Aplicação Web

Acesse a pasta da aplicação web:

```bash
cd web
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação ficará disponível em:

```txt
http://localhost:5173
```

---

## 📱 Executando a Aplicação Mobile

Acesse a pasta da aplicação mobile:

```bash
cd mobile
```

Instale as dependências:

```bash
npm install
```

Inicie o Expo:

```bash
npx expo start --clear
```

Ou:

```bash
npm start
```

Depois, escolha uma das opções no terminal:

```txt
a  → abrir no Android Emulator
w  → abrir no navegador
```

Também é possível escanear o QR Code usando o aplicativo **Expo Go** no celular.

---

## 📲 Testando o Mobile no Navegador do Celular

Também é possível testar a versão mobile pelo navegador do celular.

Dentro da pasta `mobile`, rode:

```bash
npx expo start --web
```

Ou:

```bash
npx expo start --clear
```

Depois pressione:

```txt
w
```

No navegador do computador, a aplicação normalmente abrirá em um endereço parecido com:

```txt
http://localhost:8081
```

Para acessar pelo celular, descubra o IP local do computador.

No Windows, rode:

```bash
ipconfig
```

Procure pelo endereço IPv4, por exemplo:

```txt
192.168.0.105
```

Depois, no navegador do celular, acesse:

```txt
http://192.168.0.105:8081
```

> O celular e o computador precisam estar conectados à mesma rede Wi-Fi.

---

## 📦 Gerando APK com EAS Build

A aplicação mobile possui configuração para build Android usando EAS.

Acesse a pasta mobile:

```bash
cd mobile
```

Faça login no EAS:

```bash
eas login
```

Caso ainda não tenha configurado o projeto:

```bash
eas build:configure
```

Para gerar um APK de preview:

```bash
eas build -p android --profile preview
```

O arquivo `mobile/eas.json` deve conter um perfil `preview` configurado para gerar APK:

```json
{
  "build": {
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

Ao final do processo, o EAS fornecerá um link para baixar e instalar o APK no dispositivo Android.

> Observação: alterações feitas no código após a geração do APK exigem a criação de um novo build.

---

## 🧪 Testes

### Mobile

Dentro da pasta `mobile/`, execute:

```bash
npm test
```

### Web

Caso os testes estejam configurados no `package.json` da aplicação web, execute:

```bash
npm test
```

---

## 📌 Observações sobre o Monorepo

Este projeto utiliza uma estrutura de **monorepo manual**, mantendo as aplicações Web e Mobile no mesmo repositório, porém com dependências e configurações separadas.

As dependências devem ser instaladas separadamente em cada aplicação:

```bash
cd web
npm install
```

```bash
cd mobile
npm install
```

Não é necessário rodar `npm install` na raiz do projeto.

Essa abordagem evita misturar dependências específicas do Vite com dependências do Expo, deixando o projeto mais organizado, escalável e fácil de manter.

---

## 🧩 Scripts da Raiz

O `package.json` da raiz pode ser usado apenas para scripts auxiliares.

Exemplo:

```json
{
  "name": "pb-multiversohq",
  "private": true,
  "scripts": {
    "web": "npm --prefix web run dev",
    "mobile": "npm --prefix mobile start"
  }
}
```

Com isso, também é possível rodar a aplicação web a partir da raiz:

```bash
npm run web
```

E a aplicação mobile:

```bash
npm run mobile
```

> Mesmo com esses scripts, a instalação das dependências deve ser feita separadamente dentro de `web/` e `mobile/`.

---

## 🔒 Arquivos Ignorados no Git

O projeto utiliza `.gitignore` para evitar o envio de arquivos sensíveis ou gerados automaticamente.

Não devem ser enviados para o GitHub:

```txt
node_modules/
web/node_modules/
mobile/node_modules/
.env
web/.env
mobile/.env
.expo/
mobile/.expo/
dist/
web/dist/
mobile/dist/
android/
ios/
mobile/android/
mobile/ios/
*.apk
*.aab
```

Arquivos como `mobile/eas.json`, `mobile/app.json`, `web/package-lock.json` e `mobile/package-lock.json` podem ser versionados normalmente.

---

## 📄 Licença

Este projeto utiliza a licença MIT.

---

## 🎓 Finalidade

Este projeto foi desenvolvido para fins educacionais, como parte de um desafio acadêmico de desenvolvimento web e mobile.

Sinta-se à vontade para explorar, estudar e aprender com o código.


