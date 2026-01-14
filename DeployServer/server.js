const http = require('node:http'); //http module
const fs = require('fs'); //filesystem
const pm2 = require('pm2');
var path = require('path');

const config = require('./resources/config.json'); //custom configurations file for secret info
const { stringify } = require('node:querystring');

const hostname = config.hostname;
const port = config.netport;
const timenow = new Date();
var runningservers = [];
var thisfilename = path.basename(__dirname); //gets this files name

var basecommands = ['shutdown','restart','refresh']; //commands to ignore as "commands"
var direction = ['start', 'stop']; 
var msgid = 0; //just defult id for messages, gets +1 automatically
var repeated = 0;
var msg = " ";

const isFile = fileName => { //function to test if file exists
    return fs.lstatSync(fileName).isFile();
};

function saveLog(){ //function to happen before restart and shutdown, take current depositories list and put it into log.JSON
    console.log("savelog");
    var logpromise = isFile("./resources/log.json");
    var depromise = isFile("./depositories/DepositoriesList.JSON");

    let rawdata1 = fs.readFileSync('./depositories/DepositoriesList.json')
    let json1 = JSON.parse(rawdata1);
    fs.close;

    if(depromise && logpromise == true){ //for secutiy reasons check if both filese exist
        console.log("files exists")
        newjsonobj = Object.assign({}, json1, {}) //copies depositories json file to variable
        //console.log(newjsonobj);
        var json2 = JSON.stringify(newjsonobj, null, 2);//null and '2' make the json look prettier
        fs.writeFile('./resources/log.json', json2, 'utf-8', function(error){
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

    let newlog = fs.readFileSync('./depositories/DepositoriesList.json');
    const newstring = JSON.parse(newlog);
    str2 = stringify(newstring)
    fs.close;

    if(str1.includes(str2)){ 
        statement = true; //files match
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

function getfile(msg) { //------ can be made into own file and moved to 'functions'
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
        fs.close;
        return onresult
    }
    else {
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

function getfuntion(folder,filename){
    let filePath = "./"+folder+"/"+filename
    //console.log(filePath)
    let data = require(filePath);
    let sentData = valuesToArray(data); 
    asmessage = sentData[0];
    delete require.cache[require.resolve(filePath)] //clears the cache allowing for new data to be read
    return asmessage;
}

function msgidentify(msg){ 
    msgid ++;
    console.log("id:" + msgid);

    let passstatus = getfuntion("functions","logtemps") //not working on this node version
    console.log(passstatus)

    console.log("msgidentify")
    if(msg == ""){
        console.log("no specified command")
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
                pm2start(filename,startfile);
                return "start " + startfile;
            }
        };
        if(msg.startsWith("stop")){
            filename = msg.slice(5);
            if(filename == "all"){
                console.log("all")
                pm2stop("all");
                return "stop all"
            } else {
                if (!depotlist.includes(filename)){
                    return "msgidentify stop error"
                } 
                else {
                    const depotdata = require('./functions/depotdata')
                    var sentData = valuesToArray(depotdata); 
                    asmessage = sentData[0];
                    delete require.cache[require.resolve(`./functions/depotdata`)] //clears the cache allowing for new data to be read
                    stopfile = filename + ".js";
                    //functon to send message to the server about to be stopped
                    //possibly await function to wait for response back, for graceful stop
                    pm2stop(filename);
                    return "stop " + stopfile;
                }
            }
        }
        else{
            console.log("msgidentify else")
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
            console.log("msgidentify error");
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
    if(msg.includes('disablecommand')){
        const data = require('./commands/disablecommand')
        var sentData = valuesToArray(data); 
        asmessage = sentData[0];
        delete require.cache[require.resolve(`./commands/disablecommand`)] //clears the cache allowing for new data to be read
        return "disablecommand";
    }if(msg == "testcommand"){
        console.log("testcommand")
        //console.log("testcommand")
        //let filedata = getfuntion("functions","logtemps.js")
        //console.log(filedata)
        sendtomaster("all","this is test message")
        return;
    }
    else{
        console.log("custom");
        //need to slice message
        command = getfile(msg);
        if(command == " "){
            console.log("custom command error")
            return "command error"
        } if(msg.includes("=")){
            
            let data = require(`./commands/`+ `${command}`);
            let sentData = valuesToArray(data); 
            asmessage = sentData[0];

            //need to seperate "fancy commands" from regular commands
                //so "update" and "update=BluBot"

            //need to flush the custom command
            delete require.cache[require.resolve(`./commands/`+`${command}`)] //clears the cache allowing for new data to be read
            //console.log("cache cleared");
            try {
                return asmessage;
            } catch (error) {
                console.log(error)
                return error;
            }
        } 
        else {
            console.log("custom command else")
            //here need to check disabledcommands JSON first.
            //commands status are read on server start
            //let commandsjson = require(`./resources/commands.json`); //need to convert into fs.readfile

            let commandsliststr = fs.readFileSync('./resources/commands.json')
            let findcommand = msg
            let commandsjson = JSON.parse(commandsliststr)
            fs.close;
            //commandsliststr = JSON.stringify(commandsjson)

            let found = commandsjson.find(({ command }) => command == findcommand)
            if(found == null){
                console.log("foundcommand is null")
                return "command not in list";
            };
            if(found.status == 'enabled'){               
                console.log("custom cmd:" + command)
                let data = require(`./commands/`+ `${command}`);
                let sentData = valuesToArray(data); 
                asmessage = sentData[0];
    
                //need to seperate "fancy commands" from regular commands
                    //so "update" and "update=BluBot"

                //need to flush the custom command
                delete require.cache[require.resolve(`./commands/`+`${command}`)] //clears the cache allowing for new data to be read
                //console.log("cache cleared");
                try {
                    console.log("custom commandd asmessage")
                    return asmessage;
                } catch (error) {
                    console.log(error)
                    return error;
                }
            }
            if(found.status == 'disabled'){ //make log to 'temps.json', if tried multiple times 2 minutes, disable log
                
                console.log('Sorry, command "'+command+'" is disabled')
                return "Sorry command is disabled"
            } else {
                return "error with command verification"
            }
            return;
        };
        return
    };
    return;
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
                        return "Deployment server shutdown";
                    }
                    if (pmmsg == 1) {
                        pm2.restart(Element.name)
                        console.log("Deployment server restart")
                        return "Deployment server restart";
                    }
                    else{
                        console.log("shutdown else")
                        return "else shutdown"
                    }
                }
                if (Element.name != 'Deployment server'){
                    var keyCount  = servcount
                    console.log(keyCount)
                    for(let i = 1; i < keyCount; i++){
                        if(servcount[i] == 0){
                            //console.log("first if")
                            return servcount[i]
                        }
                        else{
                            pm2stop("all")

                            //just empty, nothing needs to happen
                            //console.log("else")
                            //console.log(Element.pm2_env.pm_exec_path)
                            let envpath = Element.pm2_env.pm_exec_path
                            //let finstring = envpath + ".js";
                            var cutexcess = Element.pm2_env.pm_exec_path.split("/")
                            //console.log(cutexcess)
                            var cutexcesslen = cutexcess.length
                            //console.log(cutexcesslen)
                            //console.log(cutexcess[6]) // need last -1
                            let servname = cutexcess[6] + ".js" //need to take last
                            //console.log("servname"+servname)
                            msgidentify("stop="+cutexcess[8])
                            let stopfile = cutexcess[8]
                            //pm2stop(stopfile)
                            pm2.stop(stopfile)
                            return;
                        }
                    }

                    //console.log("stop:"+ Element.name)
                    //pm2.stop(Element.name);
                    //console.log("pm2 daemon "+ Element.name + " stopped")
                    return "Service stopping...";
                }
                else{
                    console.log("no running programs")
                    return "no running programs"
                }
            }) //call the pm2stop function with with each running daemon
            //console.log( "pm2 daemons stopped")
                return
            }
        if(err == null && list == null){ //if no error but list empty
                console.log("no running programs")
                return "No running programs"
            }
        if(err != null){ //if error, list doenst matter
                console.log(err)
                return err
            }
        else {
                console.log("uknown error")
                return "Uknown pm2 error"
        }
        })
    }
    catch (error ){
        console.error(error)
        return error
    }
}
function thirtyTimer(){
    setInterval(MyTimer, 30000); //60 second timer call function below
    function MyTimer(){
        console.log("myTimer")
        var connected = msgidentify("check"); //will just send "check" like normal command request to function
        exports.message = "check"; //export msg as variable to use in modules

        if(connected == "not connected"){
            console.log("Internet disconnected");
            pm2disconnect(2);
            return;
        }
        else{
            console.log("all is good")
            return;
        }
    }
}

function pm2check(instance){ //function the check what servers are running

    //get list of running pm2 instances
    if(runningservers == null){ //if array is empty
        let runningserverlist = runningservers.length > 0 ? ("Currently running servers:"+runningservers.toString()) : "No running servers";
        //console.log(runningserverlist)
        return false
    } else { //if array is not empty
        if(runningservers.includes(instance)){ //if include is true
            //console.log("pm2check includes")
            return true
        }
        if(!runningservers.includes(instance)){ //if include is false
            //console.log("pm2check does not include")
            return false
        } else {
            console.log("pm2check error")
            return false
        }
    }
};

function pm2list(){ //to get all running servers as variable
    //console.log("pm2list")
    let mainfile = fs.readFileSync('./resources/log.json', 'utf8')
    fs.close;
    let pm2serverlist = JSON.parse(mainfile)
    //console.log(pm2serverlist)
    let keys = Object.keys(pm2serverlist)
    //console.log(keys)
    return keys
}

function pm2start(startfile,filename){ //start specific server on command, need to check available ports    
    //console.log("startfile")
    pm2connect();
    const data = require(`./functions/findfile`);
    var sentData = valuesToArray(data); 
    startfile = sentData[0];
    delete require.cache[require.resolve(`./functions/findfile`)] //clears the cache allowing for new data to be read
    
    var isrunningcheck = pm2check(startfile)
    isrunning = isrunningcheck
    if(isrunning === true){
        var isrunningtext = startfile + " is already running";
        return isrunningtext;
    } 
    if(isrunning === false) {
        let startcondition = require(`./functions/internetcheck`);
        countid = startcondition.startcondition.count
        //console.log("first"+startcondition.startcondition.count)
        delete require.cache[require.resolve(`./functions/internetcheck`)] //clears the cache allowing for new data to be read
        //console.log(startcondition)

        if(countid == 0){
            //console.log(startcondition.startcondition.message + filename)    
            repeated = startcondition.startcondition.count
            return startcondition.startcondition.message
        }
        if(countid == 1){
            repeated = startcondition.startcondition.count
            runningservers.push(startfile)
            pm2.start(`${startfile}`, function(err, apps) {
            //console.log(apps)
            });
        } else {
            console.log("error with start conditions")
            return "error with start conditions";
        }
        return;
    } else{
        console.log("error with starting")
        return "starting error"
    }
};

function pm2stop(stopfile){ //need to stop specific server gracefully,
    if(stopfile == "all"){
        pm2.list((err, list) => {
            const id = 0;
            
            list = list.map(item => {
                return item.id !== id ? item : null;
            }).filter(item => item !== null)
            
            servcount = Object.keys(list).length
            //console.log(list)

            const stoplist = [];
            list.forEach((Element) => {
                if(Element.name == "Deployment server"){
                    //main server
                    console.log("main server")
                    return;
                }
                if(Element.name != "Deployment server"){
                    //console.log(Element.name)
                    //pm2.delete(Element.name)
                    let servername = Element.name + ".js"
                    console.log(servername)
                    stoplist.push(servername)
                    pm2.stop(`${Element.name}`, function(err, apps) {
                        if (err) {
                            console.log(err)
                            pm2.flush(Element.name);
                        pm2.disconnect();
                        }
                        return;
                    });
                    return;
                    //push element into array
                    //take the array out of foreach and list to stop each element in array
                }
                else {
                    //console.log("else")
                    return
                }
            })
            return;
        });
        return;

    } else {
        const data = require(`./functions/findfile`);
        var sentData = valuesToArray(data); 
        stopfile = sentData[0];
        delete require.cache[require.resolve(`./functions/findfile`)] //clears the cache allowing for new data to be read
        
        var isstopped = pm2check(stopfile)
        //console.log(isstopped)

        if(isstopped === false){
            var isstoppedtext = stopfile + " is already stopped"
            return isstoppedtext;
        }
        if(isstopped === true){
            let itemid = arrayservermatch(stopfile)
            //console.log("itemid"+itemid)
            let removeitem = runningservers[itemid]
            //console.log(removeitem)

            runningservers.splice(itemid)
            pm2.stop(`${stopfile}`, function(err, apps) {
                if (err) {
                    console.log(err)
                    pm2.flush(stopfile);
                    return pm2.disconnect();
                }
            });
            //console.log("pm2stop:"  + stopfile);
            console.log("Shutting down server"+stopfile+"...")
            return;
        }
        else{
            return "stopping error"
        }
    };
};
function arrayservermatch(stopfile){
    let servertomatch = (element) => element = stopfile
    let itemposition = runningservers.findIndex(servertomatch)
    //console.log(itemposition)
    return itemposition
}

function pm2bussi(){ //pm2launchbus to get data from clien to server
    console.log("bus active");
    pm2.launchBus(function(err, pm2_bus) {
        pm2_bus.on('process:msg', function(packet) {
            processthis = pm2packetprocess(packet) //0 to, 1 from, 2 msg
            appdata = packet.data.app + " : " + packet.data.msg
            if(processthis === true){
              //console.log("process this")
              bussifunctions(appdata)
              return;
            }
            if(processthis === false){
              //console.log("dont process this")
              return
            } else {
              console.log("processthis error")
              return;
            }
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
    if(appdata.includes("test")){
        console.log("test")
        let testdata = testsend()
        pm2datasend(appdata,testdata);

        return 
    }
    if(appdata.includes("joulu")){
        const data = require('./commands/joulu')
        var sentData = valuesToArray(data); 
        asmessage = sentData[0];
        delete require.cache[require.resolve(`./commands/joulu`)] 
        console.log(asmessage)
        let msg = "joulubtn"+":"+asmessage
        sendtomaster("Ticker",msg)
    }
    else {
        //console.log("appdata" + appdata)
        console.log("bussi else")
        const data = require('./functions/outcommand')
        var sentData = valuesToArray(data); 
        asmessage = sentData[0];
        delete require.cache[require.resolve(`./functions/outcommand`)] //clears the cache allowing for new data to be read
        return asmessage;
    };
};

function pm2packetprocess(packet){
    //process packets coming in and return data if for this server
    if(packet == "undefined"){
        return false
    } else {
        packetdataapp = JSON.stringify(packet.data.app);
        //console.log(packetdataapp)
        let destinationsender = packetdataapp.split(":");
        //console.log(destinationsender[0])
        if(!destinationsender[0].includes(thisfilename)){
            //console.log("not for this server")
            return false
        } else {
            //console.log("For this server")
            return true
        }
    }
}

function sendtomaster(destination, data){
    if(destination == "all"){ //send message to all servers
        let destinationsender = pm2list();
        process.send({ //this is just example, boiletplate for future apps
            type : 'process:msg',
            data : {
                app : destinationsender,
                msg : data
            }
        });
        return;
    }
    if(destination != "all"){ //send message to specified server
        var destinationsender = destination +":"+ thisfilename
        process.send({ 
            type : 'process:msg',
            data : {
                app : destinationsender,
                msg : data
            }
        });
        return;
    } else {
        console.log("sendtomaster error")
        return;
    }
    
};

function testsend(data){
    console.log("testsend")
    let exampledata = "This is example data from 'main'";

    return exampledata
};

const requestListener = function(request, response){
    message = "";
    response.statusCode = 200;
    response.setHeader('Content-type', 'text/plain');
    var message = request.url;

    msg = message.slice(1); //cutting the first / out of message
    console.log("> " + msg);
    
    exports.message = { msg }; //export msg as variable to use in modules
    exports.timenow = { timenow };
    exports.repeated = { repeated };

    needcommand = msgidentify(msg) //command type
    //console.log(needcommand);
    response.write(JSON.stringify(needcommand) + '\n');
    
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
        sendtomaster("all","Server is restarting...")
        pm2disconnect(1);
        console.log('Restarting the server...')
        response.end('Restarting...\n');
        pm2stop("all")
        setTimeout(function() {
            console.log('Restarting')
            process.exit(128)
        }, 2000);
    }
    //shutdown on command
    if (msg == 'shutdown') {
        sendtomaster("all","Server is shutting down...")
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