const fs = require('fs'); //filesystem

module.exports = {
    data: update()
};

function update() {
    var files = fs.readdirSync('./Depositories/');
    let original = files
    result = original.map(function(d) {
        return d.replace('DepositoriesList.txt', '');
    });
    if (result == '') {
        data = "You haven't added any programs"
    } else { 
        data = result.toString();
    } 
    fs.close;
    return data;
}