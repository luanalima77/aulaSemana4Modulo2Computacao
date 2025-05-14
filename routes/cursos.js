const express = require('express');
const router = express.Router();
const controller = require('../controllers/cursoController');

router.post('/', controller.create);

// Rota para enviar o formulário de edição de curso ao controller
router.post('/edit/:id', controller.update);

// Rota para enviar o pedido de exclusão ao controller
router.post('/delete/:id', controller.delete);

module.exports = router;