function launch_user_signup(){
	$('#login_signup_background').empty();
	$('#login_signup_background').removeClass('login_signup_prompt_height').addClass('signup_height');
	$('<div/>',{id:'signup_space'}).appendTo('#login_signup_background');
	$('<form/>',{name:'signup_form' , id: 'signup_form'}).appendTo('#signup_space');
	create_email_entry();
	//create_DOB_entry(); //For filtering NSFW or maybe gifts/abilities on birthday
	create_username_entry();
	create_password_entry();
	create_password_confirm();
	//create_profile_pic_entry();
	//create_captcha();
	create_terms_checkbox();
	create_submit_button();
	create_login_signup_close_button();
}

function create_terms_checkbox(){
	$('<br/>').appendTo('#signup_form');
	$('<input/>',{name:'terms_of_use' , type:'checkbox'}).appendTo('#signup_form');
	$("#signup_form").append("<span class='checkbox_text'> I have read and agree to the <a href='terms_of_use.html' target='_blank'>Terms of Use </a></span>");
	$('<div/>',{id: 'no_read_terms' , text:'Please agree to the Terms of Use'}).appendTo('#signup_form');
	document.getElementById('no_read_terms').style.display = 'none';
	$('<br/>').appendTo('#signup_form');
	$('<div/>',{id: 'signup_info_missing' , text:'Please complete all required fields'}).appendTo('#signup_form');
	document.getElementById('signup_info_missing').style.display = 'none';
	$('<div/>',{id: 'invalid_input' , text:'Some of your input is invalid'}).appendTo('#signup_form');
	document.getElementById('invalid_input').style.display = 'none';
}

function create_submit_button(){
	$('<br/>').appendTo('#signup_form');
	$('<input/>',{id:'submit_button' , type:'button' , value:'Submit'}).appendTo('#signup_form');
	$('#submit_button').click( function(){submit(this.form);} );
}

function submit(form){
	if (check_valid_input(form)){		
		$.ajax({
			type: 'POST',
			url: '/api/users/add',
			data: $('#signup_form').serialize(),
			success: function(msg) {
				code = $.parseJSON(msg);
				if (code == 0){
					create_signup_success();
				}
				if (code & (1 << 0)){
					document.getElementById('invalid_input').style.display = 'block';
				}
				if (code & (1 << 1)){
					document.getElementById('used_email').style.display = 'block';
				}
				if (code & (1 << 2)){
					document.getElementById('username_taken').style.display = 'block';
				}
				if (code & (1 << 3)){
					document.getElementById('username_invalid').style.display = 'block';
				}
			},
			error: function(msg) {
				window.document.location.href = "error_page.html";
			}
		});
	}
}

function ask_visibility(str){
	$('<input/>',{type:'checkbox'}).appendTo('#signup_form');
	$('<span/>',{addClass: 'checkbox_text' , id:'checkbox_text'}).appendTo('#signup_form');
	document.getElementById('checkbox_text').textContent = 'Allow members to see my ' + str;
	$('<br/>').appendTo('#signup_form');
}

function create_email_entry(){
	$('<label/>',{id: 'email_label' , text: '*Enter e-mail:'}).appendTo('#signup_form');
	$('<input/>',{name:'email' , addClass:'text_entry' , placeholder: 'email@email.com' , type:'email' , autocomplete:'on'}).appendTo('#signup_form');
	$('<br/>').appendTo('#signup_form');
	$('<div/>',{id: 'invalid_email' , text:"This is not a valid email"}).appendTo('#signup_form');
	$('<br/>').appendTo('#invalid_email');
	$('<div/>',{id: 'used_email' , text:"This email is already in use"}).appendTo('#signup_form');
	$('<br/>').appendTo('#used_email');
	document.getElementById('invalid_email').style.display = 'none';
	document.getElementById('used_email').style.display = 'none';
}

function create_DOB_entry(){
	$('<label/>',{id: 'DOB_label' , text: 'Enter birth date:'}).appendTo('#signup_form');
	$('<input/>',{name:'DOB' , id:'DOB' , type:'date'}).appendTo('#signup_form');
	$('<br/>').appendTo('#signup_form');
	ask_visibility('birth date');
}

function create_username_entry(){
	$('<label/>',{id: 'username_label' , text: '*Create username:'}).appendTo('#signup_form');
	$('<input/>',{name:'username' , id:'username_input', addClass:'text_entry' , placeholder: 'username' , type:'text' , autocomplete:'off'}).appendTo('#signup_form');
	$('<br/>').appendTo('#signup_form');
	$('<div/>',{id: 'username_taken' , text:'Sorry, that username already exists'}).appendTo('#signup_form');
	$('<br/>').appendTo('#username_taken');
	$('<div/>',{id: 'username_invalid' , text:'Usernames can only contain letters, numbers, and underscores'}).appendTo('#signup_form');
	$('<br/>').appendTo('#username_invalid');
	document.getElementById('username_taken').style.display = 'none';
	document.getElementById('username_invalid').style.display = 'none';
	$('#username_input').on('input',function(){check_username_validity(this.form);});
}

function check_username_validity(form){
	document.getElementById('username_invalid').style.display = 'none';
	var username = form.username.value
	if( /\W/.test( username ) ) {
		document.getElementById('username_invalid').style.display = 'block';
		return false;
	}
	return true;     
}

function create_password_entry(){
	$('<label/>',{id: 'password_label' , text: '*Create password:'}).appendTo('#signup_form');
	$('<input/>',{name:'password' , addClass:'text_entry' , placeholder: 'password' , type:'password'}).appendTo('#signup_form');
	$('<br/>').appendTo('#signup_form');
}

function create_password_confirm(){
	$('<label/>',{id: 'password_confirm' , text: '*Confirm password:'}).appendTo('#signup_form');
	$('<input/>',{name:'password_confirm' , addClass:'text_entry' , placeholder: 'retype password' , type:'password'}).appendTo('#signup_form');
	$('<br/>').appendTo('#signup_form');
	$('<div/>',{id: 'passwords_no_matchy' , text:"These passwords do not match"}).appendTo('#signup_form');
	document.getElementById('passwords_no_matchy').style.display = 'none';
}

function check_valid_input(form){
	document.getElementById('used_email').style.display = 'none';
	document.getElementById('username_taken').style.display = 'none';
	document.getElementById('invalid_input').style.display = 'none';
	//var captcha = check_captcha();
	var read_terms = check_read_terms(form);
	//var strength = check_password_strength(form);
	var pwd_match = check_password_match(form);
	var all_filled = check_all_filled(form);
	var valid_email = check_email_validity(form);
	var valid_username = check_username_validity(form);
	if (pwd_match && read_terms && all_filled && valid_email & valid_username){
		return true;
	}
	return false;
}

function check_all_filled(form){
	document.getElementById('signup_info_missing').style.display = 'none';
	if (form.username.value.length == 0 
	|| form.password.value.length == 0
	|| form.password_confirm.value.length == 0
	|| form.email.value.length == 0){
		document.getElementById('signup_info_missing').style.display = 'block';
		return false;
	}
	return true;
		
}

function check_email_validity(form){
	document.getElementById('invalid_email').style.display = 'none';
	if (!validator.isEmail(form.email.value)){
		document.getElementById('invalid_email').style.display = 'block';
		return false;
	}
	return true;
}

function check_password_match(form){
	document.getElementById('passwords_no_matchy').style.display = 'none';
	if (form.password.value != form.password_confirm.value){
		document.getElementById('passwords_no_matchy').style.display = 'block';
		return false;
	}
	return true;
}

function check_read_terms(form){
	document.getElementById('no_read_terms').style.display = 'none';
	if (!form.terms_of_use.checked){
		document.getElementById('no_read_terms').style.display = 'block';
		return false;
	}
	return true;
}

function create_signup_success(){
	$('#login_signup_background').empty();
	$('#login_signup_background').removeClass('signup_height').addClass('signup_success_height');
	create_signup_success_message();
	create_signup_success_image();
	create_login_signup_close_button();
}

function create_signup_success_message(){
	$("#login_signup_background").append("<div id='signup_success_message'><span style='color:white'>Congrats and thank you!</span><br/>A confirmation link has been e-mailed to you.</div>");
}

function create_signup_success_image(){
	$("#login_signup_background").append("<img id='signup_success_img' src='images/character_4.png' width='230' alt='signup_success_image'>");
}