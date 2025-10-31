const { info, roles } = require('../../server');

module.exports = {
    data: hello(info)
};

function hello(info){
    info = info.info
    console.log(info)
    console.log(typeof(info))
    targetuser = cutmessage(info)
    sendout = "User" + targetuser + " kicked";
	return sendout
}


function cutmessage(info){
    //function to cut the message received to be only command part IE banuser instead of !banuser Jorma
    console.log(info)
    console.log(info.message)
    mesg = info.message
    console.log(mesg)
    
    message = mesg.split("!")

    message = msg[1].toString()
    kickcommand = message.split(" ")
    target = kickcommand[1] //target is the name given in command
    checkuser(target)
    console.log(target)   
    return target
}

function checkuser(target){
    //to check if user is admin or not
    //cant kick admins or bots
    
    rolelist = roles
    console.log(roles)
}