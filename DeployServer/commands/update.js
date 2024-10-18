const fs = require('fs'); //filesystem
const msg = require('../server')
module.exports = {
    data: update()
};

function update(msg) {
    console.log("update:" + msg)
    var files = fs.readdirSync('./Depositories/');
    let original = files
    result = original.map(function(d) {
        return d.replace('DepositoriesList.json', '');
    });
    result.pop(); //removes last object
    if (result == '') {
        data = "You haven't added any programs"
    } else { 
        console.log("result:" + result);
        data = result.toString();
    } 
    fs.close;
    return data;
}

function verifyfile(){

}