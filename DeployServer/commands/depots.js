const fs = require('fs'); //filesystem

module.exports = {
    data: depots()
}
function depots(msg){ //function to get current depositories and create array out of them
    //const data = fs.readFile("./Depositories/DepositoriesList.json");
    let rawdata = fs.readFileSync('./Depositories/DepositoriesList.json')
    let json = JSON.parse(rawdata);
    console.log("msg: " + msg);
        if (json == " "){
            console.log("no current depositories")
        }
        else {
            //need to make json output into array, and with msg specification can search correct object
            if(msg = ""){

            }
            //if(msg = somevariable)
            json = json.depositories;
            let depots = JSON.stringify(json);
            return depots;
        }
        
    };
