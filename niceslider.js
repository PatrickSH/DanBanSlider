$(document).ready(function(){

    var options =
    {
        crop : true,
        height : 400,
        width : 400
    }

    function niceslider(options)
    {
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
               $(this).css('right','-400px');
           }

           i++;
        });

        $(document).on('click','#niceslider li',function(){
            $(this).css("left",'-400px');
            $(this).next().css("right",'0px');
        });

    }

    niceslider(options);

});