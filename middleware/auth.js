const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');

    if (authHeader) {
        // Obtener el Token
        // "Bearer" es la posición [0] y el token será la [1]
        const token = authHeader.split(' ')[1];

        // Comprobar el JWT
        try {
            const usuario = jwt.verify(token, process.env.SECRETA);
            console.log(usuario);
            req.usuario = usuario;
        } catch (error) {
            console.log(error);
            console.log('JWT no válido');
        }
    }

    return next();
}