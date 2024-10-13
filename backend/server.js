const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

// Inicializando o app Express
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conectando ao banco de dados SQLite
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
  }
});

// Criando a tabela se não existir
db.run(`CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT,
  sobrenome TEXT,
  data_nascimento TEXT,
  genero TEXT,
  estado_civil TEXT,
  cpf_rg TEXT,
  email TEXT,
  telefone TEXT,
  endereco TEXT,
  nome_usuario TEXT,
  senha TEXT,
  identificacao_medica TEXT,
  condicoes_medicas TEXT,
  alergias TEXT,
  medicamentos TEXT
)`);

// Função para converter string para binário
function convertToBinary(data) {
  if (typeof data === 'string') {
    return data.split('').map(char => char.charCodeAt(0).toString(2)).join(' ');
  }
  return '';
}

// Endpoint para receber os dados do frontend e armazená-los no banco de dados
app.post('/api/usuarios', (req, res) => {
  const {
    nome,
    sobrenome,
    data_nascimento,
    genero,
    estado_civil,
    cpf_rg,
    email,
    telefone,
    endereco,
    nome_usuario,
    senha,
    identificacao_medica,
    condicoes_medicas,
    alergias,
    medicamentos
  } = req.body;

  // Converte os dados para binário
  const binaryData = {
    nome: convertToBinary(nome),
    sobrenome: convertToBinary(sobrenome),
    data_nascimento: convertToBinary(data_nascimento),
    genero: convertToBinary(genero),
    estado_civil: convertToBinary(estado_civil),
    cpf_rg: convertToBinary(cpf_rg),
    email: convertToBinary(email),
    telefone: convertToBinary(telefone),
    endereco: convertToBinary(endereco),
    nome_usuario: convertToBinary(nome_usuario),
    senha: convertToBinary(senha),
    identificacao_medica: convertToBinary(identificacao_medica),
    condicoes_medicas: convertToBinary(condicoes_medicas),
    alergias: convertToBinary(alergias),
    medicamentos: convertToBinary(medicamentos),
  };

  db.run(`INSERT INTO usuarios (nome, sobrenome, data_nascimento, genero, estado_civil, cpf_rg, email, telefone, endereco, nome_usuario, senha, identificacao_medica, condicoes_medicas, alergias, medicamentos) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [binaryData.nome, binaryData.sobrenome, binaryData.data_nascimento, binaryData.genero, binaryData.estado_civil, binaryData.cpf_rg, binaryData.email, binaryData.telefone, binaryData.endereco, binaryData.nome_usuario, binaryData.senha, binaryData.identificacao_medica, binaryData.condicoes_medicas, binaryData.alergias, binaryData.medicamentos],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Usuário cadastrado com sucesso!', id: this.lastID });
    }
  );
});

// Endpoint para obter todos os usuários
app.get('/api/usuarios', (req, res) => {
  db.all('SELECT * FROM usuarios', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
