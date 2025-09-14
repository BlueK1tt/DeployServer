//command to check how long server has been up
const { timenow } = require("../server");

let timestart = JSON.stringify(timenow)//variable from server start
const timecurrent = new Date();


module.exports =  {
    data: uptime()

};

function uptime(){
    console.log("uptime")
    console.log(timestart)
    console.log(timecurrent);

    //need to cleanup both time strings
    //cut them both by sections and divide the parts
    //after parts are divided, can measure difference

    if(oldyear != newyear){
        //calculate year difference 
    }
    if(oldmonth != newmonth){
        //calculate month difference

    }
    if(oldday != newday){
        //calculate day difference

    }
    if(oldhour != newhour){
        //calculate hour diffrence

    }
    if(oldsecond != newsecond){
        //calculate second difference

    }



}