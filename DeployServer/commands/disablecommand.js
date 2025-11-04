let { message } = require("../server");

module.exports =  {
    data: disablecommand()
};

function disablecommand(){ //command to disable or enable command
    console.log("disablecommand")
    console.log(message)
    //array of all commands ['command','enabled'],etc...

    //disable is toggle, if enabled>disable, if disabled>enable
    //read ./commands folder and commands JSON, crossmatch
    //if some command isnt in JSON make object out of it, default enabled
    
    var commandname = "command";
    var commandstatus = "enabled";

    //make commands into objects and array for JSON
    var varcommand = new Object 
    varcommand['name'] = commandname; //get command name
    varcommand['status'] = commandstatus; //enabled or disabled

    //need to read JSON file
    return;
}