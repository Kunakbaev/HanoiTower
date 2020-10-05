var A = [];
var B = [];
var C = [];
var stack = [];
var num = 12;
var sizeSlider;
var speedSlider;

function drawTower(a, b, c) {
  let h = sizeSlider.value();
  let step = num * h;
  let x;
  let y;
  x = (width - step * 3) / 2;
  y = height / 2 + num * h / 2 - h;
  for (let i = 1; i < a.length + 1; i ++) {
    rect(x + (num * h - h * a[i - 1]) / 2, y, a[i - 1] * h, h);
    y -= h;
  }
  x += step;
  y = height / 2 + num * h / 2 - h;
  for (let i = 1; i < b.length + 1; i ++) {
    rect(x + (num * h - h * b[i - 1]) / 2, y, b[i - 1] * h, h);
    y -= h;
  }
  x += step;
  y = height / 2 + num * h / 2 - h;
  for (let i = 1; i < c.length + 1; i ++) {
    rect(x + (num * h - h * c[i - 1]) / 2, y, c[i - 1] * h, h);
    y -= h;
  }
}

function move(from, to) {
  let val = 0;
  if (from == 'A') {
    val = A.pop();
  }
  if (from == 'B') {
    val = B.pop();
  }
  if (from == 'C') {
    val = C.pop();
  }
  
  if (to == 'A') {
    val = A.push(val);
  }
  if (to == 'B') {
    val = B.push(val);
  }
  if (to == 'C') {
    val = C.push(val);
  }
  
  //drawTower(A, B, C);
}

function buildTower(count, p1, p2, temp) {
  if (count == 0) {
    return;
  }
  buildTower(count-1, p1, temp, p2);
  //move(p1, temp);
  stack.unshift([p1, temp]);
  buildTower(count-1, p2, p1, temp);
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  strokeWeight(4);
  for (let i = num; i > 0; i--) {
    A.push(i);
  }
  
  let hanoiText = createSpan("HANOI TOWER");
  hanoiText.style("color: white");
  hanoiText.style("background: none");
  hanoiText.style("font: 600 40px arial");
  let w = hanoiText.elt.getBoundingClientRect().width;
  let h = hanoiText.elt.getBoundingClientRect().height;
  hanoiText.position(width / 2 - w / 2, 10);
  
  let autor = createSpan("by Rodion Kunakbaev");
  autor.style("color: white");
  autor.style("background: none");
  autor.style("font: 600 20px arial");
  w = autor.elt.getBoundingClientRect().width;
  autor.position(width / 2 - w / 2, 10 + h );
  
  sizeSlider = createSlider(10, 100, width / (num * 3));
  h = sizeSlider.elt.getBoundingClientRect().height;
  sizeSlider.position(0, height - h);
  speedSlider = createSlider(30, 99, 80);
  let h1 = speedSlider.elt.getBoundingClientRect().height;
  speedSlider.position(0, height - h - h1);
  drawTower(A, B, C);
  
  buildTower(num, 'A', 'B', 'C');
}

function draw() {
  if (frameCount % (100 - speedSlider.value()) == 0) {
    let elem = stack.pop();
    print(elem);
    if (elem != undefined) {
      background(0);
      let from = elem[0];
      let to = elem[1];
      move(from, to);
      drawTower(A, B, C);
    }
  }
}
