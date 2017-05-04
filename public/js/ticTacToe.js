const counter = 0
const playerTurn = 'X'
const Xmoves = []
const Omoves = []

const boardGame = document.querySelector('#board')
const resetButton = document.querySelector('#reset')
const divBoxes = document.querySelectorAll('div.box')
const winningCombos = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [1,5,9], [3,5,7], [3,6,9], [2,5,8]]

const switchTurn = function() {
  if(playerTurn === 'X') {
    playerTurn = 'O'
  } else {
    playerTurn = 'X'
  }
}

for(let i = 0; i < divBoxes.length; i++) {
  divBoxes[0].getAttribute("id")
}

const playerMoves = function() {
  if(playerTurn === 'X') {
    console.log("it's your turn", playerTurn)
    this.innerText = "X"
    Xmoves.push(parseInt(this.getAttribute("id")))
    switchTurn()
    console.log("Xmoves", Xmoves)
    checkWinning(Xmoves, "X Player")
    counter++
    console.log("counter", counter)
    checkCounter()
  } else {
    console.log("it's your turn", playerTurn)
    this.innerText = "O"
    Omoves.push(parseInt(this.getAttribute("id")))
    switchTurn()
    console.log("Omoves", Omoves)
    checkWinning(Omoves, "Omoves")
    counter++
    console.log("counter", counter)
    checkCounter()
  }
}

const listener = function() {
  for(let i = 0; i < divBoxes.length; i++) {
    divBoxes[i].addEventListener("click", playerMoves)
  }
}

const checkWinning = function(movesArray, name) {
  for(let i = 0; i < winningCombos.length; i++) {
    let winCounter = 0

    for(let j = 0; j < winningCombos[i].length; j++) {
      if(movesArray.indexOf(winningCombos[i][j]) !== -1) {
        
      }
    }
  }
}
