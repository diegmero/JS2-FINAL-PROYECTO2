const db = require('../models/database');

// Obtener todos los registros
exports.getAllRegistros = (req, res) => {
  db.all('SELECT * FROM registros', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ registros: rows });
  });
};

// Agregar un nuevo registro
exports.addRegistro = (req, res) => {
  const { nombre, edad, email, pais, profesion } = req.body;
  if (!nombre || !edad || !email || !pais || !profesion) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  db.run('INSERT INTO registros (nombre, edad, email, pais, profesion) VALUES (?, ?, ?, ?, ?)',
    [nombre, edad, email, pais, profesion],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID });
    }
  );
};

// Otras funciones CRUD como updateRegistro y deleteRegistro se pueden agregar de manera similar
