const express = require('express');
const app = express();

const router = express.Router();

const Controller = require('../controllers/mediospagocontrollers.js');


router.get('/', Controller.List);
router.post('/', Controller.Add);
router.put('/:id', Controller.Update);
router.delete('/:id', Controller.Delete);



module.exports = router;