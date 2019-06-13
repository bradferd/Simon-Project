$(document).ready(function() {
  let isPlayerTurn = false;
  let computerTurn = [];
  let playerTurn = [];
  let counter = 0;
  let possibilities = ['#blue', '#red', '#green', '#yellow'];

  if (isPlayerTurn) {
    $('.square').on('click', e => lightUp(e.target));
  }

  let lightUp = function(square) {
    $(square).addClass('clicked');
    setTimeout(function() {
      $(square).removeClass('clicked');
    }, 500);
  };

  let playerMove = function() {
    isPlayerTurn = true;
    alert('Your move!');
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
    setTimeout(function() {
      playerMove();
    }, 5000);
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
