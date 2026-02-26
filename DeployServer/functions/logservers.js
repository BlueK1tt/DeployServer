//script to update gitsinfo file
//have info about the different "depositories", 
//name, main file, version, last updated, current status online/offline

const fs = require('fs');
const pm2 = require('pm2');
const config = require('../resources/config.json'); //custom configurations file for secret info

module.exports =  {
    data: logservers()
};

function logservers(){ //the main function, dictating what to do in order
    //"action" variable, what to do

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
    const data = () => fs.readFileSync(require.resolve("../resources/commands.json"), { encoding: "utf8" });
    let commandslistobj = data()
    let commandliststr = commandslistobj

}

function newdepository(){ //create completely new depository entry into JSON
    console.log("newdepository")

}

function deldepositoru(){ //delete some depository from the JSON
    console.log("deldepository")

}

function updateinfo(){ //update JSON info about the servers
    console.log("updateinfo")



}

function getpm2servers(){ //get list of servers, see if online or offline
    console.log("getpm2servers")


}