
const { type } = require('os');
const pm2 = require('pm2')

module.exports = {
    data: depotlist()
}

function depotlist(){
    var list;
    pm2.list((err, list) => {
        if(err){
            console.log(err)
        } else {
            console.log("depotlist")
            var runningservers = []
           
            //console.log(list)
            //console.log(Object.keys(list))
            var runninginfo;
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
            console.log(runningservers)
            return runningservers
        }
    })
    let toreturn = list == null ? "depotlist empty" : runningservers;

    return toreturn
    
}