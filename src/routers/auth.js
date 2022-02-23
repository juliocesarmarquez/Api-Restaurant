const { Router } = require('express');
const { auth } = require('express-openid-connect');


function auth0(params) {
    const router = new Router();
    const config = {
        authRequired: false,
        auth0Logout: true,
        baseURL: 'http://localhost:3000',
        clientID: 'bZdYE4hG42AeoalVD3MrtkEWELEeKG9c',
        issuerBaseURL: 'https://dev-3aet7rnq.us.auth0.com',
        secret: 'bE_szWeZRfI-2RKv3cl6-t06Ak4lLq1cKHUcZZqKchPGdwO-23D1bZ7bytPCclXH'
    };
    router.use(auth(config));


    router.get('/', (req, res) => {
        res.send(req.oidc.isAuthenticated() ? 'Sesión iniciada' : 'No hay sesión')
    });

    return router;
}

module.exports = {
    auth0 }