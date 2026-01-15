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
    //console.log("check")
    checkInternet(function(isConnected) {
        checkInternet();
        console.log("checkinternet after")
        isConnected = connected
        console.log("isconnected" + isConnected)
        if (isConnected) {
            // connected to the internet
            let connected = "connected"
            return "connected"
        } else {
            // not connected to the internet
            let connected = "not connected"
            return "not connected"
        }
    });

    if(connected == "not connected"){
        return "not connected"

    }
    else {
        return "connected"
    }
}

function checkInternet(cb) {
    //console.log("checkinternet")
    require('dns').lookup('google.com',function(err) {
        if (err && err.code == "ENOTFOUND") {
            //cb(false);
            console.log("checkinternet: false")
            return false
        } else {
            //cb(true);
            console.log("checkinternet: true")
            return true

        }
    })
}
//if undefined return undefined and redo function
//if pushed "check=30", change variable to 30, if was thirty, return "interval was already +queryinterval"
//set the variable in memory here, and every time thirtytimer gets called, request interval from command
