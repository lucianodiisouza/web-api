const express = require('express');
const controller = require('../controller/usuario');

const router = express.Router();

router.get('/usuario/:id', controller.buscaUsuario);
router.get('/usuarios', controller.buscaTodosUsuarios);
router.post('/usuario', controller.criarUsuario);
router.put('/usuario/:id', controller.atualizarUsuario);
router.delete('/usuario/:id', controller.excluirUsuario);

module.exports = router;