$(document).ready(function () {

    $('.first-button').on('click', function () {
  
      $('.animated-icon1').toggleClass('open');
    });
  });

  $('.carousel').carousel({
    interval: false
}); 

new WOW().init();