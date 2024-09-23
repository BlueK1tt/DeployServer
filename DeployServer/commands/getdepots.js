const fs = require('fs'); //filesystem

module.exports = {
    data: getdepots()
}
function getdepots(){ //function to get current depositories and create array out of them
    //const data = fs.readFile("./Depositories/DepositoriesList.json");
    let rawdata = fs.readFileSync('./Depositories/DepositoriesList.json')
    let json = JSON.parse(rawdata);
        if (json == " "){
            console.log("no current depositories")
        }
        else {
            json = json.depositories.Jorma;
            let depots = JSON.stringify(json);
            return depots;
        }
        
    };
