const Discord = require('discord.js');
const { info} = require('../../server');
var path = require('path');
const fs = require('fs'); //filesystem

const admin = path.join(__dirname, '../admin/');
const basic = path.join(__dirname, '../basic/')

module.exports = {
    data: getcommands(info)
};

function getcommands(info){
	console.log("commands")
    const commandsbasic = fs.readdirSync(basic); //get all files in basic commands folder
    const commandsadmin = fs.readdirSync(admin); //get all files in admin commands folder
    fs.close

    //cleanup
    admincommands = commandsadmin.map(function(d) {
        return d.replace('.js', "");
    });
    var giveadmin = admincommands.toString();

    basiccommands = commandsbasic.map(function(d) {
        return d.replace('.js', "");
    });
    var givebasic = basiccommands.toString();

    if(info.info.isStaff === true){ //check if user requesting is staff or not
        var givecommands = givebasic +","+ giveadmin
        return givecommands 
    }
    else{
        return givebasic
    } 
}