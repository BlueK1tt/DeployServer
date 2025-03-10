http = require('http');
pm2 = require('pm2');
fs = require('fs');
var path = require('path')

var filename = path.basename(__dirname);


/*function sendtomaster(data){
  process.send({ //this is just example, boiletplate for future apps
    type : 'process:msg',
    data : {
      app : filename,
      msg : data
    }
  })
}
*/
function Test(){
  console.log("clicked")
  const element = document.getElementById("demo");
  element.outerHTML = "<h1>PENIS!</h1>";
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
  fs.close;
  http.createServer(function(request, response) {  
      msg = request
      console.log("msg: "+ msg)
      loadwebsite()
      response.writeHead(200, {"Content-Type": "text/html"});  
      response.write(html);
      response.end();
  }).listen(3001);
});

// Console will print the message
console.log('App running at http://127.0.0.1:3001/');
//sendtomaster("online")