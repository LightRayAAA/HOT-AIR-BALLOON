var BGImg
var balloonImg1, balloonImg2
var balloon
var database, height

function preload()
{
BGImg = loadImage("cityImage.png")
balloonImg1 = loadAnimation("hotairballoon1.png","hotairballoon2.png")
balloonImg2 = loadAnimation("hotairballoon1.png","hotairballoon1.png","hotairballoon2.png","hotairballoon2.png","hotairballoon3.png","hotairballoon3.png")
}

function setup()
{
database = firebase.database();
createCanvas(1500,700)
balloon = createSprite(250,650,10,10)
balloon.addAnimation("balloonImage", balloonImg1)
balloon.scale = 0.5
var balloonHeight = database.ref("balloon/height");
balloonHeight.on("value",readHeight,showError);
}

function draw()
{
background(BGImg)
if(LEFT_ARROW){
updateHeight(-10,0)
balloon.addAnimation("balloonImage2", balloonImg2)
}
else if(RIGHT_ARROW){
updateHeight(10,0)
balloon.addAnimation("balloonImage2", balloonImg2)
}
else if(UP_ARROW){
updateHeight(0,-10)
balloon.addAnimation("balloonImage2", balloonImg2)
balloon.scale = balloon.scale - 0.005
}
else if(DOWN_ARROW){
updateHeight(0,10)
balloon.addAnimation("balloonImage2", balloonImg2)
balloon.scale = balloon.scale + 0.005
}
drawSprites();
textSize(20)
text("Use the Arrow Keys to Move the Hot Air Balloon!",40,40)
}

function updateHeight(x,y)
{
database.ref("balloon/height").set({
"x":height.x+x,
"y":height.y+y
})
}
function readHeight(data)
{
height = data.val()
balloon.x = height.x
balloon.y = height.y
}
function showError(){
console.log("errorinwritingtothedatabase")
}