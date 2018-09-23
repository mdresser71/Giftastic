//Initial array of TV shows 
$(document).ready(function() {

    var topics = ["Moonlighting", "Buck Rogers", "Mork and Mindy", "Miami Vice", "ALF", "Magnum PI", "Knight Rider", "Three's Company", "Night Court", "Mama's Family"];  
  
    //  create topics array buttons
    function renderButtons(){
      $('#buttons-view').empty();
  
      for (var i = 0; i < topics.length; i++) {
              //create all buttons
              var a = $('<button>');
              a.addClass('shows');
              a.attr('data-name', topics[i]);
              a.text(topics[i]);
              $('#buttons-view').append(a);
            }
          }    
          renderButtons();
  
  //on button click
  $(document).on('click', '.shows', function() {
  
      //new variable will log the text data from each button
      var TVShows = $(this).html(); 
      // console.log(1980TV);
  
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + TVShows + "&limit=10&api_key=FCBAT7DCciFkcbxOqr0Yenvv9IqvDF4C";
      // console.log(queryURL);
  
      // Creating an AJAX call for the specific tv show button being clicked
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
  
        var results = response.data;
          //console.log(results);
          //empties the div before adding more gifs
          $('#TV-view').empty();
          for ( var j=0; j < results.length; j++) {
                      var imageDiv = $('<div>');
                      var imageView = results[j].images.fixed_height.url;
                      var still = results[j].images.fixed_height_still.url;
                          // console.log(imageView);  
  
          var gifImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                      gifImage.attr('data-state', 'still');
                      $('#TV-view').prepend(gifImage);
                      gifImage.on('click', playGif);
  
          // Pulling ratings for each tv show
          var rating = results[j].rating;
              // console.log(rating);
          var displayRated= $('<p>').text("Rating: " + rating);
          $('#TV-view').prepend(displayRated);
    } // end for loop
  
  }); // done response
  
          //function to stop and animate gifs
          function playGif() { 
                      var state = $(this).attr('data-state');
                      // console.log(state);
                   if (state == 'still'){
                       $(this).attr('src', $(this).data('animate'));
                        $(this).attr('data-state', 'animate');
                   } else{
                       $(this).attr('src', $(this).data('still'));
                       $(this).attr('data-state', 'still');
                      }
  
                  } //end of on click function
  
        }); //end of document on click 
  
            //adding new button to array
          $(document).on('click', '#add-tv', function(){
              if ($('#tv-input').val().trim() == ''){
                alert('Input can not be left blank');
             }
             else {
              var tv = $('#tv-input').val().trim();
              topics.push(tv);
              $('#tv-input').val('');
              renderButtons();
              return false;
  
              }
  
          });

          });
