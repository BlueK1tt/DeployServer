const fs = require('node:fs');
const path = require('node:path');
const Discord = require('discord.js')
const config = require("./resources/config.json")
const { token } = require(__dirname+'/resources/config.json');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const bot = new Client({ intents: [
	GatewayIntentBits.Guilds, 
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildMembers,
]
});

const commandPrefix = config.prefix
bot.commands = new Collection();

/*
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
*/

//server functionality functions--->

function getallcommandnames(){
	//fetch all filenames from both basic and admin folders
	//separate them, but make into one array
	//can be used to determine if user is trying to call for command
	var commandsbasic = fs.readdirSync(__dirname+'/commands/basic');
	var commandsadmin = fs.readdirSync(__dirname+'/commands/admin');
	fs.close
	var admincommands = JSON.stringify(commandsadmin)
	var basiccommands = JSON.stringify(commandsbasic);
	//console.log(admincommands)
	
	var Basiccommands = basiccommands.replaceAll(".js", "")
	var Admincommands = admincommands.replaceAll(".js", "")

	//console.log("Basiccommands : "+Basiccommands)
	//console.log("Admincommands : "+Admincommands);
	var allcommands = Basiccommands.concat(Admincommands)
	//console.log(allcommands)
	
	var commandlist = new Object()
		commandlist["basic"] = Basiccommands
		commandlist["admin"] = Admincommands
		commandlist["all"] = allcommands
	console.log(commandlist)
	return commandlist;
}

function callacommand(message, info){
	allowedcommands = checkpermission(message, info)
	console.log(allowedcommands)
	if(allowedcommands.includes(info.message)){
		location = filtercommand(info)
		if(location == "admin"){
			 //console.log("custom cmd:" + command)
			let data = require(__dirname+`/admin/`+ `${info.message}`);
			let sentData = valuesToArray(data); 
			asmessage = sentData[0];

			delete require.cache[require.resolve(__dirname+`/admin/`+ `${info.message}`)]
		}
		else { //basic command
			let data = require(__dirname+`/basic/`+ `${info.message}`);
			let sentData = valuesToArray(data); 
			asmessage = sentData[0];

			delete require.cache[require.resolve(__dirname+`/basic/`+ `${info.message}`)]
		}
		return "this is command"+asmessage
	}
	else{
		console.log("Callcommand error!")
		return;
	}
}
function sendmessage(message, info, callcommand){
	message.channel.send(callcommand)
	return;
}


//filtering functions--->

function checkbots(message){
	var nametocheck = message.author.globalName
	if(nametocheck == null){
		return "Discord Bot"
	}
	else{
		return(nametocheck)
	}
}

function filtercommand(command){
	commands = getallcommandnames()
	console.log(commands[0])
	basiccommands = Object.keys(commands)[0]
	admincommands = Object.keys(commands)[1]
	if(basiccommands.includes(command)){
		return "basic"
	}
	if(admincommands.includes(command)){
		return "admin"
	}
	else{
		console.log("Command erro")
		return "Command error"
	}
}

function checkpermission(message, info){
	filtercommand(info.message)
	commands = getallcommandnames()
	roletype = getuserroles(message)
	console.log("roletype-"+roletype)
	if(roletype == "basic"){ //for basic command use, like Pena
		return commands[0];
	}
	if(roletype == "admin"){ //for bots
		return commands[1];
		
	}
	if(roletype == "all"){ //for admins
		return commands[3];
	} else{
		console.log("Checkpermission error!")
		return;
	}
}

function getuserroles(message){
	//get all the roles the user who sent message has
	var returnroles = []

	const data = () => fs.readFileSync(require.resolve(__dirname+"/resources/roles.json"), { encoding: "utf8" });
	let rolesobj = data()
	fs.close;
	//let roleslist = JSON.parse(rolesobj)

	var rolecount = 0;
	if (message.member.roles.cache.some(role => role.name == 'ADMINISTRATOR')) {
		returnroles.push("ADMINSTRATOR")
		rolecount ++;
	} 
	if (message.member.roles.cache.some(role => role.name == 'Dev')) {
		returnroles.push("Dev")
		rolecount ++;
	} 
	if (message.member.roles.cache.some(role => role.name == 'Bots')) {
		returnroles.push("Bot")
		rolecount ++;
	}
	if (message.member.roles.cache.some(role => role.name == 'Pena')) {
		returnroles.push("Pena")
		rolecount ++;
	}
	if (rolecount == 0){
		returnroles.push("No roles")
	}
	else{
		//
	}

	return returnroles;
}

//bot startup and interractions ---->

bot.on(Events.InteractionCreate, interaction => {
	console.log(interaction);
});

bot.on(Events.InteractionCreate, interaction => {
	if (!interaction.isChatInputCommand()) return;
	console.log(interaction);
});

bot.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
	bot.channels.cache.get("726591333443174523").send("yo");
});

bot.on("messageCreate", message=>{
	//console.log(message) //get the full data of message, all variables
	getallcommandnames()

	var info = new Object()
		info["message"] = message.content //get what is in the chatbox
		info["channel"] = message.channel.name
		info["globalname"] = checkbots(message) //run thru function to detemine if bot or normal use
		info["username"] = message.author.username //get the displayname of who sent message
		info["roles"] = getuserroles(message)
	console.log(info)
	exports.info = {info}

	let callcommand = info.message.startsWith(commandPrefix) ? callacommand(message, info) : null;
	//console.log(callcommand)
	callcommand != null ? sendmessage(message, info, callcommand) : " ";
});

// Log in to Discord with your client's token
bot.login(token);