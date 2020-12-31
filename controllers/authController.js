const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });
const { validationResult } = require('express-validator');

exports.autenticarUsuario = async (req, res, next) => {

    // ! Revisar si hay errores
    // Mostrar mensajes de error de express-validator
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        // Si hay errores, enviamos un json de los errores
        return res.status(400).json({ errores: errores.array() });
    }

    // Buscar el usuario para ver si está registrado
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });
    // console.log(usuario);

    if (!usuario) {
        res.status(401).json({ msg: 'El Usuario no Existe' });
        return next();
    }

    // Verificar el password y autenticar el usuario
    if (bcrypt.compareSync(password, usuario.password)) {
        // ! Si todo está bien, entonces debemos CREAR UN JWT
        const token = jwt.sign({
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email
        }, process.env.SECRETA, {
            expiresIn: '72h'
        });

        res.json({ token });

    } else {
        res.status(401).json({ msg: "Password incorrecto" });
        return next();
    }

    // Verificar el password y autenticar el usuario

}

exports.usuarioAutenticado = (req, res, next) => {

    res.json({ usuario: req.usuario });
}