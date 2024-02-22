//update requested
module.exports = {
    id: 2,
    name: 'document',
    description: "Gives the website for DC api",
    callback(message, args){
        message.channel.send('https://discord.js.org/#/');
        console.log(`${args}`, message.author.username)
    }
}