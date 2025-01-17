const fs = require('fs'); //filesystem

module.exports = {
    data: depots()
}
function depots(msg){ //function to get current depositories and create array out of them
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
            if(msg = "depots"){
                console.log("depots")

                var array = [];
                for (var value in files) {
                    if(files.hasOwnProperty(value)){
                        //console.log(value)
                        array.push(value)
                    }
                }
                var arrys = array.toString();


                return arrys
            }
            else{
                console.log("something else")
                return "empty";
            };
        };
        fs.close;
    };
