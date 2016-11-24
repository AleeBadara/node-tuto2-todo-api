//Librairies exports
var express = require('express');
var bodyParser = require('body-parser'); //permet de transformer un json en objet javascript

//Local exports
var mongoose = require('./db/mongoose');
var Todo = require('./models/todo');
var User = require('./models/user');

var app = express();

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


app.listen(3000, function () {
    console.log('Started on port 3000');
});