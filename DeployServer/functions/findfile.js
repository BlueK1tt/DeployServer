const { error } = require('console');
const fs = require('fs'); //filesystem

module.exports = {
    data: findfile()
}

function findfile(){

    if(msg.startsWith("start") || msg.startsWith("stop")){
        //file find not here, beacuse its case spesific and not always same


        if(msg.startsWith("start")){
            filename = msg.slice(6);
            console.log(filename);
            let files = fs.readdirSync(`./depositories/`+ `${filename}`);
            fs.close
            //console.log("files:" + files)
            if (Object.keys(files).length !== 0){
                return files
            }
            else {
                return "directory empty"
            }
        }


        if(msg.startsWith("stop")){
            filename = msg.slice(5);
            
        }
        else {
            return error
        }
    }

}