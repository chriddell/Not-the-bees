'use strict';

$('#forward-to-colleague-form').submit(function(e){

  e.preventDefault();

  // Set the URL which processes the form submission
  var url = 'process/submit.php';

  // jQuery AJAX GET request
  $.get({

    type: 'GET',
    url: url,
    data: $(this).serialize() + '&submit=true',

  })

  // Success
  .done( function( data ) {

    showUserResponse(data);
  })

  // Failure
  .fail( function( data ) {

    showUserResponse(data);
  });

});

function showUserResponse( data ) {

  if ( data.toLowerCase() === 'success' ) {

    // Log a message
    console.log( data );

    $('.form--share-url__container').addClass('form--submitted');
  } else {

    // Log an error
    console.error( data );
  }

};