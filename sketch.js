
/*
Interactive generative design in p5.js by Marlon Barrios Solano  with the following features/elements:

Interactive elements, including the position of the mouse and color picker, influencing the visuals
Rotation of semi-circles based on the mouse's horizontal position
Adjustable transparency of the background using mouseX
Mapping mouseY to control the number of concentric semi-circles
Logo drawing made of rectangles, arcs, and text
Bulls-eye circle and line drawn from it to the mouseX, mouseY position
Press 'spacebar' to toggle rotation on/off
Press 's' or 'S' to save the canvas as a PNG image

Created in April 2023 for P+P Consulting Ontario, Canada
Be sute to have the p5.js library in the same folder as this sketch

*/
let rotationEnabled = true;
let semiCircleDegrees = 200;
let numSemiCircles = 15;
let rotationSpeed = 0.001; // Speed of rotation
let rotationAngle = 0; // Accumulated rotation angle
let colorPicker; // Color picker for semi-circles
let circleX; // X position of the random circle
let circleY; // Y position of the random circle
let wightLinesCiclesLogo = 5;
let transparency = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorPicker = createColorPicker(154, 152, 152); // Create color picker for semi-circles
  colorPicker.position(10, 10); // Position the color picker for semi-circles
  // Calculate random position for the circle
  circleX = random(100, width - 200);
  circleY = random(100, height - 200);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setup();
}

function draw() {
  // Set background color based on bgColorPicker value
  // Map mouseX to the transparency of the background (10 to 255)
  let transparency = map(abs(mouseX - windowWidth / 2), 0, windowWidth / 2, 250, 10);
  background(0, transparency);

  //sections of the whole design as functions
  drawMapLines()
  drawSemiCircles();
  lettersLogo()
  bullsEye()
  lineToCircle()
}

function bullsEye() {
  // Draw the circle at the random position
  fill(colorPicker.color()); // Set the fill color for the circle
  noStroke();
  circle(circleX, circleY, 30); // Draw the circle
  noFill()
  stroke(colorPicker.color())
  circle(circleX, circleY, 50); // Draw the circle
}

function lineToCircle() {
  strokeWeight(1)
  line(circleX, circleY, mouseX, mouseY)
  stroke(218, 165, 32)
  fill(218, 165, 32); // Set the fill color for the circle
  noStroke();
  circle(mouseX, mouseY, 30); // Draw the circle
}

function lettersLogo() {
  // Draw the logo
  let scaleFactor = 1 / 2;
  let rectHeight = (windowHeight / 3) * scaleFactor;
  let rectWidth = rectHeight / 2;
  let spacing = rectWidth;
  let arcSize = rectHeight;
  let startX = (windowWidth - (rectWidth + spacing)) / 2; // Center the rectangles
  // Draw rectangles
  noStroke();
  fill(218, 165, 32);
  rect(startX, (windowHeight - rectHeight) / 2, rectWidth, rectHeight);
  rect(startX + rectWidth + spacing, (windowHeight - rectHeight) / 2, rectWidth, rectHeight);
  // Draw top-left semicircle
  push();
  stroke(218, 165, 32);
  translate(startX + rectWidth, (windowHeight - rectHeight) / 2);
  rotate(-rotationAngle);
  arc(0, 0, arcSize, arcSize, 3 * PI / 2, 5 * PI / 2);
  noFill();
  strokeWeight(wightLinesCiclesLogo);
  circle(0, 0, arcSize);
  pop();

  // Draw top-right semicircle
  push();
translate(startX + 2 * rectWidth + spacing, (windowHeight - rectHeight) / 2);
rotate(rotationAngle);
arc(0, 0, arcSize, arcSize, 3 * PI / 2, 5 * PI / 2);
noFill();
strokeWeight(wightLinesCiclesLogo);
stroke(218, 165, 32);
circle(0, 0, arcSize);
pop();
textSize((rectHeight + 3) * scaleFactor * 1.5);
textAlign(CENTER, CENTER);
textFont('Helvetica');
fill(218, 165, 32);
text('+', windowWidth / 2 + spacing / 2, windowHeight / 2 + (rectHeight / 2) * scaleFactor);

}

function drawSemiCircles() {
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
pop(); // End isolation of translation for the arcs
}

function drawSemiCircle(radius, x = 0, y = 0) {
let weight = map(radius, 0, 12 * numSemiCircles, 1, 6);
strokeWeight(weight);
arc(0, 0, radius * 2, radius * 1, 0, semiCircleDegrees);
}

function drawMapLines() {
stroke(218, 165, 32)
strokeWeight(4)
line(0, mouseY, windowWidth, mouseY)
strokeWeight(1)
line(0, mouseY + 100, windowWidth, mouseY + 100)
line(0, mouseY + 150, windowWidth, mouseY + 150)
line(0, mouseY + 100, windowWidth, mouseY + 100)
line(mouseX + 80, 0, mouseX + 80, windowHeight)
line(mouseX - 80, 0, mouseX - 80, windowHeight)
line(mouseX, 0, mouseX, windowHeight)
}

function keyPressed() {
if (key === ' ') {
rotationEnabled = !rotationEnabled;
}
if (key === 's' || key === 'S') {
saveCanvas('logo', 'png');
}
}

// Additional function to handle mouse movement
function mouseMoved() {
// Check mouse position and set rotation speed and direction
if (rotationEnabled) {
if (mouseX > windowWidth / 2 + 10) {
rotationSpeed = map(mouseX, windowWidth / 2, windowWidth, 0, 0.005); // Rotate clockwise
} else if (mouseX < windowWidth / 2 - 10) {
rotationSpeed = map(mouseX, 0, windowWidth / 2, -0.005, 0); // Rotate counter-clockwise
} else {
rotationSpeed = 0; // Pause rotation
}
} else {
rotationSpeed = 0; // Pause rotation
}
}
