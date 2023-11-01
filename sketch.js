
var x = 0;
var y = 0;
var xpos;
var ypos;
var spaceData;
let stars = [];
let speed;

let array = [
  [300, 100],
  [300, 200],
  [300, 300],
  [300, 400],
  [300, 500],

  [850, 100],
  [850, 200],
  [850, 300],
  [850, 400],
  [850, 500],
]

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

  print(spaceData)

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
  
  
  imageMode(CENTER);
  image(earth, 600, 300);
   
  if (spaceData){
    for (var i = 0; i < spaceData.people.length; i++){      
      
      xpos = array[i][0];
      ypos = array[i][1];

      fill(255);
      text(spaceData.people[i].craft, xpos, ypos);
      text(spaceData.people[i].name, xpos, ypos+15);
      image(astronaut, xpos-15, ypos + 3, 40, 40);     
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
    noStroke();
    let sx = map(this.x/this.z, 0, 1, 0, width);
    let sy = map(this.y/this.z, 0, 1, 0, height);
    let r = map(this.z, 0, width, 2, 0);
    ellipse(sx, sy, r, r);
  }
}


