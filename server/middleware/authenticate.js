var User = require('./../models/user');
//Middleware qui permet de vérifie l'authentification
var authenticate = function (req, res, next) {
    var token = req.header('x-auth');

    User.findByToken(token).then(function (user) {
        if (!user) {
            return Promise.reject();
        }

        req.user = user;
        req.token = token;
        next();
    }).catch(function (e) {
        res.status(401).send();
    });
};

module.exports = {
    authenticate
};
