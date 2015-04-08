$(function () {
    $("#runapp").cycle({
        fx: "scrollHorz",
        slides: "> div",
        timeout: 0,
        speed: 1000,
        log: false
    });

    $(".gotoapp").on("click", function () {
        $("#runapp").cycle("next");
        $(".background").addClass("background-transition");
    });

    $(".backtohome").on("click", function () {
        $("#runapp").cycle("prev");
        $(".background").removeClass("background-transition");

    });
    $("body").removeClass("preload");
});

function delete_all_button() {
    var listItemLi = $("li[id*='itemli']");
    for (i = 0; i < listItemLi.length; i++)
            delete_button(i + 1);
    $("ul[name='excludes']").hide("slow");
}
