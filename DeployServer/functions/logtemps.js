const fs = require('fs');
//way to set message default to " " or null?
let { logdata} = require("../server");
const { time } = require('console');


module.exports = {
    data : logtemps()
};

function logtemps(){
    console.log("logtemps")
    //onsole.log(logdata)
    let logdatastr = JSON.stringify(logdata)
    let splitdata = logdatastr.split(":")
    let cleanmessage = splitdata[1]; //check, uptime, hello etc...
    let message = cleanmessage.slice(1);
    let messagetime = splitdata[2]; //Server has been online for, 1 minute, 2 seconds...

    let timesplit = messagetime.slice(27,-4)
    //console.log(messagetime)
    //console.log(timesplit)

    let logentry = new Object
    logentry["message"] = message
    logentry["time"] = timesplit
    console.log(logentry)
    
    const logsdata = () => fs.readFileSync(require.resolve("../resources/temps.json"), { encoding: "utf8" });
    let logsfile = logsdata()
    console.log(logsfile)
    if(logsfile == ""){
        emptyfile(message,timesplit)
        return "yo"
    }
    if(logsfile != ""){
        appendlogs(message,timesplit)
        return "yo"
    } else {
        console.log("logs error")
        return "yo"
    }
}

function emptyfile(message, timesplit){
    console.log("empty file")
    console.log(message,timesplit)

    var logarray = [];
    logarray = JSON.stringify({"message":message,"time":timesplit},null,2),null,2,"\n";
    console.log(logarray)
    
    let firstentry = "["+"\n"+logarray+"\n"+"]";
    fs.writeFile('./resources/temps.json', firstentry, "utf-8", function(error){
        if(error){
            console.log(error)
        };
        return true;
    });
    fs.close;
    return "yo"
}

function appendlogs(message, timesplit){
    console.log("appendlogs")
    console.log(message,timesplit)

    const existingdata = () => fs.readFileSync(require.resolve("../resources/temps.json"), { encoding: "utf8" });
    let existinglogs = existingdata()
    console.log(existinglogs)
    
    
    return "yo"
}