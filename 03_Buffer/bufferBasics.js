const {Buffer} = require("buffer");
const { merge } = require("node:stream/iter");

// const buf = Buffer.alloc(4); // allocate size->4
// console.log(buf);

// console.log(buf[1]);

// const buf = Buffer.from('Hello');
// console.log(buf);

// const bufTwo = Buffer.allocUnsafe(110);
// console.log(bufTwo);

// const buf = Buffer.alloc(10);
// buf.write('Hello')
// console.log(buf.toString());


// const buf = Buffer.from('Mahboob');
// console.log(buf.toString());
// console.log(buf.toString("utf-8", 0, 4)); // [start, end] -> substring


// const buf = Buffer.from('Coffee');
// console.log(buf.toString());
// console.log(buf)
// buf[0] = 0x4A
// console.log(buf)
// console.log(buf.toString());

// merging two buffers
const buf1 = Buffer.from("Chai aur")
const buf2 = Buffer.from(" code");
const merged = Buffer.concat([buf1, buf2]);
console.log(merged.toString())
console.log(merged.length)