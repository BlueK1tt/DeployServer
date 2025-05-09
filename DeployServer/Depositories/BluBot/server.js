const Discord = require('discord.js');
const config = require('./config.json');
const channels = require('./logchannel.json')
var path = require('path');
const fs = require('fs'); //filesystem
const { Client, Collection, Events, GatewayIntentBits, } = require('discord.js');
const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildPresences],});

const PREFIX = config.prefix
var filename = path.basename(__dirname);
const admin = path.join(__dirname, 'commands/admin/');
const basic = path.join(__dirname, 'commands/basic/')

bot.commands = new Collection();

/*
function sendtomaster(data){
    process.send({ //this is just example, boiletplate for future apps
      type : 'process:msg',
      data : {
        app : filename,
        msg : data
      }
    })
}
*/

function verifychannel(message){ //for the switching channels thing
    if(message.author == config.botid){
        oldchannel = newchannel
        //console.log("self");    
        newchannel = channelid
    }
    else {
        const discordServer = bot.guilds.cache.get("726591333443174520");
        const channels = discordServer?.channels ? JSON.parse(
        JSON.stringify(discordServer.channels)
        ).guild.channels : [];

        //console.log(channels)
        //console.log(message.content)
        msgchannel = message.channel.id
        bot.channels.cache.get(msgchannel).send("here");
    }
    if(oldchannel == newchannel){
        //console.log("same channel")
        return;
    }
    if(oldchannel != newchannel && oldchannel != ""){
        msgchannel = message.channel.id
        chnswtich = "Switched from "+ getchannel(oldchannel) + " to "+ getchannel(newchannel);
        bot.channels.cache.get(msgchannel).send(chnswtich);
        return
    }
    else if(oldchannel == "" || oldchannel == " " || newchannel == ""){
        console.log("start or error")
        return   
    }
    return;
};

function verifycommand(info){ //command from commandidentify
    command = info.message.slice(1); //cuts out the ! from the start of command
    if(info.isadmin == true){
        adminfiles = commandfiles("commandsadmin")
        return adminfiles.includes(command)
    }
    if(info.isadmin == false){
        basicfiles = commandfiles(commandsbasic)
        return basicfiles.includes(command)
    }
    else{
        console.log("verifycommand error");
    }
}

function botstatus(status){ //set custom bot activity by sending it to function
    console.log("botstatus" + status)
    bot.user.setActivity(status,{type: 4});
    return;
};

function commandidentify(info){ //for processing commands
    command = info.message; //just get the message out of info for processing
    file = verifycommand(info) //get file of the required command
    console.log("is command?: " + file)

    if(command == "swap"){
        return "swapping"
    }
    if(command == "commands"){
        return commandfiles(info) //send info to commandfiles and send out the output
    }
    if(command == "ping"){
        return "Pong!";
    }
    else {
        console.log("empty command")
        return "test"
    }
};

function msgidentify(info){ //for processing general messages, like hello or yo or something in those lines
    //console.log(info.message)
    return "message received"
};

function commandfiles(info){
    const commandsbasic = fs.readdirSync(basic); //get all files in basic commands folder
    const commandsadmin = fs.readdirSync(admin); //get all files in admin commands folder
    if(info.isadmin == false){
        var basicout = "Available commands: " + commandsbasic
        return basicout;
    } 
    if(info.isadmin == true){
        const adminout = "Available commands: " + commandsadmin + "," + commandsbasic
        return JSON.stringify(adminout);
    }
    if(info == "commandsadmin"){
        thisreturn = commandsadmin+","+commandsbasic;
        return thisreturn;
    }
    if(info == "commandsbasic"){
        return commandsbasic
    }
    else{
        return "error"
    }
};
/*
function commandscollection() { //currently not in use, using the above commands command
    var files = fs.readdirSync(foldersPath, {withFileTypes: true});
    let original = files
    fs.close;
    result = original.map(function(d) {
        return d.replace('.js', "");
    });
    var stringCMD = result.toString();
    console.log("collention" + result);
    return stringCMD;
};
*/
function getchannel(cid){
    //console.log("id = " + cid)
    //console.log(channels)
    var keyCount  = Object.keys(channels).length;
    for(let i = 0; i < keyCount; i++){
        if(channels[i].id == cid){
            return channels[i].cname
        }
        else{
            //just empty, nothing needs to happen
        }
    };
};
bot.on(Events.InteractionCreate, interaction => {
	console.log(interaction);
});

bot.on('ready', () =>{
    console.log(config.botname, 'Bot online'); //after online, post when last online, with info of how long was online, coudl store data in txt file
    bot.channels.cache.get(config.channel).send("`YO`");
    botstatus("being good bot")
});

bot.on('error', error => {
    console.log(error)
});

bot.on('uncaughtException', err => {
    console.error('There was an uncaught error', err)
    process.exit(1) //mandatory (as per the Node.js docs)
});

//setup for when actively needing bot on some channel, use !BluBot or some else command in that chat
//can be used with voice channels too            
var oldchannel ="";  //prepared variable for old channel id used later
var newchannel =""; //prepared variable for new channel id used later

bot.on(Events.MessageCreate, message=>{

    channelid = message.channel.id //string id of channel where message was sent in
    msg = message.content
    verifychannel(message);

    var info = new Object(); //compress everything into one object easy to pass around
            info['user'] = message.author.displayName;
            info['message'] = message.content;
            info['channel'] = getchannel(channelid)
            info['isadmin'] = message.member.roles.cache.has('815323331016392724');

    //console.log(info)

    if(msg.author != config.botid && msg.startsWith("!")){
        //console.log("command")
        bot.channels.cache.get(msgchannel).send(commandidentify(info)); //send 'info' to function and bot message return of that
    }
    if(message.author != config.botid){ 
        //console.log(msgidentify(info))   //send incoming message for message processing
        bot.channels.cache.get(msgchannel).send(msgidentify(info));
    }
    else{
        console.log("else")
    }
});

bot.login(config.token);
//sendtomaster("BlutBot online");