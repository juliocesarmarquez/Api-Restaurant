const express = require('express');
const app = express();

const router = express.Router();

const Controller = require('../controllers/adminpedidosControllers.js');

router.get('/', Controller.List);
router.get('/:id', Controller.Listid);
router.put('/:id', Controller.Update);
router.delete('/:id', Controller.Delete);



module.exports = router;