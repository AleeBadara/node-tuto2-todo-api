const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

MongoClient.connect('mongodb://localhost:27017/TodoApp', function (error, db) {
    if (error) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    //mettre à jour le champ completed d'un todo en fonction de son id
    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5835a4233677ece8059bbc5f')
    }, {
        $set: {
            completed: false
        }
    }, {
        returnOriginal: false
    }).then(function (result) {
        console.log(result);

    }, function (err) {

    });

    //mettre à jour le nom et l'age d'un user
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5835a3143677ece8059bbc5e')
    }, {
        $set: {
            name: 'Marie Doe'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then(function (result) {
        console.log(result);

    }, function (err) {

    });

    //db.close();
});
