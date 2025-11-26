const fs = require('fs'); //filesystem
const { connected } = require('process');

// use double . to go back folder

//check function to see if connected to internet
//automatically happens every 5 mins and whenever this module is called
//just pings some website and if can, returns true, ortherwise false
//in case of false, checks connectivity every 30 secs
//also logs disconnects to log file

module.exports = {
    data: check()
};

function check(){
    checkInternet(function(isConnected) {
        checkInternet();
        isConnected = connected
        console.log("isconnected" + isConnected)
        if (isConnected) {
            // connected to the internet
            let connected = "connected"
        } else {
            // not connected to the internet
            let connected = "not connected"
            return "not connected"
        }
    });

    if(connected == "not connected"){
        //return "not connected"
        return "connected"
    }
    else {
        //return "connected"
        return "not connected"
    }
}

function checkInternet(cb) {
    require('dns').lookup('google.com',function(err) {
        if (err && err.code == "ENOTFOUND") {
            //cb(true);
            console.log("checkinternet: true")
            return false

        } else {
            

            //cb(false);
            console.log("checkinternet: false")
            return true //is inverted for test purposes
        }
    })
}
//if undefined return undefined and redo function