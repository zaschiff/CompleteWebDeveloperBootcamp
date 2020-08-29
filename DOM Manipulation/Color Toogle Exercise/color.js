var btn = document.querySelector("button");
// var body = document.querySelector("body");
// var isPurple = false;

btn.addEventListener("click", colorChange);

// function colorChange() {
//     if (isPurple) {
//         body.style.background = "white";
//     } else {
//         body.style.background = "purple";
//     }
//     isPurple = !isPurple
// }

function colorChange() {
    document.body.classList.toggle("purple");
}