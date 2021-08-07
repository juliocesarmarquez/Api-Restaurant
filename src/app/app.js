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
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(express.json());


/////////////////////importar archivos particulares//

const { verUsuarios, eliminarUsuario/* , modificarUsuario */ } = require('../info/usuarios');
const { registraUsuario, loginUsuario } = require('../info/validacion');
const { validAdmin, validaRegistro, validaLogin } =  require('../middlewares/validaciones');
const { midModificarPedido, midIdPedido } = require('../middlewares/pedidos');
const { midMetodoPago, midCrearPago, midIdPago } = require('../middlewares/formapago');
const { crearPedido, pagarPedido, modificarPedido, eliminarPedido, listarPedidos, verHistorial } = require('../info/pedidos');
const { crearPlato, listarPlatos, modificarPlato, eliminarPlato } = require('../info/platos');
const { crearPago, eliminarFormaPago, modificaFormaPago, verFormaPago } = require('../info/formapago');




/////////////////////validaciones

/**
 * @swagger
 * /registro:
 *  post:
 *    summary: Registrar un usuario 
 *    description: Crea un usuario en la aplicacion
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              noUsuario:
 *                type: string
 *              noApellido:
 *                type: string
 *              mail:
 *                type: string
 *              telefono:
 *                type: string
 *              direccion:
 *                type: string
 *              contrasena:
 *                type: string
 *    responses:
 *       '200':
 *        description: OK
 *       '405':
 *        description: Invalido
 */
app.post('/registro', validaRegistro, registraUsuario);

/**
 * @swagger
 * /login:
 *  post:
 *    summary: Login usuario 
 *    description: Inicio de sesión usuarios.
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              contrasena:
 *                type: string
 *    responses:
 *       '200':
 *        description: OK
 *       '405':
 *        description: Invalido
 */

app.post('/login', validaLogin, loginUsuario);


/* app.use('/', midLogin); */

//////////////////////usuarios

/**
 * @swagger
 * /usuarios:
 *  get:
 *    summary: Listado de usuarios.
 *    description: Se visualizan los usuarios.
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
 *       '405':
 *        description: Invalido
 */
app.get('/usuarios', validAdmin, verUsuarios );


//////////////////////platos
/**
 * @swagger
 * /productos:
 *  get:
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
 *       '405':
 *        description: Invalido
 */
app.get("/productos", listarPlatos); 

/**
 * @swagger
 * /productos:
 *  post:
 *    summary: Crear los platos
 *    description: Se crean los platos
 *    parameters:
 *      - name: userid
 *        in: header
 *        required: true
 *        description: Id del Usuario
 *        schema:
 *          type: integer
 *          format: int64
 *          minimum: 1
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              precio: 
 *                type: integer
 *                format: int64
 *                minimum: 1
 *              detalle:
 *                type: string
 *    responses:
 *       '200':
 *        description: OK
 *       '405':
 *        description: Invalido
 */

app.post("/productos", validAdmin, crearPlato); 


app.put("/productos/:platoId", validAdmin, modificarPlato); 



app.delete("/productos/:platoId", validAdmin, eliminarPlato);


//////////////////////pedidos

app.post("/pedidos/:platoId", validaLogin, crearPedido); 

app.get("/pedidos", validAdmin, listarPedidos);




app.get("/pedidos/historial", verHistorial);


app.post("/pedidos/:idPedido", midMetodoPago, pagarPedido); 

app.put("/pedidos/:idPedido", validAdmin, midIdPedido, midModificarPedido, modificarPedido); 

app.delete("/pedidos/:idPedido", validAdmin, midIdPedido, eliminarPedido); 

app.post("/productos/:idPedido/:idProducto",midIdPedido );

app.delete("/productos/:idPedido/:idProducto", midIdPedido);

//////////////////////forma de pago

app.get("/mediosdepago", validAdmin, verFormaPago);

app.post("/mediosdepago", validAdmin, crearPago); 

app.delete("/mediosdepago/:idFormaPago", validAdmin, eliminarFormaPago); 


app.put("/mediosdepago/:idFormaPago", validAdmin, modificaFormaPago);



app.listen(config.port, function () {
    console.log(`Escuchando el puerto ${config.port}!`);
});

