// Check off specific todo's by clicking
$("ul").on("click", "li", function() {
    // toogle the grey color and strike through
    $(this).toggleClass("completed");
});

// Clik the X to delete the Todo
$("ul").on("click", "span",function (e) { 
    $(this).parent().fadeOut(500, function() {
        $(this).remove();
    });
    e.stopPropagation();
});

// updates the todo list
$("input[type='text']").keypress(function(e) {
    if (e.which === 13) {
        // grabbing the new todo entered in the text input field
        var todoText = $(this).val();

        // create a new li and add to ul
        $("ul").append("<li><span><i class='fa fa-trash' aria-hidden='true'></i></span> " + todoText + "</li>");
    }
});

// toggles the input view
$(".fa-plus").click(function (e) { 
    $("input[type='text']").fadeToggle();
});