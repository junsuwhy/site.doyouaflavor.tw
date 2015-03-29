jQuery(document).ready(function($){
  $(window).scroll(onRoll);

  function onRoll(){
    $('.region-header').css({'background-position-y': $(window).scrollTop()});
  }

  console.log($('.slick-carousel'));
  $('.pane-carousel .view-content').slick({
    dots: true,
    infinite: true,
    speed: 300,
    arrows: false,
    swipe: true,
  });
  $('.pane-home-master .view-content').slick({
    dots: true,
    infinite: true,
    speed: 300,
    arrows: false,
    swipe: true,
    adaptiveHeight: true
  });
  $('.pane-carousel .slick-list').before($('.pane-carousel .slick-dots'));
  $('.pane-home-master .slick-list').before($('.pane-home-master .slick-dots'));
  

});
  
