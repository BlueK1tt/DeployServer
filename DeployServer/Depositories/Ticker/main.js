http = require('node:http');
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

app = fs.readFile('./Depositories/Ticker/index.html', function (err, html) {
  if (err) {
      throw err; 
  }
  fs.close;
  http.createServer(function(request, response) {  
      response.writeHeader(200, {"Content-Type": "text/html"});  
      response.write(html);  
      response.end();
  }).listen(3001);
  sendtomaster("success")
});
// Console will print the message
console.log('App running at http://127.0.0.1:3001/');
