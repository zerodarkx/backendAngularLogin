const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

const host = process.env.NODE_ENV == 'prod' ? process.env.PROD_DEV_HOST : process.env.DEV_HOST
const user = process.env.NODE_ENV == 'prod' ? process.env.PROD_DEV_USER : process.env.DEV_USER
const password = process.env.NODE_ENV == 'prod' ? process.env.PROD_DEV_PASSWORD : process.env.DEV_PASSWORD
const database = process.env.NODE_ENV == 'prod' ? process.env.PROD_DEV_DB : process.env.DEV_DB

const connMysql = async () => {
    return await mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database
    })
}

const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: 'mysql',
    // logging: false
});

module.exports = { connMysql, sequelize };