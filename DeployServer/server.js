const http = require('node:http'); //http module
const fs = require('fs'); //filesystem
const os = require('os');
const pm2 = require('pm2');
const { Buffer } = require('node:buffer');

const config = require('./config.json'); //custom configurations file for secret info

const hostname = config.hostname;
const port = config.netport;
const timenow = new Date();

const isFile = fileName => { //function to test if file exists
    return fs.lstatSync(fileName).isFile();
};

var basecommands = ['shutdown','restart','refresh'];
var direction = ['start', 'stop'];

function saveLog(){ //function to happen before restart and shutdown, take current depositories list and put it into log.JSON
    var logpromise = isFile("log.JSON");
    var depromise = isFile("./depositories/DepositoriesList.JSON");
    if(depromise && logpromise == true){ //for secutiy reasons check if both filese exist
        console.log("files exists")
        

    }
    else{
        console.log("Error | One or more files do not exist");
    }
};

function compareLog(){ //function to happen right after start to compare if anything has changed
    let oldlog = fs.readFileSync('log.json');
    let oldstring = JSON.stringify(oldlog)
    fs.close;

    let newlog = fs.readFileSync('./depositories/DepositoriesList.JSON');
    let newstring = JSON.stringify(newlog);
    fs.close;

    if(oldstring === newstring){ 
        statement = true; //files match
    }
    else{
        statement = false;  //files dont match

    }
    //statement needs to be true | false
    return statement;
};

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

function getfile(msg) {
    //console.log("getfile")
    let files = fs.readdirSync('./commands/');
    let original = files
    strip = original.map(function(d){
        return d.replace('.js', "");
    });
    match = strip.indexOf(msg)
    const position = Number(match)
    result = files[position];
    console.log("getfile" + result);
    fs.close;
    return result
}

function valuesToArray(obj) {
    return Object.keys(obj).map(function (key) { return obj[key];}); //dont know why i have this here but i know ill need it
}

function msgidentify(msg){ //c = different incoming msg
    if(basecommands.includes(msg)){
        console.log("base command");
        return msg;
    }
    if (msg.startsWith("start") || msg.startsWith("stop") || direction.includes(msg, -2)){
        console.log("start or stop");
        //need to take msg and slice it before =
        if(msg.startsWith("start")){
            filename = msg.slice(6);
            startfile = filename + ".js";
            pm2start(startfile);
            return "start " + startfile;
        };
        if(c.startsWith("stop")){
            filename = msg.slice(5);
            stopfile = filename + ".js";
            pm2stop(stopfile);
            return "stop " + stopfile;
        }
        else{
            return "error with statement";
        }
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

function pm2start(startfile){ //start specific server on command, need to check available ports
    //curl 3000/start=BluBot
    //depositories need to have path to server file
    //direction = start/stop
    //if direction, send to other file to identify location of file and check errors then send back and start or stop pm2 function
    console.log("pm2"  + startfile);
    pm2.start



};

function pm2stop(stopfile){ //need to stop specific server gracefully,
    console.log("pm2"  + stopfilefile);
};


const requestListener = function(request, response){

    response.statusCode = 200;
    response.setHeader('Content-type', 'text/plain');

    message = request.url;
    let msg = message.slice(1); //cutting the first / out of message
    console.log("> " + msg);
    needcommand = msgidentify(msg)

    console.log(needcommand);
    response.write(JSON.stringify(needcommand));
    
    
    //here code to read and write txt or json file
    //needed to save current saved and edited codes and their versions and sizes

    statement = compareLog() //function to take current depositories list and compare it to log.JSON file
    if(statement = true){
        console.log("different")
    }
    else{
        console.log("not different");
    }
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
        saveLog();
        setTimeout(function() {
            console.log('Restarting')
            process.exit(128)
        }, 2000);
        
    }

    //shutdown on command
    if (msg == 'shutdown') {
        console.log('Shutting down the server...')
        saveLog();
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