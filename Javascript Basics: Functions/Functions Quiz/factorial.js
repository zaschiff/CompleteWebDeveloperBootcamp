// Simple script to do a factorial if input provided.blurb
function factorial(x) {
    var fact = 1;
    for(i = x; i > 0;i--) {
        fact *= i;
    }
    return fact;
}

console.log(factorial(5));
console.log(factorial(2));
console.log(factorial(10));
console.log(factorial(0));