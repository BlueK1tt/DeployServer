const http = require('node:http'); //http module
const fs = require('fs'); //filesystem
const os = require('os');
const pm2 = require('pm2');

const config = require('./config.json'); //custom configurations file for secret info

const hostname = config.hostname;
const port = config.netport;
const timenow = new Date();

const isFile = fileName => {
    return fs.lstatSync(fileName).isFile();
};

var basecommands = ['shutdown','restart','refresh'];
var direction = ['start', 'stop'];

function commandscollection() { //currently not in use, using the above commands command
    var files = fs.readdirSync('./commands/');
    let original = files
    fs.close;
    result = original.map(function(d) {
        return d.replace('.js', "");
    });
    var stringCMD = result.toString();
    console.log("collention" + result);
    return stringCMD;
}

function getfile() {
    console.log("getfile")
    var files = fs.readdirSync('./commands/');
    let original = files
    fs.close;
    strip = original.map(function(d){
        return d.replace('.js', "");
    });
    match = strip.indexOf(msg)
    const position = Number(match)
    result = files[position];
    console.log("getfile" + result);
    return result
}

function valuesToArray(obj) {
    return Object.keys(obj).map(function (key) { return obj[key];}); //dont know why i have this here but i know ill need it
}

function msgidentify(c){ //c = different incoming msg
    if(basecommands.includes(c)){
        console.log("base command");
        return msg;
    }
    if (c.startsWith("start", "stop") || direction.includes(c, -2)){
        console.log("direction: ")
        
        console.log("direction");
        return " ";
    }
    else{
        console.log("custom");
        //need to slice message
        command = getfile(msg); 
        const data = require(`./commands/`+ `${command}`);
        var sentData = valuesToArray(data); 
        asmessage = sentData[0];

        try {
            return asmessage;
        } catch (error) {
            return error;

        }
    }
}

function pm2start(){ //start specific server on command, need to check available ports
    //curl 3000/start=BluBot
    //direction = start/stop
    //if direction, send to other file to identify location of file and check errors then send back and start or stop pm2 function
};

function pm2stop(){ //need to stop specific server gracefully,

};


const requestListener = function(request, response){

    response.statusCode = 200;
    response.setHeader('Content-type', 'text/plain');

    message = request.url;
    msg = message.slice(1); //cutting the first / out of message
    console.log("> " + msg);
    needcommand = msgidentify(msg) 
    console.log(needcommand)
    response.write(needcommand);
    //here code to read and write txt or json file
    //needed to save current saved and edited codes and their versions and sizes
    //on startup , compare saved information of git and infomation of gits on github
    //if differ, push notification that "theres update(s) available"

    //read and write gotgits json file
    //its required to keep track of versions and updates
    

    //include things to send as variables to file as part of command

    if (msg == "refresh") {
        //refresh filesystem
        commandscollection();
        getfile();
        console.log("commands refreshed")
        response.end("commands refreshed");
        return;
    };
    
    //restart on command
    if (msg == 'restart') {
        console.log('Restarting the server...')
        response.end('Restarting...\n');
        setTimeout(function() {
            console.log('Restarting')
            process.exit(128)
        }, 2000);
        
    }

    //shutdown on command
    if (msg == 'shutdown') {
        console.log('Shutting down the server...')
        setTimeout(function() {
            response.end('Shutting down...\n');
            console.log('Shutting down.')
            process.exit(0)
        }, 1500)
    }

    else { //if nothing matches
        response.statuscode = 204;
        //204 no content available
        response.end();
        return;
    }
    return;
};

const server = http.createServer(requestListener)
server.listen(port, hostname, () => {
    console.log("Server staring up at: " + timenow)
    console.log('Server running at ' + config.hostname +':' + config.netport);
});