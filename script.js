var gameScreen = document.getElementById("snake");
const BOARD_WIDTH = 360;
const BOARD_HEIGHT = 600;
gameScreen.width = BOARD_WIDTH;
gameScreen.height = BOARD_HEIGHT;

var ctx = gameScreen.getContext("2d");

const snakeWidth = 20;
const snakeInitialSize = 4;
var score = 0;

class snakePart {
    constructor(xCord, yCord) {
        this.x = xCord;
        this.y = yCord;
    }
}

var snake = [new snakePart(20, 300)];
for (var i = 1; i < snakeInitialSize; i++)
    snake.push(new snakePart(20 * i, 300));

var head = snake[snake.length - 1];
var direction = 1;
const UP = 4;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;
var GAMEOVER = false;
//1 right, 2 down, 3 left, 4 up

function drawSnake() {
    ctx.fillStyle = "#FFFFFF";
    for (var i = 0; i < snake.length - 1; i++)
        ctx.fillRect(snake[i].x, snake[i].y, snakeWidth, snakeWidth);
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(snake[snake.length - 1].x, snake[snake.length - 1].y, snakeWidth, snakeWidth);
}

var food = new snakePart(
    (Math.floor((Math.random() * BOARD_WIDTH) / snakeWidth)) * snakeWidth,
    (Math.floor((Math.random() * BOARD_HEIGHT) / snakeWidth)) * snakeWidth
);

function newFood() {
    food = new snakePart(
        (Math.floor((Math.random() * BOARD_WIDTH) / snakeWidth)) * snakeWidth,
        (Math.floor((Math.random() * BOARD_HEIGHT) / snakeWidth)) * snakeWidth
    );
}


function moveSnake() {
    if (direction == RIGHT) {
        var newHead = new snakePart((head.x + snakeWidth) % BOARD_WIDTH, head.y);
        for (var i = 0; i < snake.length; i++) {
            if (newHead.x == snake[i].x && newHead.y == snake[i].y) {
                GAMEOVER = true;
                return;
            }
        }
        snake.push(newHead);
        head = snake[snake.length - 1];
    } else if (direction == DOWN) {
        var newHead = new snakePart(head.x, (head.y + snakeWidth) % BOARD_HEIGHT)
        for (var i = 0; i < snake.length; i++) {
            if (newHead.x == snake[i].x && newHead.y == snake[i].y) {
                GAMEOVER = true;
                return;
            }
        }
        snake.push(newHead);
        head = snake[snake.length - 1];
    } else if (direction == LEFT) {
        var newHead = new snakePart((head.x - snakeWidth + BOARD_WIDTH) % BOARD_WIDTH, head.y)
        for (var i = 0; i < snake.length; i++) {
            if (newHead.x == snake[i].x && newHead.y == snake[i].y) {
                GAMEOVER = true;
                return;
            }
        }
        snake.push(newHead);
        head = snake[snake.length - 1];
    } else if (direction == UP) {
        var newHead = new snakePart(head.x, (head.y - snakeWidth + BOARD_HEIGHT) % BOARD_HEIGHT)
        for (var i = 0; i < snake.length; i++) {
            if (newHead.x == snake[i].x && newHead.y == snake[i].y) {
                GAMEOVER = true;
                return;
            }
        }
        snake.push(newHead);
        head = snake[snake.length - 1];
    }

    if (head.x == food.x && head.y == food.y) {
        score += 10;
        newFood();
    } else {
        snake.shift();
    }
}

var upButton = document.getElementById("upButton");
var leftButton = document.getElementById("leftButton");
var rightButton = document.getElementById("rightButton");
var downButton = document.getElementById("downButton");

console.log(upButton);

document.addEventListener("keydown", handleKeyPress);

// upButton.addEventListener("click", () => {
//     if (direction != DOWN)
//         direction = UP;
// });

function handleKeyPress(event) {
    switch (event.key) {
        case "ArrowUp":
        case "w":
            if (direction != DOWN)
                direction = UP;
            break;
        case "ArrowDown":
        case "s":
            if (direction != UP)
                direction = DOWN;
            break;
        case "ArrowRight":
        case "d":
            if (direction != LEFT)
                direction = RIGHT;
            break;
        case "ArrowLeft":
        case "a":
            if (direction != RIGHT)
                direction = LEFT;
            break;
    }
}

function drawFood() {
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(food.x, food.y, snakeWidth, snakeWidth);
}

function drawScore() {
    ctx.fillStyle = "#F0FFF0";
    ctx.font = "15px Arial";
    ctx.fillText("Score : " + score, BOARD_WIDTH - 80, 12);
}

function run() {
    if (GAMEOVER === false) {
        ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
        moveSnake();
        drawSnake();
        drawFood();
        drawScore();
    } else {
        ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
        ctx.font = "30px Arial";
        ctx.fillText("GameOver", 100, 300);
        clearInterval();
    }
}

setInterval(run, 300);