const fs = require('fs');
var { message } = require('../server');
const { json } = require('stream/consumers');

//uninstall "program" from depositories folder
//just need to remove the whole name floder, check it after done, and return true when done

module.exports = {
    data : uninstall()
};

function uninstall(){
    let msg = cleanmessage(message)
    filename = msg.slice(10);
    var isfile = checkfile(filename);

    if(msg == "uninstall"){
        console.log("error, target not defined");
        return "target not defined"
    }

    if(isfile === true){
        //console.log(files)

        //actually deletes the whole specified folder
        fs.rmdir(`./depositories/` + `${filename}`,() => {
            console.log('Folder "'+`${filename}`+'" deleted!');
        });
        //need to remove the json entry
        removelogentry(filename) //removes the log from JSON
        return 'uninstalling "'+ filename + '"...'
    } else {
        console.log("File or Folder doesnt exist")
        return "File or Folder doesnt exist"
    }
}

function removelogentry(filename){
    let data = () => fs.readFileSync(require.resolve("../resources/Depositories.JSON"), { encoding: "utf8" });
    let rawjson = data()
    fs.close;
    let jsonobj = JSON.parse(rawjson)
    let foldername = filename +":"

    delete jsonobj[filename]
    //console.log(jsonobj)
    var json2 = JSON.stringify(jsonobj, null, 2);//null and '2' make the json look prettier
    fs.writeFile('./resources/Depositories.JSON', json2, 'utf-8', function(error){
            if(error){
                console.log(error)
            }
        });
    fs.close
    return;
}

function checkfile(filename){ //used 2 times, first to check that file exitst, then checking it doesnt exist anymore
    filepath = "./depositories/"+filename
    files = fs.existsSync(filepath);
    return files
}

function cleanmessage(message){
    //console.log(message)
    msgstring = JSON.stringify(message)
    let msg = msgstring.slice(14,-2)
    //console.log(msg)
    return msg
}