const { httpError } = require('../utils/handleError');
const { database } = require('../config/database');

const getData = async (req, res) => {

    const token = req.header('x-token');
    console.log(req.header('sql'))
    try {
        const db = await database();
        const sql = req.header('sql')
        const [rows] = await db.query(sql);
        const data = rows;

        return res.json({
            ok: true,
            data
        });

    } catch (error) {
        return httpError(res, "ERROR_GET", 500);
    }
}

const postData = async (req, res) => {
    try {
        const db = await database();
        const sql = req.body.sql;
        const [rows] = await db.query(sql);
        if (!rows.insertId) { return httpError(res, 'error al insertar', 404); }

        const resultado = {
            ok: true,
            mensaje: "agregado"
        }

        res.json(resultado);
    } catch (error) {
        return httpError(res, "ERROR_POST", 500);
    }
}

module.exports = { getData, postData }