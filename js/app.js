$(document).ready(function() {
  let computerTurn = [];
  let playerTurn = [];
  let counter = 0;
  let possibilities = ['#blue', '#red', '#green', '#yellow'];
  let isPlayerTurn = false;
  let wrongMoveCount = 0;

  // Event listener for the gameboard items

  $('.square').on('click', e => {
    if (isPlayerTurn) {
      animate(e.target);
      addToPlayerTurn(e);
      // playSound(`#${e.target.id}`);
    }
  });

  // Function to add a clicked item to a variable for the players turn
  function addToPlayerTurn(e) {
    playerTurn.push(`#${e.target.id}`);
    checkMatch();
  }

  // Function to check a player's turn against the computer's
  function checkMatch() {
    playerTurn[playerTurn.length - 1] !== computerTurn[playerTurn.length - 1]
      ? wrongMove()
      : goodMove();
  }

  // Function to show alert and play sound when a wrong move is made
  function wrongMove() {
    playSound('#wrong');
    switchPlayerTurn();
    if (!checkLoseCondition()) {
      wrongMoveAlert();
    }
  }

  // Function to show alert and play sound when a good move is made
  function goodMove() {
    playSound(`${playerTurn[playerTurn.length - 1]}`);
    if (computerTurn.length === playerTurn.length) {
      if (!checkWinCondition()) {
        switchPlayerTurn();
        goodMoveAlert();
      }
    }
  }

  // Function to show alert for a correct move
  function goodMoveAlert() {
    $('#goodMove').show('fade');
    setTimeout(function() {
      $('#goodMove').hide('fade');
      updateCounter();
      computerMove();
    }, 3000);
  }

  // Function to show alert for a wrong move
  function wrongMoveAlert() {
    $('#wrongMove').show('fade');
    setTimeout(function() {
      $('#wrongMove').hide('fade');
      showComputerMove(computerTurn);
    }, 3000);
  }

  // Function to check for a win condition
  function checkWinCondition() {
    if (counter === 10) {
      $('#winner').show('fade');
      clearGame();
      return true;
    }
  }

  function checkLoseCondition() {
    wrongMoveCount++;
    console.log(wrongMoveCount);
    if (wrongMoveCount === 3) {
      $('#loser').show('fade');
      clearGame();
      return true;
    }
  }

  // Function to light up the clickable areas on the gameboard
  function animate(square) {
    $(square).addClass('clicked');
    setTimeout(function() {
      $(square).removeClass('clicked');
    }, 500);
  }

  // Function used to pull a sound from the HTML and play it
  function playSound(color) {
    let sound = document.querySelector(`audio[data-color="${color}"]`);
    // console.log(color);
    sound.play();
  }

  // Function to clear the player turn array whenever a new turn is started or the player makes
  // a wrong move
  let playerClear = () => (playerTurn = []);

  // Function used to show the length of the player's current sequence
  function updateCounter() {
    counter++;
    $('h4.game-counter').text(`${counter}`);
  }

  // Function used to show the Computer's turn
  function showComputerMove(computerTurn) {
    let i = 0;
    let interval = setInterval(() => {
      playSound(computerTurn[i]);
      animate(computerTurn[i]);
      i++;
      if (i >= computerTurn.length) {
        clearInterval(interval);
        switchPlayerTurn();
        console.log(isPlayerTurn);
      }
    }, 700);
    playerClear();
  }

  // Function to switch flag for Player Turn
  function switchPlayerTurn() {
    isPlayerTurn ? (isPlayerTurn = false) : (isPlayerTurn = true);
    // console.log(isPlayerTurn);
  }

  // Function used to find a random option and add it to the computers turn sequence
  function computerMove() {
    computerTurn.push(possibilities[Math.floor(Math.random() * 4)]);
    showComputerMove(computerTurn);
  }

  // Function to initialize the game when start is pressed
  function startGame() {
    buttonSwap();
    updateCounter(counter);
    computerMove();
  }

  // Function to reset the game when the Reset button is pressed
  function clearGame() {
    clearVariables();
    playerClear();
    buttonSwap();
    $('h4.game-counter').text(`${counter}`);
  }

  function clearVariables() {
    counter = 0;
    computerTurn = [];
    isPlayerTurn = false;
    wrongMoveCount = 0;
  }

  // function to collapse buttons when starting or resting a game
  function buttonSwap() {
    if ($('.btn-success').hasClass('collapse')) {
      $('.btn-success').removeClass('collapse');
      $('.btn-danger').addClass('collapse');
    } else {
      $('.btn-success').addClass('collapse');
      $('.btn-danger').removeClass('collapse');
    }
  }

  // Event listener to start the game with the start button
  $('.btn-success').on('click', startGame);

  // Event listener for the reset button
  $('.btn-danger').on('click', clearGame);
});
