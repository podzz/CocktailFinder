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

function delete_button(item){
    var buttonToDelete = "#item" + item;
    $(buttonToDelete).hide("slow");
    setTimeout(function(){
        $(buttonToDelete).remove();
    }, 400);


}

function add_button(item) {
    var iDiv = document.createElement('li');

    var i = 1;
    var myElem = document.getElementById('item' + i);
    while (myElem != null) {
        i = i + 1;
        myElem = document.getElementById('item' + i)
    }
        iDiv.id = '';
    iDiv.className = '';
    iDiv.innerHTML = '<li> \
                        <button type="button" style="display:none;" id="item' + i + '" onClick="delete_button(' + i + ')" class="btn btn-default"> \
                            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Item ' + i + ' \
                        </button> \
                      </li>';
    document.getElementsByTagName("ul")[0].appendChild(iDiv);
    var buttonCreated = jQuery('#item' + i + ':first');
    buttonCreated.toggle("slow");
}
