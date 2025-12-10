#!/bin/bash

echo "🚀 Setup do EadFácil para Neon PostgreSQL"
echo "=========================================="

# Verificar se tem Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Instale em https://nodejs.org"
    exit 1
fi

# Verificar se tem npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm não encontrado."
    exit 1
fi

echo "✅ Node.js e npm encontrados"

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Perguntar sobre o banco de dados
echo ""
echo "🗄️ Configuração do Banco de Dados"
echo "1. SQLite (local, simples) - Recomendado para desenvolvimento"
echo "2. Neon PostgreSQL (produção) - Recomendado para deploy"
read -p "Escolha (1 ou 2): " db_choice

if [ "$db_choice" = "2" ]; then
    echo ""
    echo "🔗 Configuração Neon PostgreSQL"
    echo "1. Acesse https://neon.tech"
    echo "2. Crie uma conta gratuita"
    echo "3. Crie um novo projeto"
    echo "4. Copie a connection string"
    echo ""
    read -p "Cole sua connection string do Neon: " neon_url
    
    # Atualizar schema para PostgreSQL
    sed -i 's/provider = "sqlite"/provider = "postgresql"/g' prisma/schema.prisma
    
    # Configurar .env
    echo "DATABASE_URL=$neon_url" > .env
    echo "NEXTAUTH_URL=http://localhost:3000" >> .env
    echo "NEXTAUTH_SECRET=$(openssl rand -base64 32)" >> .env
    
    echo "✅ Schema atualizado para PostgreSQL"
else
    # Configurar SQLite
    echo "DATABASE_URL=file:./dev.db" > .env
    echo "NEXTAUTH_URL=http://localhost:3000" >> .env
    echo "NEXTAUTH_SECRET=$(openssl rand -base64 32)" >> .env
    
    echo "✅ Configurado para usar SQLite"
fi

# Gerar Prisma Client
echo "🔧 Gerando Prisma Client..."
npx prisma generate

# Push do schema
echo "📊 Criando tabelas no banco..."
npx prisma db push

# Seed do banco
echo "🌱 Populando banco com dados iniciais..."
npm run db:seed

echo ""
echo "🎉 Setup concluído!"
echo ""
echo "📋 Próximos passos:"
echo "1. Execute 'npm run dev' para iniciar o servidor"
echo "2. Acesse http://localhost:3000"
echo "3. Faça login com:"
echo "   - Admin: admin@eadfacil.com / admin123"
echo "   - Estudante: student@eadfacil.com / student123"
echo ""
echo "🚀 Para deploy na Vercel:"
echo "1. Commit no Git: git add . && git commit -m 'Setup EadFácil'"
echo "2. Push para GitHub"
echo "3. Importe na Vercel"
echo "4. Configure as variáveis de ambiente"
echo ""
if [ "$db_choice" = "2" ]; then
    echo "📌 Você está usando Neon PostgreSQL - pronto para produção!"
else
    echo "📌 Você está usando SQLite - para produção, considere migrar para Neon"
fi