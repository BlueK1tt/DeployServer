const fs = require('fs'); //filesystem
const config = require("../resources/config.json");

//install "program" to depositories folder
//need to connect to github and download same named repository from there

module.exports = {
    data : install()
};

function install(){
    filename = msg.slice(8);
    if(msg == "install"){
        console.log("error, target not defined");
        return "target not defined"
    }
    if(msg.includes(filename)){

        console.log("installing " + filename)
        
        let files = fs.readdirSync('./Depositories/')
        console.log(files);

        if(files.includes(filename)){
            return "Error, Directory already exists";
        }
        else {
        
            //create folder with same name as required
            fs.mkdir(`./depositories/`+`${filename}`, callback => {
                return "Folder created"
            });
            console.log("folder,"+`${filename}`+ " created");
            fs.close;

            //need download the repository into the folder



            //need to verify theres starting file, same way as *findfile
            instaldone = verifyfiles(filename);
            console.log(instaldone)
            if(instaldone.status == true){
                console.log("instllation completed")
                return "installation complete"
            }
            if(instaldone.stauts == false){
                console.log("instllation error")
                return "installation error"
            }
            else {
                console.log("Uknown error")
            };

            //need to add new files to the depositories.json file
            let rawdata1 = fs.readFileSync('./Depositories/DepositoriesList.json')
            let json1 = JSON.parse(rawdata1);
            fs.close;
            strtfile = instaldone.file

            newjsonobj = {name:filename, startfile:strtfile }

            newjsonobj = Object.assign({}, json1, {}) //copies depositories json file to variable
            //console.log(newjsonobj);
            var json2 = JSON.stringify(newjsonobj, null, 2);//null and '2' make the json look prettier
            fs.writeFile('./resources/Depositories.JSON', json2, 'utf-8', function(error){
                if(error){
                    console.log(error)
                }
            });
            fs.close



            return "installing..."
        }

    } else {
        console.log("error");
        return "error;"
    }
}


function verifyfiles(filename){
    let files = fs.readdirSync(`./depositories/`+ `${filename}`);
    console.log(files + typeof(files))
    fs.close

    mainfiles = config.mainfiles;
    var examplefiles = mainfiles.split(",");
    str1 = files.toString();

    const filexist = examplefiles.filter(element => str1.includes(element))

    console.log("filexist"+ filexist)
    startfile = "index.js"

    //match the file and get its position, then get the filename in that position
    for (const element of examplefiles) {
        console.log(element);
    }
    for (const element of str1){
        console.log(element);
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