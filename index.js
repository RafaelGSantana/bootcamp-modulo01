const express = require("express");

const server = express();

// Permite o 'express' ler JSON do corpo da requisição (req.body)
server.use(express.json());

// Query params = ?teste=1
server.get("/query", (req, res) => {
  const nome = req.query.nome;

  return res.json({ message: `Hello ${nome}!` });
});

// Route params = /route/1
server.get("/route/:id", (req, res) => {
  const { id } = req.params;
  // const id = req.params.id;

  return res.json({ message: `Buscando id: ${id}, através de Route params` });
});

// CRUD - Create, Read, Update , Delete

// Array de usuários
const users = ["Rafael", "Gabriel", "Manoel"];

// Listando todos os usuários
server.get("/users", (req, res) => {
  return res.json(users);
});

// Lista um usuário (por posição no array)
server.get("/users/:index", (req, res) => {
  const { index } = req.params;

  return res.json(users[index]);
});

// Request body = {"name": "Fulano", "email": "fulano@email.com"}
// Criando usuário
server.post("/users", (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

// Editção de usuário
server.put("/users/:index", (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

// Deletando usuário
server.delete("/users/:index", (req, res) => {
  const { index } = req.params;

  // O método 'splice' vai percorrer o array até a posição informada e deleta a qtdade de posições a partir do index passado.
  users.splice(index, 1);

  return res.send("Usuário deletado com sucesso!");
});

server.listen(3000);
