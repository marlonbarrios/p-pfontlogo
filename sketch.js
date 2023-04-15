let rotationEnabled = false;
let toggleLeftArc = true;
let semiCircleDegrees = 200;
let numSemiCircles = 15;
let rotationSpeed = 0.001; // Speed of rotation
let rotationAngle = 0; // Accumulated rotation angle
let colorPicker; // Color picker for semi-circles

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorPicker = createColorPicker(154,152,152); // Create color picker with default color red
  colorPicker.position(10, 10); // Position the color picker
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  // Map mouseX to the transparency of the background (10 to 255)
  let transparency = map(abs(mouseX - windowWidth / 2), 0, windowWidth / 2, 250, 10);
  background(250, transparency);

  let scaleFactor = 1 / 2;
  let rectHeight = (windowHeight / 3) * scaleFactor;
  let rectWidth = rectHeight / 2;
  let spacing = rectWidth;
  let arcSize = rectHeight;
  let startX = (windowWidth - (rectWidth + spacing)) / 2; // Center the rectangles

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
  rect(startX + rectWidth + spacing, (windowHeight - rectHeight) / 2, rectWidth, rectHeight);

  // Draw top-left semicircle
  push();
  translate(toggleLeftArc ? startX + rectWidth : startX, (windowHeight - rectHeight) / 2);
  rotate(-rotationAngle);
  arc(0, 0, arcSize, arcSize, 3 * PI / 2, 5 * PI / 2);
  noFill();
  strokeWeight(4);
  circle(0, 0, arcSize);
  pop();

  // Draw top-right semicircle
  push();
  translate(startX + 2 * rectWidth + spacing, (windowHeight - rectHeight) / 2);
  rotate(rotationAngle);
  arc(0, 0, arcSize, arcSize, 3 * PI / 2, 5 * PI / 2);
  noFill();
  strokeWeight(5);
  circle(0, 0, arcSize);
  pop();

  // Draw plus "+" in the center
 
  textSize((rectHeight + 3) * scaleFactor * 1.5);
  textAlign(CENTER, CENTER);
  textFont('Helvetica');
  fill(0);
  text('+', windowWidth / 2 + spacing / 2, windowHeight / 2 + (rectHeight / 2) * scaleFactor);
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