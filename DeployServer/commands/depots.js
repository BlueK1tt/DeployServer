const fs = require('fs'); //filesystem

module.exports = {
    data: depots()
}
function depots(){ //function to get current depositories and create array out of them
    //const data = fs.readFile("./Depositories/DepositoriesList.json");
    let rawdata = fs.readFileSync('./Depositories/DepositoriesList.json')
    let json = JSON.parse(rawdata);

    const files = json.depositories;    

    console.log("msg: " + msg);
        if (json == " "){
            console.log("no current depositories")
        }
        else {
            //need to make json output into array, and with msg specification can search correct object
            if(msg = ""){
                console.log("error");
                return "error";
            }
            else{
            //if(msg = "depots")
            console.log(typeof(files));
            const depots = JSON.stringify(files);
            const pots = depots.replace(' "" '," ");
            console.log(pots);
            return depots;
            };
        };
        fs.close;
    };
