const { platos, listadoPedidos, pedidosConfirmados, Pedconfirmados, estadoPedidos, formaPago } = require('./basedatos');

function crearPedido(req, res) {
    const platoId = Number(req.params.platoId);
    const cantidad = req.body.cantidad;
    const fecha = new Date();

    for (let plato of platos) {
        if (plato.id === platoId) {
            const estado = "pendiente";
            const id = listadoPedidos.length + 1;
            const subtotal = plato.precio * cantidad;
            const nuevoPedido = { ...req.body, plato, subtotal, fecha, estado, id };

            listadoPedidos.push(nuevoPedido);
            res.status(200).json(listadoPedidos);

        }
    } res.status(401).json(`El producto no existe`);
};

function confirmarPedido(req, res) {
    const fecha = new Date;
    const idFormaPago = Number(req.params.idFormaPago);
    const { direccion } = req.body;
    var imptotal = 0;
    for (nuevoPed of listadoPedidos) {
        imptotal = (imptotal + nuevoPed.subtotal);
    };

    for (const pago of formaPago) {
        if (idFormaPago === pago.id) {

            const id = pedidosConfirmados.length + 1;
            const estado = estadoPedidos[1];
            pedidosConfirmados.push(new Pedconfirmados(id, fecha, estado, pago, direccion, listadoPedidos));
            res.send(pedidosConfirmados);

        }
    }
};

function listarPedidos(req, res) {
    res.status(200).json(pedidosConfirmados);
}
function verHistorial(req, res) {
    res.status(200).json(pedidosConfirmados);
}

function modificarPedido(req, res) {
    const pedidoId = Number(req.params.pedidoId);
    for (const pedido of pedidosConfirmados) {
        if (pedidoId === pedido.id) {

            const position = pedidosConfirmados.indexOf(pedido);
            pedidosConfirmados[position].estado = req.body.estado;
            res.status(200).send(`El estado del pedido se ha modificado exitosamente.`);

        }
    } res.status(401).send(`El pedido no existe.`);
};




module.exports = { crearPedido, confirmarPedido, modificarPedido, listarPedidos, verHistorial }
