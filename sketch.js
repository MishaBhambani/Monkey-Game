
var monkey , monkey_running;
var ground;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup
var score;
var survivalTime = 0;
var gameState = "Play";

function preload(){ 
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width /2;
  console.log(ground.x);
  
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background("#ADD8E6");
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time: " + survivalTime, 100, 50);
  
  ground.shapeColor = "#855723";
  if(ground.x < 0){
    ground.x = ground.width/2;
  }
  
  monkey.collide(ground);
  
  if(gameState === "Play"){
    survivalTime = Math.ceil(frameCount/frameRate());
    
    if(keyDown("space") && monkey.y >= 200){
      monkey.velocityY = -10;
    }
    monkey.velocityY += 0.7;
  
    obstacles();
  
    food();
    
    if(monkey.isTouching(obstacleGroup)){
      gameState = "End";
    }
  }
  
  if(gameState === "End"){
    ground.velocityX = 0;
    
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
  }
  
  drawSprites();
}

function food(){
  if(frameCount%80 === 0){
    bananaY = Math.round(random(120, 200));
    banana = createSprite(400, bananaY, 20, 20);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    banana.lifetime = 100;
    
    FoodGroup.add(banana);
  }
}

function obstacles(){
  if(frameCount%300 === 0){
    obstacle = createSprite(400, 300, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.25;
    obstacle.velocityX = -4;
    obstacle.lifetime = 100;
    
    obstacleGroup.add(obstacle);
  }
}


