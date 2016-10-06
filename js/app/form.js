'use strict';

$( '#forward-to-colleague-form' ).submit( function( e ){

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

    // Tell user it's gone
    showUserAResponse(data);
  })

  // Failure
  .fail( function( data ) {

    showUserAResponse(data);
  });

});


/**
 * Add class to form container when
 * form is submitted successfully
 */
function showUserAResponse( data ) {

  if ( data.toLowerCase() === 'success' ) {

    // Log a message
    console.log( data );

    $( '.form--share-url__container' ).addClass( 'form--submitted' );
  } else {

    // Log an error
    console.error( data );

    $( '.form--share-url__container' ).addClass( 'form--failed' );
  }

};

/**
 * Show and reset the form
 */
function showForm( formID ) {

  $(formID)
    // Show form
    .parents('.form__container')
    .removeClass('form--submitted')

  $(formID)[0].reset();
}
$( document ).on( 'click', '.form--share-url__container .show-form', function(){ showForm( '#forward-to-colleague-form' ) } );

/**
 * Reset a form
 */
function resetForm( formID ) {

  $(formID)[0].reset();
}
$( document ).on( 'click', '.form--share-url__container .close__overlay', function(){ resetForm( '#forward-to-colleague-form' ) } );