//Librairies exports
const express = require('express');
const bodyParser = require('body-parser'); //permet de transformer un json en objet javascript
const ObjectID = require('mongodb').ObjectID;
const _ = require('lodash');

//Local exports
var mongoose = require('./db/mongoose');
var Todo = require('./models/todo');
var User = require('./models/user');
var authenticate = require('./middleware/authenticate').authenticate;

var app = express();
var port = process.env.PORT || 3000;

//middleware
app.use(bodyParser.json());

//requête de création de todo
app.post('/todos', authenticate, function (req, res) {
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then(function (doc) {
        res.send(doc);
    }, function (error) {
        res.send(error);
    });
});

//récupération de todo(s)
app.get('/todos', authenticate, function (req, res) {
    Todo.find({
        _creator: req.user._id
    }).then(function (todos) {
        res.send({
            todos
        });
    }, function (error) {
        res.status(400).send(error);
    })
});

//GET /todos/12345
app.get('/todos/:id', authenticate, function (req, res) {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then(function (todo) {
        if (!todo) {
            return res.status(400).send('User not found');
        }
        return res.send(todo);

    }, function (error) {
        res.status(400).send('');
    })
});

//DELETE /todos/1234
app.delete('/todos/:id', authenticate, function (req, res) {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((function (todo) {
        if (todo) {
            return res.send(todo);
        } else {
            return res.status(404).send();
        }
    }, function (error) {
        res.status(400).send(error);
    }))
});

//PATCh /todos/:id mise à jour d'un todo
app.patch('/todos/:id', authenticate, function (req, res) {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user._id
    }, {
        $set: body
    }, {
        new: true
    }).then(function (todo) {
        if (!todo) {
            return res.status(404).send();
        }
        return res.send({
            todo
        });
    }, function (error) {
        res.status(400).send();
    })

});

//POST /users
app.post('/users', function (req, res) {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(function () {
        return user.generateAuthToken();
    }).then(function (token) {
        res.header('x-auth', token).send(user);
    }).catch(function (error) {
        console.log(error);
        res.status(400).send(error);
    })
});


app.get('/users/me', authenticate, function (req, res) {
    res.send(req.user);
});

//POST /users/login {email, password}
app.post('/users/login', function (req, res) {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then(function (user) {
        return user.generateAuthToken().then(function (token) {
            res.header('x-auth', token).send(user);
        });
    }).catch(function (e) {
        res.status(400).send();
    });
});

//DELETE /users/me/token
app.delete('/users/me/token', authenticate, function (req, res) {
    req.user.removeToken(req.token).then(function () {
        res.status(200).send();
    }, function () {
        res.status(400).send();
    });
});




app.listen(port, function () {
    console.log('Started on port', port);
});
