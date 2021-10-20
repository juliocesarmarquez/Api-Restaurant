const jwt = require('jsonwebtoken');
const { createHmac } = require('crypto');
// Conecta la base de datos
const sequelize = require('../database/index');

// Importación de modelos
const { getModel } = require("../database/index.js");
//encript
function encript(secret) {
    return createHmac('sha256', secret).digest('hex');
}


exports.List = async function (req, res, next) {
    try {
        const todos = await getModel('Usuarios').findAll();
        console.log(todos);
        res.json(todos);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'Error interno', texto: err.message });
    }
};

exports.Registro = async (req, res) => {
    try {
        const Usuario = getModel('Usuarios');

        const nuevoUsuario = await new Usuario();

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


    } catch (e) {
        console.log(e);
        res.status(400).json(`Error al registrar un usuario`);
    }
};

// login usuario
/* exports.Login = async (req, res) => {
        try {
            const usu = await getModel('Usuarios').findOne({ where: {nombreUsuario: req.body.nombreUsuario} });
            if (usu.contrasena === encript(req.body.contrasena)) {
                const token = jwt.sign({ nombreUsuario: usu.nombreUsuario }, usu.contrasena, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES_IN});
                usu.login = true;
                await usu.save();
                res.status(200).json({
                    Usuario: usu.nombreUsuario,
                    Token: token
                })
            } else {
                res.status(404).json(`Contraseña invalida`);
            }
        } catch {
            res.status(404).json(`Error al loguearse`);
        }

    }; */

exports.Login = async (req, res) => {
    try {
        const { JWT_SECRET } = process.env;
        const usuario = await getModel('Usuarios').findOne({
            where: {
                nombreUsuario: req.body.nombreUsuario,
                contrasena: encript(req.body.contrasena)
            }
        });
        if (usuario !== null) {
            jwt.sign({
                usuario
            }
                , JWT_SECRET, (err, token) => {
                    res.json({ token })
                });
        } else {
            throw new Error('Error al iniciar sesión');
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

//usuario suspendido
exports.Suspendido = async (req, res) => {
    try {
        const usuarioId = Number(req.params.idUsuario);
        const usu = await Usuario.findOne({ where: { id: usuarioId } });
        usu.suspendido = req.body.suspendido;
        usu.save();
        res.status(200).json(`El estado de suspensión de ${usu.nombreUsuario} ha sido modificado a ${usu.suspendido}`);
    } catch {
        res.status(404).json(`Error al suspender usuario`);
    }
}

