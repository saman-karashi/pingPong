const pongField_El = document.getElementById('pongField');

const c = pongField_El.getContext('2d');

pongField_El.width = 800;
pongField_El.height = 600;

const { width, height } = { width: 20, height: 100 }; //Width and Height of paddles

const padding = 10; //Padding of paddles

const ball_size = { width: 10, height: 10 }; //Ball size

//Specify ball position
const ball_pos = {
  x: pongField_El.width / 2 - 5,
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
let dy = -5; //Ball dy
let dx = 5; // Ball dx
let speed = 4; //Speed of paddles
let interval;

window.addEventListener('keyup', e => {
  if (e.key === 'Enter') {
    start = true;
  }
});

//When key is released then set back direction to its default state
window.addEventListener('keyup', e => {
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
return ball_pos.y > pongField_El.height - ball_size.height || ball_pos.y < ball_size.height
}


function hitsEnemy(){
return  ball_pos.y <= paddle_pos[1].y + height && ball_pos.y >= paddle_pos[1].y && ball_pos.x == paddle_pos[1].x
}

function hitsPlayer(){
return  ball_pos.y <= paddle_pos[0].y + height && ball_pos.y >= paddle_pos[0].y && ball_pos.x == paddle_pos[0].x + width
}


function checkRightScoreState(){
if(right_score === 6){
clearInterval(interval)
c.font= '25px sans-serif'
c.fillStyle='red'
c.fillText('Game Over' , pongField_El.width / 2 , 80)

setTimeout(()=>{
window.location.reload()
},1500)
}

}

function checkLeftScoreState(){
if(left_score === 6){
    clearInterval(interval)
    c.font= '25px sans-serif'
    c.fillStyle='green'
    c.fillText('You won' , pongField_El.width / 2 , 80)
    
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
if(ball_pos.y < paddle_pos[1].y){
paddle_pos[1].y -= speed
}else if(ball_pos.y > paddle_pos[1].y){
paddle_pos[1].y += speed
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
    c.fillText(
      'Press Enter key to begin',
      pongField_El.width / 2,
      pongField_El.height / 2
    );
  }

  function drawVerticalLine() {
    c.beginPath();
    c.moveTo(pongField_El.width / 2, pongField_El.height - 100);
    c.lineTo(pongField_El.width / 2, 100);
    c.lineWidth = 10;
    c.setLineDash([10, 14]);
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
   c.fillRect(ball_pos.x,ball_pos.y,ball_size.width,ball_size.height)
  }

  function drawScores() {
    c.font = '40px sans-serif';
    c.fillStyle = '#fff';
    c.fillText(score, this.score_pos.x, this.score_pos.y);
  }


function animate() {
 //clear rectangle on every frame
  c.clearRect(0, 0, pongField_El.width, pongField_El.height);
  c.fillStyle = '#000';
  c.fillRect(0, 0, pongField_El.width, pongField_El.height);

  //If start is true execute update else execute beginText
      if(!start){
        writeStartText()
      }else{
          update()
      }

}


interval = setInterval(()=>{
    animate()
},1000 / 60)