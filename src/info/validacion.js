const { listadoUsuarios } = require('./basedatos');

class Usuario {
    constructor(id, noUsuario, noApellido, mail, telefono, direccion, contrasena, login, esAdmin) {
        this.id = id;
        this.noUsuario = noUsuario;
        this.noApellido = noApellido;
        this.mail = mail;
        this.telefono = telefono;
        this.direccion = direccion;
        this.contrasena = contrasena;
        this.login = login;
        this.esAdmin = esAdmin;
        
    }
}

function loginUsuario(req, res) {
    for (let usuario of listadoUsuarios) {
        if (usuario.noUsuario === req.body.username && usuario.contrasena === req.body.contrasena) {
            usuario.login = true;
            return res.status(200).json(`${usuario.id}`);

        }
    }
    res.status(401).json(`Usuario no encontrado (email y/o contraseña incorrecta)`);
}

function registraUsuario(req, res) {
    let nuevoUsuario = new Usuario();
     
    if (listadoUsuarios.length === 0) {
        nuevoUsuario.id = 1;
    } else {
        nuevoUsuario.id = listadoUsuarios[listadoUsuarios.length - 1].id + 1;
    }

    nuevoUsuario.noUsuario = req.body.noUsuario;
    nuevoUsuario.noApellido = req.body.noApellido;
    nuevoUsuario.mail = req.body.mail;
    nuevoUsuario.telefono = req.body.telefono;
    nuevoUsuario.direccion = req.body.direccion;
    nuevoUsuario.contrasena = req.body.contrasena;
    nuevoUsuario.login = false;
    nuevoUsuario.esAdmin = false;
  

    listadoUsuarios.push(nuevoUsuario);
    res.status(200).json(`El usuario ${nuevoUsuario.id} fue creado con éxito.`);
}

module.exports = { loginUsuario, registraUsuario }
