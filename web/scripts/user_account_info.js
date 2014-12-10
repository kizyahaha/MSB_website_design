function create_user_account_info_content(){
	$('<div/>',{id:'user_account_info_space'}).appendTo('#user_info_content_space');
	create_account_email_input();
}

function create_account_email_input(){
	$('<div/>',{addClass:'user_account_info', id:'account_email'}).appendTo('#user_account_info_space');
	$('<div/>',{addClass:'user_account_info_name', text:'Email'}).appendTo('#account_email');
	$('<input/>',{addClass:'user_account_info_input', id:'account_email_input' , placeholder:logged_user.email}).appendTo('#account_email');
	$('<div/>',{id: 'used_email' , addClass:'input_error' , text:"This email is already in use"}).appendTo('#account_email');
	$('<div/>',{id: 'invalid_email' , addClass:'input_error' , text:"This is not a valid email"}).appendTo('#account_email');
	document.getElementById('used_email').style.display = 'none';
	document.getElementById('invalid_email').style.display = 'none';
}

function create_user_account_info_submit_button(){
	$('<div/>',{id:'submit_account_info_button' , text:'Save account info'}).appendTo('#user_account_info_space');
	$('#submit_account_info_button').click(function(){user_account_info_submit();});
	$(window).keypress(function (e) {
		var key = e.which;
		if(key == 13){
			$('#user_account_info_submit').click();
			return false;  
		}
	});
}

function user_account_info_submit(){
	if (check_valid_input()){
		$.ajax({
			type: "POST",
			url: "/api/users/updateUser",
			data: {email: $('#account_email_input').val()},
			success: function(msg) {
				//window.document.location.href = "daily.html";
				code = $.parseJSON(msg);
				if (code & (1 << 0)){
					document.getElementById('used_email').style.display = 'block';
				}
				if (code & (1 << 1)){
					create_email_reset_success();
				}
			},
			error: function(msg) {
				window.document.location.href = "error_page.html";
			}
		});
	}
}

function check_valid_input(){
	document.getElementById('used_email').style.display = 'none';
	var valid_email = check_email_validity();
	if (valid_email){
		return true;
	}
	return false;
}

function check_email_validity(){
	document.getElementById('invalid_email').style.display = 'none';
	if (!validator.isEmail($('#account_email_input').val())){
		document.getElementById('invalid_email').style.display = 'block';
		return false;
	}
	return true;
}

function create_email_reset_success(){
	create_modal_blur_background('email_reset_success_modal_blur_background');
	$('<div/>',{id:'email_reset_success_background'}).appendTo('body');
	create_email_reset_success_message();
	create_email_reset_success_close_button();
}

function create_email_reset_success_message(){
	$('<div/>',{id:'email_reset_success_message'}).appendTo('#email_reset_success_background');
	$("#email_reset_success_message").append("<p>A confirmation link has been sent to your newly requested email address.</p>");
	$("#email_reset_success_message").append("<p>Please follow it to complete the change of your email address.</p>");
	//$("#email_reset_success_background").append("<div id='email_reset_success_message'><span style='color:white'>A confirmation link has been sent to your newly requested email address.</span><br/>Please follow it to complete the change of your email address.</div>");
}

function create_email_reset_success_close_button(){
	$('<div/>',{id:'email_reset_success_close' , text:'CLOSE'}).appendTo('#email_reset_success_background');
	$('#email_reset_success_close').click(function(){$('#email_reset_success_modal_blur_background').remove();  $('#email_reset_success_background').remove();});
}