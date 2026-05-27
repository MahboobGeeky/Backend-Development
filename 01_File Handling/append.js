const fs = require('node:fs')  // ('fs') -> both correct

fs.appendFile('data.txt', '\n new line added', (err) => {
    if(err){
        console.log(err)
        return;
    }
    console.log("successfully")
})