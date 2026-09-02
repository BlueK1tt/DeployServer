//script to update gitsinfo file
//have info about the different "depositories", 
//name, main file, version, last updated, current status online/offline

const fs = require('fs');
const pm2 = require('pm2');

const config = require('../resources/config.json'); //custom configurations file for secret info
const logfile = ('../resources/gitsinfo.json')
const ignoredepots = ['Jorma','PyPost']
//let runningservers = [];
let { runningservers } = require('../server'); //this raises error on startup

module.exports =  {
    data: logservers()
};

function logservers(){ //the main function, dictating what to do in order
    console.log("logservers function")
    //console.log(datetime())
    //"action" variable, what to do


    //console.log("runningservers")
    //console.log(runningservers)
    
    var isfileempty = emptyfile() //check if file exists
    console.log(isfileempty)
    if(isfileempty === "True"){
        console.log("Creating file....")
        newdepository();
    }
    if(isfileempty === "False"){
        console.log("file is not empty")
    } else{
        
    }
    let folders = verifyfolderexists();
    //getstartfile(folder, file);
    getstartfile(folders)
}

function verifyfolderexists(){ //get and verify existing folders in depositories folder
    //check if folders exist
    var folders = fs.readdirSync('./depositories',{ withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
    //console.log(folders)
    allfolders = folders.toString()
    //console.log(allfolders)
    return allfolders;
}

function getstartfile(folders){ //get depositories start files in array or string
    //get starter files
    console.log("getstartfile")
    let searchfiles = filestosearch();
    //console.log(searchfiles)
    //console.log(folders)
    verifyexistingrepofiles(folders,searchfiles)

    let fileexists;
    if(fileexists === "True"){
        console.log("start file exists")
        return true;
    }
    if(fileexists === false){
        console.log("start file doesn't exist")
        return "False";
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
        return "False";
    }
    if(fileexist === true){
        console.log("File exists 2")
        const data = () => fs.readFileSync(require.resolve(logfile), { encoding: "utf8" });
        let commandslistobj = data()
        let commandliststr = commandslistobj
        //newdpository needs to be here,incase its created manually
        let filecontents = commandliststr != "" ? commandliststr : newdepository();
        //console.log(filecontents)

        //console.log(commandliststr)
        return "True";
    } else {
        console.log("emptyfile error")
        return;
    }
}

function newdepository(depositoryname){ //create completely new depository entry into JSON
    console.log("newdepository")

    //get info from /depositories/ and pm2check to create first data entry
    //return something else, like "OK" or smth

    //name, main file, version, last updated, current status online/offline
    let newDepository = new Object
    newDepository["name"] = "DepositoryName" //get as passed variable
    newDepository["file"] = "Server File" //fetch with other function using servername
    newDepository["version"] = "Server version"  //fetch with other function reading files using servername
    newDepository["update"] = "Last updated" //read and get information from logfile, update the status when updating
    newDepository["status"] = "Online/Offline" //just read runningservers, but also update file with runningservers

    console.log(newDepository)
    return "FIRST ENTRY"
}

function deldepository(depositoryname){ //delete some depository from the JSON
    console.log("deldepository")

    //propably command from server "uninstall" and delete that spesific depository gitsinfo entry
    return;
}

function updateinfo(){ //update JSON info about the servers
    console.log("updateinfo")
    //need to make this proper,
    //update every time server goes offline or online
    //update every time  github is pulled or some tile is updated but not deleted

    //get the name of what repository to update
    //use same object, delete existing one, add new one in place
    return;
}

function filexist(filename){ //use for new repositories to verify before adding
    let files = fs.readdirSync('./resources/')
    //filename = "gitsinfo.json"
    if(files.includes(filename)){
        //console.log("File exists 1")
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

function verifyexistingrepofiles(folders, searchfiles){ //send folder name and search through files
    //called from loop, sending 1 folder per time as variable
    //all folders exist in /depositories
    //use files spesified to verify if folder has them
    //needed files are startrfile and config
    var allfolders = new Array()
    allfolders = folders.split(",")

    //console.log(allfolders)
    allfolders = allfolders.filter( ( el ) => !ignoredepots.includes( el ) );
    //console.log(allfolders)

    var arrayLength = allfolders.length;
    for (var i = 0; i < arrayLength; i++) {
        //console.log(allfolders[i]);
        //get files in the folder
        let fetchedfiles = fs.readdirSync('./depositories/'+allfolders[i]);
        //console.log(fetchedfiles)
        //console.log(searchfiles)
        const matchedfile = searchfiles.filter(value => fetchedfiles.includes(value));
        
        if(matchedfile == null){//check for match in starterfiles
            console.log(allfolders[i]+" is missing startfile!");
        }
        if(!fetchedfiles.includes("config.json")){//check for config file
            console.log(allfolders[i]+" is missing config file!");
        }
        else{
            console.log(allfolders[i]+"-OK")
        }
    }
    //return true if ok, return false if some files is missing


    return //depotverification
}

function filestosearch(){ //get variables and make array to use as search filter
    const startfiles = config.mainfiles; //common filenames defined in config
    var filenamearray = new Array()
    filenamearray = startfiles.split(",")
    //filenamearray.push("") //added filenames to search, seperate by "",
    return filenamearray
}

function datetime(){
    //console.log("datetime")

    var time = new Date().getTime(); // get your number
    var date = new Date(time); // create Date object

    //console.log(date.toString())
    var datetime = date.toString();
  /* //old code
    let nowtime = JSON.stringify(timenow)
    //console.log(nowtime)
    let newdatetime = nowtime.slice(12,-7) //2026-01-22T09:40:58
    let splitdatetime = newdatetime.split("T")
    console.log("splitdatetime" +splitdatetime)
    let splitdate = splitdatetime[0].split("-")
    let thisdate = splitdate[2]+"."+splitdate[1]+"."+splitdate[0]

    let datentime = thisdate + "-" +splitdatetime[1]

    console.log(datentime)
    */

    return datetime;
}