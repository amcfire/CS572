const fetch = require('node-fetch');
const express = require('express');
const { of } = require("rxjs");
const app = express();

app.listen(3000, (e) => console.log('Server Runing...'))
app.get('/users', function (req, res) {
    let url = 'https://randomuser.me/api/?results=10';
    let promise = fetch(url);
    //promisses
    promise.then(data => data.json()).then(json => res.json(json));
    //observers
    of(promise).subscribe((e) => console.log("this data", e.then(data => data.json()).then(json => res.json(json))))
        //Away , async function
        (async function () {
            const data = await promise;
            const json = await data.json();
            res.json(json)
        })();
})