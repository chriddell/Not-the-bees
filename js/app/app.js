'use strict';

/* ==========================================================================
   Global Vars
   ========================================================================== */

var currentSection = 1,
    totalSections = 8,
    noScrollClass = 'no-scroll',
    usefulClassName = 'step',
    isScroll = function() {
      if ( $('body').hasClass( noScrollClass ) ) {
        return true;
      } else {
        return false;
    }
  };

/* ==========================================================================
   Functions
   ========================================================================== */

/**
 * jQuery alterClass plugin
 *
 * Remove element classes with wildcard matching. Optionally add classes:
 *   $( '#foo' ).alterClass( 'foo-* bar-*', 'foobar' )
 *
 * Copyright (c) 2011 Pete Boere (the-echoplex.net)
 * Free under terms of the MIT license: http://www.opensource.org/licenses/mit-license.php
 *
 */
$.fn.alterClass = function ( removals, additions ) {
  
  var self = this;
  
  if ( removals.indexOf( '*' ) === -1 ) {

    // Use native jQuery methods if there is no wildcard matching
    self.removeClass( removals );

    return !additions ? self : self.addClass( additions );

  }

  var patt = new RegExp( '\\s' + 
      removals.
        replace( /\*/g, '[A-Za-z0-9-_]+' ).
        split( ' ' ).
        join( '\\s|\\s' ) + 
      '\\s', 'g' );

  self.each( function ( i, it ) {

    var cn = ' ' + it.className + ' ';

    while ( patt.test( cn ) ) {

      cn = cn.replace( patt, ' ' );

    }

    it.className = $.trim( cn );

  });

  return !additions ? self : self.addClass( additions );
};

/**
 * Show key panel
 */
function showKeyPanel( clicked ) {

  var self = clicked;

  // target has similar id to clicked so let's merge
  var targetID = '#large-' + self.id;

  $('#honeycomb-key-panels')
    .addClass( 'honeycomb-key-panels--active' )
    .find( targetID )
    .css({
      'visibility': 'visible'
    });

};

/**
 * Hide key panel
 */
function hideKeyPanel( clicked ) {

  var self = clicked;

  $(self)
    .parents( '.honeycomb__key-panel--large' )
    .css({
      'visibility': 'hidden'
    })
    .parents( '#honeycomb-key-panels' )
    .removeClass( 'honeycomb-key-panels--active' );

};

/**
 * Reset app to step 1
 */
function resetApp() {

  // Set to 2, because we don't need to 
  // show user the scroll tip again
  currentSection = 2;

  // Add the class to trigger animations
  DOMGetsTheClass();
}

/**
 * Modify DOM element with current section class
 *
 * This triggers the CSS animations which drive the application
 */
function DOMGetsTheClass() {
  $( 'body' ).alterClass( usefulClassName + '-*', usefulClassName + '-' +  currentSection + '-active' );
}

/**
 * Prevent vertical scrolling bounce on iOS
 * http://bit.ly/1t7M4qp
 */
function preventBounceiOS() {

  var xStart, yStart = 0;
 
  document.addEventListener( 'touchstart', function( e ) {

    xStart = e.touches[0].screenX;
    yStart = e.touches[0].screenY;

  });
   
  document.addEventListener( 'touchmove', function( e ) {

    var xMovement = Math.abs(e.touches[0].screenX - xStart);
    var yMovement = Math.abs(e.touches[0].screenY - yStart);

    if((yMovement * 3) > xMovement) {
      
      e.preventDefault();
    }
  });
}

/**
 * Scroll function for touch devices
 */
function scrollProgressOnTouch() {

  $( 'body' ).on( 'swipeup', function(){

    if (!$( 'body' ).hasClass( 'no-scroll' )) {
      if ( currentSection < totalSections ) {
        currentSection++;
        DOMGetsTheClass();
      }
    }
  });

  $( 'body' ).on('swipedown', function(){

    if ( !$( 'body' ).hasClass( 'no-scroll' ) ) {
      if (currentSection > 1) {
        currentSection--;
        DOMGetsTheClass();
      }
    }
  });
}

/**
 * Show overlay
 */
function showOverlay( clicked ) {

  // find out which overlay to show based on data-attr
  var whichOverlay = $( clicked ).data( 'overlay' );

  // find the relevant overlay
  var target = $( 'body' ).find( '.overlay[data-overlay="' + whichOverlay + '"]' ); 

  // remove the hidden class
  target.removeClass( 'overlay--hidden' ); 

  // add no scroll to body
  $( 'body' ).addClass( noScrollClass );

}

/**
 * Hide overlay
 */
function closeOverlay( clicked ) {

  $( clicked )
   .parents('.overlay')
   .addClass('overlay--hidden'); 

}

/**
 * Progress app by detecting
 * arrow key press
 */
function detectKey( e ) {

  e = e || window.event;
  // if left or up key
  if ( ( e.keyCode === 37 || e.keyCode === 38 ) && currentSection > 1) {
    currentSection--;
    DOMGetsTheClass();
  } 

  // right or down key
  else if ( ( e.keyCode === 39 || e.keyCode === 40 ) && currentSection < totalSections ) {
    currentSection++;
    DOMGetsTheClass();
  }
}

/**
 * Show user instruction
 */
function showUserInstruction( target ) {

  var el = target,
      classToAdd = 'ani--show-user-instruction';

  function showInstruction() {
    $( el ).addClass( classToAdd );
    $( 'body' ).addClass( noScrollClass );
    $(document).on( 'animationend webkitAnimationEnd oanimationend MSAnimationEnd', el, function(){
      hideInstruction();
    });
  }

  function hideInstruction() {
    $( el ).removeClass( classToAdd );
    $( 'body' ).removeClass( noScrollClass );
  }

  // User instruction is not visible      
  if ( !$( el ).hasClass( classToAdd ) && !$( 'body' ).hasClass( noScrollClass ) ) {


    // Add the class
    _.throttle( showInstruction(), 500 );
  }
}

/* ==========================================================================
   Event Listeners / Triggers
   ========================================================================== */

$(document).ready(function(){

  // Detect which key on keydown
  $(document).on('keydown', detectKey);

  // When user clicks trigger, go to next step
  $(document).on('click', '.go-to-next-step', function(){
    currentSection++;
    DOMGetsTheClass();
  });

  // Show user instruction when they try to scroll
  $(document).on('DOMMouseScroll mousewheel MozMousePixelScroll scroll', function(){
    _.throttle( showUserInstruction( '.user-instruction--modal--header' ), 500 );
  });

  // If we're on touch, do touchy stuff
  if ( $( 'html' ).hasClass( 'touchevents' ) ) {
    scrollProgressOnTouch();
    preventBounceiOS();
  };

  /**
   * Key Panels
   */

  // Open
  $(document).on( 'click', '.honeycomb__key-panel', function(){

    // only fire if we're on step 8
    if ( $( 'body' ).hasClass( 'step-7-active' ) ) {

      showKeyPanel(this);
      $( 'body' ).addClass( 'no-scroll' );
    }
  });

  // Close
  $(document).on( 'click', '.honeycomb__key-panel--large__close', function(){
    hideKeyPanel( this );
    $( 'body' ).removeClass( 'no-scroll' );
  });

  /**
   * Overlays
   */

  // Open
  $(document).on( 'click', '.overlay__open', function(){
    showOverlay( this );
  });

  // Close
  $(document).on( 'click', '.overlay__close, .overlay__bg', function(){
    closeOverlay( this );
  });

  /**
   * Hacks / Extras
   */

  // Reset to step 1
  $( document ).on( 'click', '#reset-app', function(){
    // Only reset if we are not on first screen
    if ( currentSection !== 1 ) {
      resetApp();
    }
  });

  // Advance to next step
  $(document).on( 'click', '#plant-seed, #scroll-start, .service-group__item', function(){
    currentSection++;
    DOMGetsTheClass();
  });

  // Add body class if Microsoft browser
  if (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) {
      $('html').addClass('is-not-a-good-browser');
  }
});