const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

var corsOptions = {
    origin : "*"

}

app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));

//rutas

//default
app.use((req,res,next) => {
    res.status(404).send("No se encontro la ruta");

});
module.exports = app;
