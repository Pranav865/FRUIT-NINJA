var PLAY=1;
var END=0;
var gameState=1;

var knife,fruit ,monster ,monster1, monster2, fruitGroup, monsterGroup, score,r,randomFruit, position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monster1Image, monster2Image, gameOverImage;

var knifeSwooshSound, gameOver;

function preload(){
  
  knifeImage = loadImage("knife.png");
  monster1Image = loadImage("alien2.png");
  monster2Image = loadImage("alien1.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")

  knifeSwoosh = loadSound("knifeSwoosh.mp3");
  gameOver = loadSound("gameover.mp3");
}



function setup() {
  createCanvas(600, 600);
  
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  knife.setCollider("rectangle",0,0,40,40);

  score=0;
  fruitGroup=createGroup();
  monsterGroup=createGroup();
  
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    fruits();
    Monster();
    
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Increase score if sword touching fruit
    if(fruitGroup.isTouching(knife)){
      score=score+2;
      fruitGroup.destroyEach();
      knifeSwoosh.play();
    }
    else
    {
      if(monsterGroup.isTouching(knife)){
        gameState=END;
        gameOver.play();
        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        knife.addImage(gameOverImage);
        knife.scale=2;
        knife.x=300;
        knife.y=300;
      }
    }
  }
  
  drawSprites();
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}


function Monster(){
  if(World.frameCount%200===0){
     position =Math.round(random(1,2));
    monster=createSprite(400,200,20,20);
    
    if(position==1){
       monster.x=600;
       monster.velocityX = -(9+3*score/10);   
      
    }else 
      
  {   if(position==2){
      monster.x=0; 
      monster.velocityX = -(9+1*score/10);       
    }
  }
     monster.scale=1;
     r=Math.round(random(1,2));
    if (r == 1) {
      monster.addImage(monster1Image);
    } else if (r == 2) {
      monster.addImage(monster2Image);
    } 
    
    monster.y=Math.round(random(100,550));
    
    monster.setLifetime=100;
    
    monsterGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
        
    if(position==1)
    {
    fruit.x=600;
    fruit.velocityX=-(7+2*score/4);
    }
    else
    {
      if(position==2){
      fruit.x=0;
      
      fruit.velocityX= (7+2*score/4);
      }
    }
    
    fruit.scale=0.2;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,550));
   
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}