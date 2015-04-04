jQuery(document).ready(function($){
  
  $w = $(window);



  $ppt = $('.pane-home-products');
  $rh = $('.region-header');

  $hlmw = $('.header-logo-menu-wrapper');
  hlmwp = $hlmw.css('position');
  hlmwh = $hlmw.height()+parseInt($hlmw.css('padding-top').substr(0,2));
  $main = $("#main");
  $hd = $('.header__region');

  onResize();
  $w.resize(onResize);

  onRoll();
  $w.scroll(onRoll);

  

  function onRoll(){
    // var y = $('.pane-home-products').position().top;
    $rh.css({'background-position-y': $w.scrollTop()});
    $ppt.css({'background-position-y': $w.scrollTop()-$ppt.offset().top});

    if($w.scrollTop() < $hd.height()){
      if(hlmwp == 'fixed'){
        $hlmw.css({'position':'inherit'});
        hlmwp = 'inherit';
        $main.css({'margin-top':0});
      }
    }else{
      if(hlmwp == 'inherit'){
        $hlmw.css({'position':'fixed'});
        hlmwp = 'fixed';
        $main.css({'margin-top':hlmwh});
      }
    }
    
    // $('.pane-home-products').css({'background-position-y': $(window).scrollTop()-y});
  }

  function onResize(){
    $ppt.css({'height': $w.height()});
    $rh.css({'height': $w.height()});
    
  }

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
    // adaptiveHeight: false,
    autoplay: true,
    autoplaySpeed: 2000,
  });
  $('.pane-carousel .slick-list').before($('.pane-carousel .slick-dots'));
  $('.pane-home-master .slick-list').before($('.pane-home-master .slick-dots'));



  $('.home-scroll-button').click(function(){
    var scrollAmount = $hlmw.offset().top;
    $('body').animate({scrollTop: scrollAmount},1000);
  })



  if($('body.front').length==1){
    $('a').each(function(){
      if(typeof $(this).attr('href') == 'string'){
        if($(this).attr('href').substr(0,2)=="/#"){
          add_to_scroll($(this));
        }
      }
    });

    // $('#salers .views-field-view-node a').magnificPopup({
    //   items:[
    //     {
    //       src: $(this).attr('href'),
    //       type:'ajax'
    //     },
    //   ],
    //   type:'ajax'
    // });
    
    $('#salers .views-field-view-node a').magnificPopup({
      type:'ajax'
    });

  }

  function add_to_scroll($item){
    $items = $item.each(function(){      
      $(this).click(function(){        
        var $target = $('#'+$(this).attr('href').split('#')[1]);
        tmt = parseInt($target.css('margin-top').split('px')[0]);
        var scrollAmount = $target.offset().top-tmt;
        $('body').animate({scrollTop: scrollAmount},1000);
        return false;  
      })
    })
  }

  $bb3 = $('#block-block-3');
  $bb3.css('padding-top',($w.height()-$bb3.height())/2-10)+'px 0';
  

});
  
