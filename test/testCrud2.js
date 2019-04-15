const express = require('express')
const path = require('path')
const tasks = require('./routes/tasks')
//const MongoClient = require('mongodb').MongoClient
//const Client = new MongoClient('mongodb://localhost:27017')

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const uri = "mongodb+srv://tempuser:tempuser@homework07-hznuj.mongodb.net/test?retryWrites=true";
const Client = new MongoClient(uri, { useNewUrlParser: true });

let db

var app = express();
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
    if (!db) {
        Client.connect(function (err) {
            db = Client.db('todo')
            req.db = db
            next()
        })
    } else {
        req.db = db
        next()
    }
})

app.use('/tasks', tasks)

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    })
})

app.listen(3000)