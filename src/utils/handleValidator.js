const { validationResult } = require('express-validator');

const validacionResultado = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (error) {
        res.status(403)
            .json({
                ok: false,
                messages: error.array()
            });
    }
}

module.exports = validacionResultado;