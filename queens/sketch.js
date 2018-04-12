var img_queen;

function preload() {
  img_queen = loadImage("daqueen.png");
}

function setup() {
  var width = 3000;
  var height =  3000;
  createCanvas(width,height);
  var sides = 80;
  var startTime = 0;
  var endTime;
  var n = 29;
  /*
  for (var n = 0; n<=30; n++) {
  var board = new Board(n,sides,200,200,img_queen);
    startTime = millis();
    board.solve();
    endTime = millis();
    print("Iteration #",n," solved in ",(endTime-startTime), " miliseconds.");
  }
  */
  var board = new Board(n,sides,200,200,img_queen);
    startTime = millis();
    board.solve();
    board.draw();
}

function draw() {
//image(img_queen,0,0);
}
