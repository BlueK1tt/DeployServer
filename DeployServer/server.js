const http = require('node:http'); //http module
const fs = require('fs'); //filesystem
const os = require('os');
const pm2 = require('pm2');

const config = require('./resources/config.json'); //custom configurations file for secret info
const { stringify } = require('node:querystring');


const hostname = config.hostname;
const port = config.netport;
const timenow = new Date();

const isFile = fileName => { //function to test if file exists
    return fs.lstatSync(fileName).isFile();
};

var basecommands = ['shutdown','restart','refresh'];
var direction = ['start', 'stop'];
var msgid = 0; //just defult id for messages, gets +1 automatically

function saveLog(){ //function to happen before restart and shutdown, take current depositories list and put it into log.JSON
    console.log("savelog");
    var logpromise = isFile("./resources/log.JSON");
    var depromise = isFile("./Depositories/DepositoriesList.JSON");

    let rawdata1 = fs.readFileSync('./Depositories/DepositoriesList.json')
    let json1 = JSON.parse(rawdata1);
    fs.close;

    if(depromise && logpromise == true){ //for secutiy reasons check if both filese exist
        console.log("files exists")
        newjsonobj = Object.assign({}, json1, {}) //copies depositories json file to variable
        //console.log(newjsonobj);
        var json2 = JSON.stringify(newjsonobj, null, 2);//null and '2' make the json look prettier
        fs.writeFile('./resources/log.JSON', json2, 'utf-8', function(error){
            if(error){
                console.log(error)
            }
        });
        fs.close
        console.log("Log save done.")
    }
    else{
        console.log("Error | One or more files do not exist");
    }
};

function compareLog(){ //function to happen right after start to compare if anything has changed
    let oldlog = fs.readFileSync('./resources/log.json');
    const oldstring = JSON.parse(oldlog)
    str1 = stringify(oldstring)
    fs.close;

    let newlog = fs.readFileSync('./depositories/DepositoriesList.JSON');
    const newstring = JSON.parse(newlog);
    str2 = stringify(newstring)
    fs.close;

    if(str1.includes(str2)){ 
        statement = true; //files match
        //console.log("logs match")
        return true
    }
    else{
        statement = false;  //files dont match
        console.log("Theres update(s) available");
        return false;
    }
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
};

function getfile(msg) {
    if(msg == ""){
        return "no specified command";
    }
    if(msg.includes('=')){
        shortened = msg.split('=')[0];
        //console.log("shortened" + shortened);

        let onfiles = fs.readdirSync('./commands/');
        let onoriginal = onfiles
        onstrip = onoriginal.map(function(c){
            return c.replace('.js', "");
        });
        onmatch = onstrip.indexOf(shortened)
        const onposition = Number(onmatch)
        onresult = onfiles[onposition];
        //console.log("getfilebetter" + onresult);
        fs.close;
        return onresult
    }
    else {
        //console.log("msg " + msg)
        //console.log("getfile")
        let files = fs.readdirSync('./commands/');
        let original = files
        strip = original.map(function(d){
            return d.replace('.js', "");
        });
        match = strip.indexOf(msg)
        if (match == -1){
            return " ";
        }else{
            const position = Number(match)
            result = files[position];
            //console.log("getfile" + result);
            fs.close;
            return result
        };
    };
};

function valuesToArray(obj) {
    return Object.keys(obj).map(function (key) { return obj[key];}); //dont know why i have this here but i know ill need it
};

function msgidentify(msg){ //c = different incoming msg
    msgid ++;
    console.log("id:" + msgid);

    if(msg == ""){
        return "no specified command";
    }
    if(basecommands.includes(msg)){
        console.log("base command");
        return msg;
    }
    if (msg.startsWith("start") || msg.startsWith("stop") || direction.includes(msg, -2)){
        //console.log("start or stop");

        const data = require('./commands/depots')
        var sentData = valuesToArray(data); 
        depotlist = sentData[0];

        //need to take msg and slice it before =
        if(msg.startsWith("start")){
            filename = msg.slice(6);
            if (!depotlist.includes(filename)){
                return "Requested file not in log"
            } else {
                const depotdata = require('./functions/depotdata')
                var sentData = valuesToArray(depotdata); 
                asmessage = sentData[0];
                //console.log(asmessage)
                delete require.cache[require.resolve(`./functions/depotdata`)] //clears the cache allowing for new data to be read
                startfile = filename + ".js";
                pm2start(filename);
                return "start " + startfile;
            }
        };
        if(msg.startsWith("stop")){
            filename = msg.slice(5);
            if (!depotlist.includes(filename)){
                return "error"
            } else {
                const depotdata = require('./functions/depotdata')
                var sentData = valuesToArray(depotdata); 
                asmessage = sentData[0];
                delete require.cache[require.resolve(`./functions/depotdata`)] //clears the cache allowing for new data to be read
               
                stopfile = filename + ".js";
                pm2stop(filename);
                return "stop " + stopfile;
            }
        }
        else{
            return "error with statement";
        }
        return " "; // this is here just in case if forget
    }
    if(msg.startsWith("install") || msg.startsWith("uninstall")){

        if(msg.startsWith("install")){
            const data = require('./functions/install')
            var sentData = valuesToArray(data); 
            asmessage = sentData[0];
            delete require.cache[require.resolve(`./functions/install`)] //clears the cache allowing for new data to be read

            return asmessage;
        }

        if(msg.startsWith("uninstall")){
            const data = require('./functions/uninstall')
            var sentData = valuesToArray(data); 
            asmessage = sentData[0];
            delete require.cache[require.resolve(`./functions/uninstall`)] //clears the cache allowing for new data to be read

            return asmessage;
        }
        else {
            console.log("error");
            return "install error"
        }
    }
    if (msg == "update"){
        console.log("update");
        basemessage = "update";

        command = getfile(msg)
        const data = require(`./commands/update`);
        var sentData = valuesToArray(data); 
        asmessage = sentData[0];
        delete require.cache[require.resolve(`./commands/update`)] //clears the cache allowing for new data to be read
        
        try {
            return asmessage;
        } catch (error) {
            return error;
        }
    }
    else{
        //console.log("custom");
        //need to slice message
        command = getfile(msg);
        if(command == " "){
            return "command error"
        } else {
            //console.log("custom cmd:" + command)
            const data = require(`./commands/`+ `${command}`);
            var sentData = valuesToArray(data); 
            asmessage = sentData[0];

            //need to flush the custom command
            delete require.cache[require.resolve(`./commands/`+`${command}`)] //clears the cache allowing for new data to be read
            //console.log("cache cleared");
            try {
                return asmessage;
            } catch (error) {
                console.log(error)
                return error;
            }
        };
    };
};

function pm2connect(){ //need to call this every first time starting pm2 daemon
    //console.log("pm2connect")
    pm2.connect(function(err) {
        if (err) {
            console.error(err)
            return "error" + err
        }
    })
}

function pm2disconnect(pmmsg){ //need to call this whenever shutting down or restarting the main server
    console.log(pmmsg)
    console.log("pm2disconnect")
    try{
        pm2.list((err, list) => {
        const id = 0;
        
        list = list.map(item => {
            return item.id !== id ? item : null;
        }).filter(item => item !== null)
        
        servcount = Object.keys(list).length
        //need to cut "deployment server" out of that list
        if(servcount >= 1){ //if no error and list not empty
            //need to stop all running daemons
            list.forEach((Element) => {
                if(Element.name == 'Deployment server'){
                    if(pmmsg == 0){
                        console.log("Deployment server shutdown")
                        return
                    }
                    if (pmmsg == 1) {
                        pm2.restart(Element.name)
                        console.log("Deployment server restart")
                        return;
                    }
                    else{
                        console.log("else")
                        return
                    }
                }
                if (Element.name != 'Deployment server'){
                    var keyCount  = servcount
                    console.log(keyCount)
                        for(let i = 1; i < keyCount; i++){
                            if(servcount[i] == 0){
                                console.log("first if")
                                return servcount[i]
                            }
                            else{
                                //just empty, nothing needs to happen
                                console.log("else")
                            }
                        }

                    console.log("stop:"+ Element.name)
                    pm2.stop(Element.name);
                    console.log("pm2 daemon "+ Element.name + " stopped")
                    return;
                }
                else{
                    console.log("no running programs")
                    return "no running programs"
                }
            }) //call the pm2stop function with with each running daemon
            console.log( "pm2 daemons stopped")
                return
            }
        if(err == null && list == null){ //if no error but list empty
                console.log("no running programs")
                return
            }
        if(err != null){ //if error, list doenst matter
                console.log(err)
                return 
            }
        else {
                console.log("uknown error")
                return 
        }
        })
    }
    catch (error ){
        console.error(error)
        return error
    }
}

function thirtyTimer(){
    setInterval(MyTimer, 60000); //60 second timer call function below
    function MyTimer(){
        //console.log("timer");
        var connected = msgidentify("check"); //will just send "check" like normal command request to function
        //console.log("test:"+test) // get "connected" or "not connected"
        //console.log(connected);
        if(connected == "not connected"){
            console.log("Internet disconnected");
            pm2disconnect(2);
            return;
        }
        else{
            //console.log("all is good")
            return;
        }
    }
}

function pm2start(startfile){ //start specific server on command, need to check available ports    
    //console.log("startfile")
    pm2connect();
    const data = require(`./functions/findfile`);
    var sentData = valuesToArray(data); 
    startfile = sentData[0];
    delete require.cache[require.resolve(`./functions/findfile`)] //clears the cache allowing for new data to be read

    //direction = start/stop
    //if direction, send to other file to identify location of file and check errors then send back and start or stop pm2 function

    //need to add check to see if any are running
    //console.log("pm2start:"  + startfile);
    pm2.start(`${startfile}`, function(err, apps) {
    //console.log(apps)
    });
};

function pm2stop(stopfile){ //need to stop specific server gracefully,
    const data = require(`./functions/findfile`);
    var sentData = valuesToArray(data); 
    stopfile = sentData[0];
    delete require.cache[require.resolve(`./functions/findfile`)] //clears the cache allowing for new data to be read
    
    pm2.stop(`${stopfile}`, function(err, apps) {
        if (err) {
            console.log(err)
            pm2.flush(stopfile);
            return pm2.disconnect();
        }
    });
    console.log("pm2stop:"  + stopfile);

    //first need to check if the one requested is running

    //only after that do rest, so it doesnt waste time running all
};

function pm2bussi(){ //pm2launchbus to get data from clien to server
    console.log("bus active");
    pm2.launchBus(function(err, pm2_bus) {
        pm2_bus.on('process:msg', function(packet) {
            appdata = packet.data.app + " : " + packet.data.msg
            bussifunctions(appdata)
        })
        if(err){
            console.log(err);
        }
    })
}

function bussifunctions(appdata){
    if(appdata.includes("button1")){
        console.log("Server button 1")

        return "button1";
    }
    else {
        //console.log("appdata" + appdata)
        
        const data = require('./functions/outcommand')
        var sentData = valuesToArray(data); 
        asmessage = sentData[0];
        delete require.cache[require.resolve(`./functions/outcommand`)] //clears the cache allowing for new data to be read
        return asmessage;
        
        //console.log("Something else")
    }
}
const requestListener = function(request, response){
    response.statusCode = 200;
    response.setHeader('Content-type', 'text/plain');
    message = request.url;

    msg = message.slice(1); //cutting the first / out of message
    console.log("> " + msg);
    exports.message = { msg }; //export msg as variable to use in modules

    needcommand = msgidentify(msg) //command type
    //console.log(needcommand);
    response.write(JSON.stringify(needcommand) + '\n');

    
    //here code to read and write txt or json file
    //on startup , compare saved information of git and infomation of gits on github

    //include things to send as variables to file as part of command

    if (msg == "refresh") {
        //refresh filesystem
        commandscollection();
        getfile(msg);
        console.log("commands refreshed")
        response.end("commands refreshed");
        return;
    };
    
    //restart on command
    if (msg == 'restart') {
        pm2disconnect(1);
        console.log('Restarting the server...')
        response.end('Restarting...\n');
        setTimeout(function() {
            console.log('Restarting')
            process.exit(128)
        }, 2000);
    }

    //shutdown on command
    if (msg == 'shutdown') {
        saveLog();
        pm2disconnect(0);
        console.log('Shutting down the server...')
        setTimeout(function() {
            response.end('Shutting down...\n');
            console.log('Shutting down.')
            pm2.stop[0]
            process.exit(0)
        }, 1500)
    }

    else { //if nothing matches
        response.statuscode = 204;
        //204 no content available
        response.end();
        delete(request);
        msg = "";
        return;
    }
    delete(request); //empties the "incoming" request
    msg = ""; //sets msg to basically empty
    return;
};

const server = http.createServer(requestListener)
server.listen(port, hostname, () => {
    console.log("Server staring up at: " + timenow)
    console.log('Server running at ' + config.hostname +':' + config.netport);
    compareLog();
    pm2bussi();
    thirtyTimer();
});