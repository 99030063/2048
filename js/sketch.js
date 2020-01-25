function setup(){
  createCanvas(400, 400);
  grid = [
    [0, 0, 0, 0],      
    [0, 0, 0, 0],
    [0, 0, 0, 0], 
    [0, 0, 0, 0]
  ];
  // console.table(grid);
  addNumber()
  addNumber()
  // console.table(grid);
}



function draw(){
  background(255);
  drawGrid();
}

