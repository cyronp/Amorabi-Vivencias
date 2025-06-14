const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const database = new sqlite3.Database(
  path.join(__dirname, "../database/usuarios.db")
);
const router = express.Router();

// REALIZAR LOGIN
router.post("/login", (req, res) => {
  const { email, senha } = req.body;

  database.get(
    "SELECT * FROM usuarios WHERE email = ?",
    [email],
    async (err, user) => {
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      if (!user)
        return res.status(401).json({ error: "Usuário não encontrado" });

      console.log(user)

      const match = await bcrypt.compare(senha, user.senha);
      if (!match) return res.status(401).json({ error: "Senha incorreta" });

      res.json({ message: "Login bem-sucedido", nome: user.nome });
    }
  );
});

// REALIZAR REGISTRO
router.post("/register", async (req, res) => {
  const { email, nome, cpf, nascimento, senha } = req.body;
  const hashedPassword = await bcrypt.hash(senha, 10);

  console.log(req.body)

  database.run(
    `INSERT INTO usuarios (email, nome, cpf, nascimento, senha)
    VALUES (?, ?, ?, ?, ?)`,
    [email, nome, cpf, nascimento, hashedPassword],
    function (err) {
      if (err)
        return res.status(400).json({ error: "Erro ao registrar usuário" });
      res.status(201).json({ message: "Usuário registrado com sucesso" });
    }
  );
});

module.exports = router;