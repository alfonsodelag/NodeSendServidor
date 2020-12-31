const express = require('express');
const router = express.Router();
const enlacesController = require('../controllers/enlacesController');
const archivosController = require('../controllers/archivosController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.post('/',
    [
        check('nombre', 'Sube un Archivo').not().isEmpty(),
        check('nombre_original', 'Sube un Archivo').not().isEmpty(),
    ],
    auth,
    // ! Esto es un ejemplo de un middleware
    enlacesController.nuevoEnlace
);

router.get('/',
    // ! Esto es un ejemplo de un middleware
    enlacesController.todosEnlaces);

router.get('/:url',
    // ! Esto son ejemplos de middlewares
    enlacesController.tienePassword,
    enlacesController.obtenerEnlace);

router.post('/:url',
    // ! Esto es un ejemplo de un middleware
    enlacesController.verificarPassword,
    enlacesController.obtenerEnlace
);

module.exports = router;

