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
        nombre: 'Curry kare'
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
    const current4 = await Estados.findOne({
        detalle: 'Pagado'
    })
    if (!current4) {
        Estados.create({
            detalle: 'Pagado'
        })
    }
};
async function buscaUsuario(profile) {
    try {
        const userExist = getModel('Usuarios')
        const newUser = new userExist({
            nombreUsuario: profile.nickname,
            apellido: profile._json.family_name || profile._json.name,
            email: 'unknown@unknown.com',
            direccion: 'unknown',
            telefono: 0000,
            contrasena: encript('unknown'),
            admin: false,
            suspendido: false,
            idProvider: profile.id
        })
        const user = await userExist.findOne({
            where:
                { idProvider: profile.id }
        });
        console.log(user)
        if (user === null) {
            await newUser.save()

        } else {
            console.log('registrado en Base de Datos')
        }

    } catch (error) {
        console.log({ message: error.message });
    }
}


module.exports = {
    initialize, buscaUsuario
};