const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let context = canvas.getContext('2d');

// context.fillStyle = 'rgba(255,0,0,0.5)';
// context.fillRect(100, 100, 100, 100);
// context.fillStyle = 'rgba(0,0,255,0.5)';
// context.fillRect(400, 100, 100, 100);
// context.fillStyle = 'rgba(0,255,0,0.5)';
// context.fillRect(300, 300, 100, 100);

// Line
// context.beginPath();
// context.moveTo(50, 300);
// context.lineTo(300, 100);
// context.lineTo(400, 300);
// context.strokeStyle = '#fa34a3';
// context.stroke();

// Arc / Circle
// context.beginPath();
// context.arc(300, 300, 30, 0, Math.PI * 2, false);
// context.strokeStyle = 'blue';
// context.stroke();

// using for loop for more circle in window
// for (let i = 0; i < 50; i++) {
//   let x = Math.random() * window.innerWidth;
//   let y = Math.random() * window.innerHeight;
//   context.beginPath();
//   context.arc(x, y, 30, 0, Math.PI * 2, false);
//   context.strokeStyle = 'blue';
//   context.stroke();
// }

const mouse = {
  x: undefined,
  y: undefined,
};

let maxRadius = 40;
// let minRadius = 2;
const colorArray = ['#2C3E50', '#E74C3C', '#ECF0F1', '#349BDB', '#2980B9'];

addEventListener('mousemove', function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function () {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // context.strokeStyle = 'blue';
    // context.stroke();
    context.fillStyle = this.color;

    context.fill();
  };

  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    // interactivity
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  };
}

// for (let i = 0; i < 800; i++) {
//   let radius = Math.random() * 3 + 1;
//   let x = Math.random() * (innerWidth - radius * 2) + radius;
//   let y = Math.random() * (innerHeight - radius * 2) + radius;
//   let dx = Math.random() - 0.5;
//   let dy = Math.random() - 0.5;
//   circleArray.push(new Circle(x, y, dx, dy, radius));
// }

let circleArray = [];

function init() {
  circleArray = [];
  for (let i = 0; i < 800; i++) {
    let radius = Math.random() * 3 + 1;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = Math.random() - 0.5;
    let dy = Math.random() - 0.5;
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();
init();
