var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/exampleDb';

MongoClient.connect(url, function(err, db) {

    var cursor = db.collection('Employee').find();

    cursor.each(function(err, doc) {

        console.log(doc);

    });
}); 