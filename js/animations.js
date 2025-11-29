const STATE_START = 'START';
const STATE_PLAYING = 'PLAYING';
const STATE_GAMEOVER = 'GAMEOVER';

let gameState = STATE_START;
let score = 0;
let gameLoop;

const mario = document.getElementById('mario-character');
const barrel = document.getElementById('killer-barrel');
const scoreText = document.getElementById('arcade-score');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const finalScoreText = document.getElementById('final-score');

let barrelScored = false;
let barrelSpeed = 3;      
let minSpeed = 1.2;       
let speedIncrease = 0.25;

barrel.addEventListener("animationiteration", () => {

    barrelScored = false;

    if (barrelSpeed > minSpeed) {
        barrelSpeed -= speedIncrease;
    }

    barrel.style.animation = "none";
    barrel.offsetHeight; 
    barrel.style.animation = `move-barrel ${barrelSpeed}s linear infinite`;
});

function handleInput(event) {
    if (event) event.stopPropagation();

    if (gameState === STATE_START) return initGame();
    if (gameState === STATE_PLAYING) return playerJump();
}

function initGame() {
    gameState = STATE_PLAYING;

    startScreen.style.display = "none";
    gameOverScreen.style.display = "none";
    gameOverScreen.classList.remove("hidden");

    score = 0;
    barrelScored = false;
    barrelSpeed = 3;

    scoreText.innerText = "0000";

    resetBarrelPosition();

    clearInterval(gameLoop);
    gameLoop = setInterval(gameTick, 15);
}

function playerJump() {
    if (mario.classList.contains("jump-now")) return;

    mario.classList.add("jump-now");
    setTimeout(() => mario.classList.remove("jump-now"), 550);
}
function gameTick() {
    if (gameState !== STATE_PLAYING) return;

    checkCollision();
    checkBarrelScore();
}

function checkBarrelScore() {
    const b = barrel.getBoundingClientRect();
    const m = mario.getBoundingClientRect();

    if (b.left > m.right && !barrelScored) {
        score++;
        scoreText.innerText = String(score).padStart(4, "0");
        barrelScored = true;
    }
}
function checkCollision() {
    const m = mario.getBoundingClientRect();
    const b = barrel.getBoundingClientRect();

    const overlapX = b.right > m.left + 20 && b.left < m.right - 20;
    const overlapY = m.bottom > b.top + 20;

    if (overlapX && overlapY) triggerGameOver();
}


function triggerGameOver() {
    gameState = STATE_GAMEOVER;

    clearInterval(gameLoop);
    barrel.style.animation = "none";
    barrel.style.opacity = "0";
    barrel.style.left = "-120px"; 

    finalScoreText.innerText = String(score).padStart(4, "0");

    gameOverScreen.style.display = "flex";
}

function resetGame(event) {
    if (event) event.stopPropagation();
    barrel.style.animation = "none";
    barrel.style.opacity = "0";
    barrel.style.left = "-120px";

    initGame();
}

function resetBarrelPosition() {
    barrel.style.opacity = "1";
    barrel.style.left = "";  

    barrel.style.animation = "none";
    barrel.offsetHeight;
    barrel.style.animation = `move-barrel ${barrelSpeed}s linear infinite`;
}

document.addEventListener("keydown", (event) => {
    if (event.code === "Space" || event.code === "ArrowUp") {
        event.preventDefault();

        if (gameState === STATE_START) return initGame();
        if (gameState === STATE_GAMEOVER) return resetGame();
        if (gameState === STATE_PLAYING) return playerJump();
    }
});
