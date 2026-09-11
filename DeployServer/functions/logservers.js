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
    getdepositorydata();

    //console.log("runningservers")
    //console.log(runningservers)
    
    var isfileempty = emptyfile() //check if file exists
    //console.log(isfileempty)
    if(isfileempty == "true"){
        console.log("Creating file....")
        newdepository();
    }
    if(isfileempty == "false"){
        console.log("file is not empty")
        updateinfo()
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
    //console.log("getstartfile")
    let searchfiles = filestosearch();
    //console.log(searchfiles)
    //console.log(folders)
    foldersandfiles = verifyexistingrepofiles(folders,searchfiles)

    for (const [key, value] of Object.entries(foldersandfiles)) {
        console.log(`${key}: ${value}`);
    }

    let fileexists;
    if(fileexists == "true"){
        console.log("start file exists")
        return "true";
    }
    if(fileexists == "false"){
        console.log("start file doesn't exist")
        return "false";
    } else {
        console.log("getstartfile error")
        return;
    }
}
                                            
function emptyfile(){ //if JSON is empty or doesnt exist yet
    //console.log("emptyfile")
    let fileexist = filexist("gitsinfo.json")
    if(fileexist == "false"){
        console.log("File doesnt exist")
        //log file doesnt exist, needs to be created
        return "true";
    }
    if(fileexist == "true"){
        //console.log("File exists 2")
        const data = () => fs.readFileSync(require.resolve(logfile), { encoding: "utf8" });
        let commandslistobj = data()
        let commandliststr = commandslistobj
        fs.close;

        //newdpository needs to be here,incase its created manually
        let filecontents = commandliststr != "" ? commandliststr : newdepository();
        
        //console.log(filecontents)

        //console.log(commandliststr)
        return "false";
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

    //console.log(newDepository)
    
    return "FIRST ENTRY"
}

function deldepository(depositoryname){ //delete some depository from the JSON
    console.log("deldepository")

    //propably command from server "uninstall" and delete that spesific depository gitsinfo entry
    return;
}

function getdepositorydata(){
    console.log("getdepositorydata")
    var depositoryname = "Ticker"
    //fetch the JSON file, and then get all the sections and compare
    //name is passed from variable
    //file could be got from foundfile function
    //version, just some arbitary
    //update, fs get when file was updated last, update date if new info doesnt match old info
    //status 
    const data = () => fs.readFileSync(require.resolve(logfile), { encoding: "utf8" });
    let commandslistobj = data()
    depositorydatas = JSON.parse(commandslistobj)
    fs.close;
    //console.log(depositorydatas[depositoryname])
    workingdepots = depositorydatas[depositoryname]
    stringobj = JSON.stringify(workingdepots)
    cutobject = stringobj.slice(1,-1)
    workingdepot = JSON.parse(cutobject)
    console.log(workingdepot.name)

    let existingdepot = new Object
    existingdepot["name"] = workingdepot.name 
    existingdepot["file"] = workingdepot.startfile 
    existingdepot["version"] = workingdepot.version 
    existingdepot["update"] = workingdepot.updatedate
    existingdepot["status"] = workingdepot.status 
    console.log(existingdepot)
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
        return "true"
    } 
    if(!files.includes(filename)){
        //console.log("File does not exist")
        return "false"
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
    var foldersandfiles = [];
    for (var i = 0; i < arrayLength; i++) {
        //console.log(allfolders[i]);
        //get files in the folder
        let fetchedfiles = fs.readdirSync('./depositories/'+allfolders[i],{type:"f", recursive:true});
        
        var folderstostring = JSON.stringify(fetchedfiles)
        const matchedfile = searchfiles.filter(value => fetchedfiles.includes(value));
        
        if(matchedfile == null){//check for match in starterfiles
            console.log(allfolders[i]+" is missing startfile!");
            foldersandfiles.push(allfolders[i]+"-start file")
            var allfiles = new Object;
            allfiles["name"] = allfolders[i]
            allfiles["missingfile"] = "startup" 
            foldersandfiles.push(allfiles)
        }
        if(!folderstostring.match("config.json")){//check for config file
            console.log(allfolders[i]+" is missing config file!");
            //foldersandfiles.push(allfolders[i]+"-config file")
            var allfiles = new Object; 
            allfiles["name"] = allfolders[i]
            allfiles["missingfile"] = "config" 
            foldersandfiles.push(allfiles)
        }
        else{
            console.log(allfolders[i]+"-OK")
            //foldersandfiles.push(allfolders[i]+"-ok")
            var allfiles = new Object;
            allfiles["name"] = allfolders[i]
            allfiles["missingfile"] = "" 
            foldersandfiles.push(allfiles)
        }
    }
    //return true if ok, return false if some files is missing
    //console.log(foldersandfiles)
    return foldersandfiles//depotverification
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
    return datetime;
}