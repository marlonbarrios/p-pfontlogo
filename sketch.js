let rotationEnabled = false;
let toggleLeftArc = true;
let semiCircleDegrees = 200;
let numSemiCircles = 15;
let rotationSpeed = 0.001; // Speed of rotation
let rotationAngle = 0; // Accumulated rotation angle
let colorPicker; // Color picker for semi-circles
let circleX; // X position of the random circle
let circleY; // Y position of the random circle




function setup() {
  createCanvas(windowWidth, windowHeight);
  colorPicker = createColorPicker(154,152,152); // Create color picker for semi-circles
  colorPicker.position(10, 10); // Position the color picker for semi-circles
  
  // Calculate random position for the circle
  circleX = random(100, width - 200);
  circleY = random(100, height - 200);
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}



function draw() {
  // Set background color based on bgColorPicker value
  // Map mouseX to the transparency of the background (10 to 255)
  let transparency = map(abs(mouseX - windowWidth / 2), 0, windowWidth / 2, 250, 10);
  background(0, transparency);

 

  let scaleFactor = 1 / 2;
  let rectHeight = (windowHeight / 3) * scaleFactor;
  let rectWidth = rectHeight / 2;
  let spacing = rectWidth;
  let arcSize = rectHeight;
  let startX = (windowWidth - (rectWidth + spacing)) / 2; // Center the rectangles


  stroke(218, 165, 32)
  strokeWeight(1)
     line(0,mouseY+ 100, windowWidth, mouseY+ 100)
  
     line(0,mouseY+ 150, windowWidth, mouseY+150)
    line(0,mouseY+ 100, windowWidth, mouseY+ 100)
  
     line(mouseX+ 80,0, mouseX+ 80, windowHeight)
     line(mouseX- 80,0, mouseX- 80, windowHeight)
     line(mouseX,0, mouseX, windowHeight)
   
     strokeWeight(4)
     line(0,mouseY, windowWidth, mouseY)
  // ... (rest of the draw() function)
  // Update the rotation angle
  rotationAngle += rotationSpeed;

  // Map mouseY to the number of concentric arcs (12 to 60)
  numSemiCircles = round(map(mouseY, height / 3, height, 12, 60));

  // Draw semi-circles
  push(); // Isolate translation for the arcs
  translate(mouseX, mouseY); // Use mouse coordinates as center
  stroke(colorPicker.color()); // Set stroke color based on color picker value
  for (let i = 1; i <= numSemiCircles; i++) {
    noFill();
    push();
    rotate(rotationAngle * i);
    drawSemiCircle(12 * i);
    pop();
  }
  pop(); // End isolation


 

  // Draw rectangles
  fill(218, 165, 32);
  stroke(218, 165, 32);
  rect(startX, (windowHeight - rectHeight) / 2, rectWidth, rectHeight);
  fill(0);
  
  fill(218, 165, 32);
  rect(startX + rectWidth + spacing, (windowHeight - rectHeight) / 2, rectWidth, rectHeight);

 // Draw top-left semicircle
 push();
 stroke(218, 165, 32);
 translate(toggleLeftArc ? startX + rectWidth : startX, (windowHeight - rectHeight) / 2);
 rotate(-rotationAngle);
 arc(0, 0, arcSize, arcSize, 3 * PI / 2, 5 * PI / 2);
 noFill();
 strokeWeight(3);
 circle(0, 0, arcSize);
 pop();

  // Draw top-right semicircle
  push();
  translate(startX + 2 * rectWidth + spacing, (windowHeight - rectHeight) / 2);
  rotate(rotationAngle);
  arc(0, 0, arcSize, arcSize, 3 * PI / 2, 5 * PI / 2);
  noFill();
  strokeWeight(3);
  circle(0, 0, arcSize);
  pop();

  // Draw plus "+" in the center
 
  textSize((rectHeight + 3) * scaleFactor * 1.5);
  textAlign(CENTER, CENTER);
  textFont('Helvetica');
  fill(218, 165, 32);
  text('+', windowWidth / 2 + spacing / 2, windowHeight / 2 + (rectHeight / 2) * scaleFactor);
   // Draw the circle at the random position
   fill(colorPicker.color()); // Set the fill color for the circle
   noStroke();
   circle(circleX, circleY, 30); // Draw the circle
 noFill()
 stroke(colorPicker.color())
   circle(circleX, circleY, 50); // Draw the circle
    strokeWeight(1)
   line(circleX, circleY, mouseX, mouseY)
   stroke(218, 165, 32)
   fill(218, 165, 32); // Set the fill color for the circle
   noStroke();
   circle(mouseX, mouseY, 30); // Draw the circle

 


}
  
  function drawSemiCircle(radius, x = 0, y = 0) {
  let weight = map(radius, 0, 12 * numSemiCircles, 1, 6);
  strokeWeight(weight);
  arc(0, 0, radius * 2, radius * 1, 0, semiCircleDegrees);
  }
  
  function keyPressed() {
  if (key === ' ') {
  rotationEnabled = !rotationEnabled;
  }
  if (key === 'i' || key === 'I') {
  toggleLeftArc = !toggleLeftArc;
  }
  if (key === 's' || key === 'S') {
  saveCanvas('logo', 'png');
  }
  }


  
  // Additional function to handle mouse movement
  function mouseMoved() {
  // Check mouse position and set rotation speed and direction
  if (mouseX > windowWidth / 2 + 10) {
  rotationSpeed = map(mouseX, windowWidth / 2, windowWidth, 0, 0.005); // Rotate clockwise
  } else if (mouseX < windowWidth / 2 - 10) {
  rotationSpeed = map(mouseX, 0, windowWidth / 2, -0.005, 0); // Rotate counter-clockwise
  } else {
  rotationSpeed = 0.0001; // Pause rotation
  }
  }