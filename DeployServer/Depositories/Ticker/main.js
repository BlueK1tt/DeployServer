http = require('http');
pm2 = require('pm2');
fs = require('fs');
var path = require('path');
const { defaults } = require('request');
var filename = path.basename(__dirname);

function sendtomaster(data){
  process.send({ //this is just example, boiletplate for future apps
    type : 'process:msg',
    data : {
      app : filename,
      msg : data
    }
  })
}

function Test(){
  console.log("clicked")
  return "return"
}
function functionloader(msg){
  const defaults = msg.includes("/style.css") || msg.includes("/main.js") || msg.includes("/func.js") || msg.includes("/favicon.ico")
  if(defaults === true){ //html requests these whenever its loaded, so just ignoring them
    return
  }
  if(msg.includes("/Test?")){ //test button
    Test();
    return
  }
  if(msg.includes("/Main%20request?")){ //test button to try communication
    sendtomaster("button1")
    console.log("call server")
    return
  }
  else {
    console.log("msg: " + msg); //else, for everything else that isnt stated yet
    return
  }
}

function loadwebsite(){
  html = fs.readFile('./Depositories/Ticker/index.html', function(err, html){
    if(err){
      throw err;
    }
    return html
  })
  fs.close;
  css = fs.readFile('./Depositories/Ticker/style.css', function(err, css){
    if(err){
      throw err;
    }
    return css
  })
  fs.close;
}
app = fs.readFile('./Depositories/Ticker/index.html', function (err, html) {
  if (err) {
      throw err;  
  }
  http.createServer(function(request, response) {
      var msg = request.url
      functionloader(msg)
      loadwebsite()
      response.writeHead(200, {"Content-Type": "text/html"});  
      response.write(html);
      response.end();
      msg = " ";
      delete(request);
  }).listen(3001);
});

// Console will print the message
console.log('App running at http://127.0.0.1:3001/');
sendtomaster("online")