let gird;
let newGrid;
let cols; 
let rows;
let rez = 20;

function setup() {
  createCanvas(displayWidth, displayHeight);
  fullscreen(true);
  noCursor();
  cols = round(width/rez);
  rows = round(height/rez);
  if (cols % rez != 0) cols++;
  if (rows % rez != 0) rows++;
  grid = array2d(cols, rows);
  newGrid = array2d(cols, rows);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = round(random(0.55));
    }
  }
  frameRate(10);
}

function draw() {
  background(51);
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[0].length; j++) {
      if (grid[i][j] == 1) {
          fill(255);
          } else {
            noFill();
      }
      rect(i * rez, j * rez, rez, rez, rez/5);
    }
  }
  generate();
}

array2d = function(w, h) {
  let arr = new Array(w);
  for (var i = 0; i < w; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

generate = function() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      state = fate(i, j);
      newGrid[i][j] = state;
    }
  }
  grid = newGrid;
}

fate = function(x, y) {
  // ncount for neighbour count
  sum = count(x, y);
  if (sum == 2 && grid[x][y] == 1) return 1;
  else if (sum == 3) return 1;
  else return 0;
}

count = function(x, y) {
  ncount = 0;
  for (var i = -1; i < 2; i++) {
    for (var j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      ncount += grid[col][row];
    }
  }
  ncount -= grid[x][y];
  return ncount;
}