const Discord = require('discord.js');
const config = require('./config.json');
var path = require('path');
const fs = require('fs'); //filesystem
const { Client, Collection, Events, GatewayIntentBits, } = require('discord.js');
const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages],});



const PREFIX = config.prefix
var filename = path.basename(__dirname);
const foldersPath = path.join(__dirname, 'commands');


bot.commands = new Collection();


function sendtomaster(data){
    process.send({ //this is just example, boiletplate for future apps
      type : 'process:msg',
      data : {
        app : filename,
        msg : data
      }
    })
}



function commandscollection() { //currently not in use, using the above commands command
    var files = fs.readdirSync('./commands/');
    let original = files
    fs.close;
    result = original.map(function(d) {
        return d.replace('.js', "");
    });
    var stringCMD = result.toString();
    console.log("collention" + result);
    return stringCMD;
};


bot.on(Events.InteractionCreate, interaction => {
	console.log(interaction);
});

bot.on('ready', () =>{
    console.log(config.botname, 'Bot online'); //after online, post when last online, with info of how long was online, coudl store data in txt file
    bot.channels.cache.get(config.channel).send("`YO`");

});

bot.on('error', error => {
    console.log(error)
});

bot.on('uncaughtException', err => {
    console.error('There was an uncaught error', err)
    process.exit(1) //mandatory (as per the Node.js docs)
})

bot.on(Events.MessageCreate, message=>{
        if(message.author == config.botid){
            console.log("self");    
        }
        else {
            //setup for when actively needing bot on some channel, use !BluBot or some else command in that chat
            //can be used with voice channels too            var oldchannel ="";  //prepared variable for old channel id used later
            var newchannel =";" //prepared variable for new channel id used later

            //console.log("message received")
            console.log(message.content)
            console.log(commandscollection())
            msgchannel = message.channel.id
            console.log(bot.channels.cache.get(msgchannel).send("here"));

        }

});
bot.login(config.token);
sendtomaster("BlutBot online");