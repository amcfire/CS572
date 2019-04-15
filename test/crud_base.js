// HTTP Verbs and CRUD Consistency
// The following are the most commonly used server architecture HTTP
// methods and their corresponding Express methods:
// ¢ GET app.get() Retrieves an entity or a list of entities
// ¢ HEAD app.head() Same as GET, only without the body
// ¢ POST app.post() Submits a new entity
// ¢ PUT app.put() Updates an entity by complete replacement
// ¢ PATCH app.patch() Updates an entity partially
// ¢ DELETE app.delete() and app.del() Deletes an existing entity
// ¢ OPTIONS app.options() Retrieves the capabilities of the server

// Exercise
// Create an Express application that implements a Rest API for an entity // called grades:

// [{id: 1, name: “Asaad Saad", course: "CS572", grade: 95}]

// Write routes for the following CRUD operations and use the proper                    //DEPENDENCIES
// HTTP verbs (GET one and all, POST, and DELETE).                                      //INSTANTIATIONS
// ° Test with HTTP Client extension for VSCode.                                        //CONFIGURATIONS
// * Your API accepts and returns JSON data.                                            //MIDDLEWARE
// * Log all requests to a file access. log using morgan middleware.                    //ROUTES
// ¢ Write a custom middleware to verify if a user passes a valid JSON.                 //ERROR HANDLING
// * Accept cross domain XHR requests using cors middleware.                            //BOOTUP



let express = require('express');             //Dependencies
let request = require("request");
const bodyParser = require('body-parser');
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')
let cors = require('cors');
const port = 3000;

//data
let grades = [
    { id: "1", name: 'edwin Bernal', course: 'MWA', grade: 95 },
    { id: "2", name: 'Andres Mendez', course: 'Alogorithm', grade: 92 },
    { id: "3", name: 'laura', course: 'BDA', grade: 60 }
]

let app = express(); // instantiations

app.use(express.json());

let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))
app.use(cors());

var urlencodedParser = express.urlencoded({ extended: true });
app.use(urlencodedParser);


app.use(function (req, res, next) {
    try {
        if (req.method === 'POST')
            JSON.parse(req.body);
        next();
    } catch (e) {
        res.send("not Valid JSON");
        res.end();
    }
}
);


//Get
app.get('/grades', function (req, res) {
    let pagina = req.query.p;
    console.log(pagina);
    // console.log(req);
    res.send(grades);
    res.end();
}
);
app.get('/grades/:id', function (req, res) {
    const id = req.params.id;
    const result = grades.find(grade => grade.id == id);
    res.send(JSON.stringify(result));
    res.end();
}
);

// post
// this is for create a new one
app.post('/grades', function (req, res) {
    grades.push(req.body);
    console.log("creation of grade");
    res.send(req.body);
    res.end();
}
);

// Put
app.put('/grades/:id', function (req, res) {
    grades.find(grade => {
        if (grade.id == req.params.id) {
            grade.id = req.body.id;
            grade.name = req.body.name;
            grade.course = req.body.course;
            grade.grade = req.body.grade;
            return grade;
        }
    });

    res.send(grades.find(grade => grade.id == req.params.id));
    res.end();
}
);

// Delete
app.delete('/grades/:id', function (req, res) {
    const filtered = grades.filter(grade => { return grade.id !== req.params.id });
    grades = filtered;
    res.send(grades);
    res.end();
}
);
console.log(`start listen port ${port}`);
app.listen(port);