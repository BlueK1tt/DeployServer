const fs = require('fs');
let { message } = require("../server");

module.exports = {
    data : logtemps()
};

function logtemps(){
    //to add commands used to 'temps.json' always add to the end with when used(server uptime)
    
    //every time used, get "refreshed" log file, with latest command

    //get used commands as array or string, split 

    //if last 3 same commands within under 5 minutes are same disabled command, disable the log for it
    
    //put the check at start of 'msgidentify', so check before identifying
}
