const { Router } = require('express');
const db = require('../src/database');
const usuarios = [{
  email: "person2@gmail.com",
  contrasena: "person1PASSWORD",

}, {
  email: "person1@gmail.com",
  contrasena: "person2PASSWORD",

}];
function makeRouter() {
  const router = Router();

  router.post('/', async (req, res) => {
    try {
      const User = db.getModel('User');
      const data = {
        nombreUsuario: req.body.nombreUsuario,
        apellido: req.body.apellido,
        email: req.body.email,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        contrasena: req.body.contrasena,
      };
      for (let usuario of usuarios) {
        if (data.email !== usuario.email) {
          await usuarios.push(data);
          res.status(201).json('Now you can log in.');
          return
        } else {
          res.status(417).send('email is already in use');
        }
      }
    } catch (error) {
      res.status(417).send('You need to complete all the information.' + msj);
    }
  });

  return router;
}

module.exports = {
  makeRouter, usuarios,
};