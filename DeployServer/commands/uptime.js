//command to check how long server has been up
var { timenow } = require("../server");

var timestart = JSON.stringify(timenow)//variable from server start
var current = new Date();
var  timecurrent = JSON.stringify(current)

module.exports =  {
    data: uptime()

};

function uptime(){
    console.log("uptime")
    console.log(timestart) //string
    console.log(timecurrent);

    //need to cleanup both time strings
    //cut them both by sections and divide the parts
    
    //propably just split the whole thing and then assign  different split sections to variables
    
    //here code to split old date data to section

     //{"timenow":"2025-09-17T13:59:16.009Z"}
    var timestr = timestart.slice(1,-1);
    var onlytime = timestr.slice(10)
    console.log("timestr:" +onlytime)
    
    var oldcleandatetime = onlytime.replaceAll('"',"")
    var olddatetime = oldcleandatetime.split("T")

    console.log(olddatetime)
    var olddate = olddatetime[0]
    var oldtime = olddatetime[1]

    var pastdate = olddate.split("-")
    var pasttime = oldtime.split(":")

    var oldyear = pastdate[0]
    var oldmonth = pastdate[1]
    var oldday = pastdate[2]
    var oldhour = pasttime[0]
    var oldminute = pasttime[1]
    var oldsecond = pasttime[2].slice(0,6); //cut the annoying Z from the end
    



    //here code to split new date data to section
    var newcleandatetime = timecurrent.replaceAll('"', "")
    var newdatetime = newcleandatetime.split("T")

    console.log(newdatetime)
    var newdate = newdatetime[0]
    var newtime = newdatetime[1]

    var thisdate = newdate.split("-")
    var thistime = newtime.split(":")

    var newyear = thisdate[0];
    var newmonth = thisdate[1];
    var newday = thisdate[2];
    var newhour = thistime[0];
    var newminute = thistime[1];
    var newsecond = thistime[2].slice(0,6); //cut the annoying Z from the end


    //after parts are divided, can measure difference

    if(oldyear != newyear){
        //calculate year difference 
        console.log("different year")
        
    }
    if(oldmonth != newmonth){
        //calculate month difference
        console.log("different month")

    }
    if(oldday != newday){
        //calculate day difference
        console.log("different day")

    }
    if(oldhour != newhour){
        //calculate hour diffrence
        console.log("different hour")

    }
    if(oldminute != newminute){
        //calculate minute difference
        console.log("different minute")
    }
    if(oldsecond != newsecond){
        //calculate second difference
        console.log("different second")
        console.log(oldsecond +" || "+ newsecond)

        difsecond = oldsecond - newsecond
        console.log(difsecond)

    }

    delete(timenow)
    delete(current)


}
