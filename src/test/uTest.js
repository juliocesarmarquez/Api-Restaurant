const { Router } = require('express');
const db = require('../../src/database/models/usuarios');
const users = [{
  nombreUsuario: "uno@gmail.com",
  contrasena: "unoPASSWORD",

}, {
  nombreUsuario: "person1@gmail.com",
  contrasena: "person2PASSWORD",

}];
function makeRouter() {
  const router = Router();

  router.post('/', async (req, res) => {
    try {
      const Usuarios = db.getModel('Usuarios');
      const data = {
        nombreUsuario: req.body.nombreUsuario,
        nombreApellido: req.body.nombreApellido,
        direccion: req.body.direccion,
        email: req.body.email,
        telefono: req.body.telefono,
        contrasena: req.body.contrasena,
      };
      for (let usuario of Usuarios) {
        if (data.email !== usuario.email) {
          await Usuarios.push(data);
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
  makeRouter, users,
};