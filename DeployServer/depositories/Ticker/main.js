http = require('http');
pm2 = require('pm2');
fs = require('fs');
var path = require('path');
var thisfilename = path.basename(__dirname);
sitestatus = true; //this is what the wensiote website will start as

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

function pm2packetprocess(packet){
    //process packets coming in and return data if for this server
    packetdataapp = JSON.stringify(packet.data.app);
    let destinationsender = packetdataapp.split(":");
    //console.log(thisfilename)
    //console.log(destinationsender[0])
    if(!destinationsender[0].includes(thisfilename)){
        console.log("not for this server")
        return false
    } else {
        console.log("For this server")
        return true
    }
}


function pm2bussi(){ //pm2launchbus to get data from clien to server
    console.log("bus active");
    pm2.launchBus(function(err, pm2_bus) {
      console.log("launche bus")
        pm2_bus.on('process:msg', function(packet) {
            processthis = pm2packetprocess(packet) //0 to, 1 from, 2 msg
            appdata = packet.data.app + " : " + packet.data.msg
            console.log("before bus if")
            if(processthis === true){
              console.log("process this")
              bussifunctions(appdata)
              return;
            }
            if(processthis === false){
              console.log("dont process this")
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
}


function bussifunctions(appdata){
    if(appdata.includes("button1")){
        console.log("Server button 1")

        return "button1";
    }
    else {
        console.log("appdata" + appdata)
        
        asmessage = filtercommand(appdata)
        return asmessage;
        
        console.log("Something else")
    };
};

function filtercommand(appdata){ 
    console.log("outcommand")
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
  if(!msg.includes("/maintanance") && sitestatus == false){
    return "maintanance"
  }
  if(msg.includes("/maintanance") && sitestatus === true){
      sitestatus = false;
      sendtomaster("DeployServer","Under maintanance")
      //console.log("site to false")
      return
    }
    if(msg.includes("/maintanance") && sitestatus === false){
      sitestatus = true
      sendtomaster("DeployServer","Back to normal")
      //console.log("site to true")
      return;
  } else {
    if(defaults === true){ //html requests these whenever its loaded, so just ignoring them
      return
    }
    if(msg.includes("/Test?")){ //test button
      Test();
      sendtomaster("DeployServer","Test");
      return
    }
    if(msg.includes("/joulu")){
      sendtomaster("DeployServer","joulu")
      console.log("joulu")
      return;
    }
    if(msg.includes("/Main%20request?")){ //test button to try communication
      sendtomaster("DeployServer","button1") //specified in main server to do nothing but log
      console.log("call server")
      return
    }
    
    if(msg == "/"){
      //just "home"
      return;
    }
    else {
      console.log("msg: " + msg); //else, for everything else that isnt stated yet
      sendtomaster("DeployServer",msg)
      return;
    }
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
    
    //console.log("sitestatus: " + sitestatus)
    //setsite(sitestatus);


    if(sitestatus === false){ //if requested and is under maintanance
      loadmaintanance();
      response.writeHead(200, {"Content-Type": "text/html"});  
      console.log("site under maintanance")
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
sendtomaster("DeployServer","online")

