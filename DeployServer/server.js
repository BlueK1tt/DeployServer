const http = require('node:http'); //http module
const fs = require('fs'); //filesystem

const config = require('./config.json'); //custom configurations file for secret info
const { measureMemory } = require('node:vm');
const { text } = require('stream/consumers');
const serverCommands = fs.readdirSync('./commands'); //folder to create commands in

const hostname = config.hostname;
const port = config.netport;
const timenow = new Date();

var currentWork = 0; //current processes the server is working on, default 0

const isFile = fileName => {
    return fs.lstatSync(fileName).isFile();
};

const server = http.createServer()
server.on('request', async(req, res) => {
    
    message = req.url;

    //cutting the / out of message
    msg = message.slice(1);
    
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain');
    res.end('Hello World\n');

    //shutdown on command
    if (msg == 'shutdown') {
        console.log('Shutting down the server...')
        setTimeout(function() {
            console.log('Shutting down.')
            process.exit(0)
        }, 1500)
    }

    else{ //if nothing matches
        res.statuscode = 204;
        console.log(msg);
        //204 no content available
    }
});

server.listen(port, hostname, () => {
    console.log("Server staring up at: " + timenow)
    console.log('Server running at ' + config.hostname +':' + config.netport);

});
