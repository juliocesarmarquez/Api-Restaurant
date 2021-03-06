const { Router } = require('express');
const { getModel } = require('../database');
const jwt = require('jsonwebtoken');
const { encript, verifyToken, verifyAdmin } = require('../middlewares/middlewares');
const { gProfile } = require('../routers/auth');
const { buscaUsuario } = require('../config/db')


function creaUsuariosRouter(params) {
    const router = new Router();
    router.get('/usuarios/', verifyToken, verifyAdmin, async (req, res) => {
        try {
            const data = await getModel('Usuarios').findAll();
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.get('/usuarios/:id', verifyToken, verifyAdmin, async (req, res) => {
        try {
            const data = await getModel('Usuarios').findOne({
                where: { id: req.params.id }
            });
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(404).send(`Usuarios with ID ${req.params.id} does not exist.`);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.post('/registro/', async (req, res) => {
        try {
            const Usuarios = getModel('Usuarios');
            const data = new Usuarios({
                nombreUsuario: req.body.nombreUsuario,
                apellido: req.body.apellido,
                email: req.body.email,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                contrasena: encript(req.body.contrasena),
            });
            const mail = await getModel('Usuarios').findOne({
                where: { email: req.body.email }
            });
            if (mail === null) {
                await data.save()
                res.status(201).json('Registro exitoso.');
            } else {
                throw res.status(403).send('Utilice otra cuenta de email');
            }
        } catch (error) {
            const msj = error.message
            console.log(msj);
            res.status(417).send('Debe completar todos los campos' + msj);
        }
    });
    const isAuthenticated = (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.status(401).json('El usuario no esta autenticado')
    }
    router.get('/token', isAuthenticated,  async (req, res) => {
        try {
            const profile = gProfile();
            await buscaUsuario(profile)
            const idP = await getModel('Usuarios').findOne({
                where: { idProvider: profile.id }
            });
            console.log(idP)
            const { JWT_SECRET } = process.env;
            if (idP !== null) {
                jwt.sign({ idP }, JWT_SECRET, (_err, token) => { res.json({ token }) });
            } else {
                throw new Error('Falla info');
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });



    router.post('/login/', async (req, res) => {
        try {
            const { JWT_SECRET } = process.env;
            const mail = await getModel('Usuarios').findOne({
                where: {
                    email: req.body.email,
                    contrasena: encript(req.body.contrasena)
                }
            });
            if (mail !== null) {
                jwt.sign({
                    mail
                }
                    , JWT_SECRET, (err, token) => {
                        res.json({ token })
                    });
            } else {
                throw new Error('Error');
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });

    ///Suspende usuarios
    router.put('/usuarios/:id', verifyToken, verifyAdmin, async (req, res) => {
        try {
            const data = await getModel('Usuarios').findOne({
                where: { id: req.params.id }
            });
            const updated = await data.update(req.body);
            console.log(updated)
            if (updated) {
                res.status(200).send('Perfil de usuario actualizado');
            } else {
                res.status(404).send(`El usuario no existe.`);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    return router;
}

module.exports = {
    creaUsuariosRouter
}