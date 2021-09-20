const express = require('express');
const app = express();

const router = express.Router();

const Controller = require('../controllers/usuarioscontrollers.js');


router.post('/', Controller.Login);


module.exports = router;