const fs = require('fs');
const config = require('../resources/config.json'); //server configurations file
//way to set message default to " " or null?
const { timenow } = require('../server');


module.exports = {
    data : logtemps()
};

function logtemps(){
    var { logdata} = require("../server");
    //console.log("logtemps")
    //onsole.log(logdata)
    let logdatastr = JSON.stringify(logdata)
    let splitdata = logdatastr.split(":")
    let cleanmessage = splitdata[1]; //check, uptime, hello etc...
    let message = cleanmessage.slice(1);
    let messagetime = splitdata[2]; //Server has been online for, 1 minute, 2 seconds...
    //console.log(messagetime)
    
    
    let nowtime = JSON.stringify(timenow)
    let newdatetime = nowtime.slice(12,-7) //2026-01-22T09:40:58
    let splitdatetime = newdatetime.split("T")
    let splitdate = splitdatetime[0].split("-")
    let thisdate = splitdate[2]+"."+splitdate[1]+"."+splitdate[0]

    let datentime = thisdate + "-" +splitdatetime[1]
    //console.log(datentime)
    //let timesplit = messagetime.slice(27,-4)
    let timesplit = message == "Startup" ? datentime : messagetime.slice(27,-5);

    //delete require.cache[require.resolve("../server")] //clears the cache allowing for new data to be read
    //console.log(messagetime)
    //console.log(timesplit)


    let logentry = new Object
    logentry["message"] = message
    logentry["time"] = timesplit
    //console.log(logentry)
    
    var logfilename = "temps.json" //logfilename can be altered for "true" in server config
    var filexeist = filexist(logfilename)

    if(filexeist == false){
        //create file and call emptyfile
        fs.writeFile(logfilename,"", 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        //console.log('File written successfully!');
        });
        emptyfile(message, timesplit)
        return;
    }
    if(filexeist == true){
        //console.log("Writing new log entry...")

        var wipeconfig = config.newlogfile //true or false
        //console.log(wipeconfig)
        if(wipeconfig == "true" && message.includes("Startup")){
            //overwrite file with empty
            var isemptyfile = ""
            fs.writeFile('./resources/temps.json', isemptyfile,'utf-8', function(error){
                if(error){
                    console.log(error);
                };
            });
            fs.close;
            emptyfile(message,timesplit)
        } 
        if(wipeconfig == "false"){
            //console.log("no wipe config")
        }


        const logsdata = () => fs.readFileSync(require.resolve("../resources/temps.json"), { encoding: "utf8" });
        let logsfile = logsdata()
        delete require.cache[require.resolve("../resources/temps.json")] //clears the cache allowing for new data to be read
    
        //console.log(logsfile)
    
    
        //read config.json 
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
        
    } else {
        console.log("Error in filexesist")
        return
    }
}

function emptyfile(message, timesplit){
    //console.log("empty file")
    //console.log(message,timesplit)

    var logarray = [];
    logarray = JSON.stringify({"message":message,"time":timesplit},null,2),null,2;
    //console.log(logarray)
    
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
    //console.log("appendlogs")
    //console.log(message,timesplit)

    const existingdata = () => fs.readFileSync(require.resolve("../resources/temps.json"), { encoding: "utf8" });
    let existinglogs = existingdata()
    //console.log(existinglogs)
    let existinglogsclean = existinglogs.slice(1,-1);
    let replacestring = existinglogsclean.replaceAll('},{','}\n,{')
    replacesthis = replacestring+","
    fs.close;

    let alreadylogs = JSON.parse(existinglogs)
    //console.log(alreadylogs)

    var newlog = [];
    newlog = JSON.stringify({"message":message,"time":timesplit},null, 2),null, 2;
    let secondentry = "["+replacesthis+newlog+'\n'+"]";
    fs.writeFile('./resources/temps.json', secondentry,'utf-8', function(error){
        if(error){
            console.log(error);
        };
        return true;
    });
    fs.close;
    
    
    return "yo5"
}

function filexist(filename){
    let files = fs.readdirSync('./resources/')
    //filename = "temps.json"
    if(files.includes(filename)){
        //console.log("File exists")
        return true
    } 
    if(!files.includes(filename)){
        //console.log("File does not exist")
        return false
    } else {
        //console.log("error in file check")
        return "error"
    }
}