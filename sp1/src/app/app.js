const express = require('express');
const dotenv = require("dotenv");
const { connect } = require("../../database/index.js");
/* const config = require('./config'); */
const app = express();

async function main() {
    
    dotenv.config();
    const app = express();
    app.use(express.json());

    const PORT = process.env.PORT;
    const DB_PORT = process.env.DB_PORT;
    const DB_USERNAME = process.env.DB_USERNAME;
    const DB_PASSWORD = process.env.DB_PASSWORD;
    const DB_HOST = process.env.DB_HOST;
    const DB_DATABASE = process.env.DB_DATABASE;

    try {
        await connect(DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE);
       /*  app.use("/", tvRouter);
        app.use("/", marcaRouter);
        app.use("/", preciosRouter); */

        app.listen(PORT, () => {
            console.log('Server is running...');
        })
    } catch (error) {
        console.log("No pudo cargar la base de datos", error);
    }

}

main();


//Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');


const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Mi primera API - Delilah Restó',
            version: '1.0.0'
        }
    },
    apis: ['./src/app/app.js'],
    tags: [
        {
            name: 'auth',
            description: 'Operaciones sobre autorización'
        },
        {
            name: 'usuarios',
            description: 'Operaciones sobre usuarios'
        },
        {
            name: 'pedidos',
            description: 'Operaciones sobre pedidos'
        },
        {
            name: 'productos',
            description: 'Operaciones sobre productos'
        },
        {
            name: 'formas de pago',
            description: 'Operaciones sobre formas de pago'
        },
    ]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(express.json());


/////////////////////importar archivos particulares////////////

const { verUsuarios } = require('../info/usuarios');
const { registraUsuario, loginUsuario } = require('../info/validacion');
const { midCrearPago } =  require('../middlewares/formapago');
const { validAdmin, validaRegistro, validaLogin } =  require('../middlewares/validaciones');
const { crearPedido, confirmarPedido, modificarPedido, listarPedidos, verHistorial } = require('../info/pedidos');
const { crearPlato, listarPlatos, modificarPlato, eliminarPlato } = require('../info/platos');
const { crearPago, eliminarFormaPago, modificaFormaPago, verFormaPago } = require('../info/formapago');




/////////////////////validaciones///////////////////////

/**
 * @swagger
 * /login:
 *  post:
 *    tags: [auth]
 *    summary: Login de usuario.
 *    description : Login de usuario.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: datos
 *        description: Nombre y contraseña de usuario a loguearse
 *        schema:
 *          type: object
 *          required:
 *            - username
 *          properties:
 *            username:
 *              description: Nombre de usuario a loguearse.
 *              type: string
 *              example: manuginobili
 *            contrasena:
 *              description: Contraseña de usuario a loguearse 
 *              type: string
 *              example: gospursgo!
 *    responses:
 *      200:
 *       description: Login de usuario satisfactorio. 
 *      401:
 *       description: Usuario no encontrado (email y/o contraseña incorrecta)
 */

 app.post('/login', loginUsuario );

//////////////////////usuarios

/**
 * @swagger
 * /registro:
 *  post:
 *    tags: [usuarios]
 *    summary: usuarios.
 *    description : Listado de usuarios.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: usuario
 *        description: usuario  a crear
 *        schema:
 *          type: object
 *          required:
 *            - noUsuario
 *            - nombreyApellido
 *            - mail
 *            - telefono
 *            - direccion
 *            - contrasena
 *          properties:
 *            noUsuario:
 *              description: Nombre del usuario
 *              type: string
 *              example: manuginobili
 *            nombreyApellido:
 *              description: Nombre y Apellido del usuario
 *              type: string
 *              example: Emanuel David Ginobili
 *            mail:
 *              description: Correo electrónico del usuario 
 *              type: email
 *              example: manu@ginobili.com
 *            telefono:
 *              description: Telefono del usuario 
 *              type: string
 *              example: 2901543514
 *            direccion:
 *              description: Dirección de envio 
 *              type: string
 *              example: Ushuaia, de los Ñires #3515
 *            contrasena:
 *              description: Contraseña del usuario
 *              type: password
 *              example: gospursgo!
 *    responses:
 *      200:
 *       description: Usuario registrado
 *      401:
 *       description: El email ya esta registrado
 *      
 */
app.post('/registro', validaRegistro, registraUsuario);







/**
 * @swagger
 * /usuarios:
 *  get:
 *    tags: [usuarios]
 *    summary: Listado de usuarios.
 *    description: Se visualizan los usuarios.
 *    parameters:
 *      - name: userid
 *        in: header
 *        required: true
 *        description: Id del Usuario Administrador.
 *        schema:
 *          type: integer
 *          format: int64
 *          minimum: 1
 *    responses:
 *       '200':
 *        description: OK
 *       '401':
 *        description: Invalido
 */
app.get('/usuarios', validAdmin, verUsuarios );


//////////////////////platos
/**
 * @swagger
 * /productos:
 *  get:
 *    tags: [productos]
 *    summary: Listado de los platos.
 *    description: Se visualizan los platos disponibles.
 *    parameters:
 *      - name: userid
 *        in: header
 *        required: true
 *        description: Id del Usuario.
 *        schema:
 *          type: integer
 *          format: int64
 *          minimum: 1
 *    responses:
 *       '200':
 *        description: OK
 *       '401':
 *        description: Invalido
 */
app.get('/productos', validaLogin, listarPlatos);

//////////////////////platos
/**
 * @swagger
 * /productos/admin:
 *  get:
 *    tags: [productos]
 *    summary: Listado de los platos Admin.
 *    description: Se visualizan los platos disponibles para Admin.
 *    parameters:
 *      - name: userid
 *        in: header
 *        required: true
 *        description: Id del Usuario Administrador.
 *        schema:
 *          type: integer
 *          format: int64
 *          minimum: 1
 *    responses:
 *       '200':
 *        description: OK
 *       '401':
 *        description: Invalido
 */

app.get('/productos/admin', validAdmin, listarPlatos);

/**
 * @swagger
 * /productos:
 *  post:
 *    tags: [productos]
 *    summary: Crear nuevos platos.
 *    description : Crea un nuevo un plato
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: header
 *        name: userid 
 *        required: true
 *        description: Id del Usuario Administrador
 *      - in: body
 *        name: platos
 *        description: Crear plato
 *        schema:
 *          type: object
 *          required:
 *            - detalle
 *            - precio
 *          properties:
 *            detalle:
 *              description: detalle del plato
 *              type: string
 *              example: wok de fideos
 *            precio:
 *              description: precio del plato
 *              type: number
 *              example: 405
 *    responses:
 *      200:
 *       description: OK
 *      401:
 *       description: Invalido
 *      
 */

app.post("/productos", validAdmin, crearPlato);  

/**
 * @swagger
 * /productos/{platoId}:
 *  put:
 *    tags: [productos]
 *    summary: Modificar un plato.
 *    description : Modifica un plato existente
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: header
 *        name: userid 
 *        required: true
 *        description: Id del Usuario Administrador
 *      - name: platoId
 *        in: path 
 *        required: true
 *        type: integer      
 *        description: Id del plato a modificar
 *      - in: body
 *        name: platos
 *        description: Modificar plato
 *        schema:
 *          type: object
 *          required:
 *            - detalle
 *            - precio
 *          properties:
 *            detalle:
 *              description: detalle del plato
 *              type: string
 *              example: wok de fideos
 *            precio:
 *              description: precio del plato
 *              type: number
 *              example: 405
 *    responses:
 *      200:
 *       description: OK
 *      401:
 *       description: Invalido
 *      
 */

app.put("/productos/:platoId", validAdmin, modificarPlato); 

/**
 * @swagger
 * /productos/{platoId}:
 *  delete:
 *    tags: [productos]
 *    summary: Eliminar un plato.
 *    description : Elimina un plato existente
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: header
 *        name: userid 
 *        required: true
 *        description: Id del Usuario Administrador
 *      - name: platoId
 *        in: path 
 *        required: true
 *        type: integer      
 *        description: Id del plato a eliminar
 *    responses:
 *      200:
 *       description: OK
 *      406:
 *       description: Invalido
 *      
 */

app.delete("/productos/:platoId", validAdmin, eliminarPlato);


//////////////////////pedidos

/**
 * @swagger
 * /pedidos/{platoId}:
 *  post:
 *    tags: [pedidos]
 *    summary: Crea un pedido.
 *    description : Usuario crea un pedido
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: header
 *        name: userid 
 *        required: true
 *        description: Id del Usuario
 *        example: 2
 *      - name: platoId
 *        in: path 
 *        required: true
 *        type: integer      
 *        description: Id del plato elegido
 *        example: 5
 *      - in: body
 *        name: Cantidad de platos
 *        description: Elegir la cantidad de platos
 *        schema:
 *          type: object
 *          required:
 *            - cantidad
 *          properties:
 *            cantidad:
 *              description: cantidad de platos
 *              type: number
 *              example: 3
 *    responses:
 *      200:
 *       description: OK
 *      401:
 *       description: Invalido
 *      
 */

app.post("/pedidos/:platoId", validaLogin, crearPedido);

/**
 * @swagger
 * /pedidos:
 *  get:
 *    tags: [pedidos]
 *    summary: Listado de pedidos.
 *    description : Visualiza el listado de pedidos
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: header
 *        name: userid 
 *        required: true
 *        description: Id del Usuario Administrador
 *        example: 1
 *    responses:
 *      200:
 *       description: OK
 *      401:
 *       description: Invalido
 *      
 */

app.get("/pedidos", validAdmin, listarPedidos);

/**
 * @swagger
 * /pedidos/confirma/{idFormaPago}:
 *  post:
 *    tags: [pedidos]
 *    summary: Confirma pedido.
 *    description : Usuario confirma un pedido
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: header
 *        name: userid 
 *        required: true
 *        description: Id del Usuario
 *        example: 2
 *      - name: idFormaPago
 *        in: path 
 *        required: true
 *        type: integer      
 *        description: Id de forma de pago elegida
 *        example: 3
 *      - in: body
 *        name: Direccion
 *        description: Direccion de envío
 *        schema:
 *          type: object
 *          required:
 *            - direccion
 *          properties:
 *            direccion:
 *              description: direccion de envío
 *              type: string
 *              example: Avenida Islas Malvinas
 *    responses:
 *      200:
 *       description: OK
 *      401:
 *       description: Invalido
 *      
 */

app.post("/pedidos/confirma/:idFormaPago", validaLogin, confirmarPedido);

/**
 * @swagger
 * /pedidos/modifica/{pedidoId}:
 *  put:
 *    tags: [pedidos]
 *    summary: Modificar un pedido.
 *    description : Administrador modifica estado de pedidos
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: header
 *        name: userid 
 *        required: true
 *        description: Id del Usuario Administrador
 *        example: 1
 *      - name: pedidoId
 *        in: path 
 *        required: true
 *        type: integer      
 *        description: Id del pedido a modificar
 *        example: 1
 *      - in: body
 *        name: estado de pedido
 *        description: Cambiar el estado del pedido
 *        schema:
 *          type: object
 *          required:
 *            - estado
 *          properties:
 *            estado:
 *              description: estado de pedido
 *              type: string
 *              example: En preparación
 *    responses:
 *      200:
 *       description: OK
 *      401:
 *       description: Invalido
 *      
 */


 app.put("/pedidos/modifica/:pedidoId", validAdmin,modificarPedido); 

/**
 * @swagger
 * /pedidos/historial:
 *  get:
 *    tags: [usuarios]
 *    summary: Historial de pedidos.
 *    description : Historial de pedidos
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: header
 *        name: userid 
 *        required: true
 *        description: Id del Usuario
 *        example: 2
 *    responses:
 *      200:
 *       description: OK
 *      401:
 *       description: Invalido
 *      
 */

app.get("/pedidos/historial", validaLogin, verHistorial);





//////////////////////forma de pago

/**
 * @swagger
 * /mediosdepago:
 *  get:
 *    tags: [formas de pago]
 *    summary: Ver formas de pago.
 *    description: Se visualizan las formas de pago.
 *    parameters:
 *      - name: userid
 *        in: header
 *        required: true
 *        description: Id del Usuario Administrador.
 *        schema:
 *          type: integer
 *          format: int64
 *          minimum: 1
 *    responses:
 *       '200':
 *        description: OK
 *       '401':
 *        description: Invalido
 */

app.get("/mediosdepago", validAdmin, verFormaPago);

/**
 * @swagger
 * /mediosdepago:
 *  post:
 *    tags: [formas de pago]
 *    summary: Crear nueva forma de pago
 *    description : Crea un metodo de pago
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: header
 *        name: userid 
 *        required: true
 *        description: Id del Usuario Administrador
 *      - in: body
 *        name: metodo de pago
 *        description: Crear un nuevo metodo de pago
 *        schema:
 *          type: object
 *          required:
 *            - detalle
 *          properties:
 *            detalle:
 *              description: metodo de pago
 *              type: string
 *              example: mercado pago
 *    responses:
 *      200:
 *       description: OK
 *      401:
 *       description: Invalido
 *      
 */

app.post("/mediosdepago", validAdmin, midCrearPago, crearPago); 

/**
 * @swagger
 * /mediosdepago/{idFormaPago}:
 *  delete:
 *    tags: [formas de pago]
 *    summary: Elimina forma de pago
 *    description : Elimina una forma de pago existente
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: header
 *        name: userid 
 *        required: true
 *        description: Id del Usuario Administrador
 *      - name: idFormaPago
 *        in: path 
 *        required: true
 *        type: integer      
 *        description: Id de forma de pago a eliminar
 *        example: 3
 *    responses:
 *      200:
 *       description: OK
 *      401:
 *       description: Invalido
 *      
 */


app.delete("/mediosdepago/:idFormaPago", validAdmin, eliminarFormaPago); 

/**
 * @swagger
 * /mediosdepago/{idFormaPago}:
 *  put:
 *    tags: [formas de pago]
 *    summary: Modificar forma de pago
 *    description : Modificar un metodo de pago
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: header
 *        name: userid 
 *        required: true
 *        description: Id del Usuario Administrador
 *      - name: idFormaPago
 *        in: path 
 *        required: true
 *        type: integer      
 *        description: Id de forma de pago a modificar
 *        example: 3
 *      - in: body
 *        name: metodo de pago
 *        description: Modificar metodo de pago
 *        schema:
 *          type: object
 *          required:
 *            - detalle
 *          properties:
 *            detalle:
 *              description: metodo de pago 
 *              type: string
 *              example: mercado pago
 *    responses:
 *      200:
 *       description: OK
 *      401:
 *       description: Invalido
 *      
 */
app.put("/mediosdepago/:idFormaPago", validAdmin, modificaFormaPago);



/* app.listen(config.port, function () {
    console.log(`Escuchando el puerto ${config.port}!`);
});
 */
