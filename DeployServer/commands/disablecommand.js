let { message } = require("../server");

module.exports =  {
    data: disablecommand()
};

function disablecommand(){ //command to disable or enable command
    console.log("---disablecommand---")
    console.log(message)
    let command = message.slice(10,-1) //need to slice the excess

    //array of all commands ['command','enabled'],etc...

    //disable is toggle, if enabled>disable, if disabled>enable
    //read ./commands folder and commands JSON, crossmatch
    //if some command isnt in JSON make object out of it, default enabled
    
    if(commandexists === false){ //if command doesnt exist
        writenew(command);
        console.log("Making log of command"+$command+"...") //need to show that new log is being created
        return
    } else { //if command exists, disable or enable
        
        //if command is enabled, disable it

        //if command is disabled, enable it

    }

    //need to read JSON file
    return;
}

function writenew(){ 
    console.log("---writenew---")

    var commandname = "command";
    var commandstatus = "enabled";

    //make commands into objects and array for JSON
    var varcommand = new Object 
    varcommand['name'] = commandname; //get command name
    varcommand['status'] = commandstatus; //enabled or disabled

}