// Create an Express application that will accept a GET request to route /users and send a response with users json data. 
// • Use JSON data from URL https://randomuser.me/api/?results=10 
// • Fetch the data using (axios) module and use Async/Await. 
// • Your application should run fluently behind any proxy without revealing 
//      the framework name to clients, proxy should not cache the response. 
// • Your route should be case sensitive and strict. 
// • Send standard pagination options in the response headers. 
/// • Allow the response to be cached for one day if no change occur at the server. 
//304 cached 
//200 means not cached 

//express is like java, first you have to declare some variables then manin function 
// dependencies means imports 
// if we need to use the imports instantions 

const axios = require('axios');
const express = require('express');
const app = express();

app.disable('x-powered-by');//configuration
app.disable('etag');//configuration
app.enable('case sensitive routing');//configuration
app.enable('strict routing');//configuration
app.enable('trust proxy');//configuration

app.set('port', process.env.PORT || 3005);// configuracion
//console.log(process.env);
const port = app.get('port');

console.log(port);

const userAPI = 'https://randomuser.me/api/?results=10';

app.get('/users', (Request1, Response1) => {
    console.log("1 recibi una peticion");
    fetchData(Request1, Response1);

    console.log("4 ya sigo pero no he contestado");
});

async function fetchData(Request1, Response2) {
    console.log("2 esto es una fun async fuera");
    try {
        console.log("3 esto es una fun async dentro");
        console.log(userAPI);
        const usersResponse = await axios.get(userAPI + "&page=" + Request1.query.page);
        console.log(userAPI + "&page=" + Request1.query.page);
        console.log("5 luego de un rato recibi la data ");

        sendUserData(usersResponse, Response2);
    } catch (error) {
        res.status(500).send({
            "error": {
                "code": 500,
                "message": error
            }
        });
    }
}

function sendUserData(usersResponseRandomuser, Response3) {
    const page = usersResponseRandomuser.data.info.page;
    console.log('page' + page);
    Response3.set({
        'Content-Type': 'application/json',
        'Cache-Control': 'private, max-age=86400',
        'Last-Modified': new Date()
    });
    Response3.set('link', buildPaging(page))
    Response3.links(buildPaging(page));
    console.log("pagino ");
    Response3.send(usersResponseRandomuser.data);
    console.log("ya envie la informacion");
}

function buildPaging(page) {
    const firstUrl = `${userAPI}&page=1`;
    const prevUrl = `${userAPI}&page=${page - 1}`;
    const nextUrl = `${userAPI}&page=${page + 1}`;
    const lastUrl = `${userAPI}&page=100`;//supuesto
    const paging = {
        first: firstUrl,
        next: nextUrl,
        last: lastUrl
    };

    if (page > 1) paging.prev = prevUrl;

    return paging;
}

app.listen(port, () => console.log(`Listening to ${port}`));//bootup