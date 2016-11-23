const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

MongoClient.connect('mongodb://localhost:27017/TodoApp', function (error, db) {
    if (error) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    //recupére tous les éléments de la table Todos
    db.collection('Todos').find().toArray().then(function (docs) {
        console.log('All todos');
        console.log(JSON.stringify(docs, undefined, 2));

    }, function (err) {
        console.log('Unable to fetch todos', err);
    });

    //recupére tous les éléments de la table Todos qui ont completed à false
    db.collection('Todos').find({
        completed: false
    }).toArray().then(function (docs) {
        console.log('Todo(s) with completed = false');
        console.log(JSON.stringify(docs, undefined, 2));

    }, function (err) {
        console.log('Unable to fetch todos', err);
    });

    //recupére des todos par id
    db.collection('Todos').find({
        _id: new ObjectID('58346ab4ad61f710641a67f1')
    }).toArray().then(function (docs) {
        console.log('Todo(s) by Id');
        console.log(JSON.stringify(docs, undefined, 2));

    }, function (err) {
        console.log('Unable to fetch todos', err);
    });

    //compte le nombre de todo
    db.collection('Todos').count().then(function (count) {
        console.log('Total todo(s)', count);
        console.log(JSON.stringify(docs, undefined, 2));

    }, function (err) {
        console.log('Unable to fetch todos', err);
    });

    //recupére un user par son nom
    db.collection('Users').find({
        name: 'John Doe'
    }).toArray().then(function (docs) {
        console.log('User by name');
        console.log(JSON.stringify(docs, undefined, 2));

    }, function (err) {
        console.log('Unable to fetch todos', err);
    });

    //db.close();
});
