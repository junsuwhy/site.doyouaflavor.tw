(function($){
    $(function(){

      if(!window.location.search.split("notrack=")[1] && (
          location.href.match("http://doyouaflavor.tw") || 
          location.href.match("http://www.doyouaflavor.tw")
        ){
        mixpanel.track("visit");

        var stop = {};
        stop.global_time = 0;
        stop.once_time = 0;
        stop.countId = setInterval(function(){
          stop.global_time++;
        },1000);

        $('a').click(function(){
          var _href = $(this).attr('href');
          console.log(_href);
          mixpanel.track("outbound",{
            "href":_href,
            "second":stop.global_time
          });
        });
        window.onbeforeunload = function (e) {
          // var message = "Your confirmation message goes here.",
          // e = e || window.event;
          // For IE and Firefox
          // if (e) {
            // e.returnValue = message;
            
          // }

          // For Safari
          mixpanel.track("leave",{
            "second":stop.global_time
          });
          // return message;
        };

        var focus = {};

        $('input[type="text"],textarea').focus(function(){
          focus.name = $(this).attr('name');
          focus.time = 0;
          focus.countId = setInterval(function(){
            focus.time++;
          },1000);
        });

        $('input[type="text"],textarea').blur(function(){
          // console.log($(this));
          // var val = $(this).val();
          // console.log(val);
          // var fld_name = $(this).attr('name');
          // console.log(fld_name);
          output = {
            "value": $(this).val(),
            "field": $(this).attr('name')
          }
          if(focus.name == $(this).attr('name')){
            clearInterval(focus.countId);
            output.stop_second = focus.time;
          }
          mixpanel.track("input",output);
          
        })

      }

  });
})(jQuery);
