const fs = require('node:fs');
const path = require('node:path');
const Discord = require('discord.js')
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const bot = new Client({ intents: [GatewayIntentBits.GuildMessages] });
;
bot.commands = new Collection();


const { token } = require('./config.json')
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

bot.on(Events.InteractionCreate, interaction => {
	console.log(interaction);
});

bot.on(Events.InteractionCreate, interaction => {
	if (!interaction.isChatInputCommand()) return;
	console.log(interaction);
});

bot.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
	client.channels.cache.get("726591333443174523").send("yo");
});

bot.on("message", message=>{
	console.log(message.content);
	//need to use this as request/respond thing
});
// Log in to Discord with your client's token
bot.login(token);