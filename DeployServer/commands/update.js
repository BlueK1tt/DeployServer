const fs = require('fs'); //filesystem;
const server = require("../server");
let msg = server.msg;

module.exports = {
    data: update()
};

function update() {
    command = JSON.stringify(msg);
    console.log("update:" + command)
    var files = fs.readdirSync('./Depositories/');
    let original = files
    result = original.map(function(d) {
        return d.replace('DepositoriesList.json', '');
    });
    result.pop(); //removes last object
    if (result == '') {
        data = "You haven't added any programs"
    } else { 
        send = result.toString();
        data = "Repositories:"+ send + command; 
    } 
    fs.close;
    return data;
}

function verifyfile(){

}