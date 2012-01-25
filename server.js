
var http = require('http');

var serve = function (path, response, content_type) {
    require('fs').readFile(path, function(error, content) {
        if (error) {
        }
        else {
            response.writeHead(200, {"Content-Type": content_type ? content_type : "text/xml"});
            response.end(content, 'utf-8');
        }
    });
}

var redirect = function (path, response) {
    response.writeHead(302, {'Location': path});
    response.end();
    }

var server = http.createServer(function (request, response) {
        var pathname = require('url').parse(request.url).pathname;
        console.log(pathname);
        if (pathname == '/voice') {
            serve('./voice', response);
        }
        else if (pathname == '/pin') {
            var digits = require('querystring').parse(request.url).Digits;
            // ... Check for valid pin code
            if (digits) {
                console.log("Digits: " + digits);
                if (digits == '4321') {
                    serve('./code_ok', response);
                }
                else if (digits == '42424242') {
                    serve('./record', response);
                }
                else {
                    serve('./code_error', response);
                }
            }
            else {
                serve('./code_error'); 
            }
        }
        else if (pathname == '/new_recording') {
            var recordingUrl = require('querystring').parse(request.url).RecordingUrl;
            console.log("New recording: " + recordingUrl); 
            redirect('/voice', response);
        }
        else {
            match = new RegExp(/\/(.*\.wav)$/).exec(pathname);
            if (match) {
                serve(match[1], response, 'audio/wav');
            }
        }
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8080);
//
// // Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");
