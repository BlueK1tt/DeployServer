const { info } = require('../../server');

module.exports = {
    data: hello(info)
};

function hello(info){
    info = info.info
    console.log(info)
    console.log(typeof(info))
    cutmessage(info)
	return "User kicked"
}


function cutmessage(info){
    //function to cut the message received to be only command part IE banuser instead of !banuser Jorma
    console.log(info)
    console.log(info.message)
    mesg = info.message
    console.log(mesg)
    
    message = mesg.split("!")

    message = msg[1].toString()
    command = message.split(" ")
    target = command[1]
    console.log(target)   
}

function checkuser(info){
    //to check if user is admin or not
    //cant kick admins or bots

}