let rotationEnabled = false;
let transparency = false;
let toggleLeftArc = true;
let showConsultingText = true;
let fillColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  fillColor = color(0);
  colorPicker = createColorPicker(fillColor);
  colorPicker.position(10, 10);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  fillColor = colorPicker.color();
  if (transparency) {
    background(255, 2);
  } else {
    background(255);
  }

  let rectHeight = windowHeight / 3; // Rectangle height is 1/3 of the window height
  let rectWidth = rectHeight / 2;
  let spacing = rectWidth; // Spacing between rectangles and semicircles
  let arcSize = rectHeight;

  let startX = (windowWidth - (1 * rectWidth + 2 * spacing)) / 2; // Center the first rectangle

  // Draw rectangles
  stroke(fillColor)
  fill(fillColor);
  rect(startX, (windowHeight - rectHeight) / 2, rectWidth, rectHeight);
  rect(startX + rectWidth + spacing, (windowHeight - rectHeight) / 2, rectWidth, rectHeight);

  let rotation = rotationEnabled ? frameCount * -0.01 : 0;

  // Draw top-left semicircle
  push();
  if (toggleLeftArc) {
    translate(startX + rectWidth, (windowHeight - rectHeight) / 2);
  } else {
    translate(startX, (windowHeight - rectHeight) / 2);
  }
  rotate(-rotation);
  fill(fillColor);
  arc(0, 0, arcSize, arcSize, PI / 2, 3 * PI / 2);
  noFill();
  stroke(fillColor)
  circle(0, 0, arcSize);
  pop();

  // Draw top-right semicircle
  push();
  translate(startX + 2 * rectWidth + spacing, (windowHeight - rectHeight) / 2);
  rotate(-rotation);
  fill(fillColor);
  arc(0, 0, arcSize, arcSize, 3 * PI / 2, 5 * PI / 2);
  noFill();
  stroke(fillColor)
  circle(0, 0, arcSize);
  pop();

  // Draw plus "+" in the center
  textSize(rectHeight / 1);
  textAlign(CENTER, CENTER);
  textFont('Helvetica');
  fill(fillColor);
  text('+', windowWidth / 2, windowHeight / 2 + rectHeight / 6);

  if (showConsultingText) {
    // Draw "consulting" text below rectangles
    textSize(rectHeight / 3);
    textAlign(CENTER, CENTER);
    textFont('Helvetica');
    fill(fillColor);
    text('consulting', windowWidth / 2, (windowHeight + rectHeight) / 2 + rectHeight / 5);
  }
}

function keyPressed() {
  if (key === ' ') {
    rotationEnabled = !rotationEnabled;
  }
  
  if (key === 't' || key === 'T') {
    transparency = !transparency;
  }

  if (key === 'i' || key === 'I') {
    toggleLeftArc = !toggleLeftArc;
  }

  if (key === 'c' || key === 'C') {
    showConsultingText = !showConsultingText;
  }
}
