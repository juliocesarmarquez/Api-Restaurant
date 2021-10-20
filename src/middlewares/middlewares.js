const { createHmac } = require('crypto');
const jwt =  require('jsonwebtoken');

// Auth


function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const { JWT_SECRET } = process.env;

        const bearertoken = bearerHeader.split(" ")[1];
        req.token = bearertoken;
        jwt.verify(req.token, JWT_SECRET, async (error, authData) => {
            if(error){
                return res.send('token invalido');
            }
            req.user=authData
            return next();
        })
    } else{
        res.send('Error con token');
    }
};
function encript(secret) {
    return createHmac('sha256', secret).digest('hex');
};

function verifyAdmin(req, res, next) {
    const { JWT_SECRET } = process.env
    jwt.verify(req.token, JWT_SECRET, async (error, authData) => {
        if (authData.mail.admin === true) {
           return next();
        }
        else {
            res.status(404).send(`No tiene permisos de Admin.`);
        }
    })
};

function verifySuspend(req, res, next) {
    const { JWT_SECRET } = process.env
    jwt.verify(req.token, JWT_SECRET, async (error, authData) => {
        if (authData.mail.suspendido === false) {
           return next();
        }
        else {
            res.status(404).send(`No esta habilitado para continuar.`);
        }
    })
};

module.exports = {
    verifyToken, verifyAdmin, verifySuspend, encript,
}