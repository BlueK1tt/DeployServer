const fs = require('fs');
const { json } = require('stream/consumers');

//uninstall "program" from depositories folder
//just need to remove the whole name floder, check it after done, and return true when done

module.exports = {
    data : uninstall()
};

function uninstall(){
    filename = msg.slice(10);
    checkfile();

    if(msg == "uninstall"){
        console.log("error, target not defined");
        return "target not defined"
    }

    if(files.includes(filename)){
        console.log(files)

        //actually deletes the whole specified folder
        fs.rmdir(`../DeployServer/Depositories/` + `${filename}`,() => {
            console.log("Folder Deleted!");
        });
        //need to remove the json entry
        let rawdata = fs.readFileSync('./depositories/DepositoriesList.JSON');
        

        return "uninstalling" + filename + "..."
    } else {
        return "error;"
    }
}

function checkfile(){ //used 2 times, first to check that file exitst, then checking it doesnt exist anymore
    files = fs.readdirSync('../DeployServer/Depositories')
    return files

}