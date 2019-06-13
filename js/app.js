$(document).ready(function() {
  let isPlayerTurn = false;
  let computerTurn = [];
  let playerTurn = [];
  let counter = 0;
  let possibilities = ['#blue', '#red', '#green', '#yellow'];

  $('.square.blue').on('click', () => {
    $('.square.blue').addClass('clicked');
    setTimeout(function() {
      $('.square.blue').removeClass('clicked');
    }, 500);
  });

  $('.square.red').on('click', () => {
    $('.square.red').addClass('clicked');
    setTimeout(function() {
      $('.square.red').removeClass('clicked');
    }, 500);
  });

  $('.square.green').on('click', () => {
    $('.square.green').addClass('clicked');
    setTimeout(function() {
      $('.square.green').removeClass('clicked');
    }, 500);
  });

  $('.square.yellow').on('click', () => {
    $('.square.yellow').addClass('clicked');
    setTimeout(function() {
      $('.square.yellow').removeClass('clicked');
    }, 500);
  });

  let lightUp = function(square) {
    console.log(square);
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
  };

  let computerMove = function() {
    computerTurn.push(possibilities[Math.floor(Math.random() * 4)]);
    console.log(computerTurn);
    showComputerMove(computerTurn);
  };

  let startGame = function() {
    console.log('hello from Start Game');
    counter = 0;
    updateCounter(counter);
    computerMove();
  };

  $('.btn-success').on('click', startGame);
});
