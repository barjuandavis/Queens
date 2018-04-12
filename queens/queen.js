function Queen (sides,x,y,img_queen) {
  this.size = sides-2;
  this.x = x;
  this.y = y;
  this.checked = false;
  this.img = img_queen;
  this.flipCheck = function () {this.checked = !this.checked;}
  this.getType = function () {return 'q';}
  this.setX = function (x) {this.x = x;}
  this.setY = function (y) {this.y = y;}
  this.place = function () {
    image(this.img, this.x, this.y, this.size, this.size);
  }
}
