http = require('node:http');
pm2 = require('pm2');
fs = require('fs');
var path = require('path')

var filename = path.basename(__dirname);



// The string stores the name of files added till now 
var filesAdded = '';  
  
// For loading JS file 
function loadJS(){  
  
    // Gives -1 when the given input is not in the string 
    // i.e this file has not been added 
      
    if(filesAdded.indexOf('script.js') !== -1) 
        return
          
    // Head tag 
    var head = document.getElementsByTagName('head')[0]  
      
    // Creating script element 
    var script = document.createElement('script')  
    script.src = 'script.js'
    script.type = 'text/javascript'
      
    // Adding script element 
    head.append(script)  
      
     // Adding the name of the file to keep record 
    filesAdded += 'script.js'
} 
  
// To load CSS file 
function loadCSS() {  
  
    if(filesAdded.indexOf('styles.css') !== -1) 
        return
  
    var head = document.getElementsByTagName('head')[0] 
      
    // Creating link element 
    var style = document.createElement('link')  
    style.href = 'styles.css'
    style.type = 'text/css'
    style.rel = 'stylesheet'
    head.append(style); 
      
    // Adding the name of the file to keep record 
    filesAdded += 'styles.css' 
}

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
app = fs.readFile('./Depositories/Ticker/index.html', function (err, html) {
  if (err) {
      throw err;  
  }       
  http.createServer(function(request, response) {  
    load
      response.writeHeader(200, {"Content-Type": "text/html"});  
      response.write(html);  
      response.end();
  }).listen(3001);
});

// Console will print the message
console.log('App running at http://127.0.0.1:3001/');
//sendtomaster("online")