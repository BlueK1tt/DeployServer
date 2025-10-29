//command to check how long server has been up
const { diff } = require("util");
let { timenow } = require("../server");
//var oldreqtime = null; //just as start when there is not last request
console

module.exports =  {
    data: uptime()

};

function uptime() {
    let currenttime = new Date();
    let currenttimestr = JSON.stringify(currenttime)

    let oldtimestr = JSON.stringify(timenow)
    //console.log(JSON.stringify(timenow)); // server start time
    console.log(oldtimestr)
    let cutobject = oldtimestr.slice(11,-1)
    let oldobj = JSON.parse(cutobject)
    let cleannewtime = currenttimestr.slice(1,-6)

    let oldsplit = oldobj.split("T") //0 = date, 1 = time
    var newsplit = cleannewtime.split("T")
    var oldcleantime = oldsplit[1].slice(0,-5)
    console.log(oldcleantime)
    console.log(newsplit[1])
    
    let timeobj = timeobjects(oldcleantime, newsplit)
    let timediff = difference(timeobj[0], timeobj[1])
    console.log(timediff)
    return "Server has been online for:";
}

function timeobjects(oldcleantime, newsplit){
    console.log("timeobject")
    //oldtime and newtime strings cut and split into object
    let newtimesplit = newsplit[1].split(":")
    let newsection = new Object
    newsection['hours'] = newtimesplit[0]
    newsection['minutes'] = newtimesplit[1]
    newsection['seconds'] = newtimesplit[2]
    //console.log(newsection)

    let oldtimesplit = oldcleantime.split(":")
    let oldsection = new Object
    oldsection['hours'] = oldtimesplit[0]
    oldsection['minutes'] = oldtimesplit[1]
    oldsection['seconds'] = oldtimesplit[2]
    //console.log(oldsection)


    return [newsection, oldsection]; 
}

function difference(newsection, oldsection){
    console.log("difference ")
    //console.log(oldsection) //when the server was started
    //console.log(newsection) //

    return "Server has been online for:";
}