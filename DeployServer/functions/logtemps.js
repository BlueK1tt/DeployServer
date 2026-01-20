const fs = require('fs');
//way to set message default to " " or null?
const { time } = require('console');


module.exports = {
    data : logtemps()
};

function logtemps(){
    var { logdata} = require("../server");
    console.log("logtemps")
    //onsole.log(logdata)
    let logdatastr = JSON.stringify(logdata)
    let splitdata = logdatastr.split(":")
    let cleanmessage = splitdata[1]; //check, uptime, hello etc...
    let message = cleanmessage.slice(1);
    let messagetime = splitdata[2]; //Server has been online for, 1 minute, 2 seconds...
    
    let timesplit = messagetime.slice(27,-4)
    //delete require.cache[require.resolve("../server")] //clears the cache allowing for new data to be read
    //console.log(messagetime)
    //console.log(timesplit)

    let logentry = new Object
    logentry["message"] = message
    logentry["time"] = timesplit
    console.log(logentry)
    
    const logsdata = () => fs.readFileSync(require.resolve("../resources/temps.json"), { encoding: "utf8" });
    let logsfile = logsdata()
    delete require.cache[require.resolve("../resources/temps.json")] //clears the cache allowing for new data to be read

    //console.log(logsfile)
    if(logsfile == ""){
        emptyfile(message,timesplit)
        return "yo1"
    }
    if(logsfile != ""){
        appendlogs(message,timesplit)
        return "yo2"
    } else {
        console.log("logs error")
        return "yo3"
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
    return "yo4"
}

function appendlogs(message, timesplit){
    console.log("appendlogs")
    console.log(message,timesplit)

    const existingdata = () => fs.readFileSync(require.resolve("../resources/temps.json"), { encoding: "utf8" });
    let existinglogs = existingdata()
    console.log(existinglogs)
    let existinglogsclean = existinglogs.slice(1,-1);
    let replacestring = existinglogsclean.replaceAll('},{','},\n{')
    fs.close;

    let alreadylogs = JSON.parse(existinglogs)
    console.log(alreadylogs)

    var newlog = [];
    newlog = JSON.stringify({"message":message,"time":timesplit},2, null), 2, "\n";
    let secondentry = "[\n"+replacestring+",\n"+newlog+'\n'+"]";
    fs.writeFile('./resources/temps.json', secondentry,'utf-8', function(error){
        if(error){
            console.log(error);
        };
        return true;
    });
    fs.close;
    
    
    return "yo5"
}