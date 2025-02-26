http = require('node:http');
pm2 = require('pm2');
var path = require('path')

var filename = path.basename(__dirname);

app = function (request, response) {
   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/html
   response.writeHead(200, {'Content-Type': 'text/html'});
  
   // Send the response body as "Hello World"
   response.end('<h2 style="text-align: center;">Hello World</h2>');

   
};

server = http.createServer(app);
server.listen(3000);


process.send({
   type : 'process:msg',
   data : {
     app : filename,
     msg : "Hello World!"
   }
 })
 
// Console will print the message

console.log('App running at http://127.0.0.1:3001/');