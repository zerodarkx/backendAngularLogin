const { sequelize } = require('../config/database')
const { DataTypes, STRING } = require('sequelize');


const Usuario = sequelize.define('usuarios', {
    id_usuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: STRING(64)
    },
    email: {
        type: STRING(64)
    },
    password: {
        type: STRING(64)
    }
});

module.exports = { Usuario }