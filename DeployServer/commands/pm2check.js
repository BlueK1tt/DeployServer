const pm2 = require('pm2');


module.exports = {
    data: pm2check()
};

function pm2check(){
    console.log("pm2check");
    try{
        pm2.list((err, list) => {
        const id = 0;
        
            list = list.map(item => {
                return item.id !== id ? item : null;
            }).filter(item => item !== null)
            
            servcount = Object.keys(list).length
            //need to cut "deployment server" out of that list
            if(servcount >= 1){ //if no error and list not empty
                //need to stop all running daemons
                list.forEach((Element) => {
                    console.log(Element)
                })
            if(err != null){
                console.log(err)
                return err
            }
            else {
                list.forEach((Element) => {
                    console.log(Element)
            })
                return "ok"
            }
        }
    });
    }
    catch (error ){
        console.error(error)
        return error
    }
    console.log("out?")
    return "pm2check out"
}