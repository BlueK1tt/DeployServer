const fs = require('fs'); //filesystem
const { info } = require('../../blubot.js');

module.exports = {
    data: hello(info)
};

function hello(){
    console.log("hello")
	msg = "Hello "+ info.username
    if(authorizecommand(info) === true){
        return "Hello";
    } 
    if(authorizecommand(info) === false){
        return "Hello";
    }
    else{
        return "Hello";
    }
    //console.log(msg)
	return msg
}

function authorizecommand(info){ //boilerplate function,
    var secret;
    console.log(__dirname)
    
    return secret
}