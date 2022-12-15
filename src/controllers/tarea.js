const { httpError } = require('../utils/handleError');
const { verificarToken } = require('../utils/handleJWT');
const { matchedData } = require('express-validator');

const { connMysql } = require('../config/database');
const { Tarea } = require('../models/tarea');
const { Usuario } = require('../models/usuario');

const nuevaTarea = async (req, res) => {

    const token = req.header('x-token');

    try {

        const body = matchedData(req);
        const { id } = verificarToken(token);
        const dataUsuario = {
            ...body,
            id_usuario: id,
            id_categoria: body.categoria
        }

        const user = await Tarea.create(dataUsuario);

        if (!user) { httpError(res, 'error al crear tarea', 404); }

        const resultado = {
            ok: true,
            mensaje: "Tarea Agregada Correctamente"
        }

        res.json(resultado);
    } catch (error) {
        console.log(error);
        httpError(res, "ERROR_ADD_TAREA", 500);
    }
}

const getTareasPorUsuario = async (req, res) => {

    const token = req.header('x-token');

    try {

        const { id } = verificarToken(token);

        const tareas = await Tarea.findAll({
            where: {
                id_usuario: id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        return res.json({
            ok: true,
            tareas
        });

    } catch (error) {
        httpError(res, "ERROR_GET_TAREA_USUARIO", 500);
    }
}

const deleteTarea = async (req, res) => {
    const { id } = req.params;
    try {
        const db = await database();

        const sql = `DELETE FROM tarseas WHERE id_tarea = ${id}`;
        const [result] = await db.query(sql);
        if (!result.affectedRows) { return httpError(res, 'No se borro nada', 200); }

        const resultado = {
            ok: true,
            mensaje: "Tarea Eliminada Correctamente"
        }

        res.json(resultado);
    } catch (error) {
        httpError(res, 'ERROR_DELETE_TAREA', 500)
    }
}

const getTareas = async (req, res) => {
    const tareas = await Usuario.findAll({
        attributes: ['id_usuario', 'nombre'],
        include: {
            model: Tarea,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            required: true
        }
    })
    res.json(tareas)
}

const getTarea = async (req, res) => {
    const { id_tarea } = req.params;

    try {
        const tarea = await Tarea.findByPk(id_tarea)
        res.json(
            {
                ok: true,
                tarea
            }
        )
    } catch (error) {
        httpError(res, "ERROR_GET_TAREA_ID", 500);
    }

}

module.exports = {
    nuevaTarea,
    getTareasPorUsuario,
    deleteTarea,
    getTareas,
    getTarea
}