const passport = require('passport')
const auth0Strategy = require('passport-auth0').Strategy
const express = require('express')
const router = express.Router()

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new auth0Strategy({
    clientID: 'bZdYE4hG42AeoalVD3MrtkEWELEeKG9c',
    clientSecret: 'bE_szWeZRfI-2RKv3cl6-t06Ak4lLq1cKHUcZZqKchPGdwO-23D1bZ7bytPCclXH',
    callbackURL: 'http://localhost:3000/api/auth0/callback',
    domain: 'dev-3aet7rnq.us.auth0.com',
    
}, (accessToken, refreshToken, extraParams, profile, done) => {
    if (profile) {
        console.log(profile);
        return done(null, profile);
    } else {
        return done(new Error('No existe usuario'));
    }
}));

router.get('/login/auth0', passport.authenticate('auth0',{
    prompt: 'login', 
    scope: 'openid profile'
}));
router.get('/auth0/callback', passport.authenticate('auth0', {
    failureRedirect: '/error',
    successRedirect: '/api/productos'
}));
router.get('/logout', (req,res)=> {
    req.logOut()
    res.json('sesion finalizada')
});

module.exports = { router }