const { listadoUsuarios, platos, listadoPedidos, formaPago } = require("../info/basedatos");

function validAdmin(req, res, next) {
    for (const usuario of listadoUsuarios) {
        if (usuario.id === Number(req.headers.userid)) {
            if (usuario.esAdmin === true) {
                return next();
            }
        }
    }
    res.status(401).json("No es administrador");
}


function validaRegistro(req, res, next) {
    for (let nuevoUsuario of listadoUsuarios) {
    if (nuevoUsuario.mail === req.body.mail) {
            res.status(406).json(`El email ya esta registrado`);
            return;
        }
    }
    if (req.body.noUsuario === null || req.body.noUsuario === undefined) {
        res.status(406).json(`Nombre de usuario inválido`);
    } else if (req.body.noApellido === null || req.body.noApellido === undefined) {
        res.status(406).json(`Nombre y apellido inválidos`);
    } else if (req.body.mail === null || req.body.mail === undefined) {
        res.status(406).json(`Email inválido`);
    } else if (req.body.telefono === null || req.body.telefono === undefined) {
        res.status(406).json(`Teléfono inválido`);
    } else if (req.body.direccion === null || req.body.direccion === undefined) {
        res.status(406).json(`Direción inválida`);
    } else if (req.body.contrasena === null || req.body.contrasena === undefined) {
        res.status(406).json(`Contraseña inválida`);
    } else {
        return next();
    }
}


function validaLogin(req, res, next) {
    for (const usuario of listadoUsuarios) {
        if (usuario.id === Number(req.headers.userid)) {
            if (usuario.esAdmin === false) {
                return next();
            }
        }
    }
    res.status(401).json("No es un usuario válido");
};





function midLogin(req, res, next) {
    for (let usuario of listadoUsuarios) {
        if (usuario.id === Number(req.headers.userid)) {
            if (usuario.login) {
                return next();
            } else {
                res.status(406).json("Usted debe loguearse");
            }
        }
    }
    res.status(401).json("Id de Usuario inválido");
}

/* function midId */

module.exports = { validAdmin, validaRegistro, validaLogin, midLogin/* , midId  */ }
