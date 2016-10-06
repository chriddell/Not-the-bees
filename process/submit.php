<?php

  if(isset($_GET["submit"])){

    // Required vars
    $sender = $_GET["sender-email"];
    $recipient = $_GET["recipient-email"];
    
    // Subject of Email
    $subject = "Advent ABM";

    // Set up main body var
    $body = "";
     
    // prepare email body text
    $body .= "Hey, look at this: ";

    if ( $sender != "" && $recipient != "" ){

      // Send an email
      @mail($recipient, $subject, $body, "From:" . $sender);

      // Return a message
      echo "Success";
    } else {
      echo "Error";
    }
  } else {
    echo 'Submit not set';
  }
?>