const Discord = require('discord.js');
const config = require('./config.json');
var path = require('path');
const fs = require('fs'); //filesystem
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const bot = new Client({ intents: [GatewayIntentBits.Guilds] });



const PREFIX = config.prefix
var filename = path.basename(__dirname);
const foldersPath = path.join(__dirname, 'commands');


bot.commands = new Collection();

const commandFolders = fs.readdirSync('./Depositories/BluBot/commands/');

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			bot.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
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

});

bot.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply({ content: 'Secret Pong!', flags: MessageFlags.Ephemeral });
    }
});

bot.on('error', error => {
    console.log(error)
});

bot.on('uncaughtException', err => {
    console.error('There was an uncaught error', err)
    process.exit(1) //mandatory (as per the Node.js docs)
})


bot.on('message', message=>{

    if (!message.content.startsWith(PREFIX) || message.author.bot) return;
	
	const args = message.content.slice(PREFIX.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	console.log(command)
    console.log(message.content)
    console.log(message)

});
bot.login(config.token);
//sendtomaster("BlutBot online");