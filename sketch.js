var player;
var invisibleGround;
var gameState = 0;
var playerName,playerCharacter;
var game;
var xMultiplier = 0;
var platformGroup,obstacleGroup;
var platformY;
var burntForestImage, obstacleImage,platformImage;
var boyRunning,girlRunning;
var playerImage1Image,playerImage2Image;
var playerImage1,playerImage2;
var invisibleGroundImage;
var youWinImg;
var gameOverImage,youLoseImg;
var gameOver;
var prize, prizeImg;
var jumpSound, gameOverSound,victorySound;

function preload(){
  burntForestImage = loadImage("images/BurntForestImage.jpg");
  obstacleImage = loadImage("images/spike obstacle image.png");
  platformImage = loadImage("images/platform-images.png");
  boyRunning = loadImage("images/boy running.jpg");
  playerImage1Image = loadImage("images/boy standing.jpg");
  playerImage2Image = loadImage("images/girl standing.jpg");
  youWinImg = loadImage("images/you win.jpg");
  invisibleGroundImage = loadImage("images/invisibleGround.jpg");
  youLoseImg = loadImage("images/you lose.jpg");
  gameOverImage = loadImage("images/gameOverImg.jpg");
  girlRunning = loadImage("images/girl running.jpg");
  jumpSound = loadSound("images/jump Sound effect.mp3");
  gameOverSound = loadSound("images/game over sound.mp3");
  prizeImg = loadImage("images/prizeImg.jpg");
  victorySound = loadSound("images/victory sound.mp3");
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  
  invisibleGround = createSprite(displayWidth/2 - 500,displayHeight-225,1000,20);
  invisibleGround.x = invisibleGround.width/2;
  invisibleGround.addImage("ground image",invisibleGroundImage);
  player = new Player(30,200);

  game = new Game();

  prize = createSprite(5400,player.sprite.y,50,50);
  prize.addImage("prize image",prizeImg);

  platformGroup = new Group();
  obstacleGroup = new Group();

  gameOver = createSprite(200,200,10,10);
  gameOver.addImage("game over",gameOverImage);
  gameOver.visible = false;

  playerImage1 = createSprite(displayWidth/2,displayHeight/2,50,50);
  playerImage1.addImage("Shekolot",playerImage1Image);

  playerImage2 = createSprite(displayWidth/2+200,displayHeight/2,50,50);
  playerImage2.addImage("Kooki",playerImage2Image);

  // player.sprite.addAnimation("playerRunning",boyRunning);

 
  
}



function draw() {
  background(255);
  image(burntForestImage,0,0,displayWidth*6,displayHeight*1.5);  

  camera.position.x = player.sprite.x + 610;

  player.gravity(0.5);

  player.sprite.collide(invisibleGround);

  

  

  game.serve();

  // text(mouseX+":"+mouseY,mouseX,mouseY);

  if(gameState === 1){
    player.sprite.visible = true;
    invisibleGround.visible = true;
    game.name.hide();
    game.submit.hide();
    spawnPlatform();
    spawnObstacles();
    playerImage1.destroy();
    playerImage2.destroy();
    // if(frameCount%20===0){
    //   player.distance += 20;
    // }

    // if(player.distance>2500&&gameState===1){
    //   gameState = 2;

    // }
   
    player.sprite.collide(platformGroup);

    // player.sprite.collide(obstacleGroup);

    if(player.sprite.velocityX===0){
      player.sprite.velocityX = 5;
      // console.log("Assigned velocity");
      // console.log(gameState);
    }

    if(player.sprite.isTouching(obstacleGroup)||player.sprite.y>displayHeight||player.sprite.x>prize.x||player.sprite.y<-200){
      gameState = 2;
    }
  }
  

  if(gameState=== 2){
    player.sprite.velocityX = 0;
    obstacleGroup.destroyEach();
    platformGroup.destroyEach();
    textSize(25);
    game.end.position(camera.position.x+300,camera.position.y+200);
    game.restart();
    gameOver.x = camera.position.x;
    gameOver.y = camera.position.y;
    gameOver.visible = true;
    prize.visible = false;
    gameOverSound.play();
    if(mousePressedOver(gameOver)){
      gameState = 1;
      gameOver.visible = false;
      player.sprite.x = 30;
      player.sprite.y = 200;
      invisibleGround.visible = true;
      gameOverSound.stop();
    }
    
  }

  if(player.sprite.isTouching(prize)&&gameState!== 2){
    player.sprite.velocityX = 0;
    obstacleGroup.destroyEach();
    platformGroup.destroyEach();
    player.sprite.velocityY = 0;
    textSize(25);
    victorySound.play();
    player.visible = false;
    image(youWinImg,prize.x,prize.y);
    player.sprite.changeAnimation(boyStanding);
  }

  drawSprites();

}

function keyPressed(){
    if(keyCode === UP_ARROW){
      player.sprite.velocityY = -13;
      invisibleGround.visible = false;
      jumpSound.play();
      // player.sprite.velocityX = 10;
      // camera.position.x = player.sprite.velocityX-5;
    }
}

// function keyReleased(){
//   if(keyCode === UP_ARROW){
//     player.sprite.velocityX = 5;
//     // camera.position.x = player.sprite.velocityX;
//   }
// }

function spawnObstacles(){
    if(frameCount%60===0){
      var obstacle = createSprite(player.sprite.x+displayWidth+random(5,80),platformY-15,30,30);

      

      obstacle.lifetime = floor(displayWidth/4);

      obstacle.addImage("obstacle",obstacleImage);
      obstacle.scale = 0.25;

      obstacle.depth = 10;

      obstacleGroup.add(obstacle);

      

    }

}

function spawnPlatform(){
   if(frameCount%60 === 0){
      platformY =  random(displayHeight/2-150,invisibleGround.y-100)
      var platform = createSprite(player.sprite.x+displayWidth,platformY,250,20);

      platformGroup.add(platform);

      platform.lifetime = floor(displayWidth/4);
      platform.depth = 11;

      platform.addImage("platform", platformImage);
      platform.scale = 0.5;
      
    }
}