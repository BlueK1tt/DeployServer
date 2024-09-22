const fs = require('fs'); //filesystem

module.exports = {
    data: getdepots()
}
function getdepots(){ //function to get current depositories and create array out of them
    var files = fs.readFileSync("./Depositories/DepositoriesList.txt", "UTF-8");
    if (files == ""){
        console.log("no current depositories")
    }
    else {
        let depots = files
        return depots;
    }
    fs.close;    
}