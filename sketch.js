var dog,sadDog,happyDog;

var database

var feedpet,addfood;
var foodObj;
var feedTime,lastFeed;

var gameState;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database=firebase.database();

  foodObj=newFood;

  foodStock=database.ref('Food');
 foodStock.on("value",readStock);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(feedDog);

}

function draw() {
  background(46,139,87);
  foodObj.display();

feedTime=database.ref('feedTime');
feedTime.on("value",function(data){
  lastFeed=data.val();
});


  drawSprites();
}

//function to read food Stock
foodS=data.val();
foodObj.updateFoodStock(foodS);


//function to update food stock and last fed time

function feedDog(){
  dog.addImage(happyDog);
  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  database.ref('/').update({
    food:foodObj.getFoodStock(),
    feedTime:hour()
  });
}


//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

