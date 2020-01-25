function drawGrid(){
  let w = 100;
  for(let i = 0; i<4; i++){
    for(let j = 0; j<4; j++){
      noFill()
      strokeWeight(1)
      stroke(0)      
      rect(i * w, j * w, w, w)
      let val = grid[i][j];
      if (grid[i][j] !== 0){
        textAlign(CENTER,CENTER);
        textSize(64);
        fill(0);
        noStroke()
        text(val, i * w + w / 2, j * w + w / 2);
      }
    }
  }
}

function addNumber() {
  let options = [];
  for(let i = 0; i<4; i++){
    for(let j = 0; j<4; j++){
      if (grid[i][j] === 0) {
        options.push({
          x: i,
          y: j
        })
      }
    }
  }

if (options.length > 0);
let spot = random (options);
let r = random(1)
grid[spot.x][spot.y] = (r> 0.5 ? 2 : 4);
}