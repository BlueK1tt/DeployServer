const http = require('node:http'); //http module
const fs = require('fs'); //filesystem

const config = require('./config.json'); //custom configurations file for secret info
const serverCommands = fs.readdirSync('./commands'); //folder to create commands in

const hostname = config.hostname;
const port = config.netport;
const timenow = new Date();


function getFile() {
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

function commandscollection() {
    var files = fs.readdirSync('./commands/');
    let original = files
    result = original.map(function(d) {
        return d.replace('.js', "");
    });
    fs.close;
    return result;
}

function preparecommand(){
    insidermsg = reqmsg.slice(1);
    commandmsg = insidermsg.slice(9);

    if (insidermsg.includes("commands") && !insidermsg.includes(serverCommands)){
        command = "commands";
    }
    else if (insidermsg.includes("commands") && commandmsg != "") {
        getFile(commandmsg);
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
    } else {
        command = insidermsg;
    }
}

const requestListener = function(request, response){
    response.setHeader("Content-Type", "application/json");
    reqmsg = request.url;
    preparecommand(reqmsg);
    console.log(reqmsg);
    console.log(command);

    switch(command) {
        /*case "commands":
            console.log(commandscollection);
            response.end(commandscollection);*/
        case "restart":
            console.log("Restaring the server...");
            response.end("Restarting...\n ");
            setTimeout(function() {
                console.log("Restarting");
                process.exit(128);
            }, 2000 );

        case "shutdown":
            console.log("Shutting down the server...")
            setTimeout(function() {
                response.end("Shutting down...\n");
                console.log("Shutting down.");
                process.exit(0);
            }, 1500)
    }
};

const server = http.createServer(requestListener);

server.listen(port, hostname, () => {
    console.log("Server staring up at: " + timenow)
    console.log('Server running at ' + config.hostname +':' + config.netport);
});

