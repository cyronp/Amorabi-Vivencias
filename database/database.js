const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const database = new sqlite3.Database(path.join(__dirname, 'usuarios.db'));

database.serialize(() => {
  database.run(`
    CREATE TABLE IF NOT EXISTS usuarios(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      nome TEXT NOT NULL,
      cpf TEXT UNIQUE NOT NULL,
      nascimento TEXT NOT NULL,
      senha TEXT NOT NULL
    )
  `)
});

module.exports = database;