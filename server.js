
var http = require('http');
var fs = require('fs');

var server = http.createServer(function (request, response) {
        fs.readFile('./voice', function (error, content) {
            if (error) {
            }
            else {
                response.writeHead(200, {"Content-Type": "text/xml"});
                response.end(content, 'utf-8');
            }
        });
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8080);
//
// // Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");
