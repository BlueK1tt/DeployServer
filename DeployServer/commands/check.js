const fs = require('fs'); //filesystem

// use double . to go back folder

//check function to see if connected to internet
//automatically happens every 5 mins and whenever this module is called
//just pings some website and if can, returns true, ortherwise false
//in case of false, checks connectivity every 30 secs
//also logs disconnects to log file

module.exports = {
    data: check()
};


async function check(){
    console.log("check")
    let result = await waitresponse();
    setTimeout(function (){
        console.log("result" + result);
        if(result == "undefined"){
            checkresult();
            let val = Promise;
            setTimeout(function() {
                console.log("timeout");
                return val
            }, 2000);
        }
        else{
            return result
        }
    }, 2000);
}

function waitresponse(){
    var exec = require('child_process').exec, child;
    child = exec('ping -c 1 google.com', function(error, stdout, stderr){
        if(error !== null){
            console.log("Not available")
            return Promise.resolve("Not connected")
        }
        else{
            console.log("Available")
            return Promise.resolve("Available")
        }
    });
}

function checkresult(){
    Promise.all(Promise).then((values)=> {
        console.log(values);
        return values;
    })
}
//if undefined return undefined and redo function