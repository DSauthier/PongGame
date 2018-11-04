let game = new Phaser.Game(800,600,Phaser.AUTO,"",{
preload: preload, 
create: create,
update: update
});

let paddle1;
let paddle2;

let ball;
let ball_launched;
let ball_velocity;

let score1_text;
let score2_text;

// let way = "./assets/paddle.png"


function preload() { /* loads sprites, music, cache - everything that will be used in the game */
  
  game.load.image();/* it takes 2 params, the name that we will call the img, and the path for the img. */
  game.load.image()/* ball will load the same way as paddles, error crossorigin. */
}
function create() {
  
  ball_launched = false;
  ball_velocity = 400;
  
  paddle1 = create_paddle(0,game.world.centerY);
  paddle2 = create_paddle(game.world.width - 8,game.world.centerY);

  ball = create_ball(game.world.centerX,game.world.centerY);

  game.input.onDown.add(launch_ball,this);

  game.load.audio('hit_1',['.assets/4389__noisecollector__pongblipf-3.wav']);
  game.load.audio('hit_2',['/assets/4359__noisecollector__pongblipf4.wav']);


  // score1_text = game.add.text(128,128 ,"0",{
  //   font:"64px Gabriella",
  //   fill: "#ffffff",
  //   align: "center"
  // });
  // score2_text = game.add.text(game.world.width - 128, 128, "0", {
  //   font: "64px Gabriella",
  //   fill: "#ffffff",
  //   align: "center"
  // });

  // score1 = 0;
  // score2 = 0


}
function update() {
  // score1_text.text = score1; 
  // score2_text.text = score2; 

  control_paddle(paddle1, game.input.y);

  game.physics.arcade.collide(paddle1,ball,function(){
    game.sound.play('hit_1');
  });
  game.physics.arcade.collide(paddle2,ball,function(){
    game.sound.play('hit_2');
  });


  if(ball.body.blocked.left){
    // score1+=1
    console.log("player 2 scores")
  } else if (ball.body.blocked.right) {
    // score2+=1
    console.log("player 1 scores")
  }

  paddle2.body.velocity.setTo(ball.body.velocity.y);
  paddle2.body.velocity.x = 0;
  paddle2.body.maxVelocity.y = 300;







}

function create_paddle(x,y){
  let paddle = game.add.sprite(x,y,"paddle");/*it takes 3 params, pos X, pos Y and the Name that refers to the img itself. */
  paddle.anchor.setTo(0.5,0.5); /* takes 2 params,X and Y. 0,0 is the beginning of the img, and 1,1 is the end. 0.5 is the middle. */
  game.physics.arcade.enable(paddle); /* creates a body - it will be used to detect collision */
  paddle.body.collideWorldBounds = true; /* after enabling the body, we call it. collideWorldBounds will ensure that the img wont go over the canvas bounds. */
  paddle.body.immovable = true;



  paddle.scale.setTo(0.5,4)


  return paddle;


}

function control_paddle(paddle,y) {
  paddle.y = y;
  // the following code will keep the paddles inside the board | game.world.height is the height of the board, we can call it 600px but if we change the size of the board
  // its better to automatically update.
  if(paddle.y < paddle.height / 2){
    paddle.y - paddle.height /2 ;
  } else if(paddle.y > game.world.height - paddle.height / 2){ 
    paddle.y = game.world.height - paddle.height / 2;
  }
  
}
 function image(){
  
}

function create_ball(x,y){
  var ball = game.add.sprite(x,y,"ball");
  ball.anchor.setTo(0.5,0.5);
  game.physics.arcade.enable(ball);
  ball.body.collideWorldBounds = true;
  ball.body.bounce.setTo(1,1);

  return ball;

}

function launch_ball(){
  if(ball_launched){
    ball.x = game.world.centerX;
    ball.y = game.world.centerY;
    ball.body.velocity.setTo(0,0);
    ball_launched = false;

  } else{
    ball.body.velocity.x = -ball_velocity;
    ball.body.velocity.y = ball_velocity;
    ball_launched = true;
  }
}














// function image(name,way,img){
//   let name = "paddle";
//   // let way =  "assets/TCKlOwF - Imgur.png";
//   // img.crossOrigin = "undefined"
//   this.ctx
// }


