$(document).ready(function() {
  let computerTurn = [];
  let playerTurn = [];
  let counter = 0;
  let possibilities = ['#blue', '#red', '#green', '#yellow'];

  // Event listener for the gameboard items
  $('.square').on('click', e => {
    lightUp(e.target);
    addToPlayerTurn(e);
  });

  // Function to add a clicked item to a variable for the players turn
  let addToPlayerTurn = function(e) {
    playerTurn.push(`#${e.target.id}`);
    console.log(playerTurn);
    checkMatch();
  };

  // Function to check a player's turn against the computer's
  function checkMatch() {
    if (
      playerTurn[playerTurn.length - 1] !== computerTurn[playerTurn.length - 1]
    ) {
      alert('Wrong move! Try again.');
      setTimeout(function() {
        showComputerMove(computerTurn);
      }, 1000);
    } else {
      console.log('😎');
      if (computerTurn.length === playerTurn.length) {
        updateCounter();
        computerMove();
      }
    }
  }

  // Function to light up the clickable areas on the gameboard
  let lightUp = function(square) {
    $(square).addClass('clicked');
    setTimeout(function() {
      $(square).removeClass('clicked');
    }, 500);
  };

  // Function to clear the player turn array whenever a new turn is started or the player makes
  // a wrong move
  let playerClear = () => (playerTurn = []);

  // Function used to show the length of the player's current sequence
  let updateCounter = function() {
    counter++;
    $('h4.game-counter').text(`${counter}`);
  };

  // Function used to show the Computer's turn
  let showComputerMove = function(sequence) {
    var i = 0;
    var interval = setInterval(function() {
      lightUp(sequence[i]);
      i++;
      if (i >= sequence.length) {
        clearInterval(interval);
      }
    }, 600);
    playerClear();
  };

  // Function used to find a random option and add it to the computers turn sequence
  let computerMove = function() {
    computerTurn.push(possibilities[Math.floor(Math.random() * 4)]);
    showComputerMove(computerTurn);
  };

  // Function to initialize the game when start is pressed
  let startGame = function() {
    counter = 0;
    updateCounter(counter);
    computerMove();
  };

  // Event listener to start the game with the start button
  $('.btn-success').on('click', startGame);
});
