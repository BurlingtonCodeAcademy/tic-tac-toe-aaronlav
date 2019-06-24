const gameBoard = (() => {
  const initBoard = () => document.querySelectorAll('.gameboard').forEach(element => {
      element.innerText = '';
      element.classList.remove('clicked');
  });
  return {
      initBoard
  };
})();

const game = (() => {
  const winCombo = [
  ['1', '2', '3'], 
  ['4', '5', '6'], 
  ['7', '8', '9'], 
  ['1', '4', '7'], 
  ['2', '5', '8'], 
  ['3', '6', '9'], 
  ['1', '5', '9'], 
  ['3', '5', '7']
];
  let stepCount = 0;
  const getStepCount = () => stepCount;
  const recordGame = () => stepCount++;
  const checkGame = (player) => {
      return winCombo.some(combo => combo.every(element => player.getPlayerStep().includes(element)));
  }
  const resetGame = () => stepCount = 0;
  return {
      recordGame,
      getStepCount,
      checkGame,
      resetGame
  };
})();

const Player = (marker) => {
  let playerStep = [];
  const getPlayerStep = () => playerStep;
  const addStep = (position) => playerStep.push(position);
  const resetPlayer = () => playerStep = [];
  return {
      addStep,
      getPlayerStep,
      resetPlayer,
      marker
  };
};

const player1 = Player('x');
const player2 = Player('o');

document.addEventListener('click', function (event) {
  if (event.target.id == "button") {
      document.querySelectorAll('.gameboard').forEach(element => element.classList.remove('disable'));
      gameBoard.initBoard();
      player1.resetPlayer();
      player2.resetPlayer();
      game.resetGame();
  }
  if ((game.getStepCount() < 10) && (event.target.className == "gameboard")) {
      let position = event.target.id;
      game.recordGame();
      if (game.getStepCount() % 2) {
          event.target.innerHTML = 'x';
          event.target.classList.add('clicked');
          player1.addStep(position);
          if (game.checkGame(player1)) {
              setTimeout(function () {
                  alert("Congratulations! Player x wins!");
                  gameBoard.initBoard();
                  player1.resetPlayer();
                  player2.resetPlayer();
                  game.resetGame();
              }, 500);
          }
      } else {
          event.target.innerHTML = 'o';
          event.target.classList.add('clicked');
          player2.addStep(position);
          if (game.checkGame(player2)) {
              setTimeout(function () {
                  alert("Congratulations! Player o wins!");
                  gameBoard.initBoard();
                  player1.resetPlayer();
                  player2.resetPlayer();
                  game.resetGame();
              }, 500);
          }
      }
      if (player1.getPlayerStep().length + player2.getPlayerStep().length == 9) {
          setTimeout(function () {
              alert("Stalemate...");
              gameBoard.initBoard();
              player1.resetPlayer();
              player2.resetPlayer();
              game.resetGame();
          }, 500);
      }

      if (player1.getPlayerStep().length + player2.getPlayerStep().length == "X" || (player1.getPlayerStep().length + player2.getPlayerStep().length) == "O") {
        alert("The cell is already full."); //STILL not working... probably needs to move up in order and/or change .length
    }
      
  }
  
});