window.addEventListener('DOMContentLoaded', function(){

  let counter = 0
  let playerTurn = 'X'
  let Xmoves = []
  let Omoves = []

  let boardGame = document.querySelector('#board')
  let resetButton = document.querySelector('#reset')
  let divBoxes = document.querySelectorAll('div.box')
  let winningCombos = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [1,5,9], [3,5,7], [3,6,9], [2,5,8]]

  const switchTurn = function() {
    playerTurn = { O: 'X', X: 'O' }[playerTurn]
  }

  let divBoxIds = []
  divBoxes.forEach(function(box){
    let id = box.getAttribute("id")
    divBoxIds.push(id)
  })

  let moves = {
    X: [],
    O: []
  }

  const playerMoves = function() {
    console.log("it's your turn", playerTurn)
    this.innerText = playerTurn
    moves[playerTurn].push(parseInt(this.getAttribute("id")))
    checkWinning(moves[playerTurn], playerTurn+" Player")
    switchTurn()
    console.log(playerTurn+'moves', moves[playerTurn])
    counter++
    console.log("counter", counter)
    checkCounter()
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
          winCounter++
          console.log("win", winCounter)
        }
      }
      if(winCounter === 3) {
        alert("You won " + name + "!")
      }
    }
  }

  const checkCounter = function() {
    if(counter === 9) {
      alert("It's a tie game")
    }
  }

  const clearBoard = function() {
    resetButton.addEventListener("click", function() {
      for(let i = 0; i < divBoxes.length; i++) {
        divBoxes[i].innerText = ""
      }
      counter = 0
      moves = {
       X: [],
       O: []
      }
    })
  }

  const startGame = function() {
    listener()
    clearBoard()
  }

  startGame()
})
