//$(document).ready(function(){

var curSlide;
var nextSlide;

function appendControls()
{
    $("#niceslider").after("<ul id='niceslider-controls'><li id='niceslider-backward'><</li><li id='niceslider-forward'>></li></ul>");
}

function niceslider(options)
{
    if(!$("#niceslider-controls")[0]) //Append standard controls if not present
        appendControls();


    var el = $("#niceslider");
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

        $(this).attr('data-niceslider-pos',i);

        if(options.crop){ //If we want crop do it
            $(this).css('background-size','cover');
        } else {
            $(this).css('background-size','initial');
        }

            i++;
    });

    $(document).on('click','#niceslider-forward',function(){
        curSlide = $(".niceslider-active");
        nextSlide = curSlide.next();
        curSlide.removeClass('niceslider-active');
        nextSlide.addClass('niceslider-active');

        /**Remove right classes**/
        curSlide.removeClass('niceslider-show-left').removeClass('niceslider-show-right').removeClass('niceslider-hide-right').addClass('niceslider-hide-left');
        nextSlide.removeClass('niceslider-show-right').removeClass('niceslider-hide-right').addClass('niceslider-show-left');
    });

    $(document).on('click','#niceslider-backward',function(){
        curSlide = $(".niceslider-active");
        nextSlide = curSlide.prev();
        curSlide.removeClass('niceslider-active');
        nextSlide.addClass('niceslider-active');

        /**Remove left classes**/
        curSlide.removeClass('niceslider-show-right').removeClass('niceslider-show-left').removeClass('niceslider-hide-left').addClass('niceslider-hide-right');
        nextSlide.removeClass('niceslider-show-left').removeClass('niceslider-hide-left').addClass('niceslider-show-right');
    });
}

//});