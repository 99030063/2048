let grid;
let grid_new;
let score = 0;

let colorsSizes = {
  "2": {
    size: 64,
    color: "#EEE4DA",
    textColor: 0
  },
  "4":{
    size: 64,
    color: "#EDE0C8",
    textColor: 0
  },
  "8":{
    size: 64,
    color: "#F2B179",
    textColor: 255
  },
  "16":{
    size: 64,
    color: "#F59563",
    textColor: 255
  },
  "32":{
    size: 64,
    color: "#f67c5f",
    textColor: 255
  },
  "64":{
    size: 64,
    color: "#f65e3b",
    textColor: 255
  },
  "128":{
    size: 48,
    color: "#edcf72",
    textColor: 255
  },
  "256":{
    size: 48,
    color: "#edcc61",
    textColor: 255
  },
  "512":{
    size: 48,
    color: "#edc850",
    textColor: 255
  },
  "1024":{
    size: 40,
    color: "#edc53f",
    textColor: 255    
  },
  "2048":{
    size: 40,
    color: "#edc22e",
    textColor: 255
  }
}

function isGameWon(){
  for(let i = 0; i < 4; i++){
    for(let j = 0; j < 4; j++){
      if(grid[i][j] == 2048){
        return true;
      }
    }
  }
  return false;
}

function isGameOver(){
  for(let i = 0; i < 4; i++){
    for(let j = 0; j < 4; j++){
      if(grid[i][j] == 0){
        return false;
      }
      if(j !== 3 && grid[i][j] === grid[i][j+1]){
        return false;
      }
      if(i !== 3 && grid[i][j] === grid[i+1][j]){
        return false;
      }
    }
  }
  return true;
}


function blankGrid(){
return [
    [0, 0, 0, 0],      
    [0, 0, 0, 0],
    [0, 0, 0, 0], 
    [0, 0, 0, 0]
  ];
}


function setup(){
  createCanvas(400, 400);
  noLoop();
  grid = blankGrid();
  grid_new = blankGrid();
  addNumber()
  addNumber()
  updateCanvas();
}

function addNumber() {
  let options = [];
  for(let i = 0; i<4; i++){
    for(let j = 0; j<4; j++){
      if (grid[i][j] === 0) {
        options.push({
          x: i,
          y: j
        });
      }
    }
  }

  if (options.length > 0);{
    let spot = random (options);
    let r = random(1)
    grid[spot.x][spot.y] = (r> 0.1 ? 2 : 4);
    grid_new[spot.x][spot.y] = 1;
  }
}


function compare(a,b){
  for(let i = 0; i <4 ; i++) {
    for(let j = 0; j < 4; j++) {
      if (a[i][j] !== b[i][j]){
        return true;
      }
    }
  }
  return false;
}



function copyGrid(grid){
  let extra = blankGrid();
  for(let i = 0; i < 4; i++) {
    for(let j = 0; j < 4; j++) {
      extra[i][j] = grid[i][j];
    }
  }
  return extra;
}

function flipGrid(grid){
  for (let i = 0; i < 4; i++){
    grid[i].reverse();
  }
  return grid
}


function transposeGrid(grid, direction){
  let newGrid = blankGrid();
  for (let i = 0; i < 4; i++){
    for (let j = 0; j < 4; j++){
      if (direction == 1){
        newGrid[i][j] = grid[j][i];
      } else {
        newGrid[j][i] = grid[i][j];
      }
    }
  }
  return newGrid;
}
//one move
function keyPressed(){
  let flipped = false;
  let rotated = false;
  let played = true;
  
  if (keyCode === DOWN_ARROW){
    //DO NOTHING
  }else if (keyCode === UP_ARROW){
    grid = flipGrid(grid)
    flipped=true;
  }else if(keyCode === RIGHT_ARROW){
    grid = transposeGrid(grid, 1);
    rotated = true;
  }else if (keyCode === LEFT_ARROW){
    grid = transposeGrid(grid, 1);
    grid = flipGrid(grid);
    rotated = true;
    flipped = true
  } else {
    played = false;
  }

  if (played){
    let past = copyGrid(grid)
    for (let i = 0; i<4; i++){
      grid[i] = operate(grid[i])
    }
    let changed = compare(past, grid);
    
    if (flipped){
      flipGrid(grid);
    }
    if (rotated){
      grid = transposeGrid(grid, -1);
    }

    if (changed){
      addNumber();
    }
    updateCanvas();

    let gameOver = isGameOver();
    if (gameOver){
      console.log ("game over")
    }

    let gameWon = isGameWon();
    if (gameWon){
      console.log("WINNER")
    }
  }
}

function operate(row){
  row = slide(row)
  row = combine(row)
  row = slide(row)
  return row;
}

function updateCanvas(){
  background(255);
  drawGrid();
  select("#score").html(score)
}


function slide (row){
  let arr = row.filter (val => val);
  let missing = 4 - arr.length;
  let zeros = Array(missing).fill(0);
  arr = zeros.concat(arr);
  return arr;
}

function combine(row){
  for(let i = 3; i >= 1; i--) {
    let a = row[i];
    let b = row[i - 1];
    if (a == b){
      row[i] = a + b;
      score += row[i];
      row [i - 1] = 0;
    }
  }
  return row;
}

function drawGrid(){
  let w = 100;
  for(let i = 0; i<4; i++){
    for(let j = 0; j<4; j++){
      noFill()
      strokeWeight(1)
      let val = grid[i][j];
      let s = val.toString();
      if(grid_new[i][j] === 1){
        stroke(200, 0, 200);
        strokeWeight(5);
        grid_new[i][j] = 0;
      } else {
        stroke(0);
        strokeWeight(1);
      }
      if (val != 0){
        fill(colorsSizes[s].color);
      } else {
        noFill()
      } 
      rect(i * w, j * w, w, w, 20)
      if (val !== 0){
        textAlign(CENTER,CENTER);
        noStroke()
        fill(colorsSizes[s].textColor)
        textSize(colorsSizes[s].size);
        text(val, i * w + w / 2, j * w + w / 2);
      }
    }
  }
}
