let express = require('express');

const MongoClient = require('mongodb').MongoClient;
let app = express();
const client = new MongoClient("mongodb://homework01:homework01@ds233806.mlab.com:33806/homework01");
let port = 3000;

function findSecretMessage(response) {
    client.connect(function (err) {
        //console.log("Previo conexion")
        const db = client.db('homework01')
        const collection = db.collection('data')
        let query = { key: { $exists: true }, message: { $exists: true } }
        const cursor = collection.findOne(query, function (err, doc) {
            if (err) throw err;
            console.log(`key es ${doc.key} y el message es ${doc.message}`)
            let encryptor = require('simple-encryptor')(doc.key)
            console.log(encryptor.decrypt(doc.message))
            decryptedJson = JSON.stringify({ secret: encryptor.decrypt(doc.message) })
            console.log(decryptedJson);
            response.send(decryptedJson);
            response.end
        });
        console.log("ya se ejecuto el cursor")
    })
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