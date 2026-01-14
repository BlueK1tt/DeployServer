const fs = require('fs');
//way to set message default to " " or null?

var { message } = require("../server");


module.exports = {
    data : logtemps()
};

function logtemps(){
    let newstr;
    let { message } = require("../server");
    //console.log(message)
    str = JSON.stringify(message) //{"msg":"testcommand"}
    
    if(str == null){
        console.log("no message to log")
        return false;
    } 
    if(str != null){
        console.log("new log entry")
        //console.log("logtemps")
        //need to 'clean up' message, to only get command)
        //console.log(str)
        if(str.includes("'")){
            newstr = str.split(':"').pop().split('"')[0]; // if message has '
            console.log(newstr)
        }
        if(str.includes('"')){
            newstr = str.split(':"').pop().split('"')[0]; //if message has "
            console.log(newstr)
        } else {
            console.log("str include error")
        }
        console.log("new entry:")
        console.log(newstr)
        
        
            
            //to add commands used to 'temps.json' always add to the end with when used(server uptime)
            //let tempdata = fs.readFileSync('./resources/temps.json', { encoding: 'utf8'});
            //console.log("this is data:"+tempdata)
        
        
            //every time used, get "refreshed" log file, with latest command
        
        
            //get used commands as array or string, split 
        
        
            //if last 3 same commands within under 5 minutes are same disabled command, disable the log for it
            
        
            //put the check at start of 'msgidentify', so check before identifying
        
        
            passstatus = true
            return passstatus;
        }else {
            console.log("else error")
            return;
        }
    
}