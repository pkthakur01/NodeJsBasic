/*var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
mongoose.connect(url, function(err, db) {useUnifiedTopology: true 

  if (err) throw err;
  console.log("Database created!");
  db.close();
});*/

//MongoClient.connect(url, function(err, db) );
// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/exampleDb",function(err, db,)
{
    console.log("We are connected");
    //db.close();
  
});
