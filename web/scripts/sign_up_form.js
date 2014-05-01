

function create_sign_up_form(){
	$('<div/>',{id: 'sign_up_form_space'}).appendTo('body');
	$('<form/>',{name:'sign_up_form' , id: 'sign_up_form'}).appendTo('#sign_up_form_space');
	create_email_entry();
	//create_DOB_entry(); //For filtering NSFW or maybe gifts/abilities on birthday
	create_username_entry();
	create_password_entry();
	create_password_confirm();
	//create_profile_pic_entry();
	//create_captcha();
	create_terms_checkbox();
	create_submit_button();
}

function create_terms_checkbox(){
	$('<br/>').appendTo('#sign_up_form');
	$('<input/>',{name:'terms_of_use' , type:'checkbox'}).appendTo('#sign_up_form');
	$("#sign_up_form").append("<span class='checkbox_text'> I have read and agree to the <a href='#'>Terms of Use </a></span>");
	$('<div/>',{id: 'no_read_terms' , text:'*Please agree to the Terms of Use.'}).appendTo('#sign_up_form');
	document.getElementById('no_read_terms').style.display = 'none';
	$('<br/>').appendTo('#sign_up_form');
	$('<div/>',{id: 'sign_up_info_missing' , text:'*Please complete all required fields.'}).appendTo('#sign_up_form');
	document.getElementById('sign_up_info_missing').style.display = 'none';
}

function create_submit_button(){
	$('<br/>').appendTo('#sign_up_form');
	$('<input/>',{id:'submit_button' , type:'button' , value:'Submit'}).appendTo('#sign_up_form');
	$('#submit_button').click( function(){submit(this.form);} );
}

function submit(form){
	if (check_valid_input(form)){
		$.post( '/api/users/add' , $('#sign_up_form').serialize() );
		window.document.location.href = 'sign_up_success.html';
	}
	/*
    $.ajax({
        type: 'POST',
		url: '/api/users/add',
        data: $('#sign_up_form').serialize(),
    });
	*/
}

function ask_visibility(str){
	$('<input/>',{type:'checkbox'}).appendTo('#sign_up_form');
	$('<span/>',{addClass: 'checkbox_text' , id:'checkbox_text'}).appendTo('#sign_up_form');
	document.getElementById('checkbox_text').textContent = 'Allow members to see my ' + str;
	$('<br/>').appendTo('#sign_up_form');
}

function create_email_entry(){
	$('<label/>',{id: 'email_label' , text: '*Enter e-mail:'}).appendTo('#sign_up_form');
	$('<input/>',{name:'email' , addClass:'text_entry' , placeholder: 'email@email.com' , type:'email' , autocomplete:'on'}).appendTo('#sign_up_form');
	$('<br/>').appendTo('#sign_up_form');
}

function create_DOB_entry(){
	$('<label/>',{id: 'DOB_label' , text: 'Enter birth date:'}).appendTo('#sign_up_form');
	$('<input/>',{name:'DOB' , id:'DOB' , type:'date'}).appendTo('#sign_up_form');
	$('<br/>').appendTo('#sign_up_form');
	ask_visibility('birth date');
}

function create_username_entry(){
	$('<label/>',{id: 'username_label' , text: '*Create username:'}).appendTo('#sign_up_form');
	$('<input/>',{name:'username' , addClass:'text_entry' , placeholder: 'username' , type:'text' , autocomplete:'off'}).appendTo('#sign_up_form');
	$('<br/>').appendTo('#sign_up_form');
	$('<div/>',{id: 'username_taken' , text:'*Sorry, that username already exists.'}).appendTo('#sign_up_form');
	document.getElementById('username_taken').style.display = 'none';
}

function create_password_entry(){
	$('<label/>',{id: 'password_label' , text: '*Create password:'}).appendTo('#sign_up_form');
	$('<input/>',{name:'password' , addClass:'text_entry' , placeholder: 'password' , type:'password'}).appendTo('#sign_up_form');
	$('<br/>').appendTo('#sign_up_form');
}

function create_password_confirm(){
	$('<label/>',{id: 'password_confirm' , text: '*Confirm password:'}).appendTo('#sign_up_form');
	$('<input/>',{name:'password_confirm' , addClass:'text_entry' , placeholder: 'retype password' , type:'password'}).appendTo('#sign_up_form');
	$('<br/>').appendTo('#sign_up_form');
	$('<div/>',{id: 'passwords_no_matchy' , text:"*These passwords don't match"}).appendTo('#sign_up_form');
	document.getElementById('passwords_no_matchy').style.display = 'none';
}

function check_valid_input(form){
	//var captcha = check_captcha();
	var read_terms = check_read_terms(form);
	//var strength = check_password_strength(form);
	var pwd_match = check_password_match(form);
	//var name_avail = check_username_available(form);
	var all_filled = check_all_filled(form);
	//var valid_email = check_email_validity(form);
	if (pwd_match && read_terms && all_filled){
		return true;
	}
	return false;
}

function check_all_filled(form){
	document.getElementById('sign_up_info_missing').style.display = 'none';
	if (form.username.value.length == 0 
	|| form.password.value.length == 0
	|| form.password_confirm.value.length == 0
	|| form.email.value.length == 0){
		document.getElementById('sign_up_info_missing').style.display = 'initial';
		return false;
	}
	return true;
		
}

function check_password_match(form){
	document.getElementById('passwords_no_matchy').style.display = 'none';
	if (form.password.value != form.password_confirm.value){
		document.getElementById('passwords_no_matchy').style.display = 'initial';
		return false;
	}
	return true;
}

function check_read_terms(form){
	document.getElementById('no_read_terms').style.display = 'none';
	if (!form.terms_of_use.checked){
		document.getElementById('no_read_terms').style.display = 'initial';
		return false;
	}
	return true;
}