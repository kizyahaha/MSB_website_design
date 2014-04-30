

function create_log_in_sign_up(){
	$("body").append("<div id='log_in_sign_up_space'></div>");
	create_log_in();
	create_sign_up();
}

function create_log_in(){
	$('<div/>',{id: 'log_in_form_space'}).appendTo('#log_in_sign_up_space');
	$('<form/>',{name:'log_in_form' , id: 'log_in_form'}).appendTo('#log_in_form_space');
	create_username_accept();
	create_password_accept();
	create_log_in_error_message();
	create_stay_logged_in();
	create_log_in_button();
	create_log_in_help();
	/*
	$("#space").append("<div id='log_in'></div>");
	var log_in = $("#log_in");
	log_in.append("Username:");
	log_in.append("<input class='text_input' type='text'>");
	log_in.append("<br/>Password:");
	log_in.append("<input class='text_input' type='password'>");
	log_in.append("<br/><input id='stay_signed_in' type='checkbox'><span style='font-weight:100; font-size:15px;'>Stay signed in</span>");
	log_in.append("<input id='log_in_button' type='button' value='Log in' style='font-family:lao ui'>");
	*/
}

function create_username_accept(){
	$('<label/>',{id: 'username_accept_label' , text: 'Username:'}).appendTo('#log_in_form');
	$('<input/>',{name:'username_accept' , addClass:'text_entry' , placeholder: 'username' , type:'text'}).appendTo('#log_in_form');
	$('<br/>').appendTo('#log_in_form');
}

function create_password_accept(){
	$('<label/>',{id: 'password_accept_label' , text: 'Password:'}).appendTo('#log_in_form');
	$('<input/>',{name:'password_accept' , addClass:'text_entry' , placeholder: 'password' , type:'password'}).appendTo('#log_in_form');
	$('<br/>').appendTo('#log_in_form');
}

function create_log_in_error_message(){	
	$("#log_in_form").append("<div id='log_in_error_message' style='display:none'>*The entered username and password do not match any in our records</div>");
	$('<br/>').appendTo('#log_in_form');
}

function create_stay_logged_in(){
	$('<input/>',{type:'checkbox'}).appendTo('#log_in_form');
	$('<span/>',{addClass: 'checkbox_text' , id:'stay_logged_text'}).appendTo('#log_in_form');
	document.getElementById('stay_logged_text').textContent = 'Stay logged in';
}

function create_log_in_button(){
	$('<input/>',{id:'log_in_button' , type:'button' , value:'Log in'}).appendTo('#log_in_form');
	$('#log_in_button').click( function(){log_in(this.form);} );
}

function log_in(form){
	if (check_correct_input(form)){
		//$.post( '/api/users/login' , $('#log_in_form').serialize() );
		window.document.location.href = 'daily.html';
		//var change_link = document.getElementById('banner_log_in_link');
		//change_link.textContent = 'My profile';
		//change_link.href = some user profile;
	}
}

function check_correct_input(form){
	var name_exists = check_username_exists(form);
	var pwd_correct = check_password_correct(form);
	if (name_exists && pwd_correct){
		return true;
	}
	document.getElementById('log_in_error_message').style.display = 'initial';
	return false;
}

function check_username_exists(){
	return true;
}

function check_password_correct(){
	return true;
}

function create_log_in_help(){
	$('<br/>').appendTo('#log_in_form');
	$('<br/>').appendTo('#log_in_form');
	$("#log_in_form").append("<a id='log_in_help' href='#' style='color:white'>Click here for help</a>");
}

function create_sign_up(){
	$("#log_in_sign_up_space").append("<div id='sign_up'></div>");
	var sign_up = $("#sign_up");
	sign_up.append("Not a member?<br/>Not a problem!<br>");
	sign_up.append("<a href='sign_up_form.html'>Sign up now for free!</a>");
}