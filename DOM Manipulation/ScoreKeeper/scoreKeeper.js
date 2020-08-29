var p1Btn = document.querySelector("#p1");
var p2Btn = document.querySelector("#p2");
var resestBtn = document.querySelector("#reset");
var p1Dspl = document.querySelector("#p1Display");
var p2Dspl = document.querySelector("#p2Display");
var maxScoreInput = document.querySelector("input");
var maxScoreDspl = document.querySelector("#maxScore");
var maxScore = 5;
var p1Score = 0;
var p2Score = 0;
var gameOver = false;

p1Btn.addEventListener("click", function(){
    if(!gameOver) {
        p1Score++;
        if (p1Score === maxScore) {
            gameOver = true;
            p1Dspl.classList.toggle("winner");
        }
        p1Dspl.textContent = p1Score;
    }
})

p2Btn.addEventListener("click", function(){
    if(!gameOver) {
        p2Score++;
        if (p2Score === maxScore) {
            gameOver = true;
            p2Dspl.classList.toggle("winner");
        }
        p2Dspl.textContent = p2Score;
    }
})

resestBtn.addEventListener("click", resetGame);

maxScoreInput.addEventListener("change", function(){
    maxScore = Number(maxScoreInput.value);
    maxScoreDspl.textContent = maxScore;
    resetGame();
})

function resetGame() {
    p1Score = 0;
    p2Score = 0;
    p1Dspl.textContent = p1Score;
    p2Dspl.textContent = p2Score;
    p1Dspl.classList.remove("winner");
    p2Dspl.classList.remove("winner");
    gameOver = false;
}