const { httpError } = require("../utils/handleError");
const { verificarToken } = require("../utils/handleJWT");

const verificarHeaders = (req, res, next) => {
    try {
        const token = req.header('x-token');
        (verificarToken(token)) ? next() : httpError(res, "ERROR_TOKEN_INVALIDO", 401);
    } catch (error) {
        httpError(res, "ERROR_VERIFICAR_HEADERS", 401);
    }
}

module.exports = { verificarHeaders }