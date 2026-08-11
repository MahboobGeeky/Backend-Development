exports.myAddFunction = function add(a, b){
    return a + b;
};

function sub(a, b){
    return a - b;
}

function mul(a, b){
    return a * b;
}

function div(a, b){
    return a / b;
}
// export 
// 1. Named Export
// 2. Default Export

// default export
module.exports = function() {
    console.log('Hey, I am default');
};
