
//one move
function keyPressed(){
  if (key = " "){

    let past = copyGrid(grid);
    for (let i = 0; i<4; i++){
      grid[i] = operate(grid[i])
    }
    let changed = compare(past, grid)
    if (changed){
      addNumber();
    }
  }
}