//Dependencies
const express = require('express');
const cors = require('cors');
var app = express();
const url = require('url');
const logger = require('morgan')
const fs = require('fs');
const path = require('path')

const port = process.env.port || 3000;

app.use(cors());
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'morgan.log'), { flags: 'a' })
// setup 
app.use(logger('combined', { stream: accessLogStream }))
var jsonParser = express.json()

var grades = [{
    id: 975612,
    name: 'Mauricio',
    course: 'MWA',
    grade: 95
}, {
    id: 985524,
    name: 'Karen',
    course: 'MWA',
    grade: 84
},
{
    id: 871542
}]

//error messages
const res_obj = {
    parse_error: { message: 'JSON is invalid' },
    success: { message: 'Request successfully processed' },
    put_error: { message: 'No record' },
    post_error: { message: 'Error in post' },
    delete_error: {message: 'Delete failed'},
    post_error: { message: 'Object exists' }
}

//favicon
app.get('/favicon.ico', (req, res) => {
    const url_obj = url.parse(req.url, true);
    if (url_obj.path === '/favicon.ico')
        res.end();
})

//Validation process
var validateRequest = (req, res) => {
    return (req, res, next) => {
        console.log('Validating...', req.body)
        if (req.body === undefined)
            res.json(res_obj.parse_error)
        else
            next();
    }
}

//Get Request
app.get('/', function (req, res) {
    console.log('get request')
    res.json(grades);
});

//Post Request
app.post('/', jsonParser, validateRequest(), function (req, res) {
    console.log('post request', req.body);
    let is_exist = false;
    grades.map((item) => {
        if (item.id == req.body.id)
            is_exist = true;
    })
    if (is_exist)
        res.json(res_obj.post_error2);
    else {
        grades.push(req.body);
        res.json(res_obj.success);
    }
});

//Put Request
app.put('/', jsonParser, validateRequest(), function (req, res) {
    console.log('put request', req.body);
    var updated = new Promise(function (res, rej) {
        let index = -1;
        grades.map((item, i) => {
            console.log(item.id)
            if (item.id == req.body.id)
                index = i;
        })
        if (index > -1) {
            console.log('array index', index);
            grades[index] = req.body;
            res('ok')
        }
        else rej('not ok')
    })

    updated.then(() => {
        res.json(res_obj.success)

    })
        .catch(() => {
            res.json(res_obj.put_errror)
        });
});

//Delete Request
app.delete('/', jsonParser, function (req, res) {
    console.log('delete request', req.body);
    var removed = new Promise(function (res, rej) {
        let index = -1;
        grades.map((item, i) => {
            console.log(item.id)
            if (item.id == req.body.id)
                index = i;
        })
        if (index > -1) {
            console.log('array index', index);
            grades.splice(index, 1)
            res('ok')
        }
        else rej('nok')
    })
    removed.then(() => {
        res.json(res_obj.success)

    })
        .catch((err) => {
            res.json(res_obj.delete_errror)
        });
});

//Bootup
app.listen(port, () => {
    console.log('Listening on 3000')
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

module.exports = app;