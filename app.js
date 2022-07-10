import Update from './update.js';
import Draw from './draw.js';

const canvas_El = document.getElementById('pongField'),
  easyBtn_El = document.getElementById('easy'),
  mediumBtn_El = document.getElementById('medium'),
  hardBtn_El = document.getElementById('hard'),
  modal_El = document.getElementById('modal');

const c = canvas_El.getContext('2d');

canvas_El.width = 800;
canvas_El.height = 600;

const { width, height } = { width: 20, height: 100 }; 

const padding = 10;
const radius = 10;

const ball_pos = {
  x: canvas_El.width / 2,
  y: canvas_El.height / 2,
};

const paddles_pos = [
  { x:padding, y: canvas_El.height / 2 - height / 2 },
  {
    x: canvas_El.width - (width + padding),
    y: canvas_El.height / 2 - height / 2,
  },
];

const direction = {
  up: false,
  down: false,
};

let scores = {left:0,right:0}
let start = false;
let dy;
let dx;
let speed;
let interval;
let levels;

const draw = new Draw({
c,
canvas_El,
width,
height,
radius,
paddles_pos,
ball_pos,
scores
});

const update = new Update({
c,
width,
height,
canvas_El,
radius,
scores,
});


function modalClassHandler(){
modal_El.classList.remove('active');
modal_El.classList.add('hidden');
}

window.addEventListener('DOMContentLoaded', () => {
  if (!levels) {
    modal_El.classList.add('active');
  }
});

window.addEventListener('touchstart', e => {
  if (e.target.id === 'pongField' && levels) {
    start = true;
  }
});

window.addEventListener('keyup', e => {
  if (levels) {
    start = true;
  }

  if (e.key === 'ArrowUp' || e.key === 'w') {
    direction.up = false;
  } else if (e.key === 'ArrowDown' || e.key === 's') {
    direction.down = false;
  }
});


window.addEventListener('keydown', (e)=>{
if (e.key === 'ArrowUp' || e.key === 'w') {
  direction.up = true;
} else if (e.key === 'ArrowDown' || e.key === 's') {
  direction.down = true;
}
});


window.addEventListener('touchmove', e => {
  if (e.touches[0].clientY < paddles_pos[0].y) {
    paddles_pos[0].y -= speed * 2;
  } else if (e.touches[0].clientY > paddles_pos[0].y) {
    paddles_pos[0].y += speed * 2;
  }
});

easyBtn_El.addEventListener('click', () => {
  if (!levels){
    levels = 'Easy';
    speed = 3;
    dx = 4;
    dy = -4;
  }
  modalClassHandler()
});

mediumBtn_El.addEventListener('click', () => {
  if (!levels){
    levels = 'Medium';
    speed = 5;
    dx = 6;
    dy = -6;
  }
  modalClassHandler()
});

hardBtn_El.addEventListener('click', () => {
  if (!levels){
    levels = 'Hard';
    speed = 6;
    dx = 7;
    dy = -7;
  }
  modalClassHandler()
});


function ballCollidesWithPaddles(){
if(   
ball_pos.y > canvas_El.height - radius ||
ball_pos.y < radius){
dy = -dy;
}else if(
ball_pos.y <= paddles_pos[1].y + height &&
ball_pos.y >= paddles_pos[1].y &&
ball_pos.x + radius >= paddles_pos[1].x 
||
ball_pos.y <= paddles_pos[0].y + height &&
ball_pos.y >= paddles_pos[0].y &&
ball_pos.x <= paddles_pos[0].x + width)
{
dx = -dx;
} 

ball_pos.x +=dx;
ball_pos.y +=dy;
}


function ballCollidesWithWalls(){
if(ball_pos.x < 0){
ball_pos.x = canvas_El.width / 2
ball_pos.y = canvas_El.height / 2
scores.right++
dx = -dx;
dy = -dy;
}else if(ball_pos.x > canvas_El.width){
ball_pos.x = canvas_El.width / 2;
ball_pos.y = canvas_El.height / 2;
scores.left++;
dx = -dx;
dy = -dy;
}

}


function updateHandler() {
  draw.drawPaddles();
  draw.drawBall();
  draw.drawVerticalLine();
  draw.drawScores();
  ballCollidesWithWalls()
  ballCollidesWithPaddles()
  update.scoresState(interval);
  update.moveLeftPaddle({direction,speed,paddles_pos})
  update.computerPaddleMoves({speed,ball_pos,paddles_pos})
  update.paddlesCollidesWithBall(paddles_pos)
}

function writeStartText() {
  c.font = '40px sans-serif';
  c.fillStyle = '#fff';
  c.textAlign = 'center';
  if (window.innerWidth > 500) {
    return(c.fillText(
      'Press any key to begin',
      canvas_El.width / 2,
      canvas_El.height / 2
    )
    )
  } 

    c.fillText(
      'Tap the screen to begin',
      canvas_El.width / 2,
      canvas_El.height / 2
    );
}

function animate() {
  c.clearRect(0, 0, canvas_El.width, canvas_El.height);
  c.fillStyle = '#0cb8ae';
  c.fillRect(0, 0, canvas_El.width, canvas_El.height);

  if (!start) {
    writeStartText();
  } else if (levels) {
    updateHandler();
  }
}

interval = setInterval(() => {
  animate();
}, 1000 / 60);
