var matrix;
var ia;
var count = 0;

function setup() {
  createCanvas(400, 400);
  matrix = new Matrix();
  matrix.init(400, 400);
  ia = new IA();
  ia.init(this, this.getBoard());
}

function draw() {
  background(0);
  if (matrix.getTurn() === 'X' && count++ === 0) ia.play(this.getBoard());
  else if (matrix.getTurn() === 'O') count = 0;
  else count++;
  matrix.show();
  if (matrix.checkIfGameEnded() || matrix.checkWinner().isWinner) {
    console.log("OKOK")
    this.restart();
  }
}


function mousePressed() {
  matrix.clicked(mouseX, mouseY);
  matrix.checkWinner();
}

function play(player, row, col) {
  console.log("222")
  matrix.click(player, row, col);
}

function getBoard() {
  return matrix.getBoard();
}

function restart() {
  matrix.init();
}
