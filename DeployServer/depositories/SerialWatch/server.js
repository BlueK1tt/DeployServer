//Server to use SerialPort.io to listen device serial and send data forward
const { SerialPort } = require('serialport')
const Readline = require('@serialport/parser-readline');
const http = require('node:http'); //http module
const fs = require('fs'); //filesystem
const pm2 = require('pm2');
const os = require('node:os')
var path = require('path');

const config = require('./config.json'); //custom configurations file for secret info
const { parse } = require('node:path');

var thisfilename = path.basename(__dirname); //gets this files name
const hostname = config.hostname;
const port = config.netport;

function startup(){
    console.log('Server running at ' + hostname +':' + port);
    pm2bussi();
    return;
};

function pm2packetprocess(packet){ //filter incoming data from pm2 socket
    //process packets coming in and return data if for this server
    packetdataapp = JSON.stringify(packet.data.app);
    let destinationsender = packetdataapp.split(":"); //0=to, 1=from
    //console.log(thisfilename)
    //console.log(destinationsender[0])
    if(!destinationsender[0].includes(thisfilename)){
        //console.log("not for this server")
        return false
    } else {
        //console.log("For this server")
        return true
    }
};

function pm2bussi(){ //pm2launchbus to get data from client to server
    console.log("bus active");
    pm2.launchBus(function(err, pm2_bus) {
      //console.log("launched bus")
        pm2_bus.on('process:msg', function(packet) {
            processthis = pm2packetprocess(packet) //0 to, 1 from, 2 msg
            appdata = packet.data.app + " : " + packet.data.msg
            //console.log("before bus if")
            if(processthis === true){
              //console.log("process this")
              bussifunctions(appdata)
              return;
            }
            if(processthis === false){
              //console.log("dont process this")
              return
            } else {
              console.log("processthis error")
            }
        })
        if(err){
          console.log("bus error")
            console.log(err);
            return;
        }
    })
};

function bussifunctions(appdata){
    if(appdata.includes("activate")){
        console.log("Clicked website button")

        return "activate";
    }
    else {
        console.log("appdata: " + appdata)
        
        //console.log("Something else")
        return;
        
    };
};

const isFile = fileName => { //function to test if file exists
    return fs.lstatSync(fileName).isFile();
};

function sendtomaster(destination, data){
  let destinationsender = destination +":"+ thisfilename
  process.send({ //this is just example, boiletplate for future apps
    type : 'process:msg',
    data : {
      app : destinationsender,
      msg : data
    }
  })
};


function getoperatingsystem(){
  //function to get the operating system the device is running on, windows, linux, mac etc..
  //becasue the name of the seriaport and naming convention matters for it
  runningoperatingsstem = os.platform();

  return runningoperatingsstem;
}


function setoperatingsystem(){
  runningos = getoperatingsystem();

  if(runningos = "linux"){
    console.log("linux")
    //return something tty
    return "linux" 
  }
  if(runningos = "win32"){
    //return something COM
    console.log("windows")
    
    return "windows"
  }
  if(runningos = "aix"){ //IBM
    console.log("IBM Aix")
    return "aix";
  }
  if(runningos = "darwin"){ //macOS base
    console.log("MacOS Darwin")
    return "darwin";
  }
  if(runningos = "freebsd"){
    console.log("FreeBSD")
    return "freebsd";
  }
  if(runningos = "openbsd"){
    console.log("openBSD")
    return "openbsd";
  }
  if(runningos = "sunos"){ //SunOS
    console.log("SunOS")
    return "sunos";
  }
  else {
    return;
  }

}
const parser = new Readline.ReadlineParser()
const serport = new SerialPort({

  //need way to check what operating system devide is running.
  //and dependent on it, do if/else and choose correct "path" or serialport identificator

  path: '/dev/ttyS0', //need to find way to iterate, but starting with 0
  baudRate: 115200,
  parser: parser

});
//const parser = serport.pipe(new Readline({ delimiter: '\n' }));// Read the port data


serport.on("open", () => {
  console.log('serial port open');
});

parser.on('data', data =>{
  console.log('got word from serialport:', data);
});



function SerialStream(){
  //need to create open data stream to listen to the seril port after identifying


  //constructor SerialPortStream

  
  //open


  //error


  //close

  
  //data


  //drain


}

const requestListener = function(request, response){
    var message = request.url;


}
  
  const server = http.createServer(requestListener)
  server.listen(port, hostname, () => {
    startup();
    sendtomaster("SerialWatch","online")
    setoperatingsystem();
    console.log(SerialPort.list());
});