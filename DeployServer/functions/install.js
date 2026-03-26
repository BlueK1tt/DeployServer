const fs = require('fs'); //filesystem
const config = require("../resources/config.json");
const { message } = require('../server');

//install "program" to depositories folder
//need to connect to github and download same named repository from there

module.exports = {
    data : install()
};
function install(){
    let msg = cleanmessage(message)
    filename = msg.slice(8);
    if(msg == "install"){
        console.log("error, target not defined");
        return "target not defined"
    }
    if(msg.includes(filename)){
        console.log('installing "' + filename+'"...')
        let files = fs.readdirSync('./depositories/')
        //console.log(files); //shows all files in the '/depositories/ folder
 
        if(files.includes(filename)){
            console.log("Error, Directory already exists");
            return "Error, Directory already exists";
        }
        else {
            //create folder with same name as required
            fs.mkdir(`./depositories/`+`${filename}`, callback => {
                return "Folder created"
            });
            //console.log('folder "'+`${filename}`+ '" created');
            fs.close;
            

            //need to check if depository in github exists


            //need download the repository into the folder

            
            //need to verify theres starting file, same way as *findfile
            instaldone = verifyfiles(filename);
            //console.log(instaldone)
            if(instaldone.status == true){
                lognewserver(filename,instaldone); //need to pass new foldername and startfile
                console.log("installation completed")
                return "installation complete"
            }
            if(instaldone.status == false){
                console.log("instllation error")
                return "installation error"
            }
            else {
                console.log("Uknown error")
                return;
            };

        }
    } else {
        console.log("error");
        return "error;"
    }
}

function verifyfiles(filename){
    //console.log("--verifyfiles--")
    let files = fs.readdirSync(`./depositories/`+ `${filename}`);
    //console.log(files + typeof(files))
    fs.close

    mainfiles = config.mainfiles;
    //console.log(mainfiles)
    var examplefiles = mainfiles.split(",");

    str1 = files.toString();
    //console.log(str1)

    const filexist = examplefiles.filter(element => str1.includes(element)) 
    //console.log("fileexist"+filexist)

    
    startfile = "index.js"

    //need function to fetch if startfile is in the list of filenames from log

    //match the file and get its position, then get the filename in that position
    for (const element of examplefiles) {
        //console.log(element);
        //
    }
    for (const element of str1){
        //console.log(element);
    }

    if (filexist != null){
        var verify = new Object();
            verify['status'] = true;
            verify['file'] = startfile;

        return verify //true/false if example file exists in depository
    }
    else{
        var verify = new Object();
            verify['status'] = false;
            verify['file'] = " ";
        return verify;
    }
}

function lognewserver(filename, instaldone){
    //need to add new files to the depositories.json file
    //console.log("--lognewserver--")
    //console.log(instaldone)
    //console.log(filename)


    let data = () => fs.readFileSync(require.resolve("../resources/Depositories.JSON"), { encoding: "utf8" });
    let rawjson = data()
    fs.close;
    let jsonobj = JSON.parse(rawjson)
    var freshjsonobj = [];
    strtfile = instaldone.file
    entrydata =  [{name:filename, startfile:strtfile }]
    freshjsonobj[filename] = entrydata
    let combinedJSON = Object.assign({}, jsonobj,freshjsonobj);    
    //console.log(typeof(combinedJSON))


    var json2 = JSON.stringify(combinedJSON, null, 2);//null and '2' make the json look prettier
    fs.writeFile('./resources/Depositories.JSON', json2, 'utf-8', function(error){
        if(error){
            console.log(error)
        }
    });
    fs.close
    //console.log("installing...")
    return "installing..."
}

function cleanmessage(message){
    //console.log(message)
    msgstring = JSON.stringify(message)
    let msg = msgstring.slice(14,-2)
    //console.log(msg)
    return msg
}
