const http = require('node:http')

const server = http.createServer(function(req, res) {
    console.log(`incoming request at [${Date.now()}]`);
    // console.log(req.method)
    console.log(req.url);

    // send response
    switch(req.url) {
        case '/':
            return res.end(`Homepage`);
            res.writeHead(200)
            break
        case '/contact-us':
            return res.end(`Contact me at mahboob.dev01@gmail.com`);
            res.writeHead(200)
            break
        case '/about':
            return res.end(`I am a software engineer`)
            res.writeHead(200)
            break;
        default:
            res.writeHead(404);
            res.end(`you are lost`);

    }


});

server.listen(8000, () => {
    console.log(`Server is running on PORT: 8000`)
});
