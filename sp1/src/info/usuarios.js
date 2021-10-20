const { listadoUsuarios } = require("./basedatos");

function verUsuarios(req, res) {
    res.status(200).json(listadoUsuarios);
}


module.exports = { verUsuarios }
