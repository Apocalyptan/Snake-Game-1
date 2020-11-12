const cvs = document.getElementById('snake');
const ctx = cvs.getContext('2d');

// Create the Unit
const box = 32;

// Load Images
const ground = new Image();
ground.src = "img/apocalypse.png";
const foodImg = new Image();
foodImg.src = "img/apocalyptan.png";

// Load Audio
const dead = new Audio();
dead.src = "audio/dead.mp3";
const down = new Audio();
down.src = "audio/down.mp3";
const eat = new Audio();
eat.src = "audio/eat.mp3";
const left = new Audio();
left.src = "audio/left.mp3";
const right = new Audio();
right.src = "audio/right.mp3";
const up = new Audio();
up.src = "audio/up.mp3";

// Create the Snake
let snake = [];
snake [0] = {
    x : 9 * box,
    y : 10 * box
};

// Create the Food (random position)
let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
};


// Create the score var
let score = 0;

// Control the Snake
let d;

document.addEventListener("keydown",direction);

function direction(event) {
    let key = event.keyCode;
    if (key == 37 && d != "RIGHT") {
        left.play();
        d = "LEFT";
    } else if (key == 38 && d != "DOWN") {
        up.play();
        d = "UP";
    } else if (key == 39 && d != "LEFT") {
        right.play();
        d = "RIGHT";
    } else if (key == 40 && d != "UP")
        d = "DOWN";
        down.play();
}

// Check Collision Function
function collision(head,array){
    for (let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// Draw Everything to the Canvas
function draw (){

    ctx.drawImage(ground,0,0);

    for (let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0)? "gold":"dark-green";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);

        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    // Old Head Position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Direction
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;

    // If the snake eats the food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // We don't remove the tail
    } else {
        // Remove the tail
        snake.pop();
    }

    // Add New Head

    let newHead = {
        x : snakeX,
        y : snakeY
    }

    // Game Over
    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box 
        || snakeY > 17 * box || collision(newHead, snake)){
            clearInterval(game);
            dead.play();
        }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 3*box, 1.6*box);
}

// Call draw function every 100ms 
let game = setInterval(draw,100);