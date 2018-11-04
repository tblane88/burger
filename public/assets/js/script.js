// startup function
$(function() {
    registerPartial("burger-block", "#burger-block-partial");
    displayPage();
    setupEventHandlers();

});

function registerPartial(name, partialId) {
    var source = $(partialId).text();
    Handlebars.registerPartial(name, source);
}

function displayPage() {

    $.get("/api/burgers").then(
        function(burgers) {
            renderTemplate({burgers: burgers});
        }
    );
};

function renderTemplate(data) {
    var source = $("#page-template").text();
    var template = Handlebars.compile(source);
    var html = template(data);
    $("#app").html(html);
};

function setupEventHandlers() {
    $(document).on("click", ".devour", function(event) {
        var id = $(this).data("id");

        var newBurgerState = {
            devoured: true
        };

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newBurgerState
        }).then(
            function() {
                console.log("changed devoured to true");

                displayPage();
            }
        )
    });

    $(document).on("submit", ".create-form", function(event) {
        event.preventDefault();
        console.log("inside submit");
        var newBurger = {
            name: $("#burger-input").val().trim()
            

        };

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function() {
                console.log("created new burger");

                displayPage();
            }
        )

    });
}