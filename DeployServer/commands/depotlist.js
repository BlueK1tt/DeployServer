
const pm2 = require('pm2')

module.exports = {
    data: list()
}

function list(){
    pm2.list((err, list) => {
        if(err){
            console.log(err)
        } else {
            //console.log(list)
            //console.log(Object.keys(list))
        }
    })
    return list
    
}