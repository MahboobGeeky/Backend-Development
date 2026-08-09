const http = require('node:http');
const fs = require('node:fs');
const server = http.createServer(function(req,res){
    const method = req.method;
    const path = req.url;

    // make log and save in log.txt text file
    const log = `\n[${Date.now()}]: ${method} ${path}`;
    fs.appendFileSync('log.txt', log, 'utf-8');

    switch(method) {
        case 'GET': {
            switch(path){
                case '/':
                    return res.writeHead(200).end('Hello form the server👋');
                case '/contact':
                    return res.writeHead(200).end('email: mahboob9184@gmail.com and Name: Mahboob')
                case '/tweet':
                    return res.writeHead(201).end('tweet-1\ntweet-2');
            }
        }
        break;
        case 'POST': {
            switch(path){
                case '/tweet':
                    return res.writeHead(201).end('Your tweet was created');
            }
        }
    }

    return res.writeHead(404).end('Your are lost men!')

});

server.listen(8000, ()=> {
    console.log(`server is running at 8000`)
});