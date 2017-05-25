var canvas = document.getElementById("board")
var ctx = canvas.getContext("2d")
var clear = window.getComputedStyle(canvas).getPropertyValue('background-color')
var width = 10
var height = 20
var tilesz = 24
canvas.width = width * tilesz
canvas.height = height * tilesz

var board = []
for(var row = 0; row < 20; row++){
  board[row] = []
  for(var tile = 0; tile < 10; tile++){
    board[row][tile] = ""
  }
}

function newPiece(){
  var p = pieces[parseInt(Math.random() * pieces.length, 10)]
  return new Piece(p[0], p[1])
}

function drawSquare(x, y) {
  ctx.fillRect(x * tilesz, y * tilesz, tilesz, tilesz)
  ss = ctx.strokeStyle
  ctx.strokeStyle = "#555"
  ctx.strokeRect(x * tilesz, y * tilesz, tilesz, tilesz)
  ctx.strokeStyle = "#888"
  //ctx.strokeRect(x * tilesz + 3*tilesz/8, y * tilesz + 3*tilesz/8, tilesz/4,
    //tilesz/4)
  ctx.strokeStyle = ss
}

function Piece(patterns, color){
  this.pattern = patterns[0]
  this.patterns = patterns
  this.patterni = 0

  this.color = color

  this.x = width/2-parseInt(Math.ceil(this.pattern.length/2), 10)
  this.y = -2
}

Piece.prototype.rotate = function(){
  var nextpat = this.patterns[(this.patterni + 1) % this.patterns.length]
  var nudge = 0
  if(this._collides(0, 0, nextpat)){
    nudge = this.x > width / 2 ? -1 : 1
  }

  if(!this._collides(nudge, 0, nextpat)){
    this.undraw()
    this.x += nudge
    this.patterni = (this.patterni + 1) % this.patterns.length
    this.pattern = this.patterns[this.patterni]
    this.draw()
  }
}

var WALL = 1
var BLOCK = 2
Piece.prototype._collides = function(dx, dy, pat){
  for(var ix = 0; ix < pat.length; ix++){
    for(var iy = 0; iy < pat.length; iy++){
      if(!pat[ix][iy]){
        continue
      }
      var x = this.x + ix + dx
      var y = this.y + iy + dy
      if(y >= height || x < 0 || x >= width){
        return WALL
      }
      if(y < 0){
        continue
      }
      if(board[y][x] !== ""){
        return BLOCK
      }
    }
  }
  return 0
}

Piece.prototype.down = function(){
  if(this._collides(0, 1, this.pattern)){
    this.lock()
    piece = newPiece()
  } else {
    this.undraw()
    this.y++
    this.draw()
  }
}

Piece.prototype.moveRight = function(){
  if(!this._collides(1, 0, this.pattern)){
    this.undraw()
    this.x++
    this.draw()
  }
}

Piece.prototype.moveLeft = function(){
  if(!this._collides(-1, 0, this.pattern)){
    this.undraw()
    this.x--
    this.draw()
  }
}

var lines = 0
var score = 0
var done = false
Piece.prototype.lock = function(){
  for(var ix = 0; ix < this.pattern.length; ix++){
    for(var iy = 0; iy < this.pattern.length; iy++){
      if(!this.pattern[ix][iy]){
        continue
      }
      if(this.y + iy < 0){
        alert("You're done!\n\nYour score: " + score)
        done = true
        return
      }
      board[this.y + iy][this.x + ix] = this.color
    }
  }

  var nlines = 0
  for(var y = 0; y < height; y++){
    var line = true
    for(var x = 0; x < width; x++){
      line = line && !board[y][x]
    }
    if(line){
      for(var y2 = y; y2 > 1; y2--){
        for(var x = 0; x < width; x++){
          board[y2][x] = board[y2-1][x]
        }
      }
      for(var x = 0; x < width; x++){
        board[0][x] = false
      }
      nlines++
    }
  }

  if(nlines > 0){
    lines += nlines
    drawBoard()
    levelUp()
    $('.lines').text('Lines: ' + lines)
    if(nlines == 1){
      score += 40
    }
    if(nlines == 2){
      score += 100
    }
    if(nlines == 3){
      score += 300
    }
    if(nlines == 4){
      score += 1200
    }
    $('.score').text('Score: ' + score)
  }
}

Piece.prototype._fill = function(color){
  fs = ctx.fillStyle
  ctx.fillStyle = color
  var x = this.x
  var y = this.y
  for(var ix = 0; ix < this.pattern.length; ix++){
    for(var iy = 0; iy < this.pattern.length; iy++){
      if(this.pattern[ix][iy]){
        drawSquare(x + ix, y + iy)
      }
    }
  }
  ctx.fillStyle = fs
}

Piece.prototype.undraw = function(ctx){
  this._fill(clear)
}

Piece.prototype.draw = function(ctx){
  this._fill(this.color)
}

var pieces = [
    [I, "cyan"],
    [J, "blue"],
    [L, "orange"],
    [O, "yellow"],
    [S, "green"],
    [T, "purple"],
    [Z, "red"]
]
var piece = null

var dropStart = Date.now()

$(document).ready(function(){
  $(document).keydown(function(){
    if(done){
      return
    }
    if(event.keyCode == 38){
      piece.rotate()
      dropStart = Date.now()
    }
    if(event.keyCode == 40){
      piece.down()
    }
    if(event.keyCode == 37){
      piece.moveLeft()
      dropStart = Date.now()
    }
    if(event.keyCode == 39){
      piece.moveRight()
      dropStart = Date.now()
    }
  })
  $('.newGame').click(function(){
    location.reload(true)
  })
})

function drawBoard() {
  fs = ctx.fillStyle
  for(var y = 0; y < height; y++){
    for(var x = 0; x < width; x++){
      ctx.fillStyle = board[y][x] || clear
      drawSquare(x, y, tilesz, tilesz)
    }
  }
  ctx.fillStyle = fs
}

var level = 1
var levelTime = 1000

function levelUp(){
  if(lines < 1){
    level = 1
    levelTime = 1000
  }
  if(lines > 1){
    level = 2
    levelTime = 950
  }
  if(lines > 2){
    level = 3
    levelTime = 925
  }
  if(lines > 3){
    level = 4
    levelTime = 900
  }
  if(lines > 4){
    level = 5
    levelTime = 875
  }
  if(lines > 5){
    level = 6
    levelTime = 850
  }
  if(lines > 6){
    level = 7
    levelTime = 825
  }
  if(lines > 7){
    level = 8
    levelTime = 800
  }
  if(lines > 8){
    level = 9
    levelTime = 750
  }
  if(lines > 9){
    level = 10
    levelTime = 700
  }
  $('.level').text('Level: ' + level)
}

function main(){
  var now = Date.now()
  var delta = now - dropStart

  if(delta > levelTime){
    piece.down()
    dropStart = now
  }

  if(!done){
    requestAnimationFrame(main)
  }
}

piece = newPiece()
drawBoard()
main()