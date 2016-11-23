const MongoClient = require('mongodb').MongoClient;



MongoClient.connect('mongodb://localhost:27017/TodoApp', function (error, db) {
    if (error) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

   /* db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false

    }, function (error, result) {
        if (error) {
            return console.log('Unable to insert todo', error);
        }
        console.log(JSON.stringify(result.ops, undefined, 2))
    });

    db.collection('Users').insertOne({
        name: 'John Doe',
        age: '0',
        location: 'Ground Zero'

    }, function (error, result) {
        if (error) {
            return console.log('Unable to insert user', error)
        }
        console.log(JSON.stringify(result.ops, undefined, 2));

    });*/

    db.close();
});
