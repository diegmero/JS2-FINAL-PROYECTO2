const express = require('express');
const router = express.Router();
const registrosController = require('../controllers/registrosController');

// Rutas para operaciones CRUD sobre registros
router.get('/registros', registrosController.getAllRegistros);
router.post('/registros', registrosController.addRegistro);
// Si deseas agregar más rutas para actualizar y eliminar registros, puedes hacerlo de manera similar

module.exports = router;
