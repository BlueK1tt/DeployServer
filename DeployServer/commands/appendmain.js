const fs = require('fs');
let { message } = require("../server");


module.exports =  {
    data: mainfunction()

};

function specifymessage(message){
    //need to split message, so get needed data out of it
    //can append and update data

    let updatedata = message //change to correct variable
    return updatedata
}

function mainfunction(){

    if(message == "appendmain"){
        console.log("appendcomand")
        return "empty update"
    } else {
        let updatedata = specifymessage(message)
        
        //check if server log exists
        
        //fsread file, so get udpated data
        
        //if not
        writenew(servicename)
        
        return;    
    }
}

function updatedata(){




    /*
    function setUsername(id, newUsername) {
    for (var i = 0; i < jsonObj.length; i++) {
        if (jsonObj[i].Id === id) {
            jsonObj[i].Username = newUsername;
            return;
            }
        }
    }

    // Call as
    setUsername(3, "Thomas");

    */ 
    return;
}

function writenew(servicename){

    todaysdate = new Date()

    let serverobject = new Object
    serverobject["name"] = servicename
    serverobject["status"] = "offline";
    serverobject["state"] = "enabled";
    serverobject["lastonline"] = todaysdate;
    serverobject["version"] = "0.1";

    return;
};