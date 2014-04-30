

function create_log_in_sign_up(){
	$("body").append("<div id='space'></div>");
	create_log_in();
	create_sign_up();
}

function create_log_in(){
	$("#space").append("<div id='log_in'></div>");
	var log_in = $("#log_in");
	log_in.append("Username:");
	log_in.append("<input class='text_input' type='text'>");
	log_in.append("<br/>Password:");
	log_in.append("<input class='text_input' type='password'>");
	log_in.append("<br/><input id='stay_signed_in' type='checkbox'><span style='font-weight:100; font-size:15px;'>Stay signed in</span>");
	log_in.append("<input id='log_in_button' type='button' value='Log in' style='font-family:lao ui'>");
}

function create_sign_up(){
	$("#space").append("<div id='sign_up'></div>");
	var sign_up = $("#sign_up");
	sign_up.append("Not a member?<br/>Not a problem!<br>");
	sign_up.append("<a href='sign_up_form.html'>Sign up now for free!</a>");
}

/*

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
}

function create_submit_button(){
	$('<br/>').appendTo('#sign_up_form');
	$('<input/>',{id:'submit_button' , type:'button' , value:'Submit'}).appendTo('#sign_up_form');
	$('#submit_button').click( function(){submit(this.form);} );
}

function submit(form){
	if (check_valid_input(form)){
		$.post( '/api/users/add' , $('#sign_up_form').serialize() );
	}
	/*
    $.ajax({
        type: 'POST',
		url: '/api/users/add',
        data: $('#sign_up_form').serialize(),
    });
	*/
/*}

function ask_visibility(str){
	$('<input/>',{type:'checkbox'}).appendTo('#sign_up_form');
	$('<span/>',{addClass: 'checkbox_text' , id:'checkbox_text'}).appendTo('#sign_up_form');
	document.getElementById('checkbox_text').textContent = 'Allow members to see my ' + str;
	$('<br/>').appendTo('#sign_up_form');
}

function create_email_entry(){
	$('<label/>',{id: 'email_label' , text: '*Enter e-mail:'}).appendTo('#sign_up_form');
	$('<input/>',{name:'email' , addClass:'text_entry' , placeholder: 'email@email.com' , type:'text' , autocomplete:'on'}).appendTo('#sign_up_form');
	$('<br/>').appendTo('#sign_up_form');
}

*/