const fs = require('fs'); //filesystem;
const config = require("../resources/config.json");
let msg = message

module.exports = {
    data: update(msg)
};
function update(msg) {
    //console.log("update " + msg)
    if (msg == null){
        return "error"
    }
    else {

        //console.log("upadte" + msg);
        //command = JSON.stringify(msg);
        command = msg;
        //console.log(command)
        var files = fs.readdirSync('./Depositories/');
        var original = files
        fs.close;
        result = original.map(function(d) {
            return d.replace('DepositoriesList.json', '');
        });
        //result.pop(); //removes last object
        //console.log("result "+result);

        if (result == '') {
            data = "You haven't added any programs"
            return data
        }
        else if (command.includes('update=')){
            //console.log("second");
            returning = needupdate(command);

            //return depotstatus //if depositories json was updated or not | compare old json to new added information
            return returning;
        } else { 
            //console.log("else")
            send = result.toString();
            repos = "Repositories:"+ send; 
            return repos;
        } 
    }
}

function needupdate(command){
    //console.log("needupdate");
    need = command;
    fix = need.slice(8);
    vfilter = fix.replace('"','');
    //console.log(vfilter)
    vreturn = verifyfile(vfilter);
    if (vreturn = true){
        //need to update the depositories json

        //need to download new version of requested depository
        console.log("Repository updated.")
        return "Repository updated."
    }
    else {
        return "error with files"
    }
}

function verifyfile(vfilter){
    let vfiles = fs.readdirSync('./Depositories/');
    //console.log(vfiles)
    fs.close;
    //console.log(filter);
    filepos = vfiles.indexOf(vfilter)

    const vposition = Number(filepos)
    vfolder = vfiles[vposition];
    //console.log("folder" + vfolder)

    //need to open the found folder and check for list of files like server.js, if exists, return true
    let directory = fs.readdirSync(`./Depositories/`+`${vfolder}`)
    //console.log("directory:"+directory);
    var filearray = Object.entries(directory);
    fs.close

    mainfiles = config.mainfiles;
    var examplefiles = mainfiles.split(",");
    
    //console.log(typeof(filearray))//file inside asked depository
    //console.log(filearray) //-object
    //console.log(typeof(examplefiles)) //example files from congig file
    //console.log(examplefiles) //-object

    str1 = filearray.toString();
    //console.log(str1)

    const filexist = examplefiles.filter(element => str1.includes(element))
    if (filexist != null){

        //console.log(filexist)
        return true //true/false if example file exists in depository
    }
    else{
        return false;
    }
}