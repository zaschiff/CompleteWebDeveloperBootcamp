var game = {}

game.init = function(){
    // mode button event listeners
    setupModeButtons();

    // set up square
    setupSquares();

    // reset the board with the colors
    reset();

    // set up the reset button
    resetButton.addEventListener("click", function(){
        reset();
    });
}

game.init();

var numSquares = 6
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");


function changeColors(color) {
    for ( var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateColors(maxNumberColors) {
    // make an array
    var arr = [];

    // repeat num times
    for (var i = 0; i < maxNumberColors; i++) {
        // get random color and push into array 
        arr.push(randomColor());
    }

    // return the array
    return arr;
}   

function randomColor() {
    // pick a "red" amount
    var r = Math.floor(Math.random() * 256);

    // pick a "green" amount
    var g = Math.floor(Math.random() * 256);

    // pick a "blue" amount
    var b = Math.floor(Math.random() * 256);

    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function reset() {
    // generate all new colors
    colors = generateColors(numSquares);
    // pick a new random color form array
    pickedColor = pickColor();

    // change color display to match pickded color
    colorDisplay.textContent = pickedColor;

    // change colors of squares
    for (var i = 0; i < squares.length; i++) {
        if(colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }

    resetButton.textContent = "New Colors";
    h1.style.backgroundColor = "steelblue";
    messageDisplay.textContent= "";
}

function setupModeButtons() {
    for (var i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
            reset();
        });
    }
}

function setupSquares() {
    for (var i = 0; i < squares.length; i++) {
        // add click listener to squares
        squares[i].addEventListener("click", function() {
            // grab color of clicked square
            var clickedColor = this.style.backgroundColor;
    
            // compare color to picked square
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
                resetButton.textContent = "Play again?";
            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again";
            }
        });
    }
}

// easyButton.addEventListener("click", function(){
//     hardButton.classList.remove("selected");
//     easyButton.classList.add("selected");
//     numSquares = 3;
//     colors = generateColors(numSquares);
//     pickedColor = pickColor();
//     colorDisplay.textContent = pickedColor;
//     for (var i = 0; i < squares.length; i++) {
//         if(colors[i]) {
//             squares[i].style.backgroundColor = colors[i];
//         } else {
//             squares[i].style.display = "none";
//         }
//     }
// });

// hardButton.addEventListener("click", function(){
//     easyButton.classList.remove("selected");
//     hardButton.classList.add("selected");
//     numSquares = 6;
//     colors = generateColors(numSquares);
//     pickedColor = pickColor();
//     colorDisplay.textContent = pickedColor;
//     for (var i = 0; i < squares.length; i++) {
//         squares[i].style.backgroundColor = colors[i];
//         squares[i].style.display = "block";
//     }
// });