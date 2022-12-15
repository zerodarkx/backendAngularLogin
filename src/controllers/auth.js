const { httpError } = require('../utils/handleError');
const { tokenSing, verificarToken } = require('../utils/handleJWT');
const { encriptarPassword, compararPassword } = require('../utils/handlePassword');
const { matchedData } = require('express-validator');
const { connMysql } = require('../config/database');

const validarToken = async (req, res) => {

    const token = req.header('x-token');

    try {

        const { id } = verificarToken(token, process.env.SECRET_JWT_SEED);


        const db = await connMysql();
        const sql = `SELECT * FROM usuarios WHERE id_usuario = '${id}'`
        const [rows] = await db.query(sql);
        const user = rows[0];
        return res.json({
            ok: true,
            msg: 'renew',
            token,
            user
        });

    } catch (error) {
        return httpError(res, "ERROR_LOGIN_USER", 500);
    }


}

const loginUsuario = async (req, res) => {

    try {

        const body = matchedData(req);
        const { user, password } = body;

        const db = await connMysql();

        const sql = `SELECT * FROM usuarios WHERE email = '${user}'`
        const [rows] = await db.query(sql);

        if (rows.length === 0) {
            return httpError(res, 'Usuario no encontrado', 404);
        }

        const users = rows[0];

        const hashPassword = users.password;
        const checkPassword = compararPassword(password, hashPassword);

        if (!checkPassword) {
            return httpError(res, 'El password es incorrecto', 401);
        }

        const data = {
            ok: true,
            token: await tokenSing(users),
            user: users,
            msg: 'usuario logeado'
        }

        res.json(data);
    } catch (error) {
        console.log(error);
        return httpError(res, "ERROR_LOGIN_USER", 500);
    }
}

const nuevoUsuario = async (req, res) => {

    try {

        const body = matchedData(req);
        const { name, email, password } = body;

        const db = await connMysql();

        const sql = `SELECT * FROM usuarios WHERE email = '${email}'`;
        const [rows] = await db.query(sql);

        if (rows.length > 0) { return httpError(res, 'Usuario ya existe en el sistema', 404); }

        const passwordHasheada = encriptarPassword(password);

        const sql2 = `INSERT INTO usuarios (nombre, email, password)
                VALUES ( '${name}', '${email}', '${passwordHasheada}' ) `;

        const [rows2] = await db.query(sql2);

        if (!rows2.insertId) { { return httpError(res, 'error al crear', 404); } }

        const user = {
            id_usuario: rows2.insertId,
            role: 1
        }

        const token = await tokenSing(user);

        const data = {
            token,
            user
        }

        res.json(data);
    } catch (error) {
        console.log(error);
        httpError(res, "ERROR_LOGIN_USER", 500);
    }
}


module.exports = {
    validarToken,
    loginUsuario,
    nuevoUsuario
}