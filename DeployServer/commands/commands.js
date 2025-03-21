const fs = require('fs'); //filesystem

module.exports = {
    data: commands()
}
function commands(){ //function to get current depositories and create array out of them
    //need to get every file in commands folder

    //need to read above folders too
    var files = fs.readdirSync('./commands/');
    let original = files;
    fs.close;
    commands = original.map(function(d) {
        return d.replace('.js', "");
    });
    var data = commands.toString();
    return data
}