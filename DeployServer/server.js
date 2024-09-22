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

var basecommands = ['commands','shutdown','restart','refresh']

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
    return Object.keys(obj).map(function (key) { return obj[key];});
}

function commandconstructor(c){ //c = different incoming msg
    //console.log("commandconstuctor");
    if(basecommands.includes(c)){
        console.log("base command");
        }
    else{
        console.log("custom");
        command = getfile(msg); 
        const data = require(`./commands/`+ `${command}`);
        var sentData = valuesToArray(data); 
        asmessage = sentData[0];
        //console.log(asmessage);
        try {
            return asmessage;
        } catch (error) {
            return error;

        }
    }
    return true;
}

function pm2start(){ //start specific server on command, need to check available ports

};

function pm2stop(){ //need to stop specific server gracefully,

};


const requestListener = function(request, response){
//const server = http.createServer()
//server.on('request', async(request, response, callback) => {

    response.statusCode = 200;
    response.setHeader('Content-type', 'text/plain');

    message = request.url;
    msg = message.slice(1); //cutting the first / out of message
    console.log("> " + msg);
    needcommand = commandconstructor(msg)
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