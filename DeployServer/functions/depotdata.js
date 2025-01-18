const fs = require('fs'); //filesystem

//need read depositories and return  correct data of depository
module.exports = {
        data: depotdata()
}

function depotdata(){
    console.log("depotdata");

    const datafile = require('./findfile')
    delete require.cache[require.resolve(`./findfile`)] //clears the cache allowing for new data to be read

    return datafile
}
