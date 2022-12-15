const { sequelize } = require('../config/database')
const { DataTypes, INTEGER, STRING, TEXT } = require('sequelize');
const { Usuario } = require('./usuario');


const Tarea = sequelize.define('tareas', {
    id_tarea: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_usuario: {
        type: INTEGER,
        allowNull: false
    },
    id_categoria: {
        type: INTEGER,
        allowNull: false
    },
    titulo: {
        type: STRING(32),
        allowNull: false
    },
    descripcion: {
        type: TEXT
    },
    fecha_termino:{
        type: DataTypes.DATE,
        allowNull: false
    }
},{
    timestamps: true
});

Usuario.hasMany(Tarea, {
    foreignKey: 'id_usuario'
});
Tarea.belongsTo(Usuario, {
    foreignKey: 'id_usuario'
});

module.exports = { Tarea }