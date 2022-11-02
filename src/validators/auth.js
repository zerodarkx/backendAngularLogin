const { check } = require('express-validator');
const validacionResultado = require('../utils/handleValidator');

const validatorLogin = [
    check("user")
        .isEmail()
        .withMessage('El email no es válido')
        .exists()
        .withMessage('El Campo Ingresado no Existe')
        .notEmpty()
        .withMessage('El email no debe ser vacío'),
    check("password")
        .isLength({ min: 6 })
        .withMessage('El password debe tener al menos 6 caracteres')
        .exists()
        .withMessage('El campo Ingresado no Existe'),
    (req, res, next) => {
        return validacionResultado(req, res, next);
    }
]

const validatorCrearUSuario = [
    check('name')
        .notEmpty()
        .withMessage('Falta Ingresar el nombre'),
    check("email")
        .isEmail()
        .withMessage('El email no es válido')
        .exists()
        .withMessage('El Campo Ingresado no Existe')
        .notEmpty()
        .withMessage('El email no debe ser vacío'),
    check("password")
        .isLength({ min: 6 })
        .withMessage('El password debe tener al menos 6 caracteres')
        .exists()
        .withMessage('El campo Ingresado no Existe'),
    (req, res, next) => {
        return validacionResultado(req, res, next);
    }
]

module.exports = {
    validatorLogin,
    validatorCrearUSuario
};