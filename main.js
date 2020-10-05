var A = [];
var B = [];
var C = [];
var stack = [];
var num;
var sizeSlider;
var speedSlider;
var sizeText;
var speedText;

var numInput;
var startButt;

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
  //print(count, "count");
  if (count == 0) {
    return;
  }
  buildTower(count-1, p1, temp, p2);
  //move(p1, temp);
  stack.unshift([p1, temp]);
  buildTower(count-1, p2, p1, temp);
}
function setup() {
  createCanvas(windowWidth - 10, windowHeight - 10);
  background(0);
  strokeWeight(4);
  
  numInput = createInput();
  numInput.elt.setAttribute("placeholder", "num of circles");
  numInput.style("background : none");
  numInput.style("color : white");
  numInput.style("font : 600 30px arial");
  numInput.style("border-color : white");
  numInput.style("border-radius : 10px");
  numInput.style("border : 5px white solid");
  let w = numInput.elt.getBoundingClientRect().width;
  let h = numInput.elt.getBoundingClientRect().height;
  
  startButt = createButton("Start");
  startButt.style("background : none");
  startButt.style("color : white");
  startButt.style("border : 5px white solid");
  startButt.style("border-radius : 10px");
  startButt.style("font : 600 30px arial");
  let stButtW = startButt.elt.getBoundingClientRect().width;
  let stButtH = startButt.elt.getBoundingClientRect().height;
  startButt.position(width / 2 - stButtW / 2, height / 2 + 5);
  numInput.position(width / 2 - w / 2, height / 2 - h - 5);
  
  let hanoiText = createSpan("HANOI TOWER");
  hanoiText.style("color: white");
  hanoiText.style("background: none");
  hanoiText.style("font: 600 40px arial");
  w = hanoiText.elt.getBoundingClientRect().width;
  h = hanoiText.elt.getBoundingClientRect().height;
  hanoiText.position(width / 2 - w / 2, 10);
  
  let autor = createSpan("by Rodion Kunakbaev");
  autor.style("color: white");
  autor.style("background: none");
  autor.style("font: 600 20px arial");
  w = autor.elt.getBoundingClientRect().width;
  autor.position(width / 2 - w / 2, 10 + h );
  
  startButt.mousePressed(function() {
    print("pressed");
    if (numInput.value() > 1 && numInput.value() < 16) {
      print("OK");
      num = int(numInput.value());
      sizeSlider = createSlider(10, 100, width / (num * 3));
      h = sizeSlider.elt.getBoundingClientRect().height;
      sizeText = createSpan("size : 100.0");
      sizeText.style("color: white");
      sizeText.style("background: none");
      sizeText.style("font: 600 20px arial");
      w = sizeText.elt.getBoundingClientRect().width;
      sizeText.position(10, height - h);
      sizeSlider.position(10 + w + 10, height - h);


      speedSlider = createSlider(30, 99, 39);
      let h1 = speedSlider.elt.getBoundingClientRect().height;
      speedText = createSpan("speed : 60.0");
      speedText.style("color: white");
      speedText.style("background: none");
      speedText.style("font: 600 20px arial");
      w = speedText.elt.getBoundingClientRect().width;
      speedText.position(10, height - h - h1);
      speedSlider.position(10 + w + 10, height - h - h1);
      for (let i = num; i > 0; i--) {
        A.push(i);
      }
      drawTower(A, B, C);
      buildTower(num, 'A', 'B', 'C');
      sizeSlider.show();
      speedSlider.show();
      startButt.hide();
      numInput.hide();
    }
    else {
      let text = createSpan("num is to big or to low");
      text.style("background: none");
      text.style("font : 600 20px arial");
      text.style("color : white");
      //text.style("background: none");
      w = text.elt.getBoundingClientRect().width;
      text.position(width / 2 - w / 2, height / 2 + 5 + stButtW + 10);
      setTimeout(function() {
        text.style("transition : 1s");
        text.style("color : black");
        setTimeout(function() {
          text.remove();
        }, 1000);
      }, 1000);
    }
  });
}

function draw() {
  if (num != undefined) {
    numInput.elt.type = "number";
    numInput.elt.value = numInput.elt.value.replace('/\D/g', '');
    speedText.elt.innerHTML = "speed : " + (60 / (100 - speedSlider.value() )).toFixed(1);

    sizeText.elt.innerHTML = "size : " + sizeSlider.value().toFixed(1);

    if (frameCount % (100 - speedSlider.value()) == 0) {
      let elem = stack.pop();
      if (elem != undefined) {
        background(0);
        let from = elem[0];
        let to = elem[1];
        move(from, to);
        drawTower(A, B, C);
      }
    } 
  }
}
