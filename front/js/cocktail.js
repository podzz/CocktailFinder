$(function(){
   $("#runapp").cycle({
       fx: "scrollHorz",
       slides: "> div",
       timeout: 0,
       speed: 1000,
       log: false
   });

    $(".gotoapp").on("click", function() {
        $("#runapp").cycle("next");
        $(".background").addClass("background-transition");
    });

    $(".backtohome").on("click", function() {
        $("#runapp").cycle("prev");
        $(".background").removeClass("background-transition");

    });

    $("body").removeClass("preload");
});