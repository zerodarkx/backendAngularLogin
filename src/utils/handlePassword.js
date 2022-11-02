const bcrypts = require('bcryptjs');

/**
 * 
 * @param {*} password 
 * @returns 
 */
const encriptarPassword = (password) => {
    const salt = bcrypts.genSaltSync(10);
    return bcrypts.hashSync(password, salt);
}

/**
 * 
 * @param {*} password 
 * @param {*} encriptado 
 * @returns 
 */
const compararPassword = (password, encriptado) => {
    return bcrypts.compareSync(password, encriptado);
}

module.exports = { encriptarPassword, compararPassword };