//command to check how long server has been up
let { timenow } = require("../server");

module.exports =  {
    data: uptime()
};

function cleanoldtime(){
    var timestart = JSON.stringify(timenow)//variable from server start
    console.log("timestart"+timestart)
    var timestr = timestart.slice(1,-1);
    var timereplc = timestr.slice(10)
    console.log(timereplc)
    var cleanedtime = timereplc.replaceAll('"','');
    var cuttime = cleanedtime.slice("T");
    console.log(cuttime)
    return cuttime
}

function uptime() {
    let currenttime = new Date();
    let currenttimestr = JSON.stringify(currenttime)
    let oldtimestr = JSON.stringify(timenow)


    let cutobject = oldtimestr.slice(11,-1)
    let oldobj = JSON.parse(cutobject)
    let cleannewtime = currenttimestr.slice(1,-6)

    let oldsplit = oldobj.split("T") //0 = date, 1 = time
    var newsplit = cleannewtime.split("T")
    var oldcleantime = oldsplit[1].slice(0,-5)

    let timeobj = timeobjects(oldcleantime, newsplit)
    return timeobj
}

function timeobjects(oldcleantime, newsplit){
    //oldtime and newtime strings cut and split into object
    let newtimesplit = newsplit[1].split(":")
    let newsection = new Object
    newsection['hours'] = newtimesplit[0]
    newsection['minutes'] = newtimesplit[1]
    newsection['seconds'] = newtimesplit[2]

    let oldtimesplit = oldcleantime.split(":")
    let oldsection = new Object
    oldsection['hours'] = oldtimesplit[0]
    oldsection['minutes'] = oldtimesplit[1]
    oldsection['seconds'] = oldtimesplit[2]

    let diffhour = newsection.hours - oldsection.hours 
    let diffmin = newsection.minutes - oldsection.minutes
    let diffsec = newsection.seconds - oldsection.seconds //still gives wrong value, due sometimes being - 

    let returnhours = diffhour > 0 ? diffhour + (diffhour == 1 ? " hour, " : " hours, ") : "";
    let returnmins = diffmin > 0 ? diffmin + (diffmin == 1 ? " minute, " : " minutes, ") : "";
    let returnsecs = diffsec > 0 ? diffsec + (diffsec == 1 ? " second, " : " seconds, ") : "";
    let returncombined = "Server has been online for,"+returnhours+returnmins+returnsecs
    console.log(returnhours+returnmins+returnsecs)
    return returncombined
}