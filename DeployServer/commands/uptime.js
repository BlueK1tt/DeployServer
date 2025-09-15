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
    
    //propably just split the whole thing and then assign  different split sections to variables
    
    //here code to split old date data to section
    
    var oldyear = 
    var oldmonth =
    var oldday =
    var oldhour =
    var oldminute =
    var oldsecond =



    //here code to split new date data to section

    var newyear = 
    var newmonth = 
    var newday = 
    var newhour =
    var newminute =
    var newsecond =


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
    if(oldminute != newminute){
        //calculate minute difference
    }
    if(oldsecond != newsecond){
        //calculate second difference

    }



}