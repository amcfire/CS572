let express = require('express');           //dependencies
let fs = require('fs')                      //dependencies
let morgan = require('morgan')              //dependencies
let path = require('path')                  //dependencies
let cors = require('cors');                 //dependencies
const port = 3000;  //global var

//DataSource
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const uri = "mongodb+srv://tempuser:tempuser@homework07-hznuj.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
let db;
client.connect(err => {
    db = client.db('homework07')
})


let app = express();  //instanciation
app.use(express.json());
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))
app.use(cors());

//middleware de conexxion a bd
app.use((req, res, next) => { req.db = db; next() })

//Get ->  Find
app.get('/lectures', function (req, res) {
    req.db.collection('lectures').find({}).toArray((err, data) => {
        res.json(data)
    })
});

//Get -> FindOne
app.get('/lectures/:id', function (req, res) {
    const id = req.params.id;
    const query = { _id: ObjectID(id) }
    req.db.collection('lectures').findOne(query, (err, data) => {
        console.log(data)
        res.json(data)
    })
});

// post -> add
app.post('/lectures', function (req, res) {
    console.log("starting post")
    req.db.collection('lectures').insertOne(req.body.data, (errinsert, resinsert) => {
        if (errinsert) throw res;
        //console.log("res = " + resinsert)
        console.log("creation of lecture");
        res.send(req.body);
        res.end();
    })
});

// Put -> update
app.put('/lectures/:id', function (req, res) {
    console.log("Updating...")
    const id = req.params.id;
    const query = { _id: ObjectID(id) }
    req.db.collection('lectures').update(query, req.body.data, (err, data) => {
        //console.log(data)
        res.send("element modified succesfully")
    })
});

// Delete -> Delete
app.delete('/lectures/:id', function (req, res) {
    const id = req.params.id;
    const query = { _id: ObjectID(id) }
    req.db.collection('lectures').deleteOne(query, (err, data) => {
        //console.log(data)
        res.json(data)
    })
});

console.log(`Start listening port ${port}`);
app.listen(port);

// //si quiero seleccionar por curso
// app.get('/lectures/:course', function (req, res) {
//     const course = req.params.course;
//     const query = { course }
//     req.db.collection('lectures').findOne(query, (err, data) => {
//         console.log(data)
//         res.json(data)
//         res.end();
//     })
//     //res.send(JSON.stringify(result));
// });

