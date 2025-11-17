# 💼 desempregados.com

![Desempregados.com Banner](./public/img/desempregados-logo.png)

**Uma plataforma de apoio para profissionais desempregados no Brasil**

_"Bem-vindo, desempregado! Como podemos te ajudar hoje?"_

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge&logo=render)](https://desempregados-com.onrender.com/)
[![GitHub Stars](https://img.shields.io/github/stars/adrian1715/desempregados.com?style=for-the-badge)](https://github.com/adrian1715/desempregados.com/stargazers)
[![GitHub Issues](https://img.shields.io/github/issues/adrian1715/desempregados.com?style=for-the-badge)](https://github.com/adrian1715/desempregados.com/issues)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)
[![English](https://img.shields.io/badge/lang-English-red?style=for-the-badge)](README.md)

[🌐 Demo ao Vivo](https://desempregados-com.onrender.com/) • [📝 Reportar Bug](https://github.com/adrian1715/desempregados.com/issues) • [✨ Solicitar Feature](https://github.com/adrian1715/desempregados.com/issues)

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Características Principais](#-características-principais)
- [Stack Tecnológico](#️-stack-tecnológico)
- [Começando](#-começando)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
  - [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Uso](#-uso)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Rotas da API](#-rotas-da-api)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)
- [Contato](#-contato)

---

## 🎯 Sobre o Projeto

**desempregados.com** é uma plataforma web full-stack construída com **Node.js**, **Express** e **MongoDB** para o mercado de trabalho brasileiro.

### 💡 Por Que Este Projeto?

Esta plataforma oferece:

- 🎯 **Orientação de Carreira** - Recursos e guias para recolocação
- 📚 **Páginas de Carreira** - Informações dinâmicas sobre carreiras e recursos
- 🤝 **Plataforma Comunitária** - Conexão entre candidatos e empresas
- 💼 **Vagas de Emprego** - Publicação e busca de oportunidades
- 👥 **Perfis Duais** - Interfaces separadas para candidatos e empresas

### 🇧🇷 Foco no Brasil

Projetada especificamente para o **mercado brasileiro**:

- Interface totalmente em português brasileiro (pt-BR)
- Foco em regulamentações do mercado de trabalho brasileiro
- Informações salariais em Real (BRL)
- Conformidade com leis trabalhistas brasileiras e LGPD
- Adaptada à cultura de emprego brasileira

---

## ✨ Características Principais

### 🔐 Sistema de Autenticação

- Login baseado em email com Passport.js
- Perfis duais: Candidatos e Empresas
- Gerenciamento de sessões com express-session

### 👤 Perfis de Usuário

- Modelos separados para Candidatos e Empresas
- Criação e gerenciamento de perfis
- Suporte a função de administrador

### 💼 Gerenciamento de Vagas

- CRUD completo para vagas de emprego
- Publicações específicas por empresa
- Busca e filtros de vagas

### 📄 Páginas de Carreira

- Páginas dinâmicas de recursos de carreira
- Sistema de gerenciamento de conteúdo
- Materiais educacionais e guias

### 📸 Upload de Imagens

- Integração com Cloudinary para armazenamento
- Fotos de perfil e logotipos de empresas
- Tratamento otimizado de imagens

### 🎨 Interface Responsiva

- Framework Bootstrap 5
- Ícones Bootstrap
- Design amigável para dispositivos móveis
- Estilos CSS personalizados

### 🔔 Mensagens Flash

- Notificações de sucesso e erro
- Sistema de feedback para usuários

### 📝 Sistema de Logs

- Registro de requisições com UUID
- Rastreamento e monitoramento de erros

---

## 🛠️ Stack Tecnológico

### 🎨 Frontend

- **Motor de Templates** - EJS (Embedded JavaScript)
- **Motor de Layout** - EJS-Mate
- **Framework CSS** - Bootstrap 5
- **Ícones** - Bootstrap Icons
- **Estilos** - CSS3 personalizado
- **JavaScript** - Vanilla JS

### ⚙️ Backend

- **Runtime** - Node.js
- **Framework** - Express.js
- **Motor de Templates** - EJS
- **Gerenciador de Sessões** - express-session
- **Mensagens Flash** - connect-flash
- **Sobrescrita de Métodos HTTP** - method-override

### 🗄️ Banco de Dados & ODM

- **Banco de Dados** - MongoDB
- **ODM** - Mongoose
- **Modelos de Schema**:
  - User (com perfis baseados em função)
  - Candidate (Candidato)
  - Company (Empresa)
  - Job (Vaga)
  - Career (Carreira)
  - CareerPage (Página de Carreira)

### 🔐 Autenticação

- **Estratégia** - Passport.js
- **Plugin** - passport-local-mongoose
- **Método** - Autenticação baseada em email (estratégia customizada)
- **Gerenciamento de Sessão** - express-session com cookies

### ☁️ Upload e Armazenamento de Arquivos

- **Armazenamento em Nuvem** - Cloudinary
- **Middleware de Upload** - Multer
- **Storage** - multer-storage-cloudinary
- **Formatos Suportados** - JPEG, JPG, PNG

### 🛠️ Utilitários e Helpers

- **Variáveis de Ambiente** - dotenv
- **Formatação de Datas** - date-fns
- **IDs Únicos** - uuid
- **Tratamento Assíncrono** - express-async-handler

### 🚀 Infraestrutura e Deploy

- **Hospedagem** - [Render.com](https://render.com/)
- **Hospedagem do Banco** - MongoDB Atlas
- **SSL** - HTTPS automático (Render)
- **Gerenciador de Processos** - nodemon (desenvolvimento)

### 📦 Ferramentas de Desenvolvimento

- **Controle de Versão** - Git / GitHub
- **Gerenciador de Pacotes** - npm
- **Servidor de Desenvolvimento** - nodemon

---

## 🚀 Começando

### Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (v14.x ou superior)

  ```bash
  node --version
  ```

- **npm** (vem com Node.js)

  ```bash
  npm --version
  ```

- **MongoDB** (local ou conta no Atlas)

  - Local: [MongoDB Community Edition](https://www.mongodb.com/try/download/community)
  - Nuvem: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Tier gratuito disponível)

- **Conta Cloudinary** (para upload de imagens)
  - Cadastre-se no [Cloudinary](https://cloudinary.com/) gratuitamente

### Instalação

1. **Clone o repositório**

   ```bash
   git clone https://github.com/adrian1715/desempregados.com.git
   cd desempregados.com
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**

   Crie um arquivo `.env` na raiz do projeto:

   ```bash
   touch .env
   ```

   Adicione as seguintes variáveis (veja a seção [Variáveis de Ambiente](#variáveis-de-ambiente) para detalhes)

4. **Configure o MongoDB**

   **Opção A: MongoDB Local**

   ```bash
   # Inicie o serviço MongoDB
   mongod

   # A conexão será:
   # DB_URL=mongodb://localhost:27017/desempregados
   ```

   **Opção B: MongoDB Atlas**

   - Crie um cluster no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Obtenha sua string de conexão
   - Substitua `<password>` e o nome do banco na string de conexão

5. **Inicie o servidor de desenvolvimento**

   ```bash
   npm start
   ```

   Isso iniciará o nodemon na porta 3000 (ou sua PORT especificada)

6. **Abra no navegador**

   Navegue até [http://localhost:3000](http://localhost:3000)

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Ambiente Node
NODE_ENV=development

# Configuração do Servidor
PORT=3000

# Banco de Dados MongoDB
DB_URL=mongodb://localhost:27017/desempregados
# Para MongoDB Atlas, use:
# DB_URL=mongodb+srv://<usuario>:<senha>@cluster.mongodb.net/desempregados?retryWrites=true&w=majority

# Segredo da Sessão (use uma string aleatória forte)
SESSION_SECRET=seu_super_segredo_de_sessao_aqui_mude_em_producao

# Configuração Cloudinary (para upload de imagens)
CLOUDINARY_CLOUD_NAME=seu_cloudinary_cloud_name
CLOUDINARY_KEY=sua_cloudinary_api_key
CLOUDINARY_SECRET=seu_cloudinary_api_secret
```

#### Obtendo suas Credenciais

**MongoDB Atlas:**

1. Crie uma conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crie um cluster (tier gratuito disponível)
3. Clique em "Connect" → "Connect your application"
4. Copie a string de conexão
5. Substitua `<password>` pela senha do seu usuário do banco

**Cloudinary:**

1. Cadastre-se no [Cloudinary](https://cloudinary.com/)
2. Vá para o Dashboard
3. Copie seu Cloud Name, API Key e API Secret
4. Cole no arquivo `.env`

**Session Secret:**

- Gere uma string aleatória forte:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```

---

## 💻 Uso

### Para Candidatos (Buscando Emprego)

1. **Cadastre-se**

   - Vá para `/cadastro` (Cadastro)
   - Selecione a função "Candidato"
   - Preencha suas informações
   - Crie sua conta

2. **Navegue pelas Vagas**

   - Acesse `/vagas` (Vagas)
   - Filtre por categoria, localização ou empresa
   - Visualize detalhes das vagas

3. **Candidate-se às Vagas**

   - Clique na vaga de interesse
   - Veja requisitos e descrição
   - Candidate-se diretamente pela plataforma

4. **Gerencie seu Perfil**
   - Atualize suas informações
   - Faça upload de foto de perfil
   - Acompanhe suas candidaturas

### Para Empresas (Empregadores)

1. **Cadastre-se**

   - Vá para `/cadastro` (Cadastro)
   - Selecione a função "Empresa"
   - Preencha os dados da empresa
   - Crie sua conta

2. **Publique Vagas**

   - Acesse `/vagas/new` (Nova Vaga)
   - Preencha os detalhes da vaga
   - Publique o anúncio

3. **Gerencie Anúncios**

   - Visualize todas as suas vagas
   - Edite ou exclua vagas
   - Acompanhe candidaturas

4. **Perfil da Empresa**
   - Atualize informações da empresa
   - Faça upload do logotipo
   - Gerencie suas vagas publicadas

### Para Administradores

- Acesse painel administrativo para gestão de conteúdo
- Gerencie páginas de carreira e recursos
- Monitore atividade da plataforma
- Modere conteúdo

---

## 📁 Estrutura do Projeto

```
desempregados.com/
├── config/                    # Arquivos de configuração
│   ├── cloudinary.js         # Configuração Cloudinary
│   └── db.js                 # Conexão MongoDB
│
├── middlewares/              # Middlewares Express
│   ├── auth.js               # Middleware de autenticação
│   ├── errorHandler.js       # Tratamento de erros
│   ├── getPages.js           # Middleware de páginas
│   └── logEvents.js          # Registro de requisições
│
├── models/                   # Modelos Mongoose
│   ├── User.js               # Modelo de usuário (com funções)
│   ├── Candidate.js          # Perfil de candidato
│   ├── Company.js            # Perfil de empresa
│   ├── Job.js                # Vagas de emprego
│   ├── Career.js             # Recursos de carreira
│   └── CareerPage.js         # Páginas de carreira
│
├── routes/                   # Rotas Express
│   ├── api/                  # Rotas da API RESTful
│   │   ├── index.js          # Roteador da API
│   │   ├── users.js          # API de usuários
│   │   ├── careers.js        # API de carreiras
│   │   ├── careerPages.js    # API de páginas de carreira
│   │   └── jobs.js           # API de vagas
│   ├── auth.js               # Rotas de autenticação
│   ├── careers.js            # Rotas de páginas de carreira
│   ├── jobs.js               # Rotas de vagas
│   └── index.js              # Rotas principais
│
├── views/                    # Templates EJS
│   ├── layouts/              # Templates de layout
│   │   └── boilerplate.ejs   # Layout principal
│   ├── pages/                # Templates de páginas
│   │   ├── auth/             # Páginas de Login/Cadastro
│   │   ├── carreiras/        # Páginas de carreiras
│   │   ├── vagas/            # Páginas de vagas
│   │   ├── index.ejs         # Página inicial
│   │   ├── candidatos.ejs    # Página de candidatos
│   │   ├── empresas.ejs      # Página de empresas
│   │   └── sobre.ejs         # Página Sobre
│   ├── partials/             # Componentes reutilizáveis
│   │   ├── auth/             # Formulários de autenticação
│   │   ├── navbar.ejs        # Barra de navegação
│   │   ├── footer.ejs        # Rodapé
│   │   └── flash.ejs         # Mensagens flash
│   └── error.ejs             # Página de erro
│
├── public/                   # Arquivos estáticos
│   ├── css/                  # Folhas de estilo
│   │   ├── styles.css        # Estilos globais
│   │   ├── auth.css          # Estilos de autenticação
│   │   ├── index.css         # Estilos da homepage
│   │   └── careers/          # Estilos de carreiras
│   ├── js/                   # JavaScript do cliente
│   │   ├── app.js            # JS principal da app
│   │   ├── auth/             # Scripts de autenticação
│   │   ├── careers/          # Scripts de carreiras
│   │   └── jobs/             # Scripts de vagas
│   ├── img/                  # Imagens
│   │   ├── home/             # Imagens da homepage
│   │   └── footer/           # Ícones do rodapé
│   └── bootstrap/            # Arquivos Bootstrap
│       ├── bootstrap.min.css
│       ├── bootstrap.bundle.js
│       ├── validateForm.js
│       └── icons/            # Bootstrap Icons
│
├── utils/                    # Funções utilitárias
│   ├── CustomError.js        # Classe de erro customizada
│   ├── validation.js         # Helpers de validação
│   └── string.js             # Utilitários de string
│
├── .env                      # Variáveis de ambiente (não no repo)
├── .gitignore               # Regras do Git ignore
├── index.js                 # Ponto de entrada da aplicação
├── package.json             # Dependências e scripts
├── package-lock.json        # Lock de dependências
├── README.md                # README em inglês
└── README-ptbr.md           # Este arquivo (Português)
```

---

## 🔌 Rotas da API

### Autenticação

- `POST /cadastro` - Cadastro de usuário
- `POST /login` - Login de usuário
- `GET /logout` - Logout de usuário

### Vagas

- `GET /vagas` - Listar todas as vagas
- `GET /vagas/new` - Formulário de nova vaga (apenas empresas)
- `POST /vagas` - Criar nova vaga
- `GET /vagas/:id` - Ver detalhes da vaga
- `GET /vagas/:id/edit` - Formulário de edição
- `PUT /vagas/:id` - Atualizar vaga
- `DELETE /vagas/:id` - Excluir vaga

### Carreiras

- `GET /carreiras` - Listar todas as carreiras
- `GET /carreiras/new` - Formulário de nova carreira (apenas admin)
- `POST /carreiras` - Criar nova carreira
- `GET /carreiras/:id` - Ver detalhes da carreira
- `GET /carreiras/:id/edit` - Formulário de edição
- `PUT /carreiras/:id` - Atualizar carreira
- `DELETE /carreiras/:id` - Excluir carreira
- `GET /carreiras/:id/pages` - Páginas da carreira

### API RESTful (JSON)

- `GET /api/users` - Obter usuários
- `GET /api/jobs` - Obter vagas (JSON)
- `GET /api/careers` - Obter carreiras (JSON)
- `GET /api/careerPages` - Obter páginas de carreira (JSON)

### Páginas Públicas

- `GET /` - Página inicial
- `GET /candidatos` - Página de candidatos
- `GET /empresas` - Página de empresas
- `GET /sobre` - Página Sobre

---

## 🤝 Contribuindo

Contribuições tornam a comunidade open-source um lugar incrível para aprender e criar. Qualquer contribuição é **muito apreciada**!

### Como Contribuir

1. **Faça um Fork do Projeto**
2. **Crie sua Branch de Feature**

   ```bash
   git checkout -b feature/MinhaFeature
   ```

3. **Commit suas Mudanças**

   ```bash
   git commit -m 'feat: Adiciona MinhaFeature'
   ```

4. **Push para a Branch**

   ```bash
   git push origin feature/MinhaFeature
   ```

5. **Abra um Pull Request**

### 📝 Padrões de Commit

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Mudanças na documentação
- `style:` - Formatação de código
- `refactor:` - Refatoração de código
- `test:` - Adição de testes
- `chore:` - Tarefas de manutenção

### 🌍 Diretrizes de Idioma

- **Código**: Comentários em inglês preferidos
- **UI/UX**: Português (pt-BR) obrigatório
- **Documentação**: Inglês e Português
- **Commits**: Inglês preferido, Português aceito
- **Issues/PRs**: Qualquer idioma aceito

### 🐛 Reportando Bugs

Use o [GitHub Issues](https://github.com/adrian1715/desempregados.com/issues):

- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs atual
- Screenshots se aplicável
- Detalhes do ambiente (navegador, SO)

---

## 📝 Licença

Distribuído sob a Licença MIT. Veja o arquivo `LICENSE` para mais informações.

---

## 📧 Contato

**Adrian** - [@adrian1715](https://github.com/adrian1715)

**Link do Projeto:** [https://github.com/adrian1715/desempregados.com](https://github.com/adrian1715/desempregados.com)

**Demo ao Vivo:** [https://desempregados-com.onrender.com/](https://desempregados-com.onrender.com/)

---

## 🙏 Agradecimentos

- [Node.js](https://nodejs.org/) - Runtime JavaScript
- [Express.js](https://expressjs.com/) - Framework web
- [MongoDB](https://www.mongodb.com/) - Banco de dados NoSQL
- [Mongoose](https://mongoosejs.com/) - ODM para MongoDB
- [Passport.js](http://www.passportjs.org/) - Middleware de autenticação
- [EJS](https://ejs.co/) - Template engine JavaScript
- [Bootstrap](https://getbootstrap.com/) - Framework CSS
- [Cloudinary](https://cloudinary.com/) - Hospedagem e gerenciamento de imagens
- [Render.com](https://render.com/) - Hospedagem gratuita e confiável
- A comunidade tech brasileira pelo apoio
- Todos os contribuidores que ajudaram a construir esta plataforma

---

## 💪 Apoie o Projeto

- ⭐ Dê uma estrela neste repositório
- 🐛 Reporte bugs e sugira melhorias
- 💻 Contribua com código
- 📢 Compartilhe com outros profissionais
- 💬 Forneça feedback

---

## 📊 Status do Projeto

![GitHub last commit](https://img.shields.io/github/last-commit/adrian1715/desempregados.com?style=flat-square)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/adrian1715/desempregados.com?style=flat-square)
![GitHub top language](https://img.shields.io/github/languages/top/adrian1715/desempregados.com?style=flat-square)

---

## 🌍 For English speakers

This README is available in English. [Click here to read in English](README.md).

---

_"Desempregado hoje, empregado amanhã. Nós acreditamos em você!"_

[⬆ Voltar ao Topo](#-desempregadoscom)
