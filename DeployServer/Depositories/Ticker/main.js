http = require('http');
pm2 = require('pm2');
fs = require('fs');
var path = require('path')

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


async function Test(){
  console.log("clicked")
  const element = document.getElementById("func");
  element.outerHTML = "<h1>PENIS!</h1>";
  return "return"
}

function functionloader(msg){
  console.log("Functionloader: " + msg)
  return "yo"
}

async function loadwebsite(){
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
      console.log("msg: "+ msg)
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