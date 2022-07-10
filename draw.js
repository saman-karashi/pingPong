class Draw{
constructor({c,ball_pos,scores,canvas_El,width,height,radius,paddles_pos}) {
this.c = c;
this.width=width;
this.height=height;
this.radius=radius
this.canvas_El=canvas_El;
this.paddles_pos=paddles_pos;
this.scores=scores
this.ball_pos=ball_pos
}

drawScores(){
this.c.fillStyle='#fff'
this.c.fillText(this.scores.left , 250 , 100)
this.c.fillStyle='#fff'
this.c.fillText(this.scores.right, 550 , 100)
}

drawVerticalLine() {
this.c.beginPath();
this.c.moveTo(this.canvas_El.width / 2, this.canvas_El.height - 140);
this.c.lineTo(this.canvas_El.width / 2, 140);
this.c.lineWidth = 10;
this.c.setLineDash([10, 15]);
this.c.strokeStyle = '#fff';
this.c.stroke();
this.c.closePath();
}

drawPaddles() {
this.paddles_pos.forEach((pos)=>{
this.c.fillStyle = '#fff';
this.c.fillRect(pos.x, pos.y,this.width,this.height);
})
}

drawBall() {
this.c.fillStyle='#fff'
this.c.arc(this.ball_pos.x , this.ball_pos.y , this.radius, 0 ,2 * Math.PI)
this.c.fill()
}

} 

export default Draw;
