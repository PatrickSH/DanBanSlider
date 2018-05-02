//$(document).ready(function(){

var curSlide;
var nextSlide;

function appendControls()
{
    $("#danbanslider").after("<ul id='danbanslider-controls'><li id='danbanslider-backward'><</li><li id='danbanslider-forward'>></li></ul>");
}

function danbanslider(options)
{
    if(!$("#danbanslider-controls")[0]) //Append standard controls if not present
        appendControls();


    var el = $("#danbanslider");
    var children = el.children();
    var childCount = el.children().length;
    var i = 1;


    el.css({
        height : options.height+"px",
        width : options.width+"px"
    });

    children.css({
        height : options.height+"px",
        width : options.width+"px",
        transition : options.transistiontime+"s"
    });

    children.each(function(){ //Append all data on slides
        var image = $(this).attr('data-src');
        $(this).css('background-image','url('+image+')');

        if(options.backgroundColor) //We can use background color in case image is not tall enough
            $(this).css('background-color',options.backgroundColor);

        $(this).attr('data-danbanslider-pos',i);

        if(options.crop){ //If we want crop do it
            $(this).css('background-size','cover');
        } else {
            $(this).css('background-size','initial');
        }

            i++;
    });

    $(document).on('click','#danbanslider-forward',function(){
        curSlide = $(".danbanslider-active");

        if(options.loop && curSlide.attr('data-danbanslider-pos') == childCount){ //If we run in loop and is at end go to first one
            nextSlide = $("#danbanslider").children().first();
        }else{
            nextSlide = curSlide.next();
        }

        curSlide.removeClass('danbanslider-active');
        nextSlide.addClass('danbanslider-active');

        /**Remove right classes**/
        curSlide.removeClass('danbanslider-show-left').removeClass('danbanslider-show-right').removeClass('danbanslider-hide-right').addClass('danbanslider-hide-left');
        nextSlide.removeClass('danbanslider-show-right').removeClass('danbanslider-hide-right').addClass('danbanslider-show-left');
    });

    $(document).on('click','#danbanslider-backward',function(){
        curSlide = $(".danbanslider-active");

        if(options.loop && curSlide.attr('data-danbanslider-pos') == childCount){ //If we run in loop and is at end go to first one
            nextSlide = $("#danbanslider").children().first();
        }else{
            nextSlide = curSlide.prev();
        }

        curSlide.removeClass('danbanslider-active');
        nextSlide.addClass('danbanslider-active');

        /**Remove left classes**/
        curSlide.removeClass('danbanslider-show-right').removeClass('danbanslider-show-left').removeClass('danbanslider-hide-left').addClass('danbanslider-hide-right');
        nextSlide.removeClass('danbanslider-show-left').removeClass('danbanslider-hide-left').addClass('danbanslider-show-right');
    });
}

//});