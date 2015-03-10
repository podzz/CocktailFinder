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

function delete_button(id) {
    var buttonToDelete = "#itemli" + id;
    $(buttonToDelete).hide("slow");
    var listItemLi = $("li[id*='itemli']");
    if (listItemLi.length <= 1)
        $("ul[name='excludes']").hide("slow");
    setTimeout(function () {
        $(buttonToDelete).remove();
    }, 400);
}

function add_button(item) {
    if ($("ul[name='excludes']").css('display') == 'none')
        $("ul[name='excludes']").toggle("slow");
    var iDiv = document.createElement('li');
    var i = 1;
    var myElem = document.getElementById('itemli' + i);
    while (myElem != null) {
        i = i + 1;
        myElem = document.getElementById('itemli' + i);
    }
    iDiv.id = '';
    iDiv.className = '';
    iDiv.innerHTML = '<li id="itemli' + i + '"> \
                        <button type="button" style="display:none;" id="item' + i + '" onClick="delete_button(' + i + ')" class="btn btn-default"> \
                            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Item ' + i + ' \
                        </button> \
                      </li>';
    document.getElementsByTagName("ul")[0].appendChild(iDiv);
    var buttonCreated = jQuery('#item' + i + ':first');
    buttonCreated.toggle("slow");
}
