const { Router } = require('express');
const router = Router();

const { validatorLogin, validatorCrearUSuario } = require('../validators/auth');

const { validarToken, loginUsuario, nuevoUsuario } = require('../controllers/auth');
const { verificarHeaders } = require('../middlewares/headerMiddleware');

// crear usuario
router.post('/new', [
    validatorCrearUSuario
], nuevoUsuario)

// Logion de usuario
router.post('/login', [
    validatorLogin
] ,loginUsuario)

// validar y revalidar jsonwebtoken
router.get('/renew', [
    verificarHeaders
], validarToken)


module.exports = router;