# Front

---

# 🚀 Funcionalidades

- 🚀 Renderização no lado do servidor (Server-Side Rendering - SSR)
- ⚡ Hot Module Replacement (HMR) para desenvolvimento rápido
- 📦 Empacotamento e otimização de assets
- 🔄 Carregamento de dados e mutações integradas
- 🔒 Suporte nativo a **TypeScript**
- 🎨 Estilização com **TailwindCSS**
- 📖 Documentação oficial do React Router

Documentação:  
https://reactrouter.com/

---

# 🧰 Tecnologias Utilizadas

Este template utiliza as seguintes tecnologias:

- React
- React Router
- TypeScript
- TailwindCSS
- Vite
- Node.js

---

# ⚙️ Primeiros Passos

## Instalação

Instale as dependências do projeto:

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

A aplicação estara em: `http://localhost:5173`.

Estrutura do Projeto

```
├── 📁 .react-router
│   └── 📁 types
│       ├── 📁 app
│       │   ├── 📁 +types
│       │   │   └── 📄 root.ts
│       │   └── 📁 routes
│       │       ├── 📁 autenticacao
│       │       │   └── 📁 +types
│       │       │       └── 📄 page.ts
│       │       └── 📁 wallet
│       │           └── 📁 +types
│       │               └── 📄 wallet.ts
│       ├── 📄 +future.ts
│       ├── 📄 +routes.ts
│       └── 📄 +server-build.d.ts
├── 📁 app
│   ├── 📁 routes
│   │   ├── 📁 autenticacao
│   │   │   ├── 📁 components
│   │   │   │   ├── 📄 Login.tsx
│   │   │   │   └── 📄 Registro.tsx
│   │   │   └── 📄 page.tsx
│   │   └── 📁 wallet
│   │       ├── 📁 components
│   │       │   ├── 📁 deposito
│   │       │   │   ├── 📁 models
│   │       │   │   │   └── 📄 UsuarioDto.ts
│   │       │   │   └── 📄 Deposito.tsx
│   │       │   ├── 📁 movimentacao
│   │       │   │   ├── 📁 models
│   │       │   │   │   └── 📄 MovimentacaoDto.ts
│   │       │   │   └── 📄 Movimentacao.tsx
│   │       │   ├── 📁 saque
│   │       │   │   └── 📄 Saque.tsx
│   │       │   ├── 📁 swap
│   │       │   │   ├── 📁 dto
│   │       │   │   │   └── 📄 CotasaoDto.ts
│   │       │   │   ├── 📁 form
│   │       │   │   │   └── 📄 CotasaoForm.ts
│   │       │   │   └── 📄 Swap.tsx
│   │       │   ├── 📁 transacao
│   │       │   │   ├── 📁 models
│   │       │   │   │   └── 📄 TransacaoDto.ts
│   │       │   │   └── 📄 Transacao.tsx
│   │       │   └── 📄 Header.tsx
│   │       ├── 📁 enums
│   │       │   └── 📄 TypeBalanceEnum.ts
│   │       ├── 📁 models
│   │       │   └── 📄 WalletDto.ts
│   │       └── 📄 wallet.tsx
│   ├── 📁 shared
│   │   └── 📁 utils
│   │       └── 📄 interceptor.tsx
│   ├── 🎨 app.css
│   ├── 📄 root.tsx
│   └── 📄 routes.ts
├── 📁 public
│   └── 📄 favicon.ico
├── ⚙️ .dockerignore
├── ⚙️ .gitignore
├── 🐳 Dockerfile
├── 📝 README.md
├── ⚙️ package-lock.json
├── ⚙️ package.json
├── 📄 react-router.config.ts
├── ⚙️ tsconfig.json
└── 📄 vite.config.ts
```
