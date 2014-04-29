

function create_sign_up_form(){
	$('<div/>',{id: 'form_space'}).appendTo('body');
	$('<form/>',{id: 'sign_up_form'}).appendTo('#form_space');
	create_email_entry();
	//create_DOB_entry(); //For filtering NSFW or maybe gifts/abilities on birthday
	create_username_entry();
	create_password_entry();
	create_password_confirm();
	//create_profile_pic_entry();
	//create_captcha();
	//create_terms_of_use();
	create_submit_button();
}

function create_submit_button(){
	$('<br/>').appendTo('#sign_up_form');
	$('<input/>',{id:'submit_button' , type:'submit' , value:'Submit'}).appendTo('#sign_up_form');
	$('#submit_button').click( function(){submit();} );
}

function submit(){
	if (check_valid_input()){
		$.post( '/api/users/add' , $('#sign_up_form').serialize() );
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
	$('<span/>',{id: 'checkbox_label'}).appendTo('#sign_up_form');
	document.getElementById('checkbox_label').textContent = 'Allow members to see my ' + str;
	$('<br/>').appendTo('#sign_up_form');
}

function create_email_entry(){
	$('<label/>',{id: 'email_label' , text: '*Enter e-mail:'}).appendTo('#sign_up_form');
	$('<input/>',{name:'email' , addClass:'text_entry' , placeholder: 'email@email.com' , type:'text' , autocomplete:'on'}).appendTo('#sign_up_form');
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
	$('<input/>',{addClass:'text_entry' , placeholder: 'retype password' , type:'password'}).appendTo('#sign_up_form');
	$('<br/>').appendTo('#sign_up_form');
	$('<div/>',{id: 'passwords_no_matchy' , text:"*These passwords don't match!"}).appendTo('#sign_up_form');
	document.getElementById('passwords_no_matchy').style.display = 'none';
}

function check_valid_input(){
	//check_captcha();
	//check_read_terms();
	//check_password_strength();
	check_password_match();
	check_username_available();
	return true;
}

function check_username_available(){
	var unique = true;
	if (!unique){
		document.getElementById('username_taken').style.display = 'initial';
	}
}

function check_password_match(){
	var match = true;
	if (!match){
		document.getElementById('passwords_no_matchy').style.display = 'initial';
	}
}