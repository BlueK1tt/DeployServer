const fs = require('fs');
let { message } = require("../server");

module.exports =  {
    data: mainfunction()

};

function specifymessage(message){
    //need to split message, so get needed data out of it
    //can append and update data
    console.log(message.msg)
    
    let updatedata = message.msg.split("=") //change to correct variable
    return updatedata[1]
}

function mainfunction(){
    console.log(getdatetime())

    if(message == "appendmain"){
        console.log("appendcomand")
        return "empty update"
    } else {
        let updatedata = specifymessage(message)
        console.log(updatedata)
        
        //check if server log exists
        
        //fsread file, so get udpated data
        
        //if not
        //writenew(servicename)
        
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

    
    let serverobject = new Object
    serverobject["name"] = servicename
    serverobject["status"] = "offline";
    serverobject["state"] = "enabled";
    serverobject["lastonline"] = getdatetime();
    serverobject["version"] = "0.1";

    return;
};

function getdatetime(){
    let currenttime = new Date();
    let currenttimestr = JSON.stringify(currenttime)
    let cleannewtime = currenttimestr.slice(1,-6)
    let splitdatetime = cleannewtime.split("T")
    returnstring = splitdatetime[0]+"|"+splitdatetime[1]
    return returnstring;
}