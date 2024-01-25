const http = require('node:http'); //http module
const fs = require('fs'); //filesystem


const config = require('./config.json'); //custom configurations file for secret info
const { measureMemory } = require('node:vm');
const serverCommands = fs.readdirSync('./commands'); //folder to create commands in

const hostname = config.hostname;
const port = config.netport;
const timenow = new Date();

var currentWork = 0; //current processes the server is working on, default 0

const server = http.createServer((req, res) => {
    var message = req.url;
    console.log(message);

    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain');
    res.end('Hello World\n');
});

server.listen(port, hostname, () => {
    console.log("Server staring up at: " + timenow)
    console.log('Server running at ' + config.hostname +':' + config.netport);
    

    
});