$(document).ready(function(){

    var options =
    {
        crop : true,
        height : 400,
        width : 400
    }
    var curSlide;
    var nextSlide;

    function appendControls()
    {
        $("#niceslider").after("<ul id='niceslider-controls'><li id='niceslider-backward'><</li><li id='niceslider-forward'>></li></ul>");
    }

    function niceslider(options)
    {
        appendControls();

        var el = $("#niceslider");
        var children = el.children();
        var childCount = el.children().length
        var i = 1;

        children.css({
           height : options.height+"px",
           width : options.width+"px"
        });

        children.each(function(){

           var image = $(this).attr('data-src');
           $(this).css('background-image','url('+image+')');
           $(this).attr('data-niceslider-pos',i);

           if(options.crop) //If we want crop do it
               $(this).css('background-size','cover');

           if(i != 1){ //Add minus position
               $(this).css('left','400px');
           }else{
               $(this).css('left','0px');
           }

           i++;
        });

        $(document).on('click','#niceslider-forward',function(){
            curSlide = $(".niceslider-active");
            nextSlide = curSlide.next();
            curSlide.removeClass('niceslider-active');
            nextSlide.addClass('niceslider-active');

            curSlide.removeClass('niceslider-show-left').addClass('niceslider-hide-left');
            nextSlide.addClass('niceslider-show-left');
        });

        $(document).on('click','#niceslider-backward',function(){
            curSlide = $(".niceslider-active");
            nextSlide = curSlide.prev();
            curSlide.removeClass('niceslider-active');
            nextSlide.addClass('niceslider-active');

            curSlide.css('left','unset');
            curSlide.css("right",'400px');
            nextSlide.css('left','0px');
        });

    }

    niceslider(options);

});