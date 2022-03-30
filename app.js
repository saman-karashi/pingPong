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
let dy = 5;
let dx = 5;

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
  }

  function setBoundaryLimits(){
  paddle_pos.forEach((paddle)=>{
  if(paddle.y + height > pongField_El.height){
  paddle.y = pongField_El.height - height;
  }else if(paddle.y + height < height ){
  paddle.y = 0;
  }
  })
  }

  function moveLeftPaddle(){
  if(direction.up){
  paddle_pos[0].y -=dy;
  }else if(direction.down){
  paddle_pos[0].y +=dy;
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
 window.requestAnimationFrame(animate)
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

animate();
