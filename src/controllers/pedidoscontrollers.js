// Conecta la base de datos
const sequelize = require('../database/index');

// Importación de modelos
const { getModel } = require("../database/index.js");

exports.List = async function (req, res, next) {
    try {
        const todos = await pedidoModel.findAll();
        console.log(todos);
        res.json(todos);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ status: 'Error interno', texto: err.message });
    }
};

exports.Add = async function (req, res)  {
    try {
        const ped = await pedidoModel.findAll();
        const nuevoPedido = new pedidoModel();
        if (ped.length === 0) {
            nuevoPedido.id = 1;
        } else {
            nuevoPedido.id = ped[ped.length - 1].id + 1;
        }
        nuevoPedido.estado = 1;
        nuevoPedido.horario = new Date();
        nuevoPedido.metodopago = 0;
        nuevoPedido.montopago = 0;
        nuevoPedido.usuarioId = Number(req.headers.userid);
        await nuevoPedido.create();
        res.status(200).json(`El pedido ${nuevoPedido.id} creado por el usuario ${nuevoPedido.usuarioId}`);
    } catch {
        res.status(400).json(`Su pedido no pudo ser guardado`);
    }
}
