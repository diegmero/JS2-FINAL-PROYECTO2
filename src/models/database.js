const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.sqlite');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS registros (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      edad INTEGER NOT NULL,
      email TEXT NOT NULL,
      pais TEXT NOT NULL,
      profesion TEXT NOT NULL
    )
  `);
});

module.exports = db;
