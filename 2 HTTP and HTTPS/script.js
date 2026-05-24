// HTTP and HTTPS

const http = require('http');

const server = http.createServer(function(req, res){
    res.end("hello world");
})

server.listen(300);