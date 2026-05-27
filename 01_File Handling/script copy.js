// how to read file


// 1. [Sync] => Blocking Operations
const fs = require('fs')

console.log('start of script')

const content = fs.readFileSync('data.txt', 'utf-8')
console.log('Contents', content);
 
console.log('end of script')



// 2. [Async] => Non Blocking

// const fs = require('fs')

fs.readFile("data.txt", 'utf-8', function(err, data) {
    if(err) console.log(err)
    else console.log(data)
});










