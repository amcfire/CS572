const http = require('http');
const url = require('url')
const {fork} = require('child_process');
const server = http.createServer().listen(3000);

server.on('request', (req, res) =>{
    const myUrl = url.parse(req.url, true);
    const childProcess = fork(function2)
    childProcess.send(myUrl.query.url);
    childProcess.on('message', (msg) => {
        res.end(msg);
    })
    console.log(myUrl.query.url);
})

function2(){
	const fs = require('fs')
	const analiseTxt = (msg) =>{return fs.readFileSync(__dirname + '/' + msg, 'utf8');}
	process.on('message', (msg) => {   
		let resp = new Promise(function(resolve){
			resolve(analiseTxt(msg))
		});
		resp.then(e => {
			process.send(e)
		})
	})
}