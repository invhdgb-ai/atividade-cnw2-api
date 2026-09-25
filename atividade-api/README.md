# Atividade CNW II — API de produtos

Projeto da Tarefa 1: **GET e POST usam a mesma tabela `produtos`** de um banco PostgreSQL. A página inicial permite cadastrar e listar produtos.

## Preparar o banco

1. Crie um banco PostgreSQL em um serviço de sua escolha (por exemplo, Neon ou Supabase).
2. Abra o editor SQL desse banco e execute o conteúdo de `schema.sql`.
3. Copie a string de conexão PostgreSQL do provedor. Mantenha a senha em segredo.

## Publicar

1. Crie um repositório no GitHub e envie os arquivos desta pasta, preservando a pasta `api` na raiz do repositório. Não envie `.env`.
2. Na Vercel, escolha **Add New → Project**, importe o repositório, deixe o framework como **Other** e publique.
3. Em **Settings → Environment Variables**, adicione `DATABASE_URL` com a string de conexão do banco para **Production** (e **Preview/Development** se usar esses ambientes). Faça um novo deploy após adicioná-la.
4. Abra `https://SEU-PROJETO.vercel.app` para cadastrar um produto e `https://SEU-PROJETO.vercel.app/api/produtos` para conferir o GET.

## Testar o POST

Use o formulário da página inicial ou execute, substituindo pelo seu endereço:

```bash
curl -X POST 'https://SEU-PROJETO.vercel.app/api/produtos' -H 'Content-Type: application/json' -d '{"nome":"Teclado","preco":59.90}'
```

O POST devolve `201` e o produto criado. O GET devolve `200` e uma lista JSON. O preço é guardado como `NUMERIC`, retornado pelo PostgreSQL como texto no JSON.

## Entregar

Cole na atividade o link do repositório GitHub e os dois links da Vercel (página inicial e `/api/produtos`). A página inicial permite testar tanto o GET quanto o POST. Adicione os nomes da dupla na entrega, se exigidos pelo professor.

## Rodar localmente (opcional)

Crie `.env.local` com `DATABASE_URL=...` (use `.env.example` como referência), instale as dependências com `npm install` e execute `npm run dev`.
Projeto publicado na Vercel
