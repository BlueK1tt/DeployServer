const fs = require('fs'); //filesystem
const config = require("../resources/config.json");

//install "program" to depositories folder
//need to connect to github and download same named repository from there

module.exports = {
    data : filtercommand(appdata)
};

function filtercommand(appdata){ 
    console.log("filtercommand")
    console.log("appdata " + appdata); //appdata gives server + the button pressed | Ticker : Test 
    return "end."
}