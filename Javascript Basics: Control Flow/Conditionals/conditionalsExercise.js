var age = Number(prompt("How old are you?"));

if (age < 0){
    console.log("Come back when you are out of the womb");
}
else if (age === 21) {
    console.log("Happy 21st birthday!!");
}
else if (age % 2 !== 0) {
    console.log("Your age is odd!");
}
else if(age%(Math.sqrt(age))==0) {
    console.log("Perfect Square");
}