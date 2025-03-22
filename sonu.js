let gameSequence = [];
let userSequence = [];
let colors = ["red", "yellow", "purple", "green"];
let started = false;
let level = 0;
let score = 0;

document.addEventListener("keydown", function () {
    if (!started) {
        started = true;
        level = 0;
        score = 0;
        gameSequence = [];
        updateScore(0);  
        nextSequence();
    }
});
function flashButton(color) {
    let btn = document.getElementById(color);
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 300);
}
function updateScore(newScore) {
    document.getElementById("score-title").innerText = `Score: ${newScore}`;
}
function nextSequence() {
    userSequence = [];
    level++;
    document.getElementById("level-title").innerText = `Level ${level}`;

    let randomColor = colors[Math.floor(Math.random() * 4)];
    gameSequence.push(randomColor);

    setTimeout(() => {
        flashButton(randomColor);
    }, 500);
}
function handleUserClick() {
    let clickedColor = this.id;
    userSequence.push(clickedColor);
    flashButton(clickedColor);

    if (userSequence[userSequence.length - 1] !== gameSequence[userSequence.length - 1]) {
        gameOver();
        return;
    }

    if (userSequence.length === gameSequence.length) {
        score += 10;  
        updateScore(score);  
        setTimeout(nextSequence, 1000);
    }
}

function gameOver() {
    document.getElementById("level-title").innerText = "Game Over! Press any key to restart.";
    document.body.style.backgroundColor = "red";
    setTimeout(() => {
        document.body.style.backgroundColor = "white";
    }, 200);
    started = false;
}


document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", handleUserClick);
});
