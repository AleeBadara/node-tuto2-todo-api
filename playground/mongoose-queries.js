const ObjectID = require('mongodb').ObjectID;
const mongoose = require('./../server/db/mongoose');
const Todo = require('./../server/models/todo');
const User = require('./../server/models/user');

var id = '5835ad7ff6a7cf1a84e7c63a';
if (!ObjectID.isValid(id)) {
    console.log('Id not valid');
}

//Différentes méthode de recherche par id

//Todo

//envoie une liste
Todo.find({
    _id: id
}).then(function (todos) {
    console.log('Todos', todos);
});

//envoie juste le 1er élément
Todo.findOne({
    _id: id
}).then(function (todo) {
    console.log('Todo', todo);
}).catch(function (error) {
    console.log(error);
});

//User
//par id
var idUser = '583616276a64d20b1c3d45ed';
User.findById(idUser).then(function (user) {
    if (!user) {
        return console.log('User not found');
    }
    console.log('User', JSON.stringify(user, undefined, 2));
}).catch(function (error) {
    console.log(error);
});
