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
    console.log("verifyrunning")
    //need to pass the server from msg to the function chekc if true or not
    let isrunning = getrunningservers() //return true or false
    if(isrunning === true){
        return;
    }
    if(isrunning === false){
        return;
    } else {
        console.log("verifyrunning else")
        return;
    }
    return
}

function getrunningservers(){ //use pm2 functions to get what servers are on
    pm2.list((err, list) => {
        if(err == null){
            const id = 0;
            list = list.map(item => {
                return item.id !== id ? item : null;
            }).filter(item => item !== null)
        
            servcount = Object.keys(list).length
            //console.log(list)
            
            var runningservers = []
            list.forEach((Element) => {
                let filetree = Element.pm2_env.pm_exec_path
                let splitdata = filetree.split("/")
                let strinlength = splitdata.length
                //console.log(splitdata)
                //console.log(strinlength)
                let servername = splitdata[strinlength-2] 
                //console.log(servername)
                var pm2stat = Element.pm2_env.status //online , offline, stopped
                //console.log(filetree+pm2stat)

                let runninginfo = new Object
                runninginfo["name"] = servername
                runninginfo["status"] = pm2stat
                //console.log(runninginfo)
                runningservers.push(runninginfo)
                return runninginfo
            });
            console.log(runningservers)
            return;
        }
        if(err != null){
            console.log(err)
            return err
        } else {
            console.log("getrunningservers else")
            return;
        }
    })
}