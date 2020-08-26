var secretNumber = 4;
var num = Number(prompt("Guess a number?"));

if (num < secretNumber){
    alert("Too low. Try again.");
} else if (num > secretNumber) {
    alert("Too High. Try Again.")
} else {
    alert("You guessed it! Good Job!")
}