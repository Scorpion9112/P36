//Create variables here
var dog,dogHappy
var database
var foodS,foodStock
var lastFed
var foodObject    
      
function preload(){
  dl= loadImage("images/dogImg.png");
  dl2=loadImage("images/dogImg1.png")
}

function setup(){
createCanvas(1000, 500);
database=firebase.database()
  foodObject= new Food()
  var foodS=database.ref('foodCount')
  foodS.on('value',readStock)
  dog=createSprite(250,250,200,200)
  dog.addImage(dl)
  dog.scale=.1

feed= createButton("Feed the Dog")
feed.position(700,95)
feed.mousePressed(feedDog)

addFood= createButton("Add Food")
addFood.position(500,95)
addFood.mousePressed(addFoods)
}


function draw() {  
  background(46, 139, 87)
  drawSprites();
  //add styles here
  foodObject.display()
  database.ref('lastFed').on("value", function(data){
    lastFed=data.val()
  })
  textSize(10)
  fill("white")
  text("Note: Press Up Arrow Key to Feed Drago Milk.",100,15)
  
  
  

  text("Food Remaining:"+foodS,190,200)
  
}
function readStock(data){
  foodS=data.val()
  foodObject.updateFoodStock(foodS)
  }

function addFoods(){
  foodS++
  database.ref('/').update({
   foodCount:foodS
  })
}
function feedDog(){
    dog.addImage(dl2)
    if(foodObject.getFoodStock()<=0){
foodObject.updateFoodStock(foodObject.getFoodStock()*0)
    }
    else{
      foodObject.updateFoodStock(foodObject.getFoodStock()-1)
    }
    database.ref('/').update({
   foodCount:foodObject.getFoodStock(),
   lastFed:hour()
    })
    }


