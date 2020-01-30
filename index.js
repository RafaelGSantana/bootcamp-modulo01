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

// Middleware global - retorna no console o método requisitado (req.method) e a rota (req.url). Console time e timeEnd
// obrigatóriamente com o mesmo nome (Request), calcula o tempo que a requisição, representada por next, demorou.
server.use((req, res, next) => {
  console.time("Request");
  console.log(`Método ${req.method}; URL: ${req.url}`);

  next(); // Representa a requisição (CRUD) feita.
  console.timeEnd("Request");
});

// Middleware local - Retorna um erro caso não seja passado nenhum nome no req.body
function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is required" });
  }

  return next();
}

// Middleware local - Verifica se o usuário informado no req.body existe.
function checkUserInArray(req, res, next) {
  const user = users[req.params.index];
  if (!user) {
    return res.status(400).json({ error: "User does not exists" });
  }

  req.user = user; // Toda rota que utiliza este middleware (checkUserInArray) terá acesso a req.user

  return next();
}

// Listando todos os usuários
server.get("/users", (req, res) => {
  return res.json(users);
});

// Lista um usuário (por posição no array)
server.get("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;

  return res.json(req.user);
});

// Request body = {"name": "Fulano", "email": "fulano@email.com"}
// Criando usuário
server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

// Editção de usuário
server.put("/users/:index", checkUserExists, checkUserInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

// Deletando usuário
server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;

  // O método 'splice' vai percorrer o array até a posição informada e deleta a qtdade de posições a partir do index passado.
  users.splice(index, 1);

  return res.send("Usuário deletado com sucesso!");
});

server.listen(3000);
