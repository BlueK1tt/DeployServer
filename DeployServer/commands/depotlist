
const pm2 = require('pm2')

module.exports = {
    data: list()
}

function list(){
    pm2.list((err, list) => {
        console.log(err)
        console.log(Object.keys(list))
    })
    return list
    
}