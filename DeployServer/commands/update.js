const fs = require('fs'); //filesystem;
const config = require("../resources/config.json");
const { type } = require('os');
const { stringify } = require('querystring');
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
        var files = fs.readdirSync('./depositories/');
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
            logstatus = compareLog()
            console.log("logstatus:" + logstatus)
            if(logstatus == true){
                console.log("trueing")
                returnmsg = "Depositories are up to date"
                return returnmsg 
            }
            else{
                console.log("nooeing")
                returning = needupdate(command);
                return returning;
            }
            //console.log("second");
            //return depotstatus //if depositories json was updated or not | compare old json to new added information
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
    if (vreturn.status == true){
        //console.log("vreturn: " + typeof(vreturn));

        //need to add new files to the depositories.json file
        let rawdata1 = fs.readFileSync('./Depositories/DepositoriesList.json')
        let json1 = JSON.parse(rawdata1);
        fs.close;
        //console.log(vreturn)
        fname = vreturn.file
        strtfile = fname.toString()

        var newjsonobj = new Object();
        newjsonobj['name'] = vfilter;
        newjsonobj['startfile'] = strtfile;

        //newjsonobj = {name:vfilter, startfile:strtfile }
        //console.log(newjsonobj)
        newjsonobj = Object.assign({}, json1, {}) //copies depositories json file to variable
        //console.log(newjsonobj);
        var json2 = JSON.stringify(newjsonobj, null, 2);//null and '2' make the json look prettier
        fs.writeFile('./resources/Depositories.JSON', json2, 'utf-8', function(error){
            if(error){
                console.log(error)
            }
        });
        fs.close
        //need to download new version of requested depository
        console.log('Repository "' +`${vfilter}`+'" updated.')
        return 'Repository "' +`${vfilter}`+'" updated.'
    }
    else {
        return "error with files"
    }
}

function verifyfile(vfilter){
    //console.log("verifyfiles")
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
    //var filearray = Object.entries(directory);
    fs.close

    mainfiles = config.mainfiles;
    var examplefiles = mainfiles.split(",");
    
    //console.log(typeof(filearray))//file inside asked depository
    //console.log(filearray) //-object
    //console.log(typeof(examplefiles)) //example files from congig file
    //console.log(examplefiles) //-object

    str1 = directory.toString(); //filearray has id locations
    //console.log("str1"+str1)

    var filename = examplefiles.filter(element => str1.includes(element))
    if (filename != null){

        filexist = str1.includes(filename)
        //console.log("filexist" + filename + filexist)
        //newstr = filename.toString()


        var verify = new Object();
        verify['status'] = filexist;
        verify['file'] = filename;
        
        return verify //true/false if example file exists in depository
    }
    else{
        filexist = str1.includes(filename)

        var verify = new Object();
        verify['status'] = filexist;
        verify['file'] = " ";
        return verify
    }
}

function compareLog(){ //function to happen right after start to compare if anything has changed
    let oldlog = fs.readFileSync('./resources/Depositories.JSON');
    const oldstring = JSON.parse(oldlog)
    str1 = stringify(oldstring)
    fs.close;

    let newlog = fs.readFileSync('./depositories/DepositoriesList.JSON');
    const newstring = JSON.parse(newlog);
    str2 = stringify(newstring)
    fs.close;

    if(str1.includes(str2)){ 
        statement = true; //files match
        return true
    }
    else{
        statement = false;  //files dont match
        return false;
    }

};