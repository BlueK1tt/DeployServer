const fs = require('fs');

//uninstall "program" from depositories folder
//just need to remove the whole name floder, check it after done, and return true when done

module.exports = {
    data : uninstall()
};

function uninstall(){
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
            console.log("Folder Deleted!");
        });
        //need to remove the json entry
        let rawdata = fs.readFileSync('./depositories/DepositoriesList.JSON');
        

        return 'uninstalling "'+ filename + '"...'
    } else {
        console.log("File or Folder doesnt exist")
        return "File or Folder doesnt exist"
    }
}

function checkfile(filename){ //used 2 times, first to check that file exitst, then checking it doesnt exist anymore
    filepath = "./depositories/"+filename
    files = fs.existsSync(filepath);
    //console.log(files)
    return files
}