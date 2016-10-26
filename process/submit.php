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

    $message = '
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Forward to a colleague | Smart Growth | Advent</title>
     
      <style>
        @media only screen and (max-width: 600px) {
          .content {
            width: 100% !important;
          }
        }
      </style>
    </head>
    <body style="background-color: #EEEEEE;">
     
    <!--[if (gte mso 9)|(IE)]>
      <table width="600" align="center" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td>
    <![endif]-->
     
    <table class="content" align="center" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width: 600px; font-family: Apex, Helvetica, Arial, sans-serif; font-size: 16px; background-color: #FFFFFF;">
      <tr>
        <td>
          <table width="100%" align="center" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td>
                <img src="http://approvalarea.com/advent/smart-growth/assets/templates/emails/forward-to-colleague/assets/hero.png" width="100%"/>
              </td>
            </tr>
          </table>

          <table width="100%" height="20" align="center" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td>
                <img src="http://approvalarea.com/advent/smart-growth/assets/templates/emails/forward-to-colleague/assets/spacer.gif" width="100%" height="20"/>
              </td>
            </tr>
          </table>

          <table width="100%" align="center" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td width="20">
                <img src="http://approvalarea.com/advent/smart-growth/assets/templates/emails/forward-to-colleague/assets/spacer.gif" width="20" height="5"/>
              </td>
              <td style="font-family: Apex, Helvetica, Arial, sans-serif; font-size: 16px;">
                Hello,
                <br/><br/>
                Your colleague ' . $from . ' has shared a link with you!
                <br/><br/>
                Visit it here: <a href="' . $shareURL . '" style="color: #429adc;">Advent Smart Growth</a>
                <br/><br/>
                Regards,
                <br/><br/>
                SS&amp;C Advent
              </td>
              <td width="20">
                <img src="http://approvalarea.com/advent/smart-growth/assets/templates/emails/forward-to-colleague/assets/spacer.gif" width="20" height="5"/>
              </td>
            </tr>
          </table>

          <table width="100%" height="20" align="center" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td>
                <img src="http://approvalarea.com/advent/smart-growth/assets/templates/emails/forward-to-colleague/assets/spacer.gif" width="100%" height="20"/>
              </td>
            </tr>
          </table>
          
        </td>
      </tr>
    </table>
     
    <!--[if (gte mso 9)|(IE)]>
          </td>
        </tr>
    </table>
    <![endif]-->
     
    </body>
    </html>';

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