const fs = require('fs'); //filesystem
const request = require('request');
const config = require('../config.json'); //custom configurations file for secret info
// use double . to go back folder

module.exports = {
    data: connect()
};

function connect() {
    //need able to test connection to github 
    //get username from main:config
    username = config.gitname;
    console.log(username);
    url = ('https://api.github.com/users/' + username +'/repos?', 'User-Agent:' + username);

    function getbody(){
        request(url, function (error, response, body){
            if(!error){
                console.log(body)
                return body;
            }
            else{
                return error;
            }
        });
    }
    console.log(getbody());
    result = getbody();
    console.log(result)
    return result;
}