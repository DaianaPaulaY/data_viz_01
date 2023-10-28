
var x = 0;
var y = 0;
var xpos;
var ypos;
var spaceData;
let stars = [];
let speed;

function preload(){
  earth = loadImage('earth.png');
  astronaut = loadImage('astronaut.png')
}


function setup() {
  createCanvas(1200,600);
  loadJSON("http://api.open-notify.org/astros.json", gotData, 'jsonp');
  
  for (let i = 0; i <2000; i++){
    stars.push(new Star(random(-width,width), random(-height,height)));
  }
}


function gotData(data){
  spaceData = data;
}


function draw(){
  background(0);
  speed = map(mouseX, 0, width, 0, 1);
  
  
  push();
  translate(width/2, height/2);
  for (let i = 0; i < stars.length; i++){
    stars[i].update();
    stars[i].display();
  }
  pop();
  
  randomSeed(2);
  
  imageMode(CENTER);
  image(earth, 600, 300);
   
  if (spaceData){
    for (var i = 0; i < spaceData.people.length; i++){      
      xpos = random(50, width-50) + 100;
      ypos = random(50, height-50) + 100;
      fill(255);
      text(spaceData.people[i].craft, xpos, ypos);
      text(spaceData.people[i].name, xpos, ypos+15);
      image(astronaut, xpos-15, ypos, 40, 40);     
    }
  }  
}


class Star{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.z = random(width);
    
  }
  
  update(){
    this.z = this.z - speed;
    
    if (this.z <1){
      this.z = 5;
      this.x = random (-width,width);
      this.y = random (-height,height);
    }
  }
  
  display(){
    //fill(colour);
    noStroke();
    let sx = map(this.x/this.z, 0, 1, 0, width);
    let sy = map(this.y/this.z, 0, 1, 0, height);
    let r = map(this.z, 0, width, 2, 0);
    ellipse(sx, sy, r, r);
  }
}


