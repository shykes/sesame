
var http = require('http');

var server = http.createServer(function (request, response) {
          response.writeHead(200, {"Content-Type": "text/xml"});
            response.end("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<Response><Say>Hello Coco Hello Coco Hello Coco</Say></Response>");
            });

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8080);
//
// // Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");
