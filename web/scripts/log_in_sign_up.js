

function create_log_in_sign_up(){
	$("body").append("<div id='space'></div>");
	create_log_in();
	create_sign_up();
}

function create_log_in(){
	$("#space").append("<div id='log_in'></div>");
	var log_in = $("#log_in");
	log_in.append("Username:");
	log_in.append("<input id='username_input' type='text'>");
	log_in.append("<br/>Password:");
	log_in.append("<input id='password_input' type='password'>");
	log_in.append("<br/><input id='stay_signed_in' type='checkbox'><span style='font-weight:100; font-size:15px;'>Stay signed in</span>");
	log_in.append("<input id='log_in_button' type='submit' value='Log in' style='font-family:lao ui'>");
}

function create_sign_up(){
	$("#space").append("<div id='sign_up'></div>");
	var sign_up = $("#sign_up");
	sign_up.append("Not a member?<br/>Not a problem!<br>");
	sign_up.append("<a href='#'>Sign up now for free!</a>");
}