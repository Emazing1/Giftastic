//TV Show Array
var shows = [
    "The Walking Dead", "Dexter", "Breaking Bad", "NCIS", "Arrow","Game of Thrones", "Agents of Shield", "Chicago PD",
    "The Sopranos", "Goliath", "Blindspot", "Sherlock", "Grey's Anatomy", "The Flash", "Chicago Fire",
    "Code Black", "Big Bang Theory", "House of Cards", "Supergirl", "Shark TanK",   
];


$(document).ready(function() {


    function addShow() {
//empty's 
        $('.buttons').empty();

        for (var i = 0; i < shows.length; ++i) {
            // Attributes
            var showButtons = $('<button type="button" class="btn-lg btn-primary" value = "" data-toggle="button" aria-pressed="false" autocomplete="off">' + shows[i] + '</button>');
            showButtons.attr('data-name', shows[i]);
            showButtons.addClass("myClass");
            $('.buttons').append(showButtons);

        }
        //on-click function
        $(".myClass").on('click', function() {
            $('.gifsHere').html("");
            //'this' will allow us to target the name attribute of any button that is clicked so that we can input it into the query url for each indiv buttons.
            var clickName = $(this).data('name');
            //Giphy API key
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + clickName + "&api_key=dc6zaTOxFJmzC";

            $.ajax({
                url: queryURL,
                method: 'GET'
            })

            .done(function(response) {
                console.log(response);
                var results = response.data;


                for (var i = 0; i < 10; i++) {

                    if (results[i].rating == "r" || results[i].rating == "pg-13") {

                    } else {

                        var gifDiv = $('<div class ="items">');


                        var gif = $('<img>');
                        gif.addClass("imgClass");
                        gif.attr('data-state', 'still');
                        gif.attr('src', results[i].images.original_still.url);
                        gif.attr('data-still', results[i].images.original_still.url);
                        gif.attr('data-animate', results[i].images.original.url);

                        // gifDiv.append(gif);

                        $('.gifsHere').prepend(gif);

                    }
                }

                $('.imgClass').on('click', function() {

                    var state = $(this).attr('data-state');

                    if (state == 'still') {
                        $(this).attr('src', $(this).data('animate'));
                        $(this).attr('data-state', 'animate');
                    } else {
                        $(this).attr('src', $(this).data('still'));
                        $(this).attr('data-state', 'still');
                    }

                });
            });
        });
    }
    addShow();

    $('.submit').on('click', function() {
        var search = $('#showInput').val().trim();

        shows.push(search);

        addShow();

        return false;

    });
});
