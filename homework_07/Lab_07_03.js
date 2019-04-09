let express = require('express');

//const MongoClient = require('mongodb').MongoClient;


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://tempuser:tempuser@homework07-hznuj.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

let app = express();
//const client = new MongoClient("mongodb://homework01:homework01@ds233806.mlab.com:33806/homework01");
let port = 3000;

function findSecretMessage(response) {
    client.connect(err => {
        if (err) throw err;
        const db = client.db('homework07')
        const collection = db.collection('lectures')
        const cursor = collection.find();// perform actions on the collection object
        console.log(cursor)
        response.end
        client.close();
    });
}

app.get('/', function (request, response) {
    response.status(200);
    response.set('Content-Type', 'text/html');
    response.send('Hello!!!');
    response.end();
})

app.get('/secret', function (request, response) {
    //response.status(200);
    response.set('Content-Type', 'application/json');
    findSecretMessage(response);
})

app.listen(port, function () {
    console.log(`Server is running on port ${port}`)
})