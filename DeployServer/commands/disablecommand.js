const { error } = require("console");
let { message } = require("../server");

module.exports =  {
    data: disablecommand()
};

function disablecommand(){ //command to disable or enable command
    console.log("---disablecommand---")
    console.log(message)
    let msg = JSON.stringify(message) //need to slice the excess

    if(msg.includes("=")){
        let cutmsg = msg.split("=")
        let command1  = cutmsg[1].slice(0,-2)
        console.log(command1)
        let commandexists = verifycommand(command1)
        
        if(commandexists === false){ //if command doesnt exist
            console.log("commandexist false")
            writenew(command1);
            console.log("Making log of command "+command1+"...") //need to show that new log is being created
            return;

        } else { //if command exists, disable or enable
            console.log("---command exists, need disabled---")
            //if command is enabled, disable it
    
            //if command is disabled, enable it
    
            //array of all commands ['command','enabled'],etc...
        
            //disable is toggle, if enabled>disable, if disabled>enable
            //read ./commands folder and commands JSON, crossmatch
            //if some command isnt in JSON make object out of it, default enabled
            return;
        }
    } else { //disablecommand doesnt include "="
        let command2 = msg.slice(8,-2)
        console.log(command2)
        if(command2 == "disablecommand"){
            return "No command specified"
        } else {
            return "error"
        }
    }
}

function verifycommand(command1){
    console.log("verifycommand")
    //need to read JSON file
    let commandstatus = require(`../resources/commands.json`);
    if(commandstatus.length == 0){ //if JSON file is empty
        console.log("No commands are logged")
        return false
    }
    if(commandstatus.length >= 1){ //if file has 1 or more commands
        let commands = JSON.stringify(commandstatus)
        console.log(commands)
        let specificommand = '"command":"'+command1+'"'
        console.log(specificommand)
        let ifexists = commands.includes(specificommand)
        console.log(ifexists)
        return ifexists
    } else { //if error
        console.log("writenew error")
        return error
    };

    //let commandverify = 
    return commandverify
}
function writenew(command1){ 
    console.log("---writenew---")
    console.log("command:"+command1)

    //make commands into objects and array for JSON
    let commandname = command1;// get the command name from passed on variable
    let commandstatus = "enabled"; //default is enabled

    let varcommand = new Object 
    varcommand['name'] = commandname; //get command name
    varcommand['status'] = commandstatus; //enabled or disabled
    console.log(varcommand)

    //check if commands file is empty
    let commandslist = require(`../resources/commands.json`);
    console.log(commandslist.length)

    if(commandslist.length == 0){ //if JSON file is empty
        //need to start the json file
        var vierasarr1 = [];
        vierasarr1 = JSON.stringify({"ip":newvierasentry.ip,"timestamp":newvierasentry.timestamp,"source":newvierasentry.source});
        var firstentry = "["+vierasarr1+"]";
        fs.writeFile('./vieraslista.JSON', firstentry,'utf-8', function(error){
            if(error){
                console.log(error);
            };
            return true;
        });
    }
    if(commandslist.length >= 1){ //if file has 1 or more commands
        //need to "append" commands
        console.log("append new command")




    } else { //if error
        console.log("writenew error")
        return error
    };
}