const fs = require('fs'); //filesystem;
const { message } = require("../server");
const config = require("../resources");
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
            return d.replace('./resources/DepositoriesList.json', '');
        });
        result.pop(); //removes last object
        console.log("result "+result);

        if (result == '') {
            data = "You haven't added any programs"
            return data
        }
        else if (command.includes('update=')){
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
    filter = fix.replace('"','');
    console.log(filter)
    verifyfile(filter);
    return filter
}

function verifyfile(vfilter){
    let vfiles = fs.readdirSync('./Depositories/');
    console.log(vfiles)
    fs.close;
    //console.log(filter);
    vmatch = vfiles.indexOf(vfilter)
    console.log("filter "+ vfilter)
    const vposition = Number(vmatch)
    vfolder = vfiles[vposition];
    console.log("folder" + typeof(vfolder))

    //need to open the found folder and check for list of files like server.js, if exists, return true
    let directory = fs.readdirSync('./Depositories/'+`${vfolder}`)
    var filearray = Object.entries(directory);
    fs.close

    mainfiles = config.mainfiles;
    var examplefiles = mainfiles.split(",");
    
    console.log(typeof(filearray))
    console.log(filearray)
    console.log(typeof(mainfiles))
    console.log(examplefiles)

}