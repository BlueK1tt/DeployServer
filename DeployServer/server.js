const http = require('node:http'); //http module
const fs = require('fs'); //filesystem
const path = require('path');
const cluster = require('cluster');
const os = require('os');

const config = require('./config.json'); //custom configurations file for secret info
const { machine } = require('node:os');
const serverCommands = fs.readdirSync('./commands'); //folder to create commands in

const hostname = config.hostname;
const port = config.netport;
const timenow = new Date();
const maxCPU = os.cpus().length;

var currentWork = 0; //current processes the server is working on, default 0
//used with javascript cluster to see current clusters


const isFile = fileName => {
    return fs.lstatSync(fileName).isFile();
};


function readFiles(dir, processfile) {
    fs.readdir(dir, (error, fileNames) => {
        if (error) throw error;

        fileNames.forEach(filename => {
            const name = path.parse(filename).name;
            const ext = path.parse(filename).ext;
            const filepath = path.resolve(dir, filename);

            fs.stat(filepath, function(error, stat) {
                if (error) throw error;
                const isFile = stat.isFile();
                
                if (isFile) {
                    processfile(filepath, name, ext, stat);
                }
            });
        });
    });
};


const server = http.createServer()
server.on('request', async(request, response, callback) => {
    
    message = request.url;
    msg = message.slice(1); //cutting the / out of message
    console.log(">" + msg);

    //slicing the incoming message if it starts with /command, meaning its command from commands folder
    if (msg.includes(commands) == true){
        commandmsg = msg.slice(8);
        console.log(commandmsg);
    }
    //need to be able to use filenames from commands folder as url end such as shutdown, restart etc
    //if message includes filename from commands, call that file


    //if curl message/command matches any of commands from command folder 
    if ([commandmsg].indexOf(serverCommands) > -1) {
        console.log("command matches");
    } 
    
    //here code to read and write txt or json file
    //needed to save current saved and edited codes and their versions and sizes
    //on startup , compare saved information of git and infomation of gits on github
    //if differ, push notification that "theres update(s) available"

    //read and write gotgits json file
    //its required to keep track of versions and updates

    //use module export callback arg functionality
    



    response.statusCode = 200;
    response.setHeader('Content-type', 'text/plain');
    //get current available "special commands", other words, filenames in commands folder
    if (msg == 'commands') {
        var files = fs.readdirSync('./commands/');
        let original = files
        result = original.map(function(d) {
            return d.replace('.js', '');
        });
        stringCMD = result.toString();
        response.end(stringCMD);
    }

    //here import using command call the correct command file
    //include things to send as variables to file as part of command


    
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

        response.end("");
        //204 no content available
    }
    return;
});


server.listen(port, hostname, () => {
    console.log("Server staring up at: " + timenow)
    console.log('Server running at ' + config.hostname +':' + config.netport);
});
