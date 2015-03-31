jQuery(document).ready(function($){
  $(window).scroll(onRoll);

  function onRoll(){
    // var y = $('.pane-home-products').position().top;
    $('.region-header').css({'background-position-y': $(window).scrollTop()});
    // $('.pane-home-products').css({'background-position-y': $(window).scrollTop()-y});
  }

  console.log($('.slick-carousel'));
  $('.pane-carousel .view-content').slick({
    dots: true,
    infinite: true,
    speed: 300,
    arrows: false,
    swipe: true,
    autoplay: true,
    autoplaySpeed: 2000,
  });
  $('.pane-home-master .view-content').slick({
    dots: true,
    infinite: true,
    speed: 300,
    arrows: false,
    swipe: true,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 2000,
  });
  $('.pane-carousel .slick-list').before($('.pane-carousel .slick-dots'));
  $('.pane-home-master .slick-list').before($('.pane-home-master .slick-dots'));



  $('.home-scroll-button').click(function(){
    var scrollAmount = $('.navigation-wrapper').position().top+$('#navigation').position().top;
    $('body').animate({scrollTop: scrollAmount},1000);
  })

  if($('body.front').length==1){
    $('.menu-423 a').click(function(){
      var scrollAmount = $('#products').position().top;
      $('body').animate({scrollTop: scrollAmount},1000);  
    })
  }
  

});
  
