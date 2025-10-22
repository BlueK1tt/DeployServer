const Discord = require('discord.js');
const { info, roles } = require('../../server');

module.exports = {
    data: usrinfo(info)
};
/*
function usrinfo(){
    const userinfo = new Discord.MessageEmbed()
    .setTitle('User Information')
    .addField('Player name', info.info.user, true)
    
    return userinfo
}
*/