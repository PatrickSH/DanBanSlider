//$(document).ready(function(){

var curSlide = $(".danbanslider-active");
var nextSlide;
var childCount;

function appendControls()
{
    $("#danbanslider").after("<ul id='danbanslider-controls'><li id='danbanslider-backward'><</li><li id='danbanslider-forward'>></li></ul>");
}

function getCurrentPos()
{
    return curSlide.attr('data-danbanslider-pos');
}

function isEnd()
{
    return getCurrentPos() == childCount;
}

function isStart()
{
    return getCurrentPos() == 1;
}

function getNextPos()
{
    return parseInt(getCurrentPos()) + 1;
}



function danbanslider(options)
{
    if(!$("#danbanslider-controls")[0]) //Append standard controls if not present
        appendControls();


    var el = $("#danbanslider");
    var children = el.children();
    childCount = el.children().length;
    var i = 1;


    el.css({
        height : options.dimensions.height+"px",
        width : options.dimensions.width+"px"
    });

    children.css({
        height : options.dimensions.height+"px",
        width : options.dimensions.width+"px",
        transition : options.graphics.transistiontime+"s"
    });

    children.each(function(){ //Append all data on slides
        var image = $(this).attr('data-src');
        $(this).css('background-image','url('+image+')');

        if(options.graphics.backgroundColor) //We can use background color in case image is not tall enough
            $(this).css('background-color',options.graphics.backgroundColor);

        $(this).attr('data-danbanslider-pos',i);

        if(options.dimensions.crop){ //If we want crop do it
            $(this).css('background-size','cover');
        } else {
            $(this).css('background-size','initial');
        }

            i++;
    });

    if(options.playing.autoplay){
        var interval = setInterval(function(){
            $("#danbanslider-forward").click();
        },options.playing.autoplayspeed);

        if(!options.playing.loop && isEnd())
            clearInterval(interval);
    }

    $(document).on('click','#danbanslider-forward',function(){
        curSlide = $(".danbanslider-active");

        if(options.playing.loop && isEnd()){ //If we run in loop and is at end go to first one
            $("#danbanslider").children().removeClass().addClass('danbanslider-hide-right');
            nextSlide = $("#danbanslider").children().first();
        }else{
            if(isEnd()) //Dont go further then last image
                return false;

            nextSlide = curSlide.next();
        }

        curSlide.removeClass('danbanslider-active');
        nextSlide.addClass('danbanslider-active');

        /**Remove right classes**/
        if(options.playing.loop && isEnd()){
            curSlide.removeClass('danbanslider-show-left').removeClass('danbanslider-show-right').removeClass('danbanslider-hide-right').addClass('danbanslider-hide-right');
        }else{
            curSlide.removeClass('danbanslider-show-left').removeClass('danbanslider-show-right').removeClass('danbanslider-hide-right').addClass('danbanslider-hide-left');
        }
        nextSlide.removeClass('danbanslider-show-right').removeClass('danbanslider-hide-right').addClass('danbanslider-show-left');
    });

    $(document).on('click','#danbanslider-backward',function(){
        curSlide = $(".danbanslider-active");

        if(isStart()) //Dont go further then first image
            return false;

        nextSlide = curSlide.prev();


        curSlide.removeClass('danbanslider-active');
        nextSlide.addClass('danbanslider-active');

        /**Remove left classes**/
        curSlide.removeClass('danbanslider-show-right').removeClass('danbanslider-show-left').removeClass('danbanslider-hide-left').addClass('danbanslider-hide-right');
        nextSlide.removeClass('danbanslider-show-left').removeClass('danbanslider-hide-left').addClass('danbanslider-show-right');
    });
}

//});