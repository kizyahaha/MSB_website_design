

function create_sign_up_form(){
	$('<div/>',{id: 'form_space'}).appendTo('body');
	$('<form/>',{id: 'sign_up_form'}).appendTo('#form_space');
	//create_name_entry();
	//create_email_entry();
	//create_DOB_entry();
	//create_locale_entry();
	create_username_entry();
	create_password_entry();
	//create_password_confirm();
	//create_profile_pic_entry();
	create_submit_button();
}

function create_submit_button(){
	$('<input/>',{id:'submit_button' , type:'submit' , value:'Submit'}).appendTo('#sign_up_form');
	$('#submit_button').click( function(){submit();} );
}

function submit(){
	$.post( '/api/users/add' , $('#sign_up_form').serialize() );
	/*
    $.ajax({
        type: 'POST',
		url: '/api/users/add',
        data: $('#sign_up_form').serialize(),
    });
	*/
}

function add_blank(){
	var row = document.createElement('tr');
	row.className = 'blank';
	document.getElementById('sign_up_form').appendChild(row);
}

function ask_visibility(str){
	var row = document.createElement('tr');
	row.className = 'checkbox';
	var data = document.createElement('td');
	data.colSpan = 4;
	var ask = document.createElement('input');
	ask.type = 'checkbox';
	var text = document.createTextNode('Make ' + str + ' visible to viewers');
	data.appendChild(ask);
	data.appendChild(text);
	row.appendChild(data);
	document.getElementById('sign_up_form').appendChild(row);
}

function create_name_entry(){
	var holder = document.createElement('tr');
	var first_name = document.createElement('td');
	first_name.textContent = 'First name:';
	var last_name = document.createElement('td');
	last_name.textContent = 'Last name:';
	var entry_field1 = document.createElement('input');
	entry_field1.type = 'text';
	entry_field1.className = 'text_input';
	var entry_field2 = document.createElement('input');
	entry_field2.type = 'text';
	entry_field2.className = 'text_input';
	holder.appendChild(first_name);
	holder.appendChild(entry_field1);
	holder.appendChild(last_name);
	holder.appendChild(entry_field2);
	document.getElementById('sign_up_form').appendChild(holder);
	ask_visibility('first name');
	ask_visibility('last name');
	add_blank();
}

function create_email_entry(){
	var holder = document.createElement('tr');
	var text = document.createElement('td');
	text.colSpan = 2;
	text.textContent = 'E-mail:';
	var entry_field = document.createElement('input');
	entry_field.type = 'text';
	entry_field.className = 'text_input';
	entry_field.colSpan = 2;
	holder.appendChild(text);
	holder.appendChild(entry_field);
	document.getElementById('sign_up_form').appendChild(holder);
	ask_visibility('e-mail');
	add_blank();
}

function create_DOB_entry(){
	var holder = document.createElement('tr');
	var text = document.createElement('td');
	text.colSpan = 2;
	text.textContent = 'Date Of Birth:';
	var entry_field = document.createElement('input');
	entry_field.type = 'date';
	entry_field.className = 'text_input';
	entry_field.colSpan = 2;
	holder.appendChild(text);
	holder.appendChild(entry_field);
	document.getElementById('sign_up_form').appendChild(holder);
	ask_visibility('DOB');
	add_blank();
}

function create_locale_entry(){
	var holder = document.createElement('tr');
	var text = document.createElement('td');
	text.colSpan = 2;
	text.textContent = 'Location:';
	var entry_field = document.createElement('input');
	entry_field.type = 'text';
	entry_field.className = 'text_input';
	entry_field.colSpan = 2;
	holder.appendChild(text);
	holder.appendChild(entry_field);
	document.getElementById('sign_up_form').appendChild(holder);
	ask_visibility('location');
	add_blank();
}

function create_username_entry(){
	$('<label/>',{id: 'username_label' , text: 'Create username:'}).appendTo('#sign_up_form');
	$('<input/>',{name:'username' , id: 'text_input' , placeholder: 'username' , type:'text' , autocomplete:'off'}).appendTo('#sign_up_form');
	$('<br/>').appendTo('#sign_up_form');
}

function create_password_entry(){
	$('<label/>',{id: 'password_label' , text: 'Create password:'}).appendTo('#sign_up_form');
	$('<input/>',{name:'password' , id: 'text_input' , placeholder: 'password' , type:'password'}).appendTo('#sign_up_form');
	$('<br/>').appendTo('#sign_up_form');
}

function create_password_confirm(){
	var holder = document.createElement('tr');
	var text = document.createElement('td');
	text.colSpan = 2;
	text.textContent = 'Confirm password:';
	var entry_field = document.createElement('input');
	entry_field.type = 'password';
	entry_field.className = 'text_input';
	entry_field.colSpan = 2;
	holder.appendChild(text);
	holder.appendChild(entry_field);
	document.getElementById('sign_up_form').appendChild(holder);
}