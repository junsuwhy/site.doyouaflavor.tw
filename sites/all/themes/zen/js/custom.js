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
    autoplaySpeed: 5000,
  });
  $('.pane-home-master .view-content').slick({
    dots: true,
    infinite: true,
    speed: 300,
    arrows: false,
    swipe: true,
    // adaptiveHeight: false,
    autoplay: true,
    autoplaySpeed: 5000,
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
    
    $('.menu-418 a,#salers .views-row a,.pane-home-products .views-row a').magnificPopup({
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
          },
          open: function() {
            var pageUrl = location.href.split("#")[0];
            var historyState = {href:pageUrl};
            console.log(this);
            var tag = this.currItem.src.substr(1);
            history.pushState(historyState, document.title, pageUrl+"#"+tag);
            // Will fire when this exact popup is opened
            // this - is Magnific Popup object
          },
        },
      ajax: {
        settings: null, // Ajax settings object that will extend default one - http://api.jquery.com/jQuery.ajax/#jQuery-ajax-settings
        // For example:
        // settings: {cache:false, async:false}

        cursor: 'mfp-ajax-cur', // CSS class that will be added to body during the loading (adds "progress" cursor)
        tError: '<a href="%url%">The content</a> could not be loaded.', //  Error message, can contain %curr% and %total% tags if gallery is enabled
      }
    });
    
    //開啟頁面時如果有商品或街賣者區塊，就打開來。
    var pageTag = location.href.split("#")[1];
    if(pageTag){
      if(pageTag.length>0){
        if($('[id="'+pageTag+'"]').length==0){
          $($('[href="/'+pageTag+'"]')[0]).trigger('click');
        }
      }
    }
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
    var salersTop,productsTop,footerTop;
    updateElementsTop();
    var pageUrl = location.href.split("#")[0];
    var historyState = {href:pageUrl};
    var naviState = 'noState';
    $('.menu-419,.menu-423,.menu-420').removeClass('active');
    $w.scroll(function(){
      window.requestAnimationFrame(onRollChangeNavigator);
    });
    onRollChangeNavigator();

    function updateElementsTop(){
      salersTop = $("#salers").offset().top;
      productsTop = $("#products").offset().top;
      footerTop = $(document).height()-$(window).height()-1;
      $('.menu-419,.menu-423,.menu-420').removeClass('active');
    }

    function onRollChangeNavigator(){
      var wst = $w.scrollTop();

      if(wst<salersTop){
        // noState
        if(naviState !== 'noState'){
          updateElementsTop();
          history.pushState(historyState, document.title, pageUrl);
          naviState = 'noState';
        }

      }else if(wst >= footerTop){
        if(naviState !== 'footer'){
          updateElementsTop();
          $('.menu-420').addClass('active');
          history.pushState(historyState, document.title, pageUrl+"#footer");
          naviState = 'footer'
        }
      }else if(wst>=productsTop-1 && wst < footerTop){  
        // products
        if(naviState !== 'products'){
          updateElementsTop();
          $('.menu-423').addClass('active');
          history.pushState(historyState, document.title, pageUrl+"#products");
          naviState = 'products'
        }

      }else if(wst>=salersTop-1 && wst<productsTop){
        // salers
        if(naviState !== 'salers'){
          updateElementsTop();
          $('.menu-419').addClass('active');
          history.pushState(historyState, document.title, pageUrl+"#salers");
          naviState = 'salers'
        }

      }

      $rh.css({'background-position-y': wst});
      $ppt.css({'background-position-y': wst-$ppt.offset().top});

      if(wst < $hd.height()){
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

    }



  }
  setRollingNavigator();
  

});
  
