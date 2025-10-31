const Discord = require('discord.js');
const { info, roles } = require('../../server');


module.exports = {
    data: hello(info)
};

function hello(info){
    info = info.info
    console.log(typeof(info))
    targetuser = targetuser(info)
    givenrole = roleuser(info)
    if(targetuser == "error" || giverole == "error"){
        return "error"
    }
    else{
        //targetuser.role.roles.add(givenrole)
        member = targetuser
        member.roles.add(giverole)
        sendout = "User" + targetuser + "given role" + givenrole
        return sendout
    }
}

function roleuser(info){
    console.log("roleusers")
    giverole = cutmessage(info)
    if(giverole == "error"){
        return "error"
    }
    else{
        target = giverole.user
        //need to find user with same name from the server and return their ID
        let targetrolelid = roles.roles
        return targetrolelid
    }
}

function targetuser(info){
    console.log("targetuser")
    console.log(info)
    giverole = cutmessage(info)
    if(giverole == "error"){
        return "error"
    }
    else {
        targetrole = giverole.role
        //need to find role with same name in the server and return role id
    
    
        //return targetuserid
    }
}

function cutmessage(info){
    console.log("cutmessage")
    //function to cut the message received to be only command part IE banuser instead of !banuser Jorma
    console.log(info.message)
    mesg = info.message
    console.log(mesg)
    message = mesg

    message = msg[1].toString()
    command = message.split(" ")
    target = command[1]
    console.log(target)

    var giverole = new Object();
        giverole["user"] = command[1];
        giverole["role"] = command[2];
    console.log(giverole)
    if(giverole.user == "undefined" || giverole.role == "undefined"){
        return "error"
    }
    else{
        return giverole
    }
}