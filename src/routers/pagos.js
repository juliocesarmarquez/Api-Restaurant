const { Router } = require('express');
const { getModel } = require('../database');
const { verifyToken, verifyAdmin, verifySuspend } = require('../middlewares/middlewares');
const axios = require('axios');

function creaPagosRouter(params) {
    const router = new Router();

    router.get('/mediopago/', verifyToken, verifySuspend, async (req, res) => {
        try {
            const pagos = await getModel('Pagos').findAll();
            res.status(200).send(pagos);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.get('/mediopago/:id',verifyToken, verifyAdmin, async (req, res) => {
        try {
            const pagos = await getModel('Pagos').findOne({
                where: {
                    id: req.params.id
                }
            });
            if (pagos) {
                res.status(200).send(pagos);
            } else {
                res.status(404).send(`El medio de pago no existe.`);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.post('/mediopago/',verifyToken, verifyAdmin, async (req, res) => {
        try {
            const Pagos = getModel('Pagos');
            const pagos = new Pagos(req.body);
            const saved = await pagos.save()
            if (saved) {
                res.status(201).send(saved);
            } else {
                res.status(500).send('No se pudo guardar el medio de pago.');
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.put('/mediopago/:id',verifyToken, verifyAdmin, async (req, res) => {
        try {
            const pagos = await getModel('Pagos').findOne({
                where: {
                    id: req.params.id
                }
            });
            const updated = await pagos.update(req.body);
            if (updated) {
                res.status(200).send('Medio de pago actualizado');
            } else {
                res.status(404).send(`El medio de pago no existe.`);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.delete('/mediopago/:id',verifyToken, verifyAdmin, async (req, res) => {
        try {
            const pagos = await getModel('Pagos').findOne({
                where: {
                    id: req.params.id
                }
            });
            await pagos.destroy();
            if (pagos) {
                res.status(200).send('Medio de pago eliminado');
            } else {
                res.status(404).send(`El medio de pago no existe.`);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.post('/pagar/', verifyToken, async (req, res) => {
        try {
            const order = req.body.PedidoId
            const data = await getModel('ProductoPedidos').findOne({
                where: { PedidoId: order }
            });
            console.log(data.total)
            const pedido = {
                "intent": "CAPTURE",
                "purchase_units": [
                    {
                        "reference_id":data.PedidoId,
                        "amount": {
                            "currency_code": "USD",
                            "value": data.total
                        }
                    }
                ],
                "application_context": {
                    "brand_name": "Home",
                    "landing_page": "LOGIN",
                    "user_action": "PAY_NOW",
                    "return_url": "http://localhost:3000/api/confirmapago/",
                    "cancel_url": "http://localhost:3000/api/historial/"
                },
            }
            const response = await axios.post(`${process.env.PAYPAL_API}/v2/checkout/orders`, pedido, {
                "auth": {
                    "username": process.env.PAYPAL_CLIENTID,
                    "password": process.env.PAYPAL_SECRET
                }
            });
            //console.log(response.data)
            res.status(200).send(response.data);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.get('/confirmapago/', /* verifyToken */ async (req, res) => {
        try {
            const { token } = req.query
            const response = await axios.post(`${process.env.PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, {
                "auth": {
                    "username": process.env.PAYPAL_CLIENTID,
                    "password": process.env.PAYPAL_SECRET
                }
            });
        if (response.data.status === 'COMPLETED') {
            const status1 = await getModel('Pedidos').findOne({
                where: {id: response.data.purchase_units[0].reference_id}
                });
                const estado = status1.update({EstadoId: 2})
                res.status(200).send('Su pago fue realizado con Éxito!');
                return estado
            }
        }
        catch (error) {
            res.status(500).send({ message: error.message });
        }
    })
    return router;
}

module.exports = {
    creaPagosRouter
}