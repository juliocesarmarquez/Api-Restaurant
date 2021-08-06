const { listadoUsuarios } = require("./basedatos");

function verUsuarios(req, res) {
    res.status(200).json(listadoUsuarios);
}

function eliminarUsuario(req, res) {
    for (let usuario of listadoUsuarios) {
        if (usuario.id === req.headers.userid) {
            let usuarioIndex = listadoUsuarios.indexOf(usuario);
            listadoUsuarios.splice(usuarioIndex, 1);
            res.status(200).json(`El usuario ${usuario.id} ha sido eliminado.`);
        }
    }
}

/* function modificarUsuario
 */

module.exports = { verUsuarios,  eliminarUsuario/* , modificarUsuario  */}
