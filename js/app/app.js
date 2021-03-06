'use strict';

/* ==========================================================================
   Global Vars
   ========================================================================== */

var currentSection = 1,
    totalSections = 9,
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


/* ==========================================================================
   Master scroll function
   ========================================================================== */
$(document).ready(function(){

  $('body').on({

    'DOMMouseScroll mousewheel MozMousePixelScroll': function(e) { 
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
        }, 250));

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

          $('#main-container').alterClass(usefulClassName + '-*', usefulClassName + '-' +  currentSection + '-active');

        } else {

          // Do nothing...
          return false;

        }
        
      }

    }
  });

});

$('.honeycomb__key-panel').on('click', function(){
  showKeyPanel(this);
  $('body').addClass('no-scroll');
});

$('.honeycomb__key-panel--large__close').on('click', function(){
  hideKeyPanel(this);
  $('body').removeClass('no-scroll');
});


/* ==========================================================================
   Development functions

   Burn after using.
   ========================================================================== */
var startingLevel = 1;

currentSection = startingLevel;

$(document).ready(function(){

  $('#main-container').addClass(usefulClassName + '-' +  currentSection + '-active');
});