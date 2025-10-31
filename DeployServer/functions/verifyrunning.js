//Need to add checks to see if app/server started ok, otherwise return error
const { error } = require('console');
const fs = require('fs');

module.exports = {
    data : verifyrunning()

};

function verifyrunning(){
    
    let isrunning = somefunction //return true or false
    if(isrunning === true){

    }
    if(isrunning === false){

    } else {
        error;
        console.log(error)
    }
    return
}
