
module.exports = {
    data: joulu()
}


//kuinka monta päivää jouluun
function joulu(){
    //get the date of today
    let currenttime = new Date();
    let currenttimestr = JSON.stringify(currenttime)

    //split the thing again to date and time
    let cleannewtime = currenttimestr.slice(1,-6)
    //console.log(cleannewtime)
    let newsplit = cleannewtime.split("T")
    let datenow = newsplit[0]
    let timenow = newsplit[1]

    //for time, calculate how much till next day, return hours, minutes and seconds
    //console.log(timenow)
    let thistime = timenow.split(":")
    let hourdiff = 24 - thistime[0]
    let minutediff = 60 - thistime[1]
    let secondsdiff = 60 - thistime[2]

    let hourstochrist = hourdiff != 0? (hourdiff)-3 : 0;
    let minutestochrist = minutediff != 0 ?(minutediff) : 0;
    let secondstochrist = secondsdiff != 0 ?(secondsdiff) : 0;

    //for date, calculate how many days and montsh its till next 24/12 -christmas
    let thisdate = datenow.split("-") //0 year, 1 month, 2 day
    let monthdiff = 12 -thisdate[1]
    let daydiff = 24 - thisdate[2]
    
    let daystochrist = daydiff != 0 ? (daydiff - 1) : 0 ;
    let monthstochrist = monthdiff != 0 ? (monthdiff) : 0;
    //if its christmas, just return, "its christmas!"

    let tillchristmas = new Object
    tillchristmas['months'] = monthstochrist
    tillchristmas['days'] = daystochrist
    tillchristmas['hours'] = hourstochrist
    tillchristmas['minutes'] = minutestochrist
    tillchristmas['seconds'] = secondstochrist

    if(tillchristmas.months == 0 && tillchristmas.days == 0){
        return "It's Christmas today!"
    } else {
        let returnmsg = "It's "+monthstochrist+" months,"+daystochrist+" days,"+hourstochrist+" hours,"+minutestochrist+" minutes and "+secondstochrist+" seconds till Christmas!"    
        //console.log(returnmsg)
        return returnmsg
    }
    return "joulu"
}