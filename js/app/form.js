'use strict';

$('#forward-to-colleague-form').submit(function(e){

  var url = 'process/submit.php';
  //var sender = $('#sender').value();
  //var recipient = $('#recipient').value();

  $.ajax({
    type: 'POST',
    url: url,
    data: $(this).serialize(),
    success: function(data) {
      alert(data);
    }
  });

  e.preventDefault();

});