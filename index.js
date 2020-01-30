const express = require("express");

const server = express();

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

// Buscando usuário através da posição no array.
const users = ["Rafael", "Gabriel", "Manoel"];

server.get("/users/:index", (req, res) => {
  const { index } = req.params;

  return res.json(users[index]);
});

server.listen(3000);
