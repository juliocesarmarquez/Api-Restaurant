// Conecta la base de datos
const sequelize = require('../database/index');

// Importación de modelos
const usuarioModel = require('../database/models/usuarios');
const tableName = 'usuarios';

exports.List = async function (req, res, next) {
    try {
        const todos = await usuarioModel.findAll();
        console.log(todos);
        res.json(todos);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'Error interno', texto: err.message });
    }
};

exports.Add = async (req, res) => {
    try {
        const usu = await Usuario.find();
        const nuevoUsuario = await new Usuario();
        if (usu.length === 0) {
            nuevoUsuario.id = 1;
        } else {
            nuevoUsuario.id = usu[usu.length - 1].id + 1;
        }
        nuevoUsuario.nombreUsuario = req.body.nombreUsuario;
        nuevoUsuario.nombreApellido = req.body.nombreApellido;
        nuevoUsuario.direccion = req.body.direccion;
        nuevoUsuario.email = req.body.email;
        nuevoUsuario.telefono = req.body.telefono;
        nuevoUsuario.contrasena = encript(req.body.contrasena);
        nuevoUsuario.admin = false;
        nuevoUsuario.suspendido = false;
        await nuevoUsuario.save();
        res.status(200).json(`El usuario ${nuevoUsuario.nombreUsuario} ha sido registrado con éxito`);
    } catch(e) {
        console.log(e);
        res.status(400).json(`Error al registrar un usuario`);
    }
};