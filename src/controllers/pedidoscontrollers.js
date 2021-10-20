// Conecta la base de datos
const sequelize = require('../database/index');

// Importación de modelos
const { getModel } = require("../database/index.js");

// historial 
exports.List = async (req, res) => {
    try {
        const { JWT_SECRET } = process.env;
        jwt.verify(req.token, JWT_SECRET, async (error, authData) => {
            if (error) {
                res.status(500).send({ message: error.message });
            } else {
                const Productos = getModel('Productos');
                const MediosPago = getModel('Medios_Pago');
                const Estados = getModel('Estados');
                const Pedidos = await getModel('Pedidos').findAll({
                    where: { UsuariosId: authData.nombreUsuario.id },
                    include: [Productos, MediosPago, Estados]
                });
                res.status(200).send(Pedidos);
            }
        })
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.Add = async (req, res) => {
    const sequelize = getConnection();
    const { direccion, productos } = req.body;
    const t = await sequelize.transaction();
    const usuariosId = req.Usuarios.nombreUsuario.id
    const MediosPago = Number(req.body.MediosPagoId);
    const Pedidos = getModel('Pedidos');
    const Productos = getModel('Productos');
    const mediosPago = getModel('Medios_Pago');
    const Estados = getModel('Estados');
    const Usuarios = getModel('Usuarios');
    const pedidoProd = getModel('Pedido_Producto');
    const est = await Estados.findOne({ where: { id: 1 } });
    const pagar = await mediosPago.findOne({ where: { id: mediosPago } });
    const per = await Usuarios.findOne({ where: { id: usuariosId } });

    try {
        const prods = [];
        for (producto of productos) {
            const prod = await Productos.findAll({ where: { id: Producto.id } }, { transaction: t });
            if (!prod) {

                res.status(404).send(`Productos with ID ${Producto.id} does not exist.`);

            } else { prods.push([prod, Producto.quantity]); }
        }
        const pedido = await Pedidos.create({ EstadoId: est.id, MediosPagoId: pagar.id, UsuarioId: per.id, direccion }, { transaction: t });
        for (data of prods) {
            const [prod, quantity] = data;
            const total = prod[0].dataValues.price * quantity;
            await pedidoProd.create({ ProductoId: prod[0].dataValues.id, PedidoId: pedido.id, Cantidad: quantity, total: total }, { transaction: t });
        }
        await t.commit();
        const r = await Pedidos.findOne({
            where: {
                id: pedido.id
            }, include: [Productos]
        });
        res.json(r);
    } catch (error) {
        await t.rollback();
        res.status(500).send('One of the productos does not exist. Please check the menu.');
    }
};
