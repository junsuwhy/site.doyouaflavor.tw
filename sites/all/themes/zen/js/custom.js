jQuery(document).ready(function($){
  
  var $w = $(window);
  var $d = $(document);



  var $ppt = $('.pane-home-products');
  var $rh = $('.region-header');
  var $hlmw = $('.header-logo-menu-wrapper');
  var hlmwp = $hlmw.css('position');
  var hlmwh = $hlmw.height()+parseInt($hlmw.css('padding-top').substr(0,2));
  var $main = $("#main");
  var $hd = $('.header__region');
  var $m_active = $('.menu-419,.menu-423,.menu-420');

  var isSidr = false;
  

  onResize();
  $w.resize(onResize);


  function onResize(){
    
    var pptRealHeight = 0;
    var pptChildrenArray = $ppt.children();
    for (var i = pptChildrenArray.length - 1; i >= 0; i--) {
      pptRealHeight+=$(pptChildrenArray[i]).height();
    };
    pptRealHeight += parseInt($ppt.css('padding-top').split('px')[0])+parseInt($ppt.css('padding-bottom').split('px')[0]);

    $ppt.css({'height': $w.height()>pptRealHeight?$w.height():pptRealHeight});
    $rh.css({'height': $w.height()});

    if($w.width()<767 && !isSidr){
      $('.header__logo-image').sidr();
      $('#sidr').append($('#navigation'));
      isSidr = true;
      $('.view-home-master .views-row').each(function(){
        $(this).find('.views-field-field-photo').insertBefore($(this).find('.views-field-nothing-1'));
      })
    }
    
  }

  $('.pane-carousel .view-content').slick({
    dots: true,
    infinite: true,
    speed: 300,
    arrows: false,
    swipe: true,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive:[
      {
        breakpoint: 800,
        settings: {
          dots: false,
        }
      },
    ]
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
    responsive:[
      {
        breakpoint: 800,
        settings: "unslick",
      },
    ]
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
    
    $('.menu-418 a,#vendors .views-row a,.pane-home-products .views-row a').magnificPopup({
      type:'ajax',
      callbacks: {
          parseAjax: function(mfpResponse) {
            // mfpResponse.data is a "data" object from ajax "success" callback
            // for simple HTML file, it will be just String
            // You may modify it to change contents of the popup
            // For example, to show just #some-element:
            

            var filename = "/sites/all/libraries/leaflet/leaflet.css";
            var fileref=document.createElement("link");
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", filename);


            s = document.createElement("script");
            s.type = "text/javascript";
            s.src="/sites/all/libraries/leaflet/leaflet.js";
            

            s2 = document.createElement("script");
            s2.type = "text/javascript";
            s2.src="/sites/all/modules/leaflet/leaflet.drupal.js";
            

            s3 = document.createElement("script");
            script = 'jQuery.extend'+mfpResponse.data.split('<script>jQuery.extend')[1].split('</script>')[0];
            s3.innerHTML = script;

            


            var $data = $(mfpResponse.data);
            mfpResponse.data = $data.find('#content');
            mfpResponse.data.append(fileref);


            // .prepend($title);
            // mfpResponse.data;
            
            // mfpResponse.data must be a String or a DOM (jQuery) element
            
            console.log('Ajax content loaded:', mfpResponse);
          },
          ajaxContentAdded: function() {
            $('.mfp-content').append(s).append(s2).append(s3);

            // Ajax content is loaded and appended to DOM
            L.Icon.Default.imagePath = '/sites/all/libraries/leaflet/images';
            Drupal.attachBehaviors(document, Drupal.settings);
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

    // 按下上一頁
    onpopstate = function(){
      $('button.mfp-close').trigger('click');
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
  var bb3height = 0;
  $('.banner-bar-wrapper,.banner-content').each(function(){
    bb3height+=$(this).height();
  });
  $bb3.css('padding-top',($w.height()-bb3height)/2-25)+'px 0';
  

  function setRollingNavigator(){
    var vendorsTop,productsTop,footerTop;
    updateElementsTop();
    var pageUrl = location.href.split("#")[0];
    var historyState = {href:pageUrl};
    var naviState = 'noState';
    
    
    $m_active.removeClass('active');
    $w.scroll(function(){
      window.requestAnimationFrame(onRollChangeNavigator);
    });
    onRollChangeNavigator();

    function updateElementsTop(){
      var $vendors = $("#vendors");
      if($vendors.length>0){
        vendorsTop = $("#vendors").offset().top;  
      }
      var $products = $("#products");
      if($products.length>0){
        productsTop = $("#products").offset().top;  
      }
      footerTop = $d.height()-$w.height()-1;
      $m_active.removeClass('active');
    }

    function onRollChangeNavigator(){
      var wst = $w.scrollTop();

      if(wst<vendorsTop){
        // noState
        if(naviState !== 'noState'){
          updateElementsTop();
          history.replaceState(historyState, document.title, pageUrl);
          naviState = 'noState';
        }

      }else if(wst >= footerTop){
        if(naviState !== 'footer'){
          updateElementsTop();
          $('.menu-420').addClass('active');
          history.replaceState(historyState, document.title, pageUrl+"#footer");
          naviState = 'footer';
        }
      }else if(wst>=productsTop-1 && wst < footerTop){  
        // products
        if(naviState !== 'products'){
          updateElementsTop();
          $('.menu-423').addClass('active');
          history.replaceState(historyState, document.title, pageUrl+"#products");
          naviState = 'products';
        }

      }else if(wst>=vendorsTop-1 && wst<productsTop){
        // vendors
        if(naviState !== 'vendors'){
          updateElementsTop();
          $('.menu-419').addClass('active');
          history.replaceState(historyState, document.title, pageUrl+"#vendors");
          naviState = 'vendors';
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
  
