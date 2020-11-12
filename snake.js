const cvs = document.getElementById('snake');
const ctx = cvs.getContext('2d');

// Create the Unit
const box = 32;

// Load Images
const ground = new Image();
ground.src = "img/ground.png";
const food = new Image();
food.src = "img/food.png";

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

const score = 0;
// Create the score var
let score = score;

// Control Snake
let d; 

// Draw Everything to the Canvas

function draw (){

    ctx.drawImage(ground,0,0);  
    
}

// Call draw function every 100ms 

let game = setInterval(draw,100);