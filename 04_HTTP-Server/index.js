const http = require('http')

const server = http.createServer(function(req, res) {
    console.log(`I am incoming request`)
    // db.. operations here

    res.writeHead(200);
    res.end('Thanks for visiting my server');
});

server.listen(8000, function() {
    console.log(`Https server is up and running on port 8000`);
})