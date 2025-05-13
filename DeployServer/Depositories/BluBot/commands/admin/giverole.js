const { info } = require('../../server');

module.exports = {
    data: hello(info)
};

function hello(info){
    console.log(typeof(info))
    cutmessage(info)
    sendout = "User" + targetuser + "given role" + givenrole
	return sendout
}
function cutmessage(info){
    //function to cut the message received to be only command part IE banuser instead of !banuser Jorma
    mesg = info.message
    message = mesg.split("!")

    message = msg[1].toString()
    command = message.split(" ")
    target = command[1]
    console.log(target)
}