const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

MongoClient.connect('mongodb://localhost:27017/TodoApp', function (error, db) {
    if (error) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    //suppression de tous les todos qui correspondent au texte mentionné
    db.collection('Todos').deleteMany({
        text: 'Eat lunch'
    }).then(function (result) {
        console.log(result);
    }, function (err) {

    });

    //supprime le 1er todo qui correspond au texte mentionné
    db.collection('Todos').deleteOne({
        text: 'Eat lunch'
    }).then(function (result) {
        console.log(result);
    }, function (error) {

    });


    //renvoie l'élément qui a été supprimé
    db.collection('Todos').findOneAndDelete({
        completed: true
    }).then(function (result) {
        console.log(result);
    }, function (error) {

    });

    //db.close();
});
