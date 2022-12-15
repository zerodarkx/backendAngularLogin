const { check } = require('express-validator');
const validacionResultado = require('../utils/handleValidator');

const validacionCrearTarea = [
    check("titulo")
        .notEmpty()
        .withMessage('El titulo no debe ser vacío'),    
    check("descripcion")
        .notEmpty()
        .withMessage('El descripcion no debe ser vacío'),
    check("categoria")
        .notEmpty()
        .withMessage('El categoria no debe ser vacío'),
    check("fecha_termino")
        .notEmpty()
        .withMessage('El fechaTermino no debe ser vacío'),
    (req, res, next) => {
        return validacionResultado(req, res, next);
    }
]

module.exports = {
    validacionCrearTarea
};