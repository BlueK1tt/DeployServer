const fs = require('fs'); //filesystem
let { message } = require("../server");

module.exports = {
    data: commands()
}

function commands(){
    
    let msg = cleanmessage(message)

    const data = () => fs.readFileSync(require.resolve("../resources/commands.json"), { encoding: "utf8" });
    fs.close;
    let commandsobj = data()
    let datas = JSON.parse(commandsobj)

    //initialize arrays
    const resultdis = [];
    const resulten = [];
    const encommands = [];
    const discommands = [];

    datas.forEach((Element) => {

        if(Element.status == "enabled"){ //get commands that are enabled
            resulten.push(Element.command+" : "+Element.status) //get enabled command name and status
            encommands.push(Element.command) //get enabled command name
        }
        if(Element.status == "disabled"){ //get commands that are disabled
            resultdis.push(Element.command+" : "+Element.status) //get disabled command name and status
            discommands.push(Element.command) //get disabled command name
        }
        else {
            return "commands foreach error" //if for some reason above fails
        }
    });
    
    if(msg.includes('=all')){
        const commandlistall = resulten.concat(resultdis) //combine the two arrays into one
        console.log(commandlistall)
        return (commandlistall)
    }
    else { //only commands that are enabled
        console.log(encommands)
        return encommands
    }

}
function cleanmessage(message){
    console.log(message)
    msgstring = JSON.stringify(message)
    let msg = msgstring.slice(14,-2)
    console.log(msg)
    return msg
}