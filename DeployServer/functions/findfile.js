const fs = require('fs'); //filesystem
const config = require("../resources/config.json");

module.exports = {
    data: findfile()
}

function findfile(){
    console.log("findfile")
    if(msg.startsWith("start") || msg.startsWith("stop")){
        //file find not here, beacuse its case spesific and not always same


        if(msg.startsWith("start")){
            filename = msg.slice(6);
            //console.log(filename);
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
            filename = msg.slice(5);            let files = fs.readdirSync(`./depositories/`+ `${filename}`);
            fs.close
            //console.log("files:" + files)
            if (Object.keys(files).length !== 0){

                const foundfile = verifyfile(filename)
                //console.log("foundfile " +foundfile)
                
                //need to find the correct filename from the folder
                //the above just confirms that the tile exists
                //array > index?
                //console.log(filesname)
                return foundfile
            }   
            else {
                return "directory empty"
            }
        }
        else {

            console.log("iferror")
            return error
        }
    }

}

function verifyfile(filename){
    let files = fs.readdirSync(`./depositories/`+ `${filename}`);
    fs.close
    
    mainfiles = config.mainfiles;
    var examplefiles = mainfiles.split(","); //index.js, main,js , server.js etc
    
    str1 = files.toString(); //index.js, config,json, resoueces etc
    
    const filexist = examplefiles.filter(element => str1.includes(element))
    //console.log("filexist: " + filexist)

    finalcmd = './depositories/'+ `${filename}`+"/"+ filexist
    return finalcmd

}