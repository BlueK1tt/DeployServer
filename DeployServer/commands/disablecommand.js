const fs = require('fs');
let { message } = require("../server");


module.exports =  {
    data: disablecommand()
};

function disablecommand(){ //command to disable or enable command
    //console.log("---disablecommand---")
    //console.log(message)
    let msg = JSON.stringify(message) //need to slice the excess

    if(msg.includes("=")){
        let cutmsg = msg.split("=")
        let command1  = cutmsg[1].slice(0,-2)

        let commandexist = verifycommand(command1)
        let commandislogged = checkcommandlog(command1)

        let commandinfo = getcmdinfo(command1) //get the specific command object info
        
        if(commandexist === true){ //if requested command exists in commands folder
            
            if(commandislogged === false){ //if command doesnt exist
                //console.log("commandislogged false")
                writenew(command1);
                //console.log("Making log of command "+command1+"...") //need to show that new log is being created
                return;
    
            } else { //if command exists, disable or enable
                //console.log("---command exists, need disabled---")
                //if command is enabled, disable it
                if(commandinfo.status == "enabled"){
                    let commandinfo = new Object;
                    commandinfo['command'] = command1; //get command name
                    commandinfo['status'] = "disabled"; //enabled or disabled

                    //console.log(commandinfo)
                    appendcommand(commandinfo)
                    delete commandinfo.status;

                    console.log("disabled "+ command1)
                    return "disabled "+command1;
                }
                //if command is disabled, enable it
                if(commandinfo.status == "disabled"){
                    let commandinfo = new Object;
                    commandinfo['command'] = command1; //get command name
                    commandinfo['status'] = "enabled"; //enabled or disabled
                    
                    //console.log(commandinfo)
                    appendcommand(commandinfo)
                    delete commandinfo.status;
                    
                    console.log("enabled "+command1)
                    return "enabled "+command1;
                } else {
                    console.log("commandstatus error")
                    return;
                }            
                return;
            }
        }
        if(commandexist === false){ //if requested command does not exist in commands folder
            console.log("Not real command")
            return "Error, invalid command"

        } else { //if error with commandexist
            console.log("commandexist error")
            return "commandexisterror"
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
    //need to match command to existing command file in commands folder
    let files = fs.readdirSync('./commands/');
    let original = files
    fs.close;
    result = original.map(function(d) {
        return d.replace('.js', "");
    });
    let stringCMD = result.toString();
    let includecommand = stringCMD.includes(command1)
    return includecommand    
}

function checkcommandlog(command1){
    //console.log("checkcommandlog")
    //need to read JSON file
    let commandstatus = require(`../resources/commands.json`);
    if(commandstatus.length == 0){ //if JSON file is empty
        console.log("No commands are logged")
        return false
    }
    if(commandstatus.length >= 1){ //if file has 1 or more commands
        let commands = JSON.stringify(commandstatus)
        //console.log(commands)
        let specificommand = '"command":"'+command1+'"'
        //console.log(specificommand)
        let ifexists = commands.includes(specificommand)
        //console.log(ifexists)
        return ifexists
    } else { //if error
        console.log("writenew error")
        return error
    };
};

function writenew(command1){ 
    //console.log("---writenew---")
    console.log("command:"+command1)

    //make commands into objects and array for JSON
    let commandname = command1;// get the command name from passed on variable
    let commandstatus = "enabled"; //default is enabled

    let varcommand = new Object 
    varcommand['name'] = commandname+'\n'; //get command name
    varcommand['status'] = commandstatus+'\n'; //enabled or disabled
    console.log(varcommand)

    //check if commands file is empty
    let commandslist = require(`../resources/commands.json`);
    //console.log(commandslist.length)
    let commandliststr = JSON.stringify(commandslist)
    let commandlistclean = commandliststr.slice(1,-1);
    let replacestring = commandlistclean.replaceAll('},{','},\n{')

    if(commandslist.length == 0){ //if JSON file is empty
        //need to start the json file
        var commandarr1 = [];
        commandarr1 = JSON.stringify("\n",{"command":commandname,"status":commandstatus},null, "\n");
        let firstentry = "["+commandarr1+"]";
        fs.writeFile('./resources/commands.json', firstentry,'utf-8', function(error){
            if(error){
                console.log(error);
            };
            return true;
        });
        fs.close;
    }
    if(commandslist.length >= 1){ //if file has 1 or more commands
        //need to "append" commands
        console.log("append new command")
        var commandarr2 = [];
        commandarr2 = JSON.stringify({"command":commandname,"status":commandstatus}, null), "\n";
        let secondentry = "[\n"+replacestring+",\n"+commandarr2+'\n'+"]";
        fs.writeFile('./resources/commands.json', secondentry,'utf-8', function(error){
            if(error){
                console.log(error);
            };
            return true;
        });
        fs.close;
    } else { //if error
        console.log("writenew error")
        return error
    };
}

function getcmdinfo(command1){
    //get detailed info about command and position

    let commandslist = require(`../resources/commands.json`);

    let found = commandslist.find(({ command }) => command === command1)
    //console.log(found)
    return found;
}

function appendcommand(commandinfo){ //function to read and write the commands json with updated data
    //console.log("appendcommand")
    //console.log(typeof(commandinfo))
    let appendcommandstr = JSON.stringify(commandinfo)
    
    let commandslist = require(`../resources/commands.json`);
    let commandliststr = JSON.stringify(commandslist)

    let index = commandslist.map(i => i.command).indexOf(commandinfo.command)
    let correctdata = commandslist[index]
    let correctdatastr = JSON.stringify(correctdata)

    
    let newlist = commandliststr.replaceAll(correctdatastr,appendcommandstr)
    //console.log(newlist)
    var json2 = JSON.parse(newlist, null, 2);//null and '2' make the json look prettier
    //console.log(json2)
    let json1 = JSON.stringify(json2, null, 2);
    fs.writeFile('./resources/commands.json', json1, 'utf-8', function(error){
        if(error){
            console.log(error)
            return false
        }
    });
    fs.close;
    return true;
}