const fs = require('fs'); //filesystem
const { info } = require('../../server');

module.exports = {
    data: hello(info)
};

function hello(){
	msg = "Hello "+ info.info.user
    //console.log(msg)
	return msg
}