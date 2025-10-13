//command to check how long server has been up
let { timenow } = require("../server");

module.exports =  {
    data: uptime()

};
function cleanoldtime(){
    var timestart = JSON.stringify(timenow)//variable from server start

    var timestr = timestart.slice(1,-1);
    var timereplc = timestr.slice(10)
    console.log(timereplc)
    var cleanedtime = timereplc.replaceAll('"','');
    var cuttime = cleanedtime.slice("T");
    console.log(cuttime)
    return cuttime

}
function uptime(){
    oldtime = cleanoldtime();
    //console.log("timenow")
    var timenow = new Date();
    //var timenow = today.setHours(today.getHours() + 3)
    console.log("now"+timenow)
    console.log("old"+oldtime)

    difference = (timenow - oldtime) / 1000
    console.log("difference"+difference)
    var translatedtime = translatetime(difference)
    console.log("Server has been online for:"+translatedtime);

    var hournow = timenow.getHours();
    var minutenow = timenow.getMinutes();
    var secondsnow = timenow.getSeconds();
    var cleantime = hournow+":"+minutenow+":"+secondsnow; //is current time
    //console.log(cleantime)
    return translatedtime
}

function translatetime(difference){

    let totaltime = new Object();
    totaltime['days'] = difference / 86400;
    totaltime['hours'] = difference / 3600;
    totaltime['minutes'] = difference / 60;
    totaltime['seconds'] = difference;
    //console.log(totaltime)

    //check from lowest to highest if any are empty and the print result
    //need to convert to higher if over 60
    var addday = 0;
    var addhours = 0;
    var addminute = 0;
    var addseconds = 0;

    if(totaltime.hours >= 59){
        addday = Math.floor(totaltime.days)
        //console.log("addday:"+addday)
        addhours = addday * 60
        
    }
    if(totaltime.minutes >= 59){
        var addhour = Math.floor(totaltime.hours)
        //console.log("addhour"+ addhour)
        var addminutes = addhour * 60
        //console.log("addminute:" + addminute)
        
    }
    if(totaltime.seconds >= 59){
        addminute = Math.floor(totaltime.minutes)
        //console.log("addminute:"+addminute)
        addseconds = addminute * 60
        //console.log("addseconds:"+addseconds)        
    } else{
        //console.log("under minute")
        
    }
    var setdays;
    if(Math.floor(totaltime.days) == 0){
        setdays = "";
    } else {
        setdays = Math.floor(totaltime.days)+":";
    }
    var sethours;
    if(Math.floor(addhours) == 0){
        sethours = "";
    }if(Math.floor(addhours) < 10 && Math.floor(addhours) != 0){
        sethours = "0"+Math.floor(addhours)+":";
    } 
    else {
        sethours = Math.floor(addhours)+":";
    }
    var setminutes;
    if(Math.floor(addminute) == 0){
        setminutes = "";

    } if(Math.floor(addminute) < 10 && Math.floor(addminute) != 0){
        setminutes = "0"+Math.floor(addminute)+":"

    }else {
        setminutes = Math.floor(addminute)+":"
    }
    if(Math.floor(totaltime.seconds - addseconds) < 10 && Math.floor(totaltime.seconds - addseconds) != 0){
        setseconds = "0"+Math.floor(totaltime.seconds - addseconds)
    } else {
        setseconds = Math.floor(totaltime.seconds - addseconds)
    }
    let finaltime = new Object()
    finaltime['days'] = setdays;
    finaltime['hours'] = sethours;
    finaltime['minutes'] = setminutes;
    finaltime['seconds'] = setseconds;
    //console.log(finaltime)
    returning = "Server has been online for:"+finaltime.days+finaltime.hours+finaltime.minutes+finaltime.seconds
    console.log(returning);
    return returning;
}