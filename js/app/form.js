'use strict';

$( '#forward-to-colleague-form' ).submit( function( e ){

  e.preventDefault();

  // Set the URL which processes the form submission
  var url = 'process/submit.php';

  // jQuery AJAX GET request
  $.ajax({

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
 * Finds which form has been submitted
 * based on which overlay is currently visible
 */
function whichFormWasIt() {

  var thisForm = $('.overlay:not(.overlay--hidden)').data('overlay');
  return thisForm;
};


/**
 * Add class to form container when
 * form is submitted successfully
 */
function showUserAResponse( data ) {

  if ( data.toLowerCase() === 'success' ) {

    // Log a message
    console.log( data );

    // Add a class to reveal a message to user
    $( '.overlay:not(.overlay--hidden) .form__container' ).addClass( 'form--submitted' );
  } 

  else {

    // Log an error
    console.error( data );

    // Add a class to reveal a message to user
    $( '.overlay:not(.overlay--hidden) .form__container' ).addClass( 'form--failed' );
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

  // If it's the Marketo form...
  if ( formID.indexOf('mkto') != -1 ) {

    // Re-enable submit
    $(formID + ' button[type="submit"]')
      .removeAttr('disabled')
      .text('Submit');
  }
}
$( document ).on( 'click', '.form--share-url__container .show-form', function(){ showForm( '#forward-to-colleague-form' ) } );
$( document ).on( 'click', '.form--marketo__container .show-form', function(){ showForm( '#mktoForm_1557' ) } );

/**
 * Reset a form
 */
function resetForm( formID ) {

  $(formID)[0].reset();
}
$( document ).on( 'click', '.form--share-url__container .close__overlay', function(){ resetForm( '#forward-to-colleague-form' ) } );

/**
 * Anonymous function to populate hidden
 * input field with current URL, so we can
 * send it in our email regardless of if the 
 * site's URL changes
 */
(function(){
  $( 'input[name="url"]' ).val( 
    window.location.protocol + "//" + window.location.host + window.location.pathname 
  );
})();

/**
 * Populate form with Marketo ID no.
 * using the Marketo API
 *
 * http://developers.marketo.com/javascript-api/forms/api-reference/
 */
(function(){
  
  // Load the form and populate <form> element in DOM
  MktoForms2.loadForm("//app-ab17.marketo.com", "694-KCV-926", 1557, 

    // Now do some of our stuff ;)
    function(form) {

      // On successful submission
      form.onSuccess(function(){

        showUserAResponse('success');
        return false;
      })
    }
  );
})();