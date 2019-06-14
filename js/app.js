$(document).ready(function() {
  let computerTurn = [];
  let playerTurn = [];
  let counter = 0;
  let possibilities = ['#blue', '#red', '#green', '#yellow'];

  // Event listener for the gameboard items
  $('.square').on('click', e => {
    animate(e.target);
    addToPlayerTurn(e);
    playSound(`#${e.target.id}`);
  });

  // Function to add a clicked item to a variable for the players turn
  function addToPlayerTurn(e) {
    playerTurn.push(`#${e.target.id}`);
    checkMatch();
  }

  // Function to check a player's turn against the computer's
  function checkMatch() {
    if (
      playerTurn[playerTurn.length - 1] !== computerTurn[playerTurn.length - 1]
    ) {
      $('#wrongMove').show('fade');
      setTimeout(function() {
        $('#wrongMove').hide('fade');
        showComputerMove(computerTurn);
      }, 3000);
    } else {
      if (computerTurn.length === playerTurn.length) {
        if (counter === 10) {
          $('#winner').show('fade');
          clearGame();
        }
        $('#goodMove').show('fade');
        setTimeout(function() {
          $('#goodMove').hide('fade');
          updateCounter();
          computerMove();
        }, 3000);
      }
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
    sound.play();
  }

  // Function to clear the player turn array whenever a new turn is started or the player makes
  // a wrong move
  let playerClear = () => (playerTurn = []);

  // Function used to show the length of the player's current sequence
  let updateCounter = function() {
    counter++;
    $('h4.game-counter').text(`${counter}`);
  };

  // Function used to show the Computer's turn
  let showComputerMove = function(computerTurn) {
    let i = 0;
    let interval = setInterval(() => {
      playSound(computerTurn[i]);
      animate(computerTurn[i]);
      i++;
      if (i >= computerTurn.length) {
        clearInterval(interval);
      }
    }, 700);
    playerClear();
  };

  // Function used to find a random option and add it to the computers turn sequence
  let computerMove = function() {
    computerTurn.push(possibilities[Math.floor(Math.random() * 4)]);
    showComputerMove(computerTurn);
  };

  // Function to initialize the game when start is pressed
  let startGame = function() {
    $('.btn-success').addClass('collapse');
    $('.btn-danger').removeClass('collapse');
    counter = 0;
    updateCounter(counter);
    computerMove();
  };

  // Function to reset the game when the Reset button is pressed
  let clearGame = function() {
    counter = 0;
    computerTurn = [];
    playerClear();
    $('.btn-success').removeClass('collapse');
    $('.btn-danger').addClass('collapse');
    $('h4.game-counter').text(`${counter}`);
  };

  // Event listener to start the game with the start button
  $('.btn-success').on('click', startGame);

  // Event listener for the reset button
  $('.btn-danger').on('click', clearGame);
});
