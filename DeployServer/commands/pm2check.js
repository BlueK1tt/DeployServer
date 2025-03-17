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


            //need to test out if code goes procedurally if take the "if" statements away
            //they just served as check for other command, but now they arent needed, but they functionality is useful

            
            if(servcount >= 1){ //if no error and list not empty
                //need to stop all running daemons
                list.forEach((Element) => {
                    //console.log(Element)
                })
            if(err != null){
                console.log(err)
                return err
            }
            else {
                list.forEach((Element) => {
                    filename = Element.name; //main.js server.js
                    filetree = Element.pm2_env.pm_exec_path // /DeployServer/Depositories/
                    pm2stat = Element.pm2_env.status //online , offline, stopped
                    result = makepretty(filename, filetree, pm2stat);
                    console.log(result);
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

function makepretty(filename, filetree, pm2stat){
    results = filename + filetree + pm2stat
    return results
}