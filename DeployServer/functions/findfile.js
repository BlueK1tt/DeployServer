const fs = require('fs'); //filesystem
const config = require("../resources/config.json");
var { message } = require('../server');

module.exports = {
    data: findfile()
}

function findfile(){
    let msg = cleanmessage(message)
    //console.log("findfile message" +msg)
    //console.log("findfile")
    if(msg.startsWith("start") || msg.startsWith("stop")){
        //file find not here, beacuse its case spesific and not always same


        if(msg.startsWith("start")){
            filename = msg.slice(6);
            //console.log(filename);
            let files = fs.readdirSync(`./depositories/`+ `${filename}`);
            fs.close
            //console.log("files:" + files)
            if (Object.keys(files).length !== 0){

                var startfile = verifyfile(filename)
                return startfile
            }   
            else {
                return "directory empty"
            }
        }
        if(msg.startsWith("stop")){
            //console.log("findfile stop")
            filename = msg.slice(5);            
            let files = fs.readdirSync(`./depositories/`+ `${filename}`);
            fs.close
            //console.log("files:" + files)
            if (Object.keys(files).length !== 0){

                const stopfile = verifyfile(filename)
                //console.log("foundfile " +foundfile)
                
                //need to find the correct filename from the folder
                //the above just confirms that the tile exists
                //array > index?
                //console.log(filename)
                //console.log(stopfile)
                return stopfile
            }   
            else {
                console.log("findfile stop empty")
                return "directory empty"
            }
        }
        else {

            console.log("iferror")
            return error
        }
    } else {
        //console.log("findfile error")
        return "findfile error"
    }

}

function verifyfile(filename){
    findthisfile = `./depositories/`+ `${filename}`

    let files = fs.readdirSync(findthisfile);
    fs.close;

    mainfiles = config.mainfiles;
    var examplefiles = mainfiles.split(","); //index.js, main,js , server.js etc
    
    str1 = files.toString(); //index.js, config,json, resoueces etc
    
    const filexist = examplefiles.filter(element => str1.includes(element))
    //console.log("filexist: " + filexist)

    //find if ecosystem exists
    if(str1.includes("ecosystem.config.js")){
        console.log("Ecosystem file found!")
        finalcmd = './depositories/'+ `${filename}`+"/"+ "ecosystem.config.js"
        return finalcmd
    } else{
        console.log("Normal config")
        //console.log(filexist)
        finalcmd = './depositories/'+ `${filename}`+"/"+ filexist
        //console.log(finalcmd)
        return finalcmd
    }


}

function cleanmessage(message){
    //console.log(message)
    msgstring = JSON.stringify(message)
    let msg = msgstring.slice(14,-2)
    //console.log(msg)
    return msg
}