function slide (row){
  let arr = row.filter (x => x);
  let missing = 4 - arr.length;
  let zeros = Array(missing).fill(0);
  arr = zeros.concat(arr);
  return arr;
}

function combine(row){
  for(let i = 3; i>= 1; i--) {
    let a = row[i];
    let b = row[i - 1];
    if (a == b){
      row[i] = a + b;
      row [i - 1] == 0
    }
  }
  return row;
}

function operate(row){
  row = combine(row)
  row = slide(row)
  return row;
}

function copyGrid(grid){
  let extra = [
    [0, 0, 0, 0],      
    [0, 0, 0, 0],
    [0, 0, 0, 0], 
    [0, 0, 0, 0]
  ];
  for(let i = 0; i<4; i++){
    for(let j = 0; j<4; j++){
      extra[i][j] = grid[i][j];
    }
  }
  return extra
}

function compare (a,b) {
  for(let i = 0; i<4; i++){
    for(let j = 0; j<4; j++){
      if (a[i][j] != b[i][j]){
      return true
      }
    }
  }
  return false
}