const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.post('/',
    // Validando con Check 
    [
        // Chequeamos que realmente hayan puesto un email válido
        check('email', 'Agrega un email válido').isEmail(),

        // Chequeamos que no hayan dejado el password vacío
        check('password', 'El password no puede ir vacío').not().isEmpty()
    ],
    authController.autenticarUsuario
)

router.get('/',
    auth,
    authController.usuarioAutenticado
)

module.exports = router;