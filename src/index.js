require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const { httpError } = require('./utils/handleError');

const { Tarea } = require('./models/tarea');
const { Usuario } = require('./models/usuario');

//configuraciones
app.use(morgan('dev'));
app.use(cors());
app.use(express.json())

const a = async () => {
    try {
        // await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await Tarea.sync({ force: true });
        // const asd = await Usuario.findByPk(2)
        // asd.destroy();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

}
// a();


// Rutas
app.use('/api', require('./routes/index'));

app.all('*', (req, res) => {
    httpError(res, 'NOT FOUND', 404)
})


app.listen(process.env.PORT)