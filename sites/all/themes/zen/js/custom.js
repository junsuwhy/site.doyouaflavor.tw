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
    
    $('#salers .views-row a,.pane-home-products .views-row a').magnificPopup({
      type:'ajax',
      callbacks: {
          parseAjax: function(mfpResponse) {
            // mfpResponse.data is a "data" object from ajax "success" callback
            // for simple HTML file, it will be just String
            // You may modify it to change contents of the popup
            // For example, to show just #some-element:
            var $data = $(mfpResponse.data);
            var $title = $data.find('#page-title');
            mfpResponse.data = $data.find('.node').prepend($title);
            // mfpResponse.data;
            
            // mfpResponse.data must be a String or a DOM (jQuery) element
            
            console.log('Ajax content loaded:', mfpResponse);
          },
          ajaxContentAdded: function() {
            // Ajax content is loaded and appended to DOM
            console.log(this.content);
          }
        },
      ajax: {
        settings: null, // Ajax settings object that will extend default one - http://api.jquery.com/jQuery.ajax/#jQuery-ajax-settings
        // For example:
        // settings: {cache:false, async:false}

        cursor: 'mfp-ajax-cur', // CSS class that will be added to body during the loading (adds "progress" cursor)
        tError: '<a href="%url%">The content</a> could not be loaded.', //  Error message, can contain %curr% and %total% tags if gallery is enabled
      }
    });
  }

  function add_to_scroll($item){
    $items = $item.each(function(){      
      $(this).click(function(){        
        var $target = $('#'+$(this).attr('href').split('#')[1]);
        tmt = parseInt($target.css('margin-top').split('px')[0]);
        var scrollAmount = $target.offset().top;
        $('body').animate({scrollTop: scrollAmount},1000);
        return false;  
      })
    })
  }

  $bb3 = $('#block-block-3');
  $bb3.css('padding-top',($w.height()-$bb3.height())/2-10)+'px 0';

  function setRollingNavigator(){
    var salersTop = $("#salers").offset().top;
    var productsTop = $("#products").offset().top;
    var pageUrl = location.href.split("#")[0];
    var historyState = {href:pageUrl};
    var naviState = 'noState';
    $w.scroll(onRollChangeNavigator);
    onRollChangeNavigator();

    function onRollChangeNavigator(){
      if($w.scrollTop()<salersTop){
        // noState
        if(naviState !== 'noState'){
          salersTop = $("#salers").offset().top;
          productsTop = $("#products").offset().top;
          $('.menu-419,.menu-423').removeClass('active');
          console.log(historyState);
          console.log(pageUrl);
          history.pushState(historyState, document.title, pageUrl);
          naviState = 'noState';
        }

      }else if($w.scrollTop()>=productsTop-1){  
        // products
        if(naviState !== 'products'){
          salersTop = $("#salers").offset().top;
          productsTop = $("#products").offset().top;
          $('.menu-419,.menu-423').removeClass('active');
          $('.menu-423').addClass('active');
          history.pushState(historyState, document.title, pageUrl+"#products");
          naviState = 'products'
        }

      }else if($w.scrollTop()>=salersTop-1 && $w.scrollTop()<productsTop){
        // salers
        if(naviState !== 'salers'){
          salersTop = $("#salers").offset().top;
          productsTop = $("#products").offset().top;
          $('.menu-419,.menu-423').removeClass('active');
          $('.menu-419').addClass('active');
          history.pushState(historyState, document.title, pageUrl+"#salers");
          naviState = 'salers'
        }

      }
    }



  }
  setRollingNavigator();
  

});
  
