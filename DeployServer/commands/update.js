const fs = require('fs'); //filesystem;
const { message } = require("../server");
const config = require("../config.json");
let msg = message

module.exports = {
    data: update(msg)
};
function update(msg) {
    console.log("update " + msg)
    if (msg == null){
        return "error"
    }
    else {

        console.log("upadte" + msg);
        command = JSON.stringify(msg);
        console.log(command)


        var files = fs.readdirSync('./Depositories/');
        var original = files
        fs.close;
        result = original.map(function(d) {
            return d.replace('DepositoriesList.json', '');
        });
        result.pop(); //removes last object
        console.log("result "+result);

        if (result == '') {
            data = "You haven't added any programs"
            return data
        }
        if (typeof value == "string" && value.includes("=")){
            console.log("second");
            returning = needupdate(command);
            return returning;
        } else { 
            console.log("else")
            send = result.toString();
            data = "Repositories:"+ send; 
            return data;
        } 
    }
}
function needupdate(command){
    console.log("needupdate");
    need = command;
    fix = need.slice(8);
    ilter = fix.replace('"','');
    verifyfile(filter);
    return filter
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