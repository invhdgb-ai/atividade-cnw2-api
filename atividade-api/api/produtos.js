import pg from 'pg';

let pool;
function getPool() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL ausente');
  if (!pool) pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 2 });
  return pool;
}

export default async function handler(req, res) {
  res.setHeader('Allow', 'GET, POST');
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  try {
    const db = getPool();
    if (req.method === 'GET') {
      const { rows } = await db.query('SELECT id, nome, preco, criado_em FROM produtos ORDER BY id DESC');
      return res.status(200).json(rows);
    }

    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch { return res.status(400).json({ erro: 'JSON inválido' }); }
    }
    const nome = typeof body?.nome === 'string' ? body.nome.trim() : '';
    const preco = body?.preco;
    if (!nome || nome.length > 100 || typeof preco !== 'number' || !Number.isFinite(preco) || preco < 0 || preco > 99999999.99) {
      return res.status(400).json({ erro: 'Informe nome (até 100 caracteres) e preco numérico não negativo.' });
    }
    const { rows } = await db.query(
      'INSERT INTO produtos (nome, preco) VALUES ($1, $2) RETURNING id, nome, preco, criado_em',
      [nome, preco]
    );
    return res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Erro na API:', error);
    return res.status(500).json({ erro: 'Falha no banco de dados. Confira DATABASE_URL e schema.sql.' });
  }
}
