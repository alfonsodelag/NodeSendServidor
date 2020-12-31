const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.nuevoUsuario = async (req, res) => {

    // Mostrar mensajes de error de express-validator
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        // Si hay errores, enviamos un json de los errores
        return res.status(400).json({ errores: errores.array() });
    }

    // Verificar si el usuario ya estuvo registrado
    const { email } = req.body;

    let usuario = await Usuario.findOne({ email });

    if (usuario) {
        return res.status(400).json({ msg: 'El usuario ya está registrado' });
    }

    // Crear un nuevo usuario
    usuario = new Usuario(req.body);
    console.log(usuario);

    // ! Antes de guardar el usuario, hasheamos el password
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(usuario.password, salt);

    // ! Este trycatch nos ayuda a debuggear el error
    try {
        await usuario.save();
        res.json({ msg: 'Usuario creado correctamente' });
    } catch (error) {
        console.log(error)
    }
}