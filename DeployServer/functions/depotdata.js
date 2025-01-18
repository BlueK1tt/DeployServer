const fs = require('fs'); //filesystem

//need read depositories and return  correct data of depository
module.exports = {
        data: depotdata()
}

function depotdata(){
    //console.log("depotdata");

    const datafile = require('./findfile')
    var sentData = valuesToArray(datafile); 
    asmessage = sentData[0];

    delete require.cache[require.resolve(`./findfile`)] //clears the cache allowing for new data to be read

    return asmessage
}

function valuesToArray(obj) {
    return Object.keys(obj).map(function (key) { return obj[key];}); //dont know why i have this here but i know ill need it
};
