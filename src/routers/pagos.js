const { Router } = require('express');
const { getModel } = require('../database');
const { verifyToken, verifyAdmin, verifySuspend } = require('../middlewares/middlewares');

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
                res.status(404).send(`Pagos with ID ${req.params.id} does not exist.`);
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
                res.status(500).send('Could not save the payment.');
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
                res.status(200).send('Pagos updated');
            } else {
                res.status(404).send(`Pagos with ID ${req.params.id} does not exist.`);
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
                res.status(200).send('Pagos deleted');
            } else {
                res.status(404).send(`Pagos with ID ${req.params.id} does not exist.`);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    return router;
}

module.exports = {
    creaPagosRouter
}