function Board (n,sides,x,y,img_queen) {
  // private :
  var myQueen = img_queen;
  var size = n;
  var make2dArray = function (s) {
    var board = new Array(s);
    for (var i=0; i<board.length; i++) board[i] = new Array(s);
    return board;
  }
  var toCoord = function(notation) {
    var coord = new Array(2);
    notation = notation.toLowerCase();
    var n1 = notation.charCodeAt(0);
    var n2 = notation.charCodeAt(1);
      if ((n1 >= 97 && n1<= 97+size-1)&&(n2 >= 49 && n2 <= 49+size-1)) {
       // 0 x, 1 y, range between 0-7
        coord[0] = n1 - 97;
        coord[1] = n2 - 49;
      //  print(coord[0]," ",coord[1]);
    } else throw "notation not valid";
    return coord;
  }
  var isEmpty = function(column,row) {
      return (board[column][row] == null);
  }
  var board = make2dArray(size);
  var slashCount = make2dArray(size);
  var backslashCount = make2dArray(size);
  //generating slashCount and backslashCount references
  for (var i = 0; i<size; i++) {
      for (var j = 0; j<size; j++) {
          backslashCount[i][j] = i+j;
          slashCount[i][j] = j-i+(size-1);
      }
  }

  var slashTrack = new Array((size)*2);
  var backslashTrack = new Array((size)*2);
  var rowTrack = new Array(size);
  slashTrack.fill(0);
  backslashTrack.fill(0);
  rowTrack.fill(0);
  //public :

  this.printStatus = function() {

    for (var i = 0; i<size; i++) {
        var ouch = "";
        for (var j = 0; j<size; j++) {
            ouch = ouch + slashCount[i][j].toString() + " ";
        }
        print(ouch);
    }
    print("\n");
    for (var i = 0; i<size; i++){
        var ouch = "";
        for (var j = 0; j<size; j++) {
            ouch = ouch + backslashCount[i][j].toString() + " ";
        }
        print(ouch);
    }
    print("Slash : ");
    var nyan = "";
    for(var i=0; i<(size)*2-1; i++) {
        nyan = nyan + slashTrack[i].toString() + " ";
    }
    print(nyan);
    print("backslashTrack : ");
    nyan = "";
    for(var i=0; i<(size)*2-1; i++) {
        nyan = nyan + backslashTrack[i].toString() + " ";
    }
    print(nyan);
    print("rowTrack : ");
    nyan = "";
    for(var i=0; i<size; i++) {
        nyan = nyan + rowTrack[i].toString() + " ";
    }
    print(nyan);
  }
  this.addQueen = function(column,row) {
    if (column < size && row < size && isEmpty(column,row)) {
      var q = new Queen(sides,x+sides*(column),y+sides*(size-1-row),myQueen);
      board[column][row] = q;
      rowTrack[row] = 1;
      slashTrack[slashCount[column][row]] = 1;
      backslashTrack[backslashCount[column][row]] = 1;
    //  print(slashCount[column][row]," ",backslashCount[column][row]);
    }
  }
  this.addQueenByNotation = function(notation) {
    var coord = toCoord(notation);
    this.addQueen(coord[0],coord[1]);
  }
  this.removeQueen = function(column, row) {
    if (board[column][row] !== null) {
        board[column][row] = null;
        rowTrack[row] = 0;
        slashTrack[slashCount[column][row]] = 0;
        backslashTrack[backslashCount[column][row]] = 0;
    }
  }
  this.removeQueenByNotation = function(notation) {
      var coord = toCoord(notation);
      this.removeQueen(coord[0],coord[1]);
      this.draw();
  }
  this.draw = function() { //acts like drawBoard()
    var boxCounter = 0;
    for(var i = (y + sides*(size-1)); i >= y; i = i - sides) {
      for (var j = x; j < x+(sides*size); j= j+sides) {
          if (boxCounter % 2 === 0) {stroke(0);fill(113,49,10);}
          else {stroke(0);fill(224,200,166);}
          rect(j,i,sides,sides);
          boxCounter++;
      }
        boxCounter = (size % 2 === 0 ?  boxCounter+1 : boxCounter);
    }
    for (var i = 0; i<size; i++) {
        for (var j = 0 ; j<size; j++) {
            if(!isEmpty(i,j)) board[i][j].place();
        }
    }
  }
  this.isSafe = function(column,row) {
      if ((slashTrack[slashCount[column][row]] === 1) ||
        (backslashTrack[backslashCount[column][row]] === 1) ||
        (rowTrack[row]===1)) return false;
      return true;
  }
  this.backtrack = function(currentCol) {
      if (currentCol >= size) return true;
      for (var currentRow = 0; currentRow<size; currentRow++) {
          if (this.isSafe(currentCol,currentRow)) {
                this.addQueen(currentCol,currentRow);
                if (this.backtrack(currentCol+1)) return true;
                this.removeQueen(currentCol,currentRow);
          }
        }
        return false;
  }
  this.solve = function() {
    this.backtrack(0);
  }

}
