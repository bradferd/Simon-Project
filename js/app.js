$(document).ready(function() {
  let computerTurn = [];
  let playerTurn = [];
  let counter = 0;
  let possibilities = ['#blue', '#red', '#green', '#yellow'];

  $('.square').on('click', e => {
    lightUp(e.target);
    addToPlayerTurn(e);
  });

  let addToPlayerTurn = function(e) {
    playerTurn.push(`#${e.target.id}`);
    console.log(playerTurn);
    checkMatch();
  };

  function checkMatch() {
    if (
      playerTurn[playerTurn.length - 1] === computerTurn[playerTurn.length - 1]
    ) {
      console.log('Nice!');
    }
  }

  let lightUp = function(square) {
    $(square).addClass('clicked');
    setTimeout(function() {
      $(square).removeClass('clicked');
    }, 500);
  };

  let playerMove = function() {
    playerTurn = [];
  };

  let updateCounter = function(counter) {
    counter++;
    $('h4.game-counter').text(`${counter}`);
  };

  let showComputerMove = function(sequence) {
    var i = 0;
    var interval = setInterval(function() {
      lightUp(sequence[i]);
      i++;
      if (i >= sequence.length) {
        clearInterval(interval);
      }
    }, 600);
    playerMove();
  };

  let computerMove = function() {
    computerTurn.push(possibilities[Math.floor(Math.random() * 4)]);
    showComputerMove(computerTurn);
  };

  let startGame = function() {
    counter = 0;
    updateCounter(counter);
    computerMove();
  };

  $('.btn-success').on('click', startGame);
});
