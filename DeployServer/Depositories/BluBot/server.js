const Discord = require('discord.js');
const config = require('./config.json');
var path = require('path')
const bot = new Discord.Client({intents: [Discord.GatewayIntentBits.Guilds],});

const PREFIX = config.prefix
var filename = path.basename(__dirname);


function sendtomaster(data){
    process.send({ //this is just example, boiletplate for future apps
      type : 'process:msg',
      data : {
        app : filename,
        msg : data
      }
    })
}

bot.on('ready', () =>{
    console.log(config.botname, 'Bot online'); //after online, post when last online, with info of how long was online, coudl store data in txt file
    bot.channels.cache.get(config.channel).send("`YO`");
});

bot.on('uncaughtException', err => {
    console.error('There was an uncaught error', err)
    process.exit(1) //mandatory (as per the Node.js docs)
})


bot.on('message', message=>{
	
    console.log(message.content)

    if (!message.content.startsWith(PREFIX) || message.author.bot) return;
	
	const args = message.content.slice(PREFIX.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

    if (!bot.commands.has(command)) return;
	
	try {
		bot.commands.get(command).callback(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

bot.login(config.token);
sendtomaster("BlutBot online");