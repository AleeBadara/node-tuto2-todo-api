//Librairies exports
var express = require('express');
var bodyParser = require('body-parser'); //permet de transformer un json en objet javascript
var ObjectID = require('mongodb').ObjectID;

//Local exports
var mongoose = require('./db/mongoose');
var Todo = require('./models/todo');
var User = require('./models/user');

var app = express();
var port = process.env.PORT || 3000;

//middleware
app.use(bodyParser.json());

//requête de création de todo
app.post('/todos', function (req, res) {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then(function (doc) {
        res.send(doc);
    }, function (error) {
        res.send(error);
    });
});

//récupération de todo(s)
app.get('/todos', function (req, res) {
    Todo.find().then(function (todos) {
        res.send({
            todos
        });
    }, function (error) {
        res.status(400).send(error);
    })
});

//GET /todos/12345
app.get('/todos/:id', function (req, res) {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findById(id).then(function (todo) {
        if (!todo) {
            return res.status(400).send('User not found');
        }
        return res.send(todo);

    }, function (error) {
        res.status(400).send('');
    })
});

//DELETE /todos/1234
app.delete('/todos/:id', function (req, res) {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((function (todo) {
        if (todo) {
            return res.send(todo);
        } else {
            return res.status(404).send();
        }
    }, function (error) {
        res.status(400).send(error);
    }))

});


app.listen(port, function () {
    console.log('Started on port', port);
});
