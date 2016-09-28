'use strict';

/* ==========================================================================
   Global Vars
   ========================================================================== */

var currentSection = 1,
    totalSections = 8,
    scrollAllowed = true,
    usefulClassName = 'step';

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
    .addClass('honeycomb-key-panels--active')
    .find(targetID)
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
    .parents('.honeycomb__key-panel--large')
    .css({
      'visibility': 'hidden'
    })
    .parents('#honeycomb-key-panels')
    .removeClass('honeycomb-key-panels--active');

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
  $('body').alterClass(usefulClassName + '-*', usefulClassName + '-' +  currentSection + '-active');
}

/**
 * Prevent vertical scrolling bounce on iOS
 *
 * http://bit.ly/1t7M4qp
 */
function preventBounceiOS() {

  var xStart, yStart = 0;
 
  document.addEventListener('touchstart',function(e) {

    xStart = e.touches[0].screenX;
    yStart = e.touches[0].screenY;

  });
   
  document.addEventListener('touchmove',function(e) {

    var xMovement = Math.abs(e.touches[0].screenX - xStart);
    var yMovement = Math.abs(e.touches[0].screenY - yStart);

    if((yMovement * 3) > xMovement) {
      
      e.preventDefault();
    }
  });
}

/**
 * Master scroll function
 * which powers app through it's stages
 */
function scrollProgressApp() {

  $('body').on(

    'DOMMouseScroll mousewheel MozMousePixelScroll scroll', function(e) {  
    /*
     * Multiple events for compat.
     *
     * See:
     * http://bit.ly/2cWWZ0j
     * http://www.javascriptkit.com/javatutors/onmousewheel.shtml
     */

      if (!$('body').hasClass('no-scroll')) {

        e.preventDefault();
        e.stopPropagation();

        /**
         * Set scrollAllowed back to true
         * after a designated interval
         */
        clearTimeout( $.data( this, 'timer' ) );
        $.data(this, 'timer', setTimeout(function() {
          scrollAllowed = true;
        }, 150));

        if ( scrollAllowed ) {

          /*
           * Set scrollAllowed to false 
           * to prevent currentSection changing twice
           */
          scrollAllowed = false;

          /*
           * jQuery mousewheel direction capture
           * works cross-browser
           */
          if ( typeof e.originalEvent.detail == 'number' && e.originalEvent.detail !== 0 ) {

            if( e.originalEvent.detail > 0 && currentSection < totalSections ) {

              // Next section
              currentSection++;

            } else if( e.originalEvent.detail < 0 && currentSection > 1 ){

              // Previous section
              currentSection--;

            }

          } else if ( typeof e.originalEvent.wheelDelta == 'number' ) {

            if ( e.originalEvent.wheelDelta < 0 && currentSection < totalSections ) {

              // Next section
              currentSection++;

            } else if ( e.originalEvent.wheelDelta > 0 && currentSection > 1 ) {

              // Previous section
              currentSection--;

            }
          }

          DOMGetsTheClass();

        } 

        else {

          // Do nothing...
          return false;

        }
      }
    }
  );
}

/**
 * Scroll function for touch devices
 */
function scrollProgressAppTouch() {

  $('body').on('swipeup', function(){

    if (!$('body').hasClass('no-scroll')) {
      if (currentSection < totalSections) {
        currentSection++;
        DOMGetsTheClass();
      }
    }
  });

  $('body').on('swipedown', function(){

    if (!$('body').hasClass('no-scroll')) {
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
function showOverlay(clicked) {

  // find out which overlay to show based on data-attr
  var whichOverlay = $(clicked).data('overlay');

  // find the relevant overlay
  var target = $('body').find('.overlay[data-overlay="' + whichOverlay + '"]'); 

  // remove the hidden class
  target.removeClass('overlay--hidden'); 

}

/**
 * Hide overlay
 */
function closeOverlay(clicked) {

  $(clicked)
   .parent('.overlay')
   .addClass('overlay--hidden'); 

}

/* ==========================================================================
   Event Listeners / Triggers
   ========================================================================== */

$(document).ready(function(){

  // Master scroll function
  scrollProgressApp();
  scrollProgressAppTouch();

  // Prevent bouncing on touch devices when user scrolls
  preventBounceiOS();

  // Reset to step 1
  $('#reset-app').on('click', function(){
    // Only reset if we are not on first screen
    if ( currentSection !== 1 ) {
      resetApp();
    }
  });

  // Advance to next step
  $('#plant-seed, #scroll-start, .service-group__item').on('click', function(){
    currentSection++;
    DOMGetsTheClass();
  });

  // Key panels - open
  $('.honeycomb__key-panel').on('click', function(){

    // only fire if we're on step 8
    if ( $('body').hasClass('step-7-active') ) {

      showKeyPanel(this);
      $('body').addClass('no-scroll');
    }
  });

  // Key panel - close
  $('.honeycomb__key-panel--large__close').on('click', function(){
    hideKeyPanel(this);
    $('body').removeClass('no-scroll');
  });

  // Overlay - open
  $(document).on('click', '.overlay__open', function(){
    showOverlay(this);
  });

  // Overlay - close
  $(document).on('click', '.overlay__close', function(){
    closeOverlay(this);
  });

  // Add body class if Microsoft browser
  if (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) {
      $('html').addClass('is-not-a-good-browser');
  }
});

/* ==========================================================================
   Development functions

   Burn after using.
   ========================================================================== */
var startAt = 8;

currentSection = startAt;

$(document).ready(function(){

  DOMGetsTheClass();
});