// Conecta la base de datos
const sequelize = require('../database/index');

// Importación de modelos
const { getModel } = require("../database/index.js");

exports.List = async (req, res) => {
    try {
        const Usuarios = getModel('Usuarios');
        const Productos = getModel('Productos');
        const MediosPago = getModel('Medios_Pago');
        const Estados = getModel('Estados');
        const pedido = await getModel('Pedidos').findAll({
            include: [Usuarios, Productos, MediosPago, Estados]
        });
        res.status(200).send(pedido);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.Listid = async (req, res) => {
    try {
        const Usuarios = getModel('Usuarios');
        const Productos = getModel('Productos');
        const MediosPago = getModel('Medios_Pago');
        const Estados = getModel('Estados');
        const pedido = await getModel('Pedidos').findOne({
            where: {
                id: req.params.id
            },
            include: [Usuarios, Productos, MediosPago, Estados]
        });
        if (pedido) {
            res.status(200).send(pedido);
        } else {
            res.status(404).send(`El pedido no existe.`);
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

 
exports.Update = async (req, res) => {
        try {
            const pedido = await getModel('Pedidos').findOne({
                where: {
                    id: req.params.id
                }
            });
            const actualiza = await pedido.update(req.body);
            if (actualiza) {
                res.status(200).send('El pedido fue actualizado');
            } else {
                res.status(404).send(`El pedido no existe.`);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    };
    
exports.Delete = async (req, res) => {
        try {
            const pedido = await getModel('Pedidos').findOne({
                where: {
                    id: req.params.id
                }
            });
            await pedido.destroy();
            if (pedido) {
                res.status(200).send('El pedido fue eliminado');
            } else {
                res.status(404).send(`El pedido no existe.`);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    };

