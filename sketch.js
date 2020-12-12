var dog1, happyDog, dog;
var database;
var foodS, foodStock;

function preload()
{
  dog1 = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250, 250, 50, 50);
  dog.addImage(dog1);
  dog.scale = 0.15;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)&&foodS>0){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  if(keyWentUp(UP_ARROW)){
    dog.addImage(dog1);
  }

  if(keyWentDown(32)){
    database.ref('/').set({
      Food:20
    });

  }


  drawSprites();
  //add styles here
  textSize(20);
  fill("black");
  text("Press the up arrow to feed Drago milk", 100, 20);
  text("Press the sacebar to reset food", 100, 50)
  text("Food: "+foodS,150, 80)
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{x=x-1;}

  database.ref('/').update({
    Food:x
  })
}

