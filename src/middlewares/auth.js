const jwt = require('jsonwebtoken');
const { createHmac } = require('crypto');
const dotenv = require("dotenv");
const { getModel } = require("../database/index.js");


function encript(secret) {
    return createHmac('sha256', secret).digest('hex');
}



async function authUsuario(req, res, next) {
    try {
        const usuarioId = Number(req.headers.id);
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
        res.status(403).json(`Se produjo un error`);
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

function authAdmin(req, res, next) {
    const { JWT_SECRET } = process.env
    jwt.verify(req.token, JWT_SECRET, (error, authData) => {
        console.log(error)
        console.log(authData)
        if (authData.usuario.admin === true) {
            
           return next();
        }
        else {
            res.status(404).send(`No esta autorizado.`);
        }
    })
};


function verificaToken (req, res,next){
    bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const {JWT_SECRET} = process.env;
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken
        jwt.verify(req.token,JWT_SECRET, (error, authData) =>{
            if(error){
                console.log(error)
                return res.send("No es válido");
            }
            req.nombreUsuario = authData
            return next();
        })
    } else {
        res.send("No se encuentra token")
    }

}








module.exports = {
    authAdmin,
    authUsuario, 
    authRegistro,
    authLogin,
    /* midLogin */
/*     midSuspendido, */
    encript,
    verificaToken
}