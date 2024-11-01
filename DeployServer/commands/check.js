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


function check(){
    if(navigator.onLine){ //need navigator packet
        return "online";
    } else {
        return "offline";
    }
}