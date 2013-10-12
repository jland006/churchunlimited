<?php

	$fullName = $_POST['n'];
	$phone = $_POST['p'];
	$emailFrom = $_POST['f'];
	$msg = $_POST['m'];

	$to      = 'churchunlimited.indio@yahoo.com';
	$subject = 'You have a new message';
	$message = "Phone: $phone \r\n\r\n";
	$message .= $msg;
	$headers = "From: $emailFrom \r\n" .
    "Reply-To: $emailFrom \r\n";

	if (mail($to, $subject, $message, $headers))
		echo "Message sent!";
	else
		echo "There was a problem sending your message. Please try again in a few minutes.";
?>