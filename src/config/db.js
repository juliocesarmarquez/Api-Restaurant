const { getModel } = require("../database/index");
const { encript} =  require('../middlewares/middlewares')
async function initialize() {
    const Usuarios = getModel('Usuarios');
    const current = await Usuarios.findOne({
        nombreUsuario: 'admin'
    })
    if (!current) {
        Usuarios.create({
            nombreUsuario: 'admin',
            apellido: 'admin',
            email: 'admin@gmail.com',
            direccion: 'admin',
            telefono: 852,
            contrasena: encript('admin'),
            admin: true,
            suspendido: false
        })
    }
    const Producto = getModel('Productos');
    const current1 = await Producto.findOne({
        name: 'Curry kare'
    })
    if (!current1) {
        Producto.create({
            nombre: 'Curry kare',
            precio: 900
        })
    }
    const Pagos = getModel('Pagos');
    const current2 = await Pagos.findOne({
        detalle: 'Tarjeta_Credito'
    })
    if (!current2) {
        Pagos.create({
            detalle: 'Tarjeta_Credito',
        })
    }
    const Estados = getModel('Estados');
    const current3 = await Estados.findOne({
        detalle: 'Creado'
    })
    if (!current3) {
        Estados.create({
            detalle: 'Creado'
        })
    }
};
module.exports = {
    initialize
};