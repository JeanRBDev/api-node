const express = require('express');
const router = express.Router();

const UsuariosController = require('../controllers/usuarios-controller');

// RETORNA TODOS OS USUÁRIOS CADASTRADOS
router.get('/', UsuariosController.getUsuarios)

// RETORNA USUÁRIOS POR ID
router.get('/:id_usuario', UsuariosController.getUsuarioById)

// CADASTRA USUÁRIOS
router.post('/', UsuariosController.postUsuario)

// ATUALIZA SENHA
router.patch('/atualizar/senha', UsuariosController.updateSenha)

// DELETA UM USUÁRIO
router.delete('/delete/:id_usuario', UsuariosController.removeUsuario)

module.exports = router;
