<?php

  if ( isset($_GET['submit']) ){

    $to = $_GET['recipient-email'];
    $from = $_GET['sender-email'];
    $shareURL = $_GET['url'];
    
    $subject = 'Advent ABM';

    $headers = "From: " . $from . "\r\n";
    $headers .= "Reply-To: " . $_GET['sender-email'] . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

    $message = '<html><body>';
    $message .= '<table width="640" cellpadding="0" cellspacing="0"><tbody><tr><td>';
    $message .= '<img src="http://www.approvalarea.com/advent/abm/assets/img/for-email/header.png" width="100%" height="auto"/>';
    $message .= '<br/><br/>';
    $message .= 'Hey, look at this: <a href="http://www.approvalarea.com/advent/abm">Advent ABM</a>';
    $message .= '</td></tr></tbody></table>';
    $message .= '</body></html>';

    if ( $from != '' && $to != '' && $shareURL != '' ){

      @mail($to, $subject, $message, $headers);
      echo 'Success';
    } 

    else if ( $shareURL = '' ) {

      echo 'The URL field is not defined.';
    } 

    else if ( $from = '' ) {

      echo 'The sender is not defined.';
    } 

    else if ( $to = '' ) {

      echo 'The recipient is not defined.';
    } 

    else {

      echo 'Error';
    }

  } 

  else {

    echo 'Submit not set';
  }
?>