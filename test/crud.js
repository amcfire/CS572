// Exercise
// Create an Express application that implements a Rest API for an entity // called grades:

// [{id: 1, name: “Asaad Saad", course: "CS572", grade: 95}]

// Write routes for the following CRUD operations and use the proper
// HTTP verbs (GET one and all, POST, and DELETE).
// ° Test with HTTP Client extension for VSCode.
// * Your API accepts and returns JSON data.
// * Log all requests to a file access. log using morgan middleware.
// ¢ Write a custom middleware to verify if a user passes a valid JSON.
// * Accept cross domain XHR requests using cors middleware.

let express = require('express');           //dependencies
let request = require("request");           //dependencies
let bodyParser = require('body-parser');    //dependencies
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

//data inicial
/*let grades = [
    { id: "1", name: 'edwin Bernal', course: 'MWA', grade: 95 },
    { id: "2", name: 'Andres Mendez', course: 'Alogorithm', grade: 92 },
    { id: "3", name: 'laura', course: 'BDA', grade: 60 }
]*/

let app = express();  //instanciation
app.use(express.json());
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))
app.use(cors());

//var urlencodedParser = express.urlencoded({ extended: true });
//app.use(urlencodedParser);

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
}
);

//si quiero seleccionar por curso
// app.get('/lectures/:course', function (req, res) {
//     const course = req.params.course;
//     const query = { course }
//     //const result = grades.find(grade => grade.id == id);
//     //specific info to return
//     //const result = yyyy;
//     req.db.collection('lectures').findOne(query, (err, data) => {
//         console.log(data)
//         res.json(data)
//         res.end();
//     })
//     //res.send(JSON.stringify(result));
// }
// );

// post -> add
// this is for create a new one
app.post('/lectures', function (req, res) {
    console.log("starting post")
    req.db.collection('lectures').insertOne(req.body.data, (errinsert, resinsert) => {
        if (errinsert) throw res;
        //console.log("res = " + resinsert)
    })
    console.log("creation of lecture");
    res.send(req.body);
    res.end();
}
);

// Put -> update
app.put('/lectures/:id', function (req, res) {
    /*grades.find(grade => {
        if (grade.id == req.params.id) {
            grade.id = req.body.id;
            grade.name = req.body.name;
            grade.course = req.body.course;
            grade.grade = req.body.grade;
            return grade;
        }
    });*/
    //res.send(grades.find(grade => grade.id == req.params.id));
    //something to put
    res.end();
}
);

// Delete -> Delete
app.delete('/lectures/:id', function (req, res) {
    /*
    const filtered = grades.filter(grade => { return grade.id !== req.params.id });
    grades = filtered;
    res.send(grades);*/
    //something to delete
    res.end();
}
);

console.log(`Start listening port ${port}`);
app.listen(port);