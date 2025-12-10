const pm2 = require('pm2')
module.exports =  {
    data: test()

};

function test(){
    console.log(pm2.list)
    setTimeout(() => {
        console.log("Delayed for 5 second.");
        return "Test done";
      }, 5000);
}