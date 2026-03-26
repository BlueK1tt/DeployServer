//Need to add checks to see if app/server started ok, otherwise return error
const { error } = require('console');
const fs = require('fs');
const pm2 = require('pm2');


//need msg from main server
//need to split it up and specify the server wanted


module.exports = {
    data : verifyrunning()
};

function verifyrunning(){
    pm2.connect(function(err) {
    if (err) {
        console.error(err)
        process.exit(2)
    }})
    //console.log("verifyrunning")
    //need to pass the server from msg to the function chekc if true or not
    var isrunning = getrunningservers() //return true or false
    //console.log(isrunning)
    if(isrunning === true){
        //console.log("is running")
        return "true";
    }
    if(isrunning === false){
        //console.log("is not running")
        return "false";
    } else {
        //console.log("verifyrunning else 1")
        return "error";
    }
    return
}

function getrunningservers(){ //use pm2 functions to get what servers are on
    var serverdata;
    pm2.list((err, list) => {
        var serverdata;
        if(err == null){
            const id = 0;
            list = list.map(item => {
                return item.id !== id ? item : null;
            }).filter(item => item !== null)
        
            servcount = Object.keys(list).length
            //console.log(list)
            let runninginfo = new Object
            var runningservers = []
            list.forEach((Element) => {
                let filetree = Element.pm2_env.pm_exec_path
                let splitdata = filetree.split("/")
                let strinlength = splitdata.length
                let servername = splitdata[strinlength-2] 
                var pm2stat = Element.pm2_env.status //online , offline, stopped

                if(servername == "DeployServer"){
                    return;
                } else {
                    runninginfo["name"] = servername
                    runninginfo["status"] = pm2stat
                    runningservers.push(runninginfo)
                    return runninginfo
                }
            });
            //console.log(runningservers)
            //console.log(runninginfo)
            var serverdata = JSON.stringify(runningservers)
            //console.log(serverdata)
            if(serverdata.includes('"status":"online"')){
                //console.log("Server is online")
                //console.log(serverdata)
                return "true";
            }if(!serverdata.includes('"status":"online"')){
                //console.log("No servers are online")
                
                return "false";
            } else {
                console.log("Runningserver if error")
                return "Runningserver if error";
            }            
        }
        if(err != null){
            console.log("err")
            return err;
        } else {
            console.log("getrunningservers else 2")
            return serverdata;
        }
        return runningservers
    })
}