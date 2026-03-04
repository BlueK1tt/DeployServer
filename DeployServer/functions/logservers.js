//script to update gitsinfo file
//have info about the different "depositories", 
//name, main file, version, last updated, current status online/offline

const fs = require('fs');
const pm2 = require('pm2');
const config = require('../resources/config.json'); //custom configurations file for secret info
const logfile = ('../resources/gitsinfo.json')
//var { runningservers } = require('../server')
let runningservers = [];
module.exports =  {
    data: logservers()
};

function logservers(){ //the main function, dictating what to do in order
    //"action" variable, what to do
    console.log("runningservers")
    console.log(runningservers)

    emptyfile() //check if file exists
    let folders = verifyfolderexists();
    //getstartfile(folder, file);
    getstartfile()
}

function verifyfolderexists(){ //get and verify existing folders in depositories folder
    //check if folders exist
    var folders = fs.readdirSync('./depositories',{ withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
    console.log(folders)
    return folders;
}

function getstartfile(){ //get depositories star files in array or string
    //get starter files
    console.log("getstartfile")
    const startfiles = config.mainfiles;
    console.log(startfiles)

    let fileexists;
    if(fileexists === true){
        console.log("start file exists")
        return true;
    }
    if(fileexists === false){
        console.log("start file doesnt exist")
        return false
    } else {
        console.log("getstartfile error")
        return;
    }
}

function emptyfile(){ //if JSON is empty or doesnt exist yet
    console.log("emptyfile")
    let fileexist = filexist("gitsinfo.json")
    if(fileexist === false){
        console.log("File doesnt exist")
        //log file doesnt exist, needs to be created

    }
    if(fileexist === true){
        console.log("File exists 2")
        const data = () => fs.readFileSync(require.resolve(logfile), { encoding: "utf8" });
        let commandslistobj = data()
        let commandliststr = commandslistobj
        //newdpository needs to be here,incase its created manually
        let filecontents = commandliststr != "" ? commandliststr : newdepository();
        console.log(filecontents)

        //console.log(commandliststr)
        return;
    } else {
        console.log("emptyfile error")
        return;
    }
}

function newdepository(){ //create completely new depository entry into JSON
    console.log("newdepository")

    //get info from /depositories/ and pm2check to create first data entry
    //return something else, like "OK" or smth


    return "FIRST ENTRY"
}

function deldepository(){ //delete some depository from the JSON
    console.log("deldepository")

    //propably command from server "uninstall" and delete that spesific depository gitsinfo entry

}

function updateinfo(){ //update JSON info about the servers
    console.log("updateinfo")

    //need to make this proper,
    //update every time server goes offline or online
    //update every time  github is pulled or some tile is updated but not deleted

}

function getpm2servers(){ //get list of servers, see if online or offline
    console.log("getpm2servers")

    //need to get current pm2 server instances
    //possibly need to outsource this, because ASYNC
}


function filexist(filename){
    let files = fs.readdirSync('./resources/')
    //filename = "gitsinfo.json"
    if(files.includes(filename)){
        console.log("File exists 1")
        return true
    } 
    if(!files.includes(filename)){
        console.log("File does not exist")
        return false
    } else {
        console.log("error in file check")
        return "error"
    }
}