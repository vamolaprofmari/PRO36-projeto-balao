var balloon,balloonImage1,balloonImage2;
var database;

var balloonHeight
function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("HotAirBallon01.png");
   balloonImage2=loadAnimation("HotAirBallon01.png","HotAirBallon01.png",
   "HotAirBallon01.png","HotAirBallon02.png","HotAirBallon02.png",
   "HotAirBallon02.png","HotAirBallon03.png","HotAirBallon03.png","HotAirBallon03.png");
  }

//Função para definir o ambiente inicial
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,650,250,650);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  balloonHeight=database.ref('balloon/height');
  balloonHeight.on("value",readHeight, showError);
  textSize(20); 
}

// função para exibir a interface do usuário
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale -0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale+0.005;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use as setas para mover o balão de ar quente!",40,40);

}


function updateHeight(x,y){
  database.ref('balloon/height').set({
    x: balloon.x + x ,
    y: balloon.y + y
  })
}




function readHeight(data){
   var posicao = data.val();
  console.log(posicao.x);
  balloon.x = posicao.x;
  balloon.y = posicao.y;
 }

function showError(){
  console.log("Erro ao escrever no banco de dados");
}
