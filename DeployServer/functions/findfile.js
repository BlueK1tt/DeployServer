const { error } = require('console');
const fs = require('fs'); //filesystem
const config = require("../resources/config.json");

module.exports = {
    data: findfile()
}

function findfile(){

    if(msg.startsWith("start") || msg.startsWith("stop")){
        //file find not here, beacuse its case spesific and not always same


        if(msg.startsWith("start")){
            filename = msg.slice(6);
            console.log(filename);
            let files = fs.readdirSync(`./depositories/`+ `${filename}`);
            fs.close
            //console.log("files:" + files)
            if (Object.keys(files).length !== 0){

                var foudnfile = verifyfile(filename)
                return foudnfile
            }   
            else {
                return "directory empty"
            }
        }


        if(msg.startsWith("stop")){
            filename = msg.slice(5);
            console.log(filename);
            let files = fs.readdirSync(`./depositories/`+ `${filename}`);
            fs.close
            //console.log("files:" + files)
            if (Object.keys(files).length !== 0){

                var foudnfile = verifyfile(filename)
                return foudnfile
            }   
            else {
                return "directory empty"
            }
        }
        else {
            return error
        }
    }

}

function verifyfile(filename){
    let files = fs.readdirSync(`./depositories/`+ `${filename}`);
    fs.close

    mainfiles = config.mainfiles;
    var examplefiles = mainfiles.split(",");
                
    str1 = files.toString();

    const filexist = examplefiles.filter(element => str1.includes(element))
    if (filexist != null){

        return true //true/false if example file exists in depository
    }
    else{
        return false;
    }
}