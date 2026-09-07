const fs = require('fs'); //filesystem
const { info } = require('../../server');

module.exports = {
    data: hello(info)
};

function hello(){
	msg = "Hello "+ info.username
    if(authorizecommand(info) === true){
        return;
    } 
    if(authorizecommand(info) === false){
        return;
    }
    else{
        return;
    }
    //console.log(msg)
	return msg
}

function authorizecommand(info){ //boilerplate function,
    var secret;
    console.log(__dirname)
    
    return secret
}