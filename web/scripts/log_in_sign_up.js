
function launch_login_modal(){
	create_modal_blur_background('login_modal_blur_background');
	create_login_signup();
}

function create_modal_blur_background(ID){
	$('<div/>',{addClass:'modal_blur_background', id:ID}).appendTo('body');
	$('#' + ID).height($(document).height());
}

function create_login_signup(){
	$('<div/>',{id:'login_signup_background', addClass:'login_signup_prompt_height'}).appendTo('body');
	$('<div/>',{id:'login_space'}).appendTo('#login_signup_background');
	$('<div/>',{id:'prompt_signup_space'}).appendTo('#login_signup_background');
	create_login();
	create_signup();
	create_login_signup_close_button();
}

function create_login(){
	$('<form/>',{name:'login_form' , id: 'login_form'}).appendTo('#login_space');
	create_username_accept();
	create_password_accept();
	create_log_in_error_message();
	create_stay_logged_in();
	create_log_in_button();
	create_log_in_help();
}

function create_username_accept(){
	$('<label/>',{id: 'username_accept_label' , text: 'Username:'}).appendTo('#login_form');
	$('<input/>',{name:'username_accept' , addClass:'text_entry' , placeholder: 'username' , type:'text'}).appendTo('#login_form');
	$('<br/>').appendTo('#login_form');
}

function create_password_accept(){
	$('<label/>',{id: 'password_accept_label' , text: 'Password:'}).appendTo('#login_form');
	$('<input/>',{name:'password_accept' , addClass:'text_entry' , placeholder: 'password' , type:'password'}).appendTo('#login_form');
	$('<br/>').appendTo('#login_form');
}

function create_log_in_error_message(){	
	$("#login_form").append("<div id='log_in_error_message' style='display:none'>*The entered username and password do not match any in our records</div>");
	$('<br/>').appendTo('#login_form');
}

function create_stay_logged_in(){
	$('<input/>',{name:'stay_logged_in' , type:'checkbox'}).appendTo('#login_form');
	$('<span/>',{addClass: 'checkbox_text' , id:'stay_logged_text'}).appendTo('#login_form');
	document.getElementById('stay_logged_text').textContent = 'Stay logged in';
}

function create_log_in_button(){
	$('<input/>',{id:'login_button' , type:'button' , value:'Log in'}).appendTo('#login_form');
	$('#login_button').click( function(){log_in(this.form);} );
	$(window).keypress(function (e) {
		var key = e.which;
		if(key == 13){
			$('#login_button').click();
			return false;  
		}
	});
}

function log_in(form){;	
	$.ajax({
		type: 'POST',
		async: false,
		url: '/api/login/login',
		data: $('#login_form').serialize(),
		success: function(msg) {
		    $('#login_modal_blur_background').remove();
			$('#login_signup_background').remove();
			logged_user = get_user();
			$('#banner_log_in_link').text('My profile');
			$('#banner_log_in_link').attr('href','user_profile.html?u=' + logged_user.id);
			$('#banner_log_out_link').text('Log out');
			$('#banner_log_out_link').attr('href','javascript:log_off_user();');
			$('#submit_rant_button').unbind('click');
			$('#submit_rant_button').click( function(){rant_submit(this.form)} );
		},
		error: function(msg) {
		    document.getElementById('log_in_error_message').style.display = 'initial';
		}
	});
}

function create_log_in_help(){
	$('<br/>').appendTo('#login_form');
	$('<br/>').appendTo('#login_form');
	$("#login_form").append("<a id='login_help' href='#' style='color:white'>Click here for help</a>");
}

function create_signup(){
	$('<div/>',{id:'signup_prompt'}).appendTo('#prompt_signup_space');
	$("#signup_prompt").append("Not a member?<br/>Not a problem!<br>");
	$('<a/>',{id:'signup_link', text:'Sign up now for free!'}).appendTo('#signup_prompt');
	$('#signup_link').attr('href','javascript:launch_user_signup();');
}

function create_login_signup_close_button(){
	$('<div/>',{id:'login_signup_close' , text:'CLOSE'}).appendTo('#login_signup_background');
	$('#login_signup_close').click(function(){$('#login_modal_blur_background').remove();  $('#login_signup_background').remove();});
}