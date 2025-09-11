const Discord = require('discord.js');
const config = require('./config.json');
const channels = require('./logchannel.json')
var path = require('path');
const fs = require('fs'); //filesystem
const { Client, Embed, Collection, Events, GatewayIntentBits, } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const { message } = require('../../server');
const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers,GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildPresences],});

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
**/

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

        msgchannel = message.channel.id
        //bot.channels.cache.get(msgchannel).send("here");
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
function valuesToArray(obj) {
    return Object.keys(obj).map(function (key) { return obj[key];}); //dont know why i have this here but i know ill need it
};

function filelocation(info){
    //msg = info.message.slice(1); //cuts out the ! from the start of command
    //console.log(msg)
    //cmd = msg + ".js";
    cmd = cutmessage(info)
    //console.log(cmd)
    var admincommands = commandfiles("commandsadmin")
    //console.log(admincommands)
    var basiccommands = commandfiles("commandsbasic");
    //console.log(basiccommands)

    if(admincommands.includes(cmd)){
        //console.log("filelocation admin")
        return "admin"
    }
    if(basiccommands.includes(cmd)){
        //console.log("filelocation basic")
        return "basic"
    }
    else{
        console.log("filelocation error")
    }
}

function verifycommand(info){ //command from commandidentify
    command = cutmessage(info.message)
    //need processing of the command when it has more data, like usernames or actions

    if(info.isStaff == true){
        adminfiles = commandfiles("commandsadmin")
        basicfiles = commandfiles("commandsbasic")
        var stringadmin = JSON.stringify(adminfiles) + JSON.stringify(basicfiles)
        //console.log(stringadmin)
        return stringadmin.includes(command)
    }

    if(info.isadmin == false){
        basicfiles = commandfiles("commandsbasic")
        var stringbasic = JSON.stringify(basicfiles)
        return stringbasic.includes(command)
    }
    else{
        console.log("verifycommand error");
    }
}

function botstatus(status){ //set custom bot activity by sending it to function
    console.log("botstatus: " + status)
    bot.user.setActivity(status,{type: 4});
    return;
};

function cutmessage(info){
    if(info.user == config.botname){
        return "botmessage"
    }
    else{
        splitmsg = "";
        //function to cut the message received to be only command part IE banuser instead of !banuser Jorma
        var msg = info.message.split("!")
        console.log(msg)
        var splitmsg = msg[1]
        console.log(splitmsg)
        

        var message = splitmsg.toString()
        splitcommand = message.split(" ")
        //console.log(splitcommand)
        file = splitcommand[0] + ".js"
        //console.log(file)
        const allcommands = commandfiles("commandlist")
        if(allcommands.includes(file)){
            return file
        }
        else{
            console.log("cutmessage error")
            return " ";
        }
    }
}

function commandidentify(info){ //for processing commands
    if(info.user == config.botname){
        return "botmessage"
    }
    if(info.user != config.botname && info.message == "!shutdown"){
        console.log("But shutting down...")
        bot.destroy();
        return;
    }
    else{
        //console.log("command indentify")
        //sendtomaster(info.message)
        efile = verifycommand(info) //get file of the required command
        //console.log("is command?: " + file)
        var commandtype = filelocation(info)
        command = cutmessage(info)
        //console.log(command)
        //console.log(efile)
        //console.log(commandtype)
        if(efile === true && commandtype == "admin"){
            const data = require("./commands/admin/"+ `${command}`)
            var sentData = valuesToArray(data); 
            asmessage = sentData[0];
            delete require.cache[require.resolve('./commands/admin/'+`${command}`)] //clears the cache allowing for new data to be read
            return asmessage;
        }
        if(efile === true && commandtype == "basic"){
            const data = require("./commands/basic/"+ `${command}`)
            var sentData = valuesToArray(data); 
            asmessage = sentData[0];
            delete require.cache[require.resolve('./commands/basic/'+`${command}`)] //clears the cache allowing for new data to be read
            return asmessage;
        }
        else {
            return "Invalid command"
        }
    }
};

function msgidentify(info){ //for processing general messages, like hello or yo or something in those lines
    //console.log(info.message)
    //console.log("message indentify")
    if(info.user == config.botname){
        //bot message slipped thru
        console.log("bot message")
    }
    else {
    }
};

function commandfiles(info){
    const commandsbasic = fs.readdirSync(basic); //get all files in basic commands folder
    //console.log("basic: "+commandsbasic)
    const commandsadmin = fs.readdirSync(admin); //get all files in admin commands folder
    //console.log("admin: "+ commandsadmin)
    if(info.isStaff == false){
        const basicout = "Available commands: " + commandsbasic
        return basicout;
    } 
    if(info.isStaff == true){
        const adminout = "Available commands: " + commandsadmin + "," + commandsbasic
        return JSON.stringify(adminout);
    }
    if(info == "commandsadmin"){
        //console.log("commandsadmin")
        return commandsadmin;
    }
    if(info == "commandsbasic"){
        //console.log("commandsbasic")
        return commandsbasic
    }
    if(info == "commandlist"){
        const allcommands = commandsbasic.concat(commandsadmin)
        //console.log(allcommands)
        return allcommands
    }
    else{
        console.log("commandfiles error")
        return "error"
    }
};
function checkstaff(message){
    isadmin = message.member.roles.cache.has('815323331016392724');
    isbot = message.member.roles.cache.has('829806941379231826');
    if(isadmin === true || isbot === true){
        return true
    }
    else{
        return false
    }
}

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
            return
        }
    };
};
bot.on(Events.InteractionCreate, interaction => {
	console.log(interaction);
});

bot.on('ready', () =>{
    console.log(config.botname, 'Bot online'); //after online, post when last online, with info of how long was online, coudl store data in txt file
    bot.channels.cache.get(config.channel).send("`YO`");
    botstatus("Being good bot")
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

bot.on(Events.MessageUpdate, message=>{
    console.log("message update" + message)
});

bot.on(Events.MessageCreate, message=>{

    channelid = message.channel.id //string id of channel where message was sent in
    msg = message.content
    msgchannel = message.channel.id
    verifychannel(message);

    var info = new Object(); //compress everything into one object easy to pass around
            info['user'] = message.author.displayName;
            info['message'] = message.content;
            info['channel'] = getchannel(msgchannel)
            info['isStaff'] = checkstaff(message)

    exports.info = { info }; //export msg as variable to use in modules
    let roles = message.member.guild.roles.cache; //get all roles in the server
    exports.roles = roles
    //console.log(roles)
    //console.log(info)

    const embedBotMessage = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(cutmessage(info))
        .addFields(
            {name:'Bot:', value:config.botname, inline:true},
            {name:'Message:', value:commandidentify(info), inline:true}
        )
        .setTimestamp()
    
    if(info.user != config.botname && message.content.startsWith(config.prefix)){
        //console.log("command")
        sendmessage = commandidentify(info)
        bot.channels.cache.get(msgchannel).send({embeds: [embedBotMessage]}); //send 'info' to function and bot message return of that
    }
    /* currently not in use
    if(info.user != config.botname && !msg.startsWith("!")){ 
        //console.log(msgidentify(info))   //send incoming message for message processing
        bot.channels.cache.get(msgchannel).send(msgidentify(info));
    }
        */
    else{
        //here if bot message
        return;
        
    }
});

bot.login(config.token);
//sendtomaster("BluBot online");