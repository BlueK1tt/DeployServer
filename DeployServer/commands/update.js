const fs = require('fs'); //filesystem;
const server = require("../server");
const config = require("../config.json");
const { type } = require('os');
let msg = server.msg;

module.exports = {
    data: update()
};

function update() {
    command = JSON.stringify(msg);
    const files = fs.readdirSync('./Depositories/');
    let original = files
    result = original.map(function(d) {
        return d.replace('DepositoriesList.json', '');
    });
    result.pop(); //removes last object
    if (result == '') {
        data = "You haven't added any programs"
    }
    if(command.includes("update=")){
        fix = command.slice(8)
        filter = fix.replace('"','');
        verifyfile(filter);
        return filter
    
    } else { 
        send = result.toString();
        data = "Repositories:"+ send; 
    } 
    fs.close;
    return data;
}

function verifyfile(filter){
    files = fs.readdirSync('./Depositories/');
    //console.log(files)
    //console.log(filter);
    match = files.indexOf(filter)
    fs.close;
    const position = Number(match)
    folder = files[position];

    //need to open the found folder and check for list of files like server.js, if exists, return true
    let directory = fs.readdirSync('./Depositories/'+`${folder}`)
    var filearray = Object.entries(directory);
    fs.close

    mainfiles = config.mainfiles;
    var examplefiles = mainfiles.split(",");
    
    console.log(typeof(filearray))
    console.log(filearray)
    console.log(typeof(mainfiles))
    console.log(examplefiles)

}