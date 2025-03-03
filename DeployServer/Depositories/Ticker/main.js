http = require('node:http');
pm2 = require('pm2');
fs = require('fs');
var path = require('path')

var filename = path.basename(__dirname);

function sendtomaster(data){
  process.send({ //this is just example, boiletplate for future apps
    type : 'process:msg',
    data : {
<<<<<<< HEAD
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
=======
      app : data,
      msg : "Hello World!"
    }
  })
}

app = fs.readFile('./Depositories/Ticker/index.html', function (err, html) {
  if (err) {
      throw err; 
  }       
  http.createServer(function(request, response) {  
      response.writeHeader(200, {"Content-Type": "text/html"});  
      response.write(html);  
      response.end();
  }).listen(3001);
});




 
>>>>>>> 592693c2fda22dbbb3942f8f488c3879f035f6af
// Console will print the message
console.log('App running at http://127.0.0.1:3001/');
