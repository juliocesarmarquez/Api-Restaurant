const { Router } = require('express');
const { getModel } = require('../database');
const { verifyToken, verifyAdmin, verifySuspend } = require('../middlewares/middlewares');
const jwt = require('jsonwebtoken');
const { getConnection } = require('../database/index');

function creaPedidosRouter(params) {
    const router = new Router();

    router.get('/pedidos/', verifyToken, verifyAdmin, async (req, res) => {
        try {
            const Usuarios = getModel('Usuarios');
            const Productos = getModel('Productos');
            const Pagos = getModel('Pagos');
            const Estados = getModel('Estados');
            const Pedidos = await getModel('Pedidos').findAll({
                include: [Usuarios, Productos, Pagos, Estados]
            });
            res.status(200).send(Pedidos);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.get('/pedidos/:id', verifyToken, verifyAdmin, async (req, res) => {
        try {
            const Usuarios = getModel('Usuarios');
            const Productos = getModel('Productos');
            const Pagos = getModel('Pagos');
            const Estados = getModel('Estados');
            const Pedidos = await getModel('Pedidos').findOne({
                where: {
                    id: req.params.id
                },
                include: [Usuarios, Productos, Pagos, Estados]
            });
            if (Pedidos) {
                res.status(200).send(Pedidos);
            } else {
                res.status(404).send(`El pedido no existe.`);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.post('/pedidos/', verifyToken, verifySuspend, async (req, res) => {
        const sequelize = getConnection();
        const { direccion, productosB } = req.body;
        const transaccion = await sequelize.transaction();
        const usuariosId = req.user.mail.id
        const pagos = Number(req.body.PagosId);
        const Pedidos = getModel('Pedidos');
        const Productos = getModel('Productos');
        const Pagos = getModel('Pagos');
        const Estados = getModel('Estados');
        const Usuarios = getModel('Usuarios');
        const ProductoPedido = getModel('ProductoPedido');
        const est = await Estados.findOne({ where: { id: 1 } });
        const pagar = await Pagos.findOne({ where: { id: pagos } });
        const per = await Usuarios.findOne({ where: { id: usuariosId } });

        try {
            const prods = [];
            for (producto of productos) {
                const prod = await Productos.findAll({ where: { id: productosB.id } }, { transaction: transaccion });
                if (!prod) {

                    res.status(404).send(`El pedido no existe.`);

                } else { prods.push([prod, productosB.cantidad]); }
            }
            const pedidos = await Pedidos.create({ EstadosId: est.id, PagosId: pagar.id, UsuariosId: per.id, direccion }, { transaction: transaccion });
            for (Pedidos of prods) {
                const [prod, cantidad] = Pedidos;
                const total = prod[0].dataValues.precio * cantidad;
                await ProductoPedido.create({ ProductosId: prod[0].dataValues.id, PedidosId: pedidos.id, cantidad: cantidad, total: total }, { transaction: transaccion });
            }
            await transaccion.commit();
            const r = await Pedidos.findOne({
                where: {
                    id: pedidos.id
                }, include: [Productos]
            });
            res.json(r);
        } catch (error) {
            await transaccion.rollback();
            res.status(500).send('El producto no existe. Revise el menú.');
        }
    });
    router.put('/pedidos/:id', verifyToken, verifyAdmin, async (req, res) => {
        try {
            const Pedidos = await getModel('Pedidos').findOne({
                where: {
                    id: req.params.id
                }
            });
            const updated = await Pedidos.update(req.body);
            if (updated) {
                res.status(200).send('El pedido fue actualizado');
            } else {
                res.status(404).send(`El pedido no existe.`);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.delete('/pedidos/:id', verifyToken, verifyAdmin, async (req, res) => {
        try {
            const Pedidos = await getModel('Pedidos').findOne({
                where: {
                    id: req.params.id
                }
            });
            await Pedidos.destroy();
            if (Pedidos) {
                res.status(200).send('El pedido fue eliminado');
            } else {
                res.status(404).send(`El pedido no existe.`);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.get('/historial/', verifyToken, verifySuspend, async (req, res) => {
        try {
            const { JWT_SECRET } = process.env;
            jwt.verify(req.token, JWT_SECRET, async (error, authData) => {
                if (error) {
                    res.status(500).send({ message: error.message });
                } else {
                    const Productos = getModel('Productos');
                    const Pagos = getModel('Pagos');
                    const Estados = getModel('Estados');
                    const Pedidos = await getModel('Pedidos').findAll({
                        where: { UsuariosId: authData.mail.id },
                        include: [Productos, Pagos, Estados]
                    });
                    res.status(200).send(Pedidos);
                }
            })
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    return router;
}

module.exports = {
    creaPedidosRouter
}