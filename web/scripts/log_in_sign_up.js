

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

function log_in(form){;
	$.ajax({
		type: 'POST',
		url: '/api/login/login',
		data: $('#log_in_form').serialize(),
		success: function(msg) {
		    alert("success: " + msg);
		    window.document.location.href = 'daily.html';
		},
		error: function(msg) {
		    document.getElementById('log_in_error_message').style.display = 'initial';
		}
	});
	/*setTimeout( function(){
		if(check_for_cookie()){
			window.document.location.href = 'daily.html';
			//var change_link = document.getElementById('banner_log_in_link');
			//change_link.textContent = 'My profile';
			//change_link.href = some user profile;
		}
		else{
			document.getElementById('log_in_error_message').style.display = 'initial';
		}
	},500);*/
	
	
}

var logged_in_user = "";
function check_for_cookie(){
	var cookie_name = 'MY_SOAP_BOX_USERNAME';
	var cookies = document.cookie.split(';');
	var cookies_length = cookies.length;
	for(var i=0; i<cookies_length; i++) {
		var cookie = cookies[i].trim();
		if (cookie.indexOf(cookie_name) == 0){
			var temp = cookie.split("=");
			logged_in_user = temp[1];
			return true;
		}
	}
	return false;
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