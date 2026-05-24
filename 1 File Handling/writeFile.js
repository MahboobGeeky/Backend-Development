const fs = require('fs');

const arg = "this is a file written through aguments"
fs.writeFile('data.txt', arg, (err) => {
    if(err){
        console.log(err)
        return;
    }
    console.log("writing file from js")
})
