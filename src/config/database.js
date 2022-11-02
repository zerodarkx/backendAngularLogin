const mysql = require('mysql2/promise');

const host = process.env.NODE_ENV == 'prod' ? process.env.PROD_DEV_HOST : process.env.DEV_HOST
const user = process.env.NODE_ENV == 'prod' ? process.env.PROD_DEV_USER : process.env.DEV_USER
const password = process.env.NODE_ENV == 'prod' ? process.env.PROD_DEV_PASSWORD : process.env.DEV_PASSWORD
const database = process.env.NODE_ENV == 'prod' ? process.env.PROD_DEV_DB : process.env.DEV_DB

const connection = async () => {
    return await mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database
    })
}

module.exports = connection;