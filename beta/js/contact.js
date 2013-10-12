$(function() {
	$('#senderFullName').keypress(function(event) {
	  if ( (event.which < 65 && event.which != 32) || (event.which > 90 && event.which < 97) || event.which > 122) {
		 event.preventDefault();
		}
	});

	$('#senderPhone').keypress(function(event) {
	  if ( event.which < 48 || event.which > 57 ) {
		 event.preventDefault();
		}
	});
	
	$('#send_message').click(function(event) {
		var nm = $('#senderFullName');
		var nm_astr = $('#nameAsterisk');
		var phn = $('#senderPhone');
		var phn_astr = $('#phoneAsterisk');
		var eml = $('#senderEmail');
		var eml_astr = $('#emailAsterisk');
		var msg = $('#senderMessage');
		var msg_astr = $('#messageAsterisk');
		
		var focus_set = false;
		var errorMessage = $('#errorMessage');
		
		if ( nm.val() == "" ) {
			nm.focus();
			nm_astr.css("visibility","visible");
			nm.css("background","rgb(255,235,235)");
			focus_set = true;
		}
		else {
			nm_astr.css("visibility","hidden");
			nm.css("background","");
		}
		
		if ( phn.val() == "" ) {
			if ( !focus_set ) phn.focus();
			phn_astr.css("visibility","visible");
			phn.css("background","rgb(255,235,235)");
			focus_set = true;
		}
		else {
			phn_astr.css("visibility","hidden");
			phn.css("background","");
		}

		if ( eml.val() == "" ) {
			if ( !focus_set ) eml.focus();
			eml_astr.css("visibility","visible");
			eml.css("background","rgb(255,235,235)");
			focus_set = true;
		}
		else {
			eml_astr.css("visibility","hidden");
			eml.css("background","");
		}
		
		if ( msg.val() == "" ) {
			if ( !focus_set ) msg.focus();
			msg_astr.css("visibility","visible");
			msg.css("background","rgb(255,235,235)");
			focus_set = true;
		}
		else {
			msg_astr.css("visibility","hidden");
			msg.css("background","");
		}
		
		if ( focus_set ) {
			errorMessage.text("*Please complete required fields");
			errorMessage.css("visibility","visible");
			return;
		}
		else
			errorMessage.css("visibility","hidden");

		if ( !validate_phone_syntax(phn.val()) ) {
			errorMessage.text("*Please enter a valid phone number");
			errorMessage.css("visibility","visible");
			phn_astr.css("visibility","visible");
			phn.css("background","rgb(255,235,235)");
			phn.focus();
			return;
		}
		else {
		errorMessage.css("visibility","hidden");
		phn_astr.css("visibility","hidden");
		phn.css("background","");
		}
	
		if ( !validate_email_syntax(eml.val()) ) {
			errorMessage.text("*Please enter a valid email address");
			errorMessage.css("visibility","visible");
			eml_astr.css("visibility","visible");
			eml.css("background","rgb(255,235,235)");
			eml.focus();
			return;
		}
		else {
			errorMessage.css("visibility","hidden");
			eml_astr.css("visibility","hidden");
			eml.css("background","");
		}
		
		
		$.post('contact.php', {n: nm.val(), p: phn.val(), f: eml.val(), m: msg.val() }, function(output) {
			$('#modal #result').html(output);
			if (output == "Message sent!") {
				$('#modal #result').html("<br><br>"+ output);
				nm.val("");
				phn.val("");
				eml.val("");
				msg.val("");
			}
			$('#modal').reveal({ // The item which will be opened with reveal
				animation: 'fade',                   // fade, fadeAndPop, none
				animationspeed: 600,                       // how fast animtions are
				closeonbackgroundclick: false,              // if you click background will modal close?
				dismissmodalclass: 'close'    // the class of a button or element that will close an open modal
			});

		});
	});	
});

function validate_phone_syntax(phone) {
	var reg_exp = /^[2-9]\d{9}$/;
	return reg_exp.test(phone);
}

function validate_email_syntax(email) {
	var reg_exp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return reg_exp.test(email);
}