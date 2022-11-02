require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

//configuraciones
app.use(morgan('dev'));
app.use(cors());
app.use(express.json())

// Rutas
app.use('/api', require('./routes/index'));


app.listen(process.env.PORT)