http = require('http');
pm2 = require('pm2');
fs = require('fs');
var path = require('path');
const { defaults } = require('request');
var filename = path.basename(__dirname);
sitestatus = true; //this is what the wensiote website will start as



function sendtomaster(data){
  process.send({ //this is just example, boiletplate for future apps
    type : 'process:msg',
    data : {
      app : filename,
      msg : data
    }
  })
}
/*
function pm2bussi(){ //pm2launchbus to get data from clien to server
    console.log("bus active");
    pm2.launchBus(function(err, pm2_bus) {
        pm2_bus.on('process:msg', function(packet) {
          console.log(process.env)
          if(process.name == filename){
            console.log("ignore")
            return;
          } else {
            console.log("pm2 bus else")
            appdata = packet.data.app + " : " + packet.data.msg
            bussifunctions(appdata)
          }
        })
        if(err){
            console.log(err);
        }
    })
}

function bussifunctions(appdata){
    if(appdata.includes("button1")){
        console.log("Server button 1")

        return "button1";
    }
    else {
        //console.log("appdata" + appdata)
        
        asmessage = filtercommand(appdata)
        return asmessage;
        
        //console.log("Something else")
    };
};

function findpm2match(){
  let list = pm2.list()

  return //true or false
}
*/
function filtercommand(appdata){ 
    //console.log("outcommand")
    console.log("appdata " + appdata); //appdata gives server + the button pressed | Ticker : Test 
    return "end."
}

function Test(){
  console.log("clicked")
  return "return"
}

function setsite(sitestatus){ //dont remember what this was originally used for
  console.log("setsite " + sitestatus)
  return sitestatus
}

function functionloader(msg){
  const defaults = msg.includes("/style.css") || msg.includes("/main.js") || msg.includes("/func.js") || msg.includes("/favicon.ico")
  
  //here need to initialize server status var
  
  if(defaults === true){ //html requests these whenever its loaded, so just ignoring them
    return
  }
  if(msg.includes("/Test?")){ //test button
    Test();
    sendtomaster("Test");
    return
  }
  if(msg.includes("/Main%20request?")){ //test button to try communication
    sendtomaster("button1") //specified in main server to do nothing but log
    console.log("call server")
    return
  }
  if(msg.includes("/maintanance") && sitestatus === true){
    sitestatus = false;
    sendtomaster("Under maintanance")
    //console.log("site to false")
    return
  }
  if(msg.includes("/maintanance") && sitestatus === false){
    sitestatus = true
    sendtomaster("Back to normal")
    //console.log("site to true")
    return
  }
  
  else {
    console.log("msg: " + msg); //else, for everything else that isnt stated yet
    sendtomaster(msg)
    return
  }
}

function loadwebsite(){
  html = fs.readFile('./depositories/Ticker/index.html', function(err, html){
    if(err){
      throw err;
    }
    return html
  })
  fs.close;
  css = fs.readFile('./depositories/Ticker/style.css', function(err, css){
    if(err){
      throw err;
    }
    return css
  })
  fs.close;
}

function loadmaintanance(){
  html1 = fs.readFile('./depositories/Ticker/maintanance.html', function(err, html1){
    if(err){
      throw err;
    }
    return html1
  })
  fs.close;
}

app = fs.readFile('./depositories/Ticker/index.html', function (err, html) {
  if (err) {
      console.log(err)
      throw err;  
  }

  http.createServer(function(request, response) {
    var msg = request.url
    functionloader(msg)
    console.log("sitestatus: " + sitestatus)
    //setsite(sitestatus);


    if(sitestatus === false){ //if requested and is under maintanance
      loadmaintanance();
      response.writeHead(200, {"Content-Type": "text/html"});  
      console.log("site under maintanance")
      response.write(html1)
      response.end();
      delete(request);

    }
    if(sitestatus === true){ //requested and all is normal
      loadwebsite()
      response.writeHead(200, {"Content-Type": "text/html"});  
      response.write(html);
      response.end();
      delete(request);

    }
    response.end();
    msg = " ";
    delete(request);


  }).listen(3001);
});

// Console will print the message
console.log('App running at http://127.0.0.1:3001/');
sendtomaster("online")

