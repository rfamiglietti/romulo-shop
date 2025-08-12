# Romulo Shop

Romulo Shop é uma aplicação de e-commerce simples construída com React e Supabase. Ela permite que usuários se cadastrem, façam login, visualizem produtos cadastrados no banco de dados, adicionem itens ao carrinho e mantenham o carrinho persistente por usuário.

---

## Funcionalidades

- **Autenticação de Usuário:** Cadastro, login e logout usando Supabase Auth.
- **Exibição de Produtos:** Produtos são carregados dinamicamente da tabela `produtos` no Supabase.
- **Carrinho Persistente:** O carrinho de compras é salvo no banco de dados, vinculado ao usuário logado.
- **Modal de Login e Carrinho:** Interface amigável para login/cadastro e visualização do carrinho.
- **Logout:** Usuário pode sair da conta, limpando o carrinho local.

---

## Tecnologias Utilizadas

- [React](https://react.dev/)
- [Supabase](https://supabase.com/) (Auth, Database)
- [JavaScript (ES6+)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS)

---

## Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/romulo-shop.git
   cd romulo-shop
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o Supabase:**
   - Crie um projeto no [Supabase](https://app.supabase.com/).
   - No painel do Supabase, crie as tabelas usando os comandos SQL abaixo.

4. **Crie o arquivo de configuração do Supabase:**
   Crie o arquivo `src/supabaseClient.js`:
   ```javascript
   import { createClient } from '@supabase/supabase-js';

   const supabaseUrl = 'SUA_SUPABASE_URL';
   const supabaseKey = 'SUA_SUPABASE_ANON_KEY';

   export const supabase = createClient(supabaseUrl, supabaseKey);
   ```
   Substitua `SUA_SUPABASE_URL` e `SUA_SUPABASE_ANON_KEY` pelos valores do seu projeto.

---

## Configuração do Banco de Dados (Supabase)

### Tabela de Produtos

```sql
create table produtos (
  id serial primary key,
  nome text not null,
  preco numeric(10,2) not null
);
```

### Tabela de Carrinhos

```sql
create table carrinhos (
  user_id uuid primary key references auth.users(id) on delete cascade,
  itens jsonb
);
```

### Inserir Produtos de Exemplo

```sql
insert into produtos (nome, preco) values
('Camisa Gabriel Shop', 59.90),
('Boné Estiloso', 39.90),
('Tênis Urbano', 129.90);
```

---

## Scripts

- **Iniciar o projeto:**
  ```bash
  npm start
  ```

---

## Estrutura dos Principais Arquivos

```
src/
├── App.js                # Componente principal, gerencia autenticação, produtos e carrinho
├── supabaseClient.js     # Configuração do Supabase
└── components/
    ├── HeroSection.js
    ├── LoginModal.js
    ├── ProductList.js
    └── CarrinhoModal.js
```

---

## Como Usar

1. **Cadastro/Login:** Clique em "Login" no topo da página para abrir o modal de autenticação.
2. **Visualizar Produtos:** Os produtos cadastrados no Supabase aparecem automaticamente.
3. **Adicionar ao Carrinho:** Clique em "Adicionar ao Carrinho" em qualquer produto.
4. **Ver Carrinho:** Clique em "Ver Carrinho" no topo para abrir o modal do carrinho.
5. **Logout:** Clique em "Logout" para sair da conta.

---

## Observações

- O carrinho é salvo no banco de dados apenas para usuários autenticados.
- O projeto utiliza autenticação por email e senha do Supabase.
- Para produção, configure regras de segurança adequadas no Supabase.

---

## Licença

Este projeto é