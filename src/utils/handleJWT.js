const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_TOKEN;

/**
 * Debes pasar el objeto del usuario
 * @param {*} user 
 */
const tokenSing = (user) => {

    const payload = {
        id: user.id_usuario,
        name: user.nombre,
        email: user.email,
        role: user.role
    }

    return new Promise((resolve, reject) => {
        jwt.sign(payload, jwt_secret, { expiresIn: '1h' },
            (err, token) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(token)
                }
            })
    })
}

/**
 * debo pasar el token de verificacion
 * @param {*} token 
 * @returns 
 */
const verificarToken = (token) => {
    try {
        return jwt.verify(token, jwt_secret);
    } catch (error) {
        return null;
    }
}

module.exports = { tokenSing, verificarToken }