/* function makeUsuariosRouter() {

    const router = Router();

    // registrar usuario
    router.post("/register", authRegistro, async (req, res) => {
        try {
            const u = await Usuario.find();
            const nuevoUsuario = await new Usuario();
            if (u.length === 0) {
                nuevoUsuario.id = 1;
            } else {
                nuevoUsuario.id = u[u.length - 1].id + 1;
            }
            nuevoUsuario.nombreUsuario = req.body.nombreUsuario;
            nuevoUsuario.nombreApellido = req.body.nombreApellido;
            nuevoUsuario.telefono = req.body.telefono;
            nuevoUsuario.email = req.body.email,
            nuevoUsuario.password = encript(req.body.password);
            nuevoUsuario.agenda.push(req.body.direccion1);
            if (req.body.direccion2) {
                nuevoUsuario.agenda.push(req.body.direccion2);
            }
            if (req.body.direccion3) {
                nuevoUsuario.agenda.push(req.body.direccion3);
            }
            nuevoUsuario.login = false;
            nuevoUsuario.suspendido = false;
            await nuevoUsuario.save();
            res.status(200).json(`Usuario ${nuevoUsuario.nombreUsuario} registrado con exito`);
        } catch {
            res.status(404).json(`Error al registrar usuario`);
        }
    })
    // login usuario
    router.post("/login", authLogin, midSuspendido, async (req, res) => {
        try {
            const u = await Usuario.findOne({ nombreUsuario: req.body.nombreUsuario });
            if (u.password === encript(req.body.password)) {
                const token = jwt.sign({ nombreUsuario: u.nombreUsuario }, u.password);
                u.login = true;
                await u.save();
                res.status(200).json({
                    Usuario: u.nombreUsuario,
                    Token: token
                })
            } else {
                res.status(404).json(`Contraseña invalida`);
            }
        } catch {
            res.status(404).json(`Error al loguearse`);
        }

    })
    // logout
    router.post("/logout", authUser, midLogin, async (req, res) => {
        try {
            const idUsuario = Number(req.headers.userid);
            const u = await Usuario.findOne({ id: idUsuario });
            u.login = false;
            u.save();
            res.status(200).json(`Usuario ${u.nombreUsuario} ha cerrado sesión`);
        } catch(e) {
            console.log(e);
            res.status(404).json(`Error al cerrar sesión`);
        }
    })

    // suspender usuario
    router.post("/usuarios/:idUsuario", authAdmin, async (req, res) => {
        try {
            const usuarioId = Number(req.params.idUsuario);
            const u = await Usuario.findOne({ id: usuarioId });
            u.suspendido = req.body.suspendido;
            u.login = false;
            u.save();
            res.status(200).json(`El estado de suspensión de ${u.nombreUsuario} ha sido modificado a ${u.suspendido}`);
        } catch {
            res.status(404).json(`Error al suspender usuario`);
        }
    })

    // ver usuarios
    router.get("/usuarios", authAdmin, midLogin, async (req, res) => {
        try {
            const u = await Usuario.find();
            res.status(200).json(u);
        } catch {
            res.status(404).json(`Error al cargar los usuarios`);
        }
    })

    // ver historial del usuario
    router.get("/usuarios/:idUsuario", authUser, midLogin, midIdUsuario, async (req, res) => {
        try {
            const usuarioId = Number(req.params.idUsuario);
            const p = await Pedido.find({ usuarioId: usuarioId });
            res.status(200).json(p)
        } catch {
            res.status(404).json(`No se ha podido cargar el historial del usuario`)
        }
    })

    return router;
}
 */
//Pedidos confirmar
/* async (req, res) => {
    try {
        const idUsuario = Number(req.headers.userid);
        const idPedido = Number(req.params.idPedido);
        const idDireccion = Number(req.body.direccion);
        const p = await Pedido.findOne({ id: idPedido });
        const u = await Usuario.findOne({ id: idUsuario });
        const m = await Pago.findOne({ id: req.body.metodoPago });
        const session = await db.startSession();
        session.startTransaction();
        if (idUsuario === p.usuarioId) {
            if (p.estado === 1) {
                p.metodoPago = m.nombre;
                p.direccion = u.agenda[idDireccion - 1];
                p.estado = 2;
                await p.save();
                await session.commitTransaction();
                res.status(200).json(`El pedido ${p.id} ha sido abonado`);
            } else {
                await session.abortTransaction();
                res.status(405).json(`El pedido ${p.id} ya ha sido abonado anteriormente.`);
            }
        } else {
            await session.abortTransaction();
            res.status(401).json(`El pedido ${pedido.id} no corresponde al usuario ${u.nombreUsuario}`);
        }
        session.endSession();
    } catch (error) {
        console.log(error);
        res.status(400).json(`El pedido no ha podido ser abonado`);
    }
})
 */
/* 
 // agregar producto al pedido
 router.post("/pedidos/:idPedido/:idProducto", midIdPedido, midIdProducto, async (req, res) => {
    try {
        const usuarioId = Number(req.headers.userid);
        const idPedido = Number(req.params.idPedido);
        const idProducto = Number(req.params.idProducto);
        const u = await Usuario.findOne({ id: usuarioId });
        const pedido = await Pedido.findOne({ id: idPedido }).exec();
        const producto = await Producto.findOne({ id: idProducto }).exec();
        const session = await db.startSession();
        session.startTransaction();
        if (usuarioId === pedido.usuarioId) {
            if (pedido.estado === 1) {
                const productoAgregado = {
                    cantidad: req.body.cantidad,
                    producto: producto
                }
                pedido.descripcion.push(productoAgregado);
                pedido.montoPago += producto.precio * productoAgregado.cantidad;
                await pedido.save();
                await session.commitTransaction();
                res.status(200).json(`Producto ${producto.nombre} (cantidad: ${productoAgregado.cantidad}) agregado al pedido ${pedido.id} por el usuario ${u.nombreUsuario}`);
            } else {
                await session.abortTransaction();
                res.status(400).json(`El pedido ${pedido.id} ya ha sido abonado y no puede modificarse`)
            }
        } else {
            await session.abortTransaction();
            res.status(400).json(`El pedido ${pedido.id} no corresponde al usuario ${u.nombreUsuario}`);
        }
        session.endSession();

    } catch {
        res.status(400).json(`No se pudo agregar el producto`);
    }
})
 */
/* // quitar producto del pedido
router.delete("/pedidos/:idPedido/:idProducto", midIdPedido, midIdProducto, async (req, res) => {
    try {
        const usuarioId = Number(req.headers.userid);
        const idPedido = Number(req.params.idPedido);
        const idProducto = Number(req.params.idProducto);
        const u = await Usuario.findOne({ id: usuarioId });
        const pedido = await Pedido.findOne({ id: idPedido });
        const producto = await Producto.findOne({ id: idProducto });
        const session = await db.startSession();
        session.startTransaction();
        if (usuarioId === pedido.usuarioId) {
            if (pedido.estado === 1) {
                for (item of pedido.descripcion) {
                    if (item.producto.id === idProducto) {
                        pedido.montoPago -= item.producto.precio * item.cantidad;
                        const nuevosProductos = pedido.descripcion.filter((item) => item.producto.id !== idProducto);
                        pedido.descripcion.length = 0;
                        pedido.descripcion = nuevosProductos;
                        await pedido.save();
                        await session.commitTransaction();
                        res.status(200).json(`Producto ${producto.nombre} eliminado del pedido ${pedido.id}`);
                    }
                }
            } else {
                await session.abortTransaction();
                res.status(400).json(`El pedido ${pedido.id} ya ha sido abonado y no puede modificarse`);
            }
        } else {
            await session.abortTransaction();
            res.status(400).json(`El pedido ${pedido.id} no corresponde al usuario ${u.nombreUsuario}`);
        }
        session.endSession();
    } catch {
        res.status(400).json(`No se pudo quitar el producto`);
    }
})

//modificar cantidad de productos del pedido
router.put("/pedidos/:idPedido/:idProducto", midIdProducto, midIdPedido, async (req, res) => {
    try {
        const usuarioId = Number(req.headers.userid);
        const idPedido = Number(req.params.idPedido);
        const idProducto = Number(req.params.idProducto);
        const u = await Usuario.findOne({ id: usuarioId });
        const pedido = await Pedido.findOne({ id: idPedido });
        const producto = await Producto.findOne({ id: idProducto });
        const session = await db.startSession();
        session.startTransaction();
        if (usuarioId === pedido.usuarioId) {
            if (pedido.estado === 1) {
                for (item of pedido.descripcion) {
                    if (item.producto.id === idProducto) {
                        pedido.montoPago -= item.producto.precio * item.cantidad;
                        const nuevosProductos = pedido.descripcion.filter((item) => item.producto.id !== idProducto);
                        pedido.descripcion.length = 0;
                        pedido.descripcion = nuevosProductos;
                        const productoAgregado = {
                            cantidad: req.body.cantidad,
                            producto: producto
                        }
                        pedido.descripcion.push(productoAgregado);
                        pedido.montoPago += producto.precio * productoAgregado.cantidad;
                        await pedido.save();
                        await session.commitTransaction();
                        res.status(200).json(`Cantidad del producto ${producto.nombre} modificado a ${productoAgregado.cantidad} en el pedido ${pedido.id}`);
                    }
                }
            } else {
                await session.abortTransaction();
                res.status(200).json(`El pedido ${pedido.id} ya ha sido abonado y no puede modificarse`);
            }
        } else {
            await session.abortTransaction();
            res.status(400).json(`El pedido ${pedido.id} no corresponde al usuario ${u.nombreUsuario}`);
        }
        session.endSession();
    } catch (e) {
        console.log(e);
        res.status(400).json(`No se pudo modificar el producto`);
    }
}) */

/*     // ver pedidos
    router.get("/pedidos", authAdmin, async (req, res) => {
        try {
            const p = await Pedido.find();
            res.status(200).json(p);
        } catch {
            res.status(400).json(`No pudieron cargarse los pedidos`);
        }
    })

    //modificar pedido
    router.put("/pedidos/:idPedido", authAdmin, midIdPedido, async (req, res) => {
        try {
            const idPedido = Number(req.params.idPedido);
            const p = await Pedido.findOne({ id: idPedido }).exec();
            if (req.body.estado >= 1 && req.body.estado <= 5) {
                p.estado = req.body.estado;
                p.save();
                res.status(200).json(`El pedido ${p.id} ha sido modificado a estado ${p.estado}`);
            } else {
                res.status(400).json(`Estado de pedido inválido`);
            }
        } catch {
            res.status(400).json(`El pedido ${p.id} no ha podido modificarse`);
        }
    })
    // eliminar pedido
    router.delete("/pedidos/:idPedido", authAdmin, midIdPedido, async (req, res) => {
        try {
            const idPedido = Number(req.params.idPedido);
            await Pedido.deleteOne({ id: idPedido });
            res.status(200).json(`El pedido ha sido eliminado`);
        } catch {
            res.status(400).json(`El pedido no ha podido ser eliminado`);
        }
    })
    return router;
} */