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


function commandz() { //get all current commands that have js file aka repsonse
    var filez = fs.readdirSync("./commands/");
    let original = filez
    result = original.map(function(d) {
        return d.replace('.js', '');
    });
    var stringCMD = result.toString();
    fs.close;
    return stringCMD;
};

/*function commandscollection() { //currently not in use, using the above commands command
    var files = fs.readdirSync('./commands/');
    let original = files
    result = original.map(function(d) {
        return d.replace('.js', "");
    });
    fs.close;
    return result;
}*/

function getfile() {
    var files = fs.readdirSync('./commands/');
    let original = files
    strip = original.map(function(d){
        return d.replace('.js', "");
    });
    match = strip.indexOf(commandmsg)
    const position = Number(match)
    result = files[position];
    fs.close;
    return result
}

function valuesToArray(obj) {
    return Object.keys(obj).map(function (key) { return obj[key];});
}

/*function getdepots(){ //function to get current depositories and create array out of them
    var files = fs.readFileSync("./Depositories/DepositoriesList.txt");
    if (files == ""){
        console.log("no current depositories")
    }
    else {
        let depots = files
        return depots;
    }
    fs.close;    
}*/



function pm2start(){ //start specific server on command, need to check available ports

};

function pm2stop(){ //need to stop specific server gracefully,

};


function commandconstructor(c){ //c = different incoming msg
    console.log("commandconstuctor");
    getfile(commandmsg);
    const data = require(`./commands/${commandmsg}`);
    var sentData = valuesToArray(data); 
    asmessage = sentData[0];
    console.log(asmessage);
    try {
        response.statusCode = 200;
        response.end(asmessage);
    } catch (error) {
        console.error(error);
        response.end(`cathced error in program: ${commandmsg}`);
        response.finish;
    }
    if( c == asmessage){
        console.log("constructor true")
    }
    else{
        console.log("if false")
    }

}

const requestListener = function(request, response){
//const server = http.createServer()
//server.on('request', async(request, response, callback) => {

    response.statusCode = 200;
    response.setHeader('Content-type', 'text/plain');

    message = request.url;
    msg = message.slice(1); //cutting the first / out of message
    console.log("> " + msg);
    commandmsg = null;

    if (msg.includes('commands') == true){
        commandmsg = msg.slice(9);
        
    };    
    serverCmd = commandz();

    //get current available "special commands", other words, filenames in commands folder
    if (msg == "commands" || commandmsg == "") {
        console.log(serverCmd);
        response.write(serverCmd);
        
    }

    if (serverCmd.indexOf(commandmsg) > -1 && commandmsg != " ") {
        console.log("command matches:"+ commandmsg);
        commandconstructor(msg);
        console.log("after func")
        
        
    }

    if (serverCmd.indexOf(commandmsg) == -1 && msg != "restart" && msg != "getdepots" && msg != "refresh" && msg != "gotgits" && msg != "shutdown" || commandmsg == " ") {
        console.log("Command not found");
        response.end("command not found");
    }

    //here code to read and write txt or json file
    //needed to save current saved and edited codes and their versions and sizes
    //on startup , compare saved information of git and infomation of gits on github
    //if differ, push notification that "theres update(s) available"

    //read and write gotgits json file
    //its required to keep track of versions and updates
    

    //include things to send as variables to file as part of command

    if(serverCmd.indexOf(commandmsg) > -1 && commandmsg != ""){
        getfile(commandmsg);
        const data = require(`./commands/${commandmsg}`);
        var sentData = valuesToArray(data); 
        asmessage = sentData[0];
        console.log(asmessage);
        try {
            response.statusCode = 200;
            response.end(asmessage);
        } catch (error) {
            console.error(error);
            response.end(`cathced error in program: ${commandmsg}`);
            response.finish;
        }
        return;
    }

    /*if (msg == 'gotgits') { //currently problem with this command
        fname = msg + ".json";
        console.log(isFile(fname));
        if(isFile("gotgits.json") == true){
            fetch('fname').then().then().catch();
            
        }
        else {
            console.log("error")
            return; 
        }*/
    if (msg == "getdepots"){
        sendlist = getdepots();
        console.log("sendlist: " + sendlist);
        response.end(sendlist)
        return;
    }


    if (msg == "refresh") {
        //refresh filesystem
        commandz();
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