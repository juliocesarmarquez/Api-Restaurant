const jwt = require('jsonwebtoken');
const { createHmac } = require('crypto');

const { getModel } = require("../database/index.js");
/* const { getModel } = require("../database/models/usuarios"); */

function encript(secret) {
    return createHmac('sha256', secret).digest('hex');
}



async function authUsuario(req, res, next) {
    try {
        const usuarioId = Number(req.headers.userid);
        const usu = await getModel('Usuarios').findOne({ where: {id: usuarioId }});
        const authHeader = req.headers.authorization || '';
        const token = authHeader.replace('Bearer ', '');
        jwt.verify(token, usu.contrasena, (err, decoded) => {
            if (err) {
                console.log(err);
                res.status(401).send('Token incorrecto');
            } else {
                req.user = decoded;
                next();
            }
        })
    } catch {
        res.status(404).json(`Error al comprobar token`);
    }
}

async function authRegistro(req, res, next) {
    try {
        const ema = await getModel('Usuarios').findOne({ where: {email: req.body.email} });
        const usu = await getModel('Usuarios').findOne({ where: {nombreUsuario: req.body.nombreUsuario} });
        if (ema) {
            return res.status(406).json("Email ya se encuentra registrado");
        }
        if (usu) {
            return res.status(406).json("Nombre de usuario ya registrado");
        }
        if (req.body.nombreUsuario === null || req.body.nombreUsuario === undefined) {
            return res.status(406).json("Nombre de usuario inválido");
        } else if (req.body.nombreApellido === null || req.body.nombreApellido === undefined) {
            return res.status(406).json("Nombre y apellido inválidos");
        } else if (req.body.direccion === null || req.body.direccion === undefined) {
            return res.status(406).json("Direción inválida");
        } else if (req.body.email === null || req.body.email === undefined) {
            return res.status(406).json("Email inválido");
        } else if (req.body.telefono === null || req.body.telefono === undefined) {
            return res.status(406).json("Teléfono inválido");
        } else if (req.body.contrasena === null || req.body.contrasena === undefined) {
            return res.status(406).json("Contraseña inválida");
        } else {
            return next();
        }

    } catch {
        res.status(404).json(`Se produjo un error`);
    }
}

/* async function midLogin(req, res, next) {
    try {
        const usuarioId = Number(req.headers.userid);
        const usu = await getModel('Usuarios').findOne({ id: usuarioId });
        if (usu.login === true) {
            return next();
        } else {
            res.status(406).json("Usted debe loguearse");
        }

    } catch {
        res.status(404).json(`Se produjo un error`);
    }
}
 */
    function authLogin(req, res, next) {
    if (req.body.nombreUsuario === null || req.body.nombreUsuario === undefined) {
        res.status(406).json("Nombre de usuario inválido");
    } else if (req.body.contrasena === null || req.body.contrasena === undefined) {
        res.status(406).json("Contraseña inválida");
    } else {
        return next();
    }
} 


/* 
async function midSuspendido(req, res, next) {
    const usuarioId = Number(req.headers.usuarioid);
    const usu = await getModel('Usuarios').findOne({ where: {id: usuarioId} });
    if (usu.suspendido === true) {
        res.status(401).json(`Usted está suspendido`);
    } else {
        return next();
    }
}
 */
async function authAdmin(req, res, next) {
    try {
        if (!req.headers.authorization) {
            console.error("Acceso denegado por falta de información de autorización");
            res.status(403).send({ status: 'Acceso denegado' })
        } else {
            const token = req.headers.authorization.split(' ')[1]
            jwt.verify(token, process.env.JWT_SECRET_KEY, (err, authData) => {
                if (err) {
                    console.error("Acceso denegado: " + err.message);
                    res.status(403).send({ status: 'Acceso denegado' })
                } else {
                    req.authData = authData;
                    next();
                }
            });
        }
    }
    catch (err) {
        console.error("Error interno: " + err.message);
        res.status(500).send({ status: 'Error interno' });
    }
};
module.exports = {
    authAdmin,
    authUsuario, 
    authRegistro,
    authLogin,
    /* midLogin */
/*     midSuspendido, */
    encript 
}