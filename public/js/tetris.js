let canvas = document.getElementById("board")
let ctx = canvas.getContext("2d")
let width = 10
let height = 20
let tilesz = 24

let board = []
for(let row = 0; row < 20; row++){
  board[row] = []
  for(let tile = 0; tile < 10; tile++){
    board[row][tile] = false
  }
}

canvas.width = width * tilesz
canvas.height = height * tilesz

function drawSquare(x, y) {
  ctx.fillRect(x * tilesz, y * tilesz, tilesz, tilesz)
  ss = ctx.strokeStyle
  ctx.strokeStyle = "#555"
  ctx.strokeRect(x * tilesz, y * tilesz, tilesz, tilesz)
  ctx.strokeStyle = "#888"
  ctx.strokeRect(x * tilesz + 3*tilesz/8, y * tilesz + 3*tilesz/8, tilesz/4,
    tilesz/4)
  ctx.strokeStyle = ss

}

function drawBoard() {
  fs = ctx.fillStyle
  for(let y = 0; y < height; y++){
    for(let x = 0; x < width; x++){
      ctx.fillStyle = board[y][x] ? 'red' : 'white'
      drawSquare(x, y, tilesz, tilesz)
    }
  }
  ctx.fillStyle = fs
}

function Piece(patterns, color){
  this.pattern = patterns[0]
  this.patterns = patterns
  this.patterni = 0

  this.color = color

  this.x = 0
  this.y = -2
}

Piece.prototype.draw = function(){
  fs = ctx.fillStyle
  ctx.fillStyle = this.color
  for(let ix = 0; ix < this.pattern.length; ix++){
    for(let iy = 0; iy < this.pattern.length; iy++){
      if(this.pattern[ix][iy]){
        drawSquare(this.x + ix, this.y + iy)
      }
    }
  }
  ctx.fillStyle = fs
}

Piece.prototype.down = function(){
  this.undraw()
  this.y++
  this.draw()
}

Piece.prototype.moveRight = function(){
  this.undraw()
  this.x++
  this.draw()
}

Piece.prototype.moveLeft = function(){
  this.undraw()
  this.x--
  this.draw()
}

Piece.prototype.rotate = function(){
  this.undraw()
  this.patterni = (this.patterni + 1) % this.patterns.length
  this.pattern = this.patterns[this.patterni]
  this.draw()
}

Piece.prototype._fill = function(color){
  fs = ctx.fillStyle
  ctx.fillStyle = color
  let x = this.x
  let y = this.y
  for(let ix = 0; ix < this.pattern.length; ix++){
    for(let iy = 0; iy < this.pattern.length; iy++){
      if(this.pattern[ix][iy]){
        drawSquare(x + ix, y + iy)
      }
    }
  }
  ctx.fillStyle = fs
}

Piece.prototype.undraw = function(ctx){
  this._fill("black")
}

Piece.prototype.draw = function(ctx){
  this._fill(this.color)
}

Piece.prototype.rotate = function(){
  let nextpat = this.patterns[(this.patterni + 1) % this.patterns.length]
  if(!this._collides(0, 0, nextpat)){
    this.undraw()
    this.patterni = (this.patterni + 1) % this.patterns.length
    this.pattern = this.patterns[this.patterni]
    this.draw()
  }
}

Piece.prototype.down = function(){
  if(this._collides(0, 1, this.pattern)){

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

Piece.prototype._collides = function(dx, dy, pat){
  for(let ix = 0; ix < pat.length; ix++){
    for(let iy = 0; iy < pat.length; iy++){
      if(!pat[ix][iy]){
        continue
      }
      let x = this.x + ix + dx
      let y = this.y + iy + dy
      if(y >= height || x < 0 || x >= width){
        return true
      }
      if(y < 0){
        continue
      }
      if(board[y][x]){
        return true
      }
    }
  }
  return false
}













