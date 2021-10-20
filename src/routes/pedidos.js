const express = require('express');
const app = express();

const router = express.Router();

const Controller = require('../controllers/pedidoscontrollers.js');


router.get('/', Controller.List);
router.post('/', Controller.Add);



module.exports = router;