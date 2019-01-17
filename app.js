/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

const newGameButton = document.querySelector('.btn-new')
const rollButton = document.querySelector('.btn-roll')
const holdButton = document.querySelector('.btn-hold')
const playerOnePanel = document.querySelector('.player-0-panel')
const playerTwoPanel = document.querySelector('.player-1-panel')
const playerScores = document.querySelectorAll('.player-current-score')
const dice = document.querySelector('.dice')
const allScore = document.querySelectorAll('.player-score')
const allCurrentScore = document.querySelectorAll('.player-current-score')



let playerScore = [0, 0]
let roundScore = 0
let player = 0


function createNewGame(){

  playerScore = [0, 0]
  updateScore(true)
  roundScore = 0
  updatePlayerScore(true)
  player = 0
  playerOnePanel.classList.add("active")
  playerTwoPanel.classList.remove("active")


}

function rollDice(){
  const randomNumber = Math.floor((Math.random() * 6) + 1);
  dice.src = `img/dice-${randomNumber}.png`
  if(randomNumber !== 1){
    roundScore += randomNumber
    updateScore()
  } else {
    roundScore = 0
    updateScore()
    togglePlayer()
  }
}

function updateScore(updateAll = false){
  if(updateAll){
    allCurrentScore.forEach(item => item.innerHTML = 0)
  } else {
    const currentScoreDiv = document.querySelector(`#current-${player}`)
    currentScoreDiv.innerHTML = roundScore
  }
}

function togglePlayer(){
  if(player === 0){
    player = 1
  } else {
    player = 0
  }
  playerOnePanel.classList.toggle("active")
  playerTwoPanel.classList.toggle("active")
}

function holdDice(){
  playerScore[player] += roundScore
  roundScore = 0

  updatePlayerScore()
  updateScore()

  if(playerScore[player] > 100) {
    alert(`Player ${(player + 1)} is the winner!`)
    createNewGame()
  } else {
    togglePlayer()
  }
}

function updatePlayerScore(updateAll = false){
  if(updateAll){
    allScore.forEach(item => item.innerHTML = 0)
  } else {
    const playerScoreDiv = document.querySelector(`#score-${player}`)
    playerScoreDiv.innerHTML = playerScore[player]
  }

}

newGameButton.addEventListener('click', createNewGame)
rollButton.addEventListener('click', rollDice)
holdButton.addEventListener('click', holdDice)