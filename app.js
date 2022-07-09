const pongField_El = document.getElementById('pongField'),
      easyBtn_El = document.getElementById('easy'),
      mediumBtn_El = document.getElementById('medium'),
      hardBtn_El = document.getElementById('hard'),
      modal_El = document.getElementById('modal')

const c = pongField_El.getContext('2d');

pongField_El.width = 800;
pongField_El.height = 600;

const { width, height } = { width: 20, height: 100 }; //Width and Height of paddles

const padding = 10; //Padding of paddles
const radius = 10; //Ball size

//Specify colors
const colors = ['#1abc9c', '#2ecc71', '#3498db', '#e74c3c', '#9b59b6']

//Specify ball position
const ball_pos = {
  x: pongField_El.width / 2,
  y: pongField_El.height / 2,
};

//Specify paddle position
const paddle_pos = [
    {x:padding,y:pongField_El.height / 2 - (height / 2)},
    {x:pongField_El.width - (width + padding),y:pongField_El.height / 2 - (height / 2)}
]

//Specify direction
const direction={
up:false,
down:false
}

let left_score = 0;
let right_score = 0;
let start = false;
let dy; //Ball dy
let dx; // Ball dx
let speed; //Speed of paddles
let interval;
let levels;



window.addEventListener('DOMContentLoaded', ()=>{
if(!levels){
modal_El.classList.add('active')
}
})


window.addEventListener('touchstart',(e)=>{
 if(e.target.id === 'pongField' && levels){
  start = true
 }
})

easyBtn_El.addEventListener('click' , ()=>{
if(!levels)levels='Easy'
speed = 3;
dx = 4;
dy = -4;

if(levels){
modal_El.classList.remove('active')
modal_El.classList.add('hidden')
}

})

mediumBtn_El.addEventListener('click' , ()=>{
if(!levels)levels='Medium'
speed = 5;
dx = 6;
dy = -6;

if(levels){
modal_El.classList.remove('active')
modal_El.classList.add('hidden')
}

})

hardBtn_El.addEventListener('click' , ()=>{
if(!levels)levels='Hard'
speed = 6;
dx = 7;
dy = -7;

if(levels){
modal_El.classList.remove('active')
modal_El.classList.add('hidden')
}

})


window.addEventListener('keyup', e => {
  if (levels) {
    start = true;
  }

  //When key is released then set back direction to its default state
 if(e.key === 'ArrowUp' || e.key === 'w'){
    direction.up=false;
 }else if(e.key === 'ArrowDown' || e.key === 's'){
    direction.down=false;
 }
});

function changeDirOfLeftPaddle(e){
  if(e.key === 'ArrowUp' || e.key === 'w'){
  direction.up=true;
  }else if(e.key === 'ArrowDown' || e.key === 's'){
  direction.down=true;
  }
  }
  

//Change direction of left paddle
window.addEventListener('keydown',changeDirOfLeftPaddle)

//Move paddle based on touch interaction
window.addEventListener('touchmove',(e)=>{
if(e.touches[0].clientY < paddle_pos[0].y){
   paddle_pos[0].y -= speed * 2
   }else if(e.touches[0].clientY > paddle_pos[0].y){
   paddle_pos[0].y +=speed * 2
   }
})

  function draw() {
      //Draw paddle
      drawPaddle();
      //Draw ball
      drawBall();
      //Draw vertical line in the center
      drawVerticalLine();
      //Draw left score
      drawLeftScore()
      //Draw right score
      drawRightScore()
  }

  function update() {
    //Call draw method
    draw();
    //Move left paddle
    moveLeftPaddle()
    //Set boundary limits for paddles
    setBoundaryLimits()
    //Check if the ball hits left
    hitsLeft()
    //Check if the ball hits right
    hitsRight()
    //Check if the ball hits top & bottom
    hitsTopBottom()
    //Check if the ball hits player 
    hitsPlayer()
    //Check if the ball hits enemy 
    hitsEnemy()
    //Move the ball
    moveBall()
    //Check if left or right score is equal to ..
    checkRightScoreState()
    //Check if left or right score is equal to ..
    checkLeftScoreState()

  }

  function setBoundaryLimits(){
  //Check if right is in boundary limits
  paddle_pos.forEach((paddle)=>{
  if(paddle.y >= pongField_El.height - height){
    paddle.y = pongField_El.height - height
  }else if(paddle.y < 0){
    paddle.y = 0
  }
  })

  }

  function moveLeftPaddle(){
  if(direction.up){
  paddle_pos[0].y -=speed;
  }else if(direction.down){
  paddle_pos[0].y +=speed;
  }
  }

function hitsRight(){
return ball_pos.x > pongField_El.width
}


function hitsLeft(){
return ball_pos.x < 0   
}

function hitsTopBottom(){
return ball_pos.y > pongField_El.height - radius || ball_pos.y < radius
}


function hitsEnemy(){
return  ball_pos.y <= paddle_pos[1].y + height && ball_pos.y >= paddle_pos[1].y && ball_pos.x >= paddle_pos[1].x - radius
}

function hitsPlayer(){
return  ball_pos.y <= paddle_pos[0].y + height && ball_pos.y >= paddle_pos[0].y && ball_pos.x <= paddle_pos[0].x + (padding + width)
}


function checkRightScoreState(){
if(right_score === 5){
setTimeout(()=>{
clearInterval(interval)
c.font= '25px sans-serif'
c.fillStyle='red'
c.fillText('Game Over' , pongField_El.width / 2 , 80)
},100)

setTimeout(()=>{
window.location.reload()
},1500)
}

}

function checkLeftScoreState(){
if(left_score === 5){
setTimeout(()=>{
clearInterval(interval)
c.font= '28px sans-serif'
c.fillStyle='green'
c.fillText('You won' , pongField_El.width / 2 , 80)
},100)

setTimeout(()=>{
window.location.reload()
},1500)
}
}


function moveBall(){
if(hitsTopBottom()){
dy = -dy
}

if(hitsEnemy() || hitsPlayer()){
dx = -dx;
}

if(hitsLeft()){
ball_pos.x = pongField_El.width / 2
ball_pos.y = pongField_El.height / 2
right_score+=1;
dx=-dx
dy=-dy
}

if(hitsRight()){
ball_pos.x = pongField_El.width / 2
ball_pos.y = pongField_El.height / 2
left_score+=1;
dx=-dx
dy=-dy
}

ball_pos.x +=dx;
ball_pos.y +=dy;

//Computer paddle should track ball position
if(paddle_pos[1].y + height / 2 > ball_pos.y + radius){
paddle_pos[1].y -= speed
}else if(paddle_pos[1].y + height / 2 < ball_pos.y){
paddle_pos[1].y +=speed
}


}


  function drawLeftScore(){
  c.fillStyle='#fff'
  c.fillText(left_score , 250 , 100)
  }

  function drawRightScore(){
  c.fillStyle='#fff'
  c.fillText(right_score , 550 , 100)
  }

  function writeStartText() {
    c.font = '40px sans-serif';
    c.fillStyle = '#fff';
    c.textAlign = 'center';
    if(window.innerWidth > 500){
      c.fillText(
        'Press any key to begin',
        pongField_El.width / 2,
        pongField_El.height / 2
      );
    }else{
      c.fillText(
        'Tap the screen to begin',
        pongField_El.width / 2,
        pongField_El.height / 2
      );
    }
  }

  function drawVerticalLine() {
    c.beginPath();
    c.moveTo(pongField_El.width / 2, pongField_El.height - 140);
    c.lineTo(pongField_El.width / 2, 140);
    c.lineWidth = 10;
    c.setLineDash([10, 15]);
    c.strokeStyle = '#fff';
    c.stroke();
    c.closePath();
  }

  function drawPaddle() {
    paddle_pos.forEach((pos)=>{
    c.fillStyle = '#fff';
    c.fillRect(pos.x, pos.y, width, height);
    })
  }

  function drawBall() {
   c.fillStyle='#fff'
   c.arc(ball_pos.x , ball_pos.y , radius, 0 ,2 * Math.PI)
   c.fill()
}

  function drawScores() {
    c.font = '40px sans-serif';
    c.fillStyle = '#fff';
    c.fillText(score, this.score_pos.x, this.score_pos.y);
  }


function animate() {
  //clear rectangle on every frame
  c.clearRect(0, 0, pongField_El.width, pongField_El.height);
  c.fillStyle = '#0cb8ae'
  c.fillRect(0, 0, pongField_El.width, pongField_El.height);

  //If start is true execute update else execute beginText
    if(!start){
      writeStartText()
    }else if(levels){
      update()
    }
}

interval=setInterval(()=>{
animate()
},1000 / 60)


