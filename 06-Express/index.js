const express = require('express')

const app = express();

app.get('/', function(req, res){
    res.end('Homepage');
});

app.get('/contact-us', function(req, res){
    res.end('You can contact me at my email id : mahboob9184@gmail.com');
});

// by default status code : 200

app.post('/tweets', (req,res)=>{
    res.status(201).end('Tweet created success'); // custom status code

});

app.get('/tweets', (req,res)=>{
    res.end('Here are your tweets');
});


app.listen(8000, ()=> {
    console.log("Server is running on port: 8000")
});