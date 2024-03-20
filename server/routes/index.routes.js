const express = require('express');
const router = express.Router();

// controlle

const indexController = require('../controller/index.controller.js');


//Rutas
router.get('/', indexController.index);
router.post('/analizar', indexController.analizar);




module.exports = router;
