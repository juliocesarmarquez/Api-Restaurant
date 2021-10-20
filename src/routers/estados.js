const { Router } = require('express');
const { getModel } = require('../database');
const { verifyToken, verifyAdmin } = require('../middlewares/middlewares');

function creaEstadosRouter(params) {
    const router = new Router();

    router.get('/estados/', verifyToken, verifyAdmin,async (req, res) => {
        try {
            const data = await getModel('Estados').findAll();
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.post('/estados/', verifyToken, verifyAdmin, async (req, res) => {
        try {
            const estado = getModel('Estados');
            const data = new estado (req.body);
            const saved = await data.save()
            if (saved) {
                res.status(201).send(saved);
            } else {
                res.status(500).send('No se guardo la información.');
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    
    return router;
}

module.exports = {
    creaEstadosRouter
}