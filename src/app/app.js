const express = require('express');
const config = require('./config');
const app = express();

//Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');


const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Mi primera API',
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
const { validAdmin, validaRegistro, validaLogin } =  require('../middlewares/validaciones');
const { crearPedido, confirmarPedido, modificarPedido, eliminarPedido, listarPedidos, verHistorial } = require('../info/pedidos');
const { crearPlato, listarPlatos, modificarPlato, eliminarPlato } = require('../info/platos');
const { crearPago, eliminarFormaPago, modificaFormaPago, verFormaPago } = require('../info/formapago');




/////////////////////validaciones///////////////////////

/**
 * @swagger
 * /registro:
 *  post:
 *    tags: [auth]
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
 *            - noApellido
 *            - mail
 *            - telefono
 *            - direccion
 *            - contrasena
 *          properties:
 *            noUsuario:
 *              description: Nombre del usuario
 *              type: string
 *              example: manuginobili
 *            noApellido:
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
 *      406:
 *       description: El email ya esta registrado
 *      
 */
app.post('/registro', validaRegistro, registraUsuario);

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

app.post("/productos", validAdmin, crearPlato);  /// crear condicion error detalle y precio

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
 *      406:
 *       description: Invalido
 *      
 */



app.put("/productos/:platoId", validAdmin, modificarPlato); 



app.delete("/productos/:platoId", validAdmin, eliminarPlato);


//////////////////////pedidos

app.post("/pedidos/:platoId", validaLogin, crearPedido); 

app.get("/pedidos", validAdmin, listarPedidos);

app.post("/pedidos/confirma/:idFormaPago", confirmarPedido);

app.get("/pedidos/historial", verHistorial);

app.put("/pedidos/modifica/:pedidoId", validAdmin,modificarPedido); 





app.delete("/pedidos/:idPedido", validAdmin, eliminarPedido); 

app.post("/productos/:idPedido/:idProducto", );

app.delete("/productos/:idPedido/:idProducto", );

//////////////////////forma de pago

app.get("/mediosdepago", validAdmin, verFormaPago);

app.post("/mediosdepago", validAdmin, crearPago); 

app.delete("/mediosdepago/:idFormaPago", validAdmin, eliminarFormaPago); 


app.put("/mediosdepago/:idFormaPago", validAdmin, modificaFormaPago);



app.listen(config.port, function () {
    console.log(`Escuchando el puerto ${config.port}!`);
});

