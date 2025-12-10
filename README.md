# EadFácil - Plataforma de Cursos Online

Plataforma simples e completa para professores criarem e gerenciarem seus cursos online.

## 🚀 Deploy Rápido

### 1. GitHub
```bash
git add .
git commit -m "feat: EadFácil plataforma completa"
git push origin main
```

### 2. Vercel
1. Importe seu repositório na Vercel
2. Configure as variáveis de ambiente:
   - `DATABASE_URL=file:./dev.db`
   - `NEXTAUTH_URL=https://seu-dominio.vercel.app`
   - `NEXTAUTH_SECRET=e5ZQJ+mH7/M+BAaqVFqwTa6lTthdW1zN68OkjXzkX0A=`

### 3. Banco de Dados
- **SQLite** (simples): `DATABASE_URL=file:./dev.db`
- **Neon** (produção): Crie conta em https://neon.tech

## 📋 Funcionalidades

- ✅ Página pública responsiva
- ✅ Sistema de autenticação completo
- ✅ Dashboard do aluno com progresso
- ✅ Player de vídeo integrado
- ✅ Painel administrativo
- ✅ CRUD de aulas
- ✅ Design mobile-first

## 👤 Usuários de Teste

- **Admin**: admin@eadfacil.com / admin123
- **Estudante**: student@eadfacil.com / student123

## 🛠️ Tecnologias

- Next.js 15, TypeScript, Tailwind CSS
- shadcn/ui, Prisma ORM, NextAuth.js
- SQLite (fácil migração para PostgreSQL)

## 📱 Acesso

- **Site**: https://seu-dominio.vercel.app
- **Admin**: /admin/dashboard
- **Login**: /login

---

**Status**: ✅ Pronto para deploy na Vercel