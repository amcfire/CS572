const fs = require('fs');
const server = require('http').createServer();

//Method 1: ReadFile -> High memory consumption
server.on('request', (req, res) => {
    fs.readFile(__dirname + '/BigFile.zip' , (err, data) => {
      if (err) throw err;    
      res.end(data);
      console.log("Finish readFile")
    });
}).listen(8080,'127.0.0.1');

//Method 2: ReadFileSync -> Bad Idea, navigator is waiting  
server.on('request', (req, res) => {
    fs.readFileSync(__dirname + '/BigFile.zip' , (err, data) => {
      if (err) throw err;    
      res.end(data);
    });
    console.log("Finish readFileSync");
}).listen(8080,'127.0.0.1');

//Method 3: createReadStream -> Low memory consumption -> Best alternative
server.on('request', (req, res) => {
    fs.createReadStream(__dirname + '/BigFile.zip' ).pipe(res);
    console.log("Finish Stream");
}).listen(8080,'127.0.0.1');
