var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var nube;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var randomObstacle;
var obstacleGroup;
var cloudGroup;
var play=1;
var end=0;
var gamestate=play;
var puntuacion = 0;
var Game_Over;
var Restart;
var restart;
var gameover;
function preload() {
    trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
    trex_collided = loadAnimation("trex_collided.png");
    groundImage = loadImage("ground2.png");
    nube_moving = loadImage("cloud.png");
    obstacle1 = loadImage("obstacle1.png");
    obstacle2 = loadImage("obstacle2.png");
    obstacle3 = loadImage("obstacle3.png");
    obstacle4 = loadImage("obstacle4.png");
    obstacle5 = loadImage("obstacle5.png");
    obstacle6 = loadImage("obstacle6.png");
    Game_Over = loadImage("gameOver.png")
    Restart = loadImage("restart.png")
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    //create a trex sprite
    trex = createSprite(50,160,20,50);
    trex.addAnimation("running", trex_running);
    trex.addAnimation("collided", trex_collided);
    trex.scale = 0.5;
    //create a ground sprite
    ground = createSprite(200,180,400,20);
    ground.addImage("ground",groundImage); 
    ground.x = ground.width /2;
    ground.velocityX = -4;
    invisibleGround = createSprite(50,190,5,10);
    invisibleGround.visible=false;
    obstacleGroup=createGroup();
    cloudGroup=createGroup();
    trex.setCollider("circle", 0,0, 38);
    gameover = createSprite(300, 100, 50, 50);
    gameover.addImage(Game_Over);
    gameover.visible=false;
    restart = createSprite(300, 150);
    restart.addImage(Restart);
    restart.scale=0.8;
    restart.visible=false;
}
function draw() {
    background(210);
    trex.velocityY = trex.velocityY + 0.8
    text("Puntuacion: " + puntuacion, 500, 80);
    if (gamestate==play) {
        puntuacion = puntuacion + Math.round(frameCount /140)
     if (obstacleGroup.isTouching(trex)) {
         gamestate=end;
    }
    if (touches.lenght>0||keyDown("space")&&(trex.collide(invisibleGround))) {
        trex.velocityY = -11;
        touches=[]
    }
    if (ground.x < 0) {
        ground.x = ground.width / 2;
    }
    nubes();
    obstacles();
   
    } else if (gamestate==end) {
        ground.velocityX=0;
        obstacleGroup.setVelocityXEach(0);
        cloudGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        cloudGroup.setLifetimeEach(-1);
        trex.changeAnimation("collided");
        trex.velocityY=0;
        restart.visible=true;
        gameover.visible=true;
        if (mousePressedOver(restart)){
            play_again()
        }
    }
    trex.collide(invisibleGround);
    drawSprites();  
    }
 function nubes(){
    if(frameCount%60==0){
        nube=createSprite(550,30,50,50);
        nube.velocityX=-5;
        nube.addImage(nube_moving);
        nube.scale = 0.2;
        nube.lifetime=200;
        nube.position.y=Math.round(random(20,70));
        console.log(trex.depth);
        console.log(nube.depth);
        nube.depth=trex.depth;
        trex.depth+=1;
        cloudGroup.add(nube);
    }
 }  
 function obstacles(){
    if(frameCount % 60 == 0){
        var obstacle=createSprite(600,165,10,40);
        obstacle.velocityX=-7;
        randomObstacle=Math.round(random(1,6));
        switch(randomObstacle){
            case 1:
            obstacle.addImage(obstacle1);
            obstacle.scale=0.08
            break;
            case 2:
            obstacle.addImage(obstacle2);
            obstacle.scale=0.08
            break;
            case 3:
            obstacle.addImage(obstacle3);
            obstacle.scale=0.14
            break;
            case 4:
            obstacle.addImage(obstacle4);
            obstacle.scale=0.05
            break;
            case 5:
            obstacle.addImage(obstacle5);
            obstacle.scale=0.05
            break;
            case 6:
            obstacle.addImage(obstacle6);
            obstacle.scale=0.13 
            break;
            default:
            break;
        }
        obstacle.lifetime=300;
        obstacleGroup.add(obstacle);
    }
 }
 function play_again(){
    restart.visible=false;
    gameover.visible=false;
    gamestate=play
    obstacleGroup.destroyEach();
    cloudGroup.destroyEach();
    puntuacion=0;
    trex.changeAnimation("running");
    ground.velocityX = -4;
    ground.x=0;
 }