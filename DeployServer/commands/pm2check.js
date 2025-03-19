const pm2 = require('pm2');
const { send } = require('process');
fs = require('fs');
var path = require('path');
var filename = path.basename(__dirname);


const sendArray = [];
sendtomain = [];

module.exports = {
    data: pm2check()
};

async function pm2check(){
    //console.log("pm2check");
    sendtomaster = pm2.list((err, list) => {
        const id = 0;
        list = list.map(item => {
            return item.id !== id ? item : null;
        }).filter(item => item !== null)
        
        servcount = Object.keys(list).length
        //need to test out if code goes procedurally if take the "if" statements away
        //they just served as check for other command, but now they arent needed, but they functionality is useful
        if(err != null){
            console.log(err)
            return err
        }
        else {
            list.forEach((Element) => {
                filetree = Element.pm2_env.pm_exec_path // /DeployServer/Depositories/
                pm2stat = Element.pm2_env.status //online , offline, stopped
                result = makepretty(filetree, pm2stat);
                //console.log(result);
                sendArray.push(result);
                sendtomain = sendArray
                console.log(sendArray)
                return sendArray
            });
            //console.log("3")
        };
        //console.log("2")
        return sendArray
    });
    //console.log("1")
};
function makepretty(filetree, pm2stat){
    const cutArray = filetree.split('\\');
    //console.log(cutArray); //gives array split between folders
    totalLen = cutArray.length
    getPos = totalLen - 2
    getThat = cutArray[getPos]

    results = getThat +":"+ pm2stat
    return results
}