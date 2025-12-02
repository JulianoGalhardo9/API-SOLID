# 🚀 API SOLID – Backend escalável com Node.js, TypeScript, Prisma, Docker e TDD

Este projeto é uma API REST desenvolvida seguindo princípios sólidos de arquitetura de software, boas práticas de engenharia e um fluxo profissional de desenvolvimento.  
Ele foi construído ao longo de um estudo aprofundado das melhores práticas modernas do ecossistema Node.js, incluindo **SOLID, Clean Architecture, TDD, Docker, Prisma ORM, JWT/Refresh Token, RBAC e CI/CD**.

A API implementa um sistema completo de academias e check-ins, com autenticação, validações, relacionamentos, testes unitários e end-to-end, além de infraestrutura com Docker e GitHub Actions.

---

## 🏗️ Tecnologias Utilizadas

- **Node.js + TypeScript**
- **Fastify**
- **Prisma ORM**
- **PostgreSQL (Docker + Docker Compose)**
- **Vitest (unit + e2e) + Supertest**
- **JWT + Refresh Token**
- **RBAC (Role-Based Access Control)**
- **GitHub Actions (CI/CD)**
- **Zod (validação)**
- **Dotenv**
- **Clean Architecture + SOLID + Repository Pattern + Use Case Pattern**

---

# 📚 Linha do Tempo do Desenvolvimento

Abaixo está um resumo profissional das etapas implementadas no projeto, demonstrando entendimento maduro de arquitetura, testes, segurança e padrões de mercado.

---

## 🔧 Configuração Inicial

- Estruturação do projeto e scripts do **package.json** (dev, build, start).
- Configuração do `.npmrc` com **save-exact**.
- Configuração do **dotenv** e validação de variáveis com **zod**.
- Alias de importação no `tsconfig.json`.

---

## 🗄️ Prisma ORM + Docker

- Configuração completa do Prisma.
- Setup de **PostgreSQL via Docker** e **docker-compose.yml**.
- Criação dos models **User**, **Gym** e **CheckIn**.
- Relacionamentos 1-N.
- Execução de migrations e integração com o fluxo de desenvolvimento.

---

## 👤 Criação de Usuário + Segurança

- Rota de registro de usuário.
- Hash seguro de senha com **bcryptjs**.
- Validação de email.
- Implementação do **Use Case** de criação.
- Repository Pattern.
- DIP (Dependency Inversion Principle) aplicado.

---

## 🧪 Testes Unitários & TDD

- Testes iniciais de hash de senha.
- Banco in-memory para testes.
- Red → Green → Refactor.
- Testes cobrindo:
  - cadastro  
  - autenticação  
  - perfil  
  - check-in  
  - distâncias (Haversine)  
  - academias  
  - histórico e métricas  

---

## 📍 Geolocalização e Regras de Negócio

- Limite de 100m para check-in.
- Limite de 1 check-in por dia.
- Implementação da função **Haversine**:
  ```ts
  getDistanceBetweenCoordinates()

---

## 🧱 Arquitetura Avançada

- **Factory Pattern** para cada caso de uso, garantindo instâncias consistentes e testáveis.
- **Repositórios Prisma** implementando interfaces abstratas (contratos) para permitir inversão de dependências e facilitar testes unitários.
- Organização em camadas (controllers → use-cases → repositories → infra), mantendo o núcleo de regras de negócio isolado de detalhes de infraestrutura.
- Query SQL otimizada para buscas geoespaciais (Haversine) quando a performance e precisão são necessárias para retornar academias próximas.

---

## 🔑 Autenticação JWT + Refresh Token

- Implementação de autenticação com **JWT** utilizando `@fastify/jwt`.
- Uso de **Refresh Tokens** armazenados em **cookies HttpOnly** para máxima segurança.
- Middlewares para:
  - validação de token de acesso;
  - extração do usuário autenticado para controllers;
  - verificação de roles (RBAC) — admin / user.
- Fluxo de autenticação:
  1. Usuário autentica via `/sessions` → recebe access token (JWT) e refresh token (cookie HttpOnly).
  2. Quando o access token expira, cliente chama `/token/refresh` usando o cookie para obter um novo access token.
  3. Regras de renovação e revogação aplicadas conforme política de segurança da aplicação.
- Integração com front-end (exemplo Axios):
  ```ts
  const api = axios.create({
    baseURL: 'http://localhost:3333',
    withCredentials: true, // permite envio/recebimento de cookies HttpOnly
  })

---

## 🌐 Controllers & Rotas

### Usuários
- **POST `/users`** — criação de usuário (registro).
- **POST `/sessions`** — autenticação (login).
- **PATCH `/token/refresh`** — renovação do token de acesso usando o Refresh Token via cookie HttpOnly.
- **GET `/me`** — retorna os dados do usuário autenticado.

### Academias
- **POST `/gyms`** — criação de academia (apenas administradores).
- **GET `/gyms/search?query=`** — busca de academias por nome, com paginação.
- **GET `/gyms/nearby?latitude=&longitude=`** — lista academias próximas com cálculo de distância (Haversine).

### Check-ins
- **POST `/gyms/:gymId/check-ins`** — registra um check-in validando distância e regra de apenas 1 check-in por dia.
- **GET `/check-ins/history?page=`** — retorna histórico do usuário autenticado.
- **GET `/check-ins/metrics`** — retorna quantidade total de check-ins.
- **PATCH `/check-ins/:checkInId/validate`** — validação de um check-in (apenas administradores).

---

## 🧪 Testes End-to-End (E2E)

- Ambiente isolado de testes utilizando instância temporária do PostgreSQL.
- Utilitário `createAndAuthenticateUser()` para facilitar autenticação durante os testes.
- Testes cobrindo fluxos completos:
  - registro de usuário  
  - autenticação + refresh token  
  - perfil (`/me`)  
  - criação e listagem de academias  
  - check-ins, métricas e histórico  
- Execução com:
  ```bash
  npm run test:e2e

---

## ⚙️ CI/CD com GitHub Actions

- Pipelines configurados para rodar:
  - Testes unitários a cada `push`;
  - Testes end-to-end em cada Pull Request;
  - Verificação de coverage;
  - Subida automática de ambiente PostgreSQL via Docker para testes.
- Garantia de que nenhum código é mergeado sem passar pelas etapas de validação.
- Fluxo de CI garante:
  - qualidade consistente,
  - prevenção de regressões,
  - automação completa do processo de verificação.

---

## 📦 Como Rodar o Projeto

### 1. Instalar dependências
```bash
npm install
```

---

### 2. Configurar variáveis de ambiente

Crie um arquivo **.env** baseado no **.env.example** e configure:

- JWT secret  
- Refresh Token secret  
- URL do banco de dados  
- Porta do servidor  

As variáveis são validadas com **Zod** no startup.

---

### 3. Subir banco de dados com Docker
```bash
docker compose up -d
```

---

### 4. Rodar migrations
```bash
npx prisma migrate dev
```

---

### 5. Iniciar o servidor
```bash
npm run dev
```

---

### 6. Rodar testes unitários
```bash
npm run test
```

---

### 7. Rodar testes end-to-end
```bash
npm run test:e2e
```

---

## 🎯 Conclusão

Este projeto implementa uma API moderna, escalável e seguindo padrões profissionais utilizados em ambientes reais.

### **Principais pontos entregues**

- Arquitetura em camadas (**Controller → Use Case → Repository → Infra**)  
- Princípios **SOLID** aplicados  
- Autenticação segura com **JWT + Refresh Token**  
- Cookies **HttpOnly** para proteção contra XSS  
- **RBAC** para controle de permissões  
- Testes **unitários** e **E2E** cobrindo fluxos críticos  
- Pipeline completo de **CI/CD** com GitHub Actions  
- Banco **PostgreSQL** isolado em Docker  
- **Prisma ORM** com migrations e validação de tipos  

Uma base sólida para evoluir para microsserviços, monitoramento, mensageria e deploy em nuvem.


