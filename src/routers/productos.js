const { Router } = require('express');
const { getModel } = require('../database');
const { verifyToken, verifyAdmin, verifySuspend } = require('../middlewares/middlewares');
const { cache, storeObjectInCache, invalidateCache } = require('../middlewares/cache');

function creaProductosRouter(params) {
    const router = new Router();

    router.get('/productos/', verifyToken, verifySuspend, cache, async (req, res) => {
        try {
            const producto = await getModel('Productos').findAll();
            storeObjectInCache(req, producto);
            res.status(200).json(producto);
        }
        catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.get('/productos/:id', verifyToken, verifyAdmin, async (req, res) => {
        try {
            const producto = await getModel('Productos').findOne({
                where: { id: req.params.id }
            });
            if (producto) {
                res.status(200).json(producto);
            } else {
                res.status(404).send(`Productos with ID ${req.params.id} does not exist.`);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
    );
    router.post('/productos/', verifyToken, verifyAdmin, cache, async (req, res) => {
        try {
            const product1 = getModel('Productos');
            const producto = new product1(req.body);
            const saved = await producto.save();
            if (saved) {
                invalidateCache({
                    method: 'GET',
                    baseUrl: req.baseUrl,
                });
                res.status(201).json(saved);
            } else {
                res.status(500).send('Could not save the product.');
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.put('/productos/:id', verifyToken, verifyAdmin, cache, async (req, res) => {
        try {
            const producto = await getModel('Productos').findOne({
                where: {
                    id: req.params.id
                }
            });
            const updated = await producto.update(req.body);
            if (updated) {
                invalidateCache({
                    method: 'GET',
                    baseUrl: req.baseUrl,
                });
                res.status(200).send('Productos updated');
            } else {
                res.status(404).send(`Productos with ID ${req.params.id} does not exist.`);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.delete('/productos/:id', verifyToken, verifyAdmin, cache, async (req, res) => {
        try {
            const producto = await getModel('Productos').findOne({
                where: { id: req.params.id }
            });
            await producto.destroy();
            if (producto) {
                invalidateCache({
                    method: 'GET',
                    baseUrl: req.baseUrl,
                });
                res.status(200).send('Productos deleted');
            } else {
                res.status(404).send(`Productos with ID ${req.params.id} does not exist.`);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    return router;
}

module.exports = {
    creaProductosRouter
};