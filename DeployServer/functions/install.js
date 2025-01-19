const fs = require('fs'); //filesystem

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
            return "installing..."
        }

    } else {
        console.log("error");
        return "error;"
    }
}