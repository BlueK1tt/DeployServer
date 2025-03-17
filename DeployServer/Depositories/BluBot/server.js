const Discord = require('discord.js');
const config = require('./config.json');
var path = require('path');
const fs = require('fs'); //filesystem
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const bot = new Client({ intents: [GatewayIntentBits.Guilds] });



const PREFIX = config.prefix
var filename = path.basename(__dirname);

bot.commands = new Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		bot.commands.set(command.name, command);
	}
}
/*function sendtomaster(data){
    process.send({ //this is just example, boiletplate for future apps
      type : 'process:msg',
      data : {
        app : filename,
        msg : data
      }
    })
}
*/

bot.on(Events.InteractionCreate, interaction => {
	console.log(interaction);
});

bot.on('ready', () =>{
    console.log(config.botname, 'Bot online'); //after online, post when last online, with info of how long was online, coudl store data in txt file
    bot.channels.cache.get(config.channel).send("`YO`");

	console.log(config.botname, 'Bot online'); //after online, post when last online, with info of how long was online, coudl store data in txt file
	  bot.channels.cache.get(config.channel).send("`YO`");
	
	  const baseFile = 'command-base.js'
	  const commandBase = require(`./commands/${baseFile}`)
	
	  const readCommands = (dir) => {
		const files = fs.readdirSync(path.join(__dirname, dir))
		for (const file of files) {
		  const stat = fs.lstatSync(path.join(__dirname, dir, file))
		  if (stat.isDirectory()) {
			readCommands(path.join(dir, file))
		  } else if (file !== baseFile) {
			const option = require(path.join(__dirname, dir, file))
			commandBase(client, option)
		  }
		}
	  }
	
	  readCommands('commands')

});

bot.on('error', error => {
    console.log(error)
});

bot.on('uncaughtException', err => {
    console.error('There was an uncaught error', err)
    process.exit(1) //mandatory (as per the Node.js docs)
})

bot.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

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

bot.on('message', message=>{
	
    console.log(message.content)
    console.log(message)

});
bot.login(config.token);
//sendtomaster("BlutBot online");