const fs = require('fs'); //filesystem;
const server = require("../server");
let msg = server.msg;

module.exports = {
    data: update()
};

function update() {
    command = JSON.stringify(msg);
    var files = fs.readdirSync('./Depositories/');
    let original = files
    result = original.map(function(d) {
        return d.replace('DepositoriesList.json', '');
    });
    result.pop(); //removes last object
    if (result == '') {
        data = "You haven't added any programs"
    }
    if(command.includes("update=")){
        filter = command.slice(8)
        return filter
    
    } else { 
        send = result.toString();
        data = "Repositories:"+ send; 
    } 
    fs.close;
    return data;
}

function verifyfile(filter){
    
}