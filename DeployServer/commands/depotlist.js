
const { type } = require('os');
const pm2 = require('pm2')

module.exports = {
    data: depotlist()
}

async function depotlist(){
    var list;
    var promises;
    var returndata;
    var list = pm2list();
    console.log(list)

    let serverlist = pm2array(list)
    console.log(serverlist)
    var runningservers = []


    /*
    //console.log(list)
    //console.log(Object.keys(list))
    var runninginfo;
    
    

           */ 
    let toreturn = list == "{}" ? "depotlist empty" : returndata;
   
    return toreturn
}

function pm2list(){
    console.log("pm2list")
    pm2.list((err,list) => {
        if(err){
            console.log(err)
            return err;
        } else {
            console.log(list)
            let servlist = list;
            return servlist
        }
    })
}

function pm2array(list){
    console.log("pm2array")
    list.forEach((Element) => {
        let filetree = Element.pm2_env.pm_exec_path
        let splitdata = filetree.split("/")
        let strinlength = splitdata.length
        let servername = splitdata[strinlength-2] 
        var pm2stat = Element.pm2_env.status //online , offline, stopped

        let runninginfo = new Object
        runninginfo["name"] = servername
        runninginfo["status"] = pm2stat
        runningservers.push(runninginfo)
        return runninginfo
    });

    return runningservers
}