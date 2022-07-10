class Update {
  constructor({
    c,
    radius,
    canvas_El,
    width,
    height,
    scores,
  }) {
    this.c = c;
    this.canvas_El = canvas_El;
    this.radius = radius;
    this.width = width;
    this.height = height;
    this.scores=scores;
  }

    paddlesCollidesWithBall(paddles_pos) {
    paddles_pos.forEach(paddle => {
      if (paddle.y >= this.canvas_El.height - this.height) {
        paddle.y = this.canvas_El.height - this.height;
      } else if (paddle.y < 0) {
        paddle.y = 0;
      }
    });
  }

    moveLeftPaddle({direction,paddles_pos,speed}){
    if (direction.up) {
      paddles_pos[0].y -= speed;
    } else if (direction.down) {
      paddles_pos[0].y += speed;
    }
  }

    computerPaddleMoves({paddles_pos,speed,ball_pos}){
    if (paddles_pos[1].y + this.height / 2 > ball_pos.y + this.radius) {
      paddles_pos[1].y -= speed;
    } else if (paddles_pos[1].y + this.height / 2 < ball_pos.y) {
      paddles_pos[1].y += speed;
    }
    }

    scoresState(interval) {
    if (this.scores.right == 5) {
      setTimeout(()=>{
        clearInterval(interval);
        this.c.font = '25px sans-serif';
        this.c.fillStyle = 'red';
        this.c.fillText('Game Over', this.canvas_El.width / 2, 80);
      },50)

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else if (this.scores.left === 5) {
     setTimeout(()=>{
    clearInterval(interval);
    this.c.font = '25px sans-serif';
    this.c.fillStyle = 'green';
    this.c.fillText('You won', this.canvas_El.width / 2, 80);
     },50)

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  }
}

export default Update;
