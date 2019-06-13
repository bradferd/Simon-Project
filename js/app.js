$(document).ready(function() {
  let isPlayerTurn = false;

  console.log('ready!');
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
});
