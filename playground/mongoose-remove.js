const ObjectID = require('mongodb').ObjectID;
const mongoose = require('./../server/db/mongoose');
const Todo = require('./../server/models/todo');
const User = require('./../server/models/user');

var id = '5835ad7ff6a7cf1a84e7c63a';
if (!ObjectID.isValid(id)) {
    console.log('Id not valid');
}

//permet de supprimer tous les todos
/*Todo.remove({}).then(function (result) {
    console.log(result);
}, function (error) {

});*/

//permet de supprimer un todo par son id
Todo.findByIdAndRemove('5837625a4b0027b1570a8667').then(function (todo) {
    console.log(todo);
});
