//Need to add checks to see if app/server started ok, otherwise return error
const { error } = require('console');
const fs = require('fs');

//need msg from main server
//need to split it up and specify the server wanted


module.exports = {
    data : verifyrunning()

};

function verifyrunning(){
    //need to pass the server from msg to the function chekc if true or not
    let isrunning = getrunningservers //return true or false
    if(isrunning === true){

    }
    if(isrunning === false){

    } else {
        error;
        console.log(error)
    }
    return
}

function getrunningservers(){ //use pm2 functions to get what servers are on

}