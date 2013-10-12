$(function() {
	
	$('#share_prayer').click(function() {
		var err = $('#errorMessage');
		err.hide();
		$('.error').remove();

		var fullName = $('#fullName');
		var emailFrom = $('#emailFrom');
		var msg = $('#message');
		
		var valid_msg = true;

		if ($.trim(msg.val()) == "")
			valid_msg = false;

		var valid_emailFrom = validate_email_syntax(emailFrom.val());
		
		if ( !valid_emailFrom ) {
			emailFrom
				.css("background-color", "#FFEBEB")
				.after("<div class='error'></div>")
				.focus();
			err
				.html("*Please enter a valid email address")
				.show();
		}
		else
			emailFrom.css("background-color", "#FFFFFF");

		if ( !valid_msg ) {
			msg
				.css("background-color", "#FFEBEB")
				.after("<div class='error'></div>")
				.focus();
			err
				.html("*Please complete required fields")
				.show();
		}
		else
			msg.css("background-color", "#FFFFFF")

		if (!valid_msg || !valid_emailFrom)
			return;
			
		$.post('share.php', {n: fullName.val(), f: emailFrom.val(), m: msg.val() }, function(output) {
			$('#modal #result').html(output);
			if (output == "Message sent!") {
				$('#modal #result').html("<br><br>"+ output);
				fullName.val('');
				emailFrom.val('');
				msg.val('');
			}
			$('#modal').reveal({ // The item which will be opened with reveal
				animation: 'fade',                   // fade, fadeAndPop, none
				animationspeed: 600,                       // how fast animtions are
				closeonbackgroundclick: false,              // if you click background will modal close?
				dismissmodalclass: 'close'    // the class of a button or element that will close an open modal
			});
		});
		
		return false;
	});
	
});


function validate_email_syntax(email) {
	var reg_exp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return reg_exp.test(email);
}