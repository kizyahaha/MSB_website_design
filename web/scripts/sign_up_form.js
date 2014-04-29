

function create_sign_up_form(){
	jQuery('<div/>',{id: 'form_space'}).appendTo('body');
	jQuery('<table/>',{id: 'info_entry'}).appendTo('#form_space');
	//create_name_entry();
	//create_email_entry();
	//create_DOB_entry();
	//create_locale_entry();
	create_username_entry();
	create_password_entry();
	//create_password_confirm();
	//create_profile_pic_entry();
	create_submit();
}

function create_submit(){
	var submit_button = document.createElement('input');
	submit_button.type = 'submit';
	submit_button.value = 'Submit';
	submit_button.onclick = function(){submit();};
	var row = document.createElement('tr');
	var data = document.createElement('td');
	data.colSpan = 4;
	data.appendChild(submit_button);
	row.appendChild(data);
	document.getElementById('info_entry').appendChild(row);
}

function submit(){
	$.ajax({
		type: 'POST',
		url: '/api/users/add',
		data: { 
			'username': 'Bill',
			'password': 'password'
		}
	});
}

function add_blank(){
	var row = document.createElement('tr');
	row.className = 'blank';
	document.getElementById('info_entry').appendChild(row);
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
	document.getElementById('info_entry').appendChild(row);
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
	document.getElementById('info_entry').appendChild(holder);
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
	document.getElementById('info_entry').appendChild(holder);
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
	document.getElementById('info_entry').appendChild(holder);
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
	document.getElementById('info_entry').appendChild(holder);
	ask_visibility('location');
	add_blank();
}

function create_username_entry(){
	var holder = document.createElement('tr');
	//var text = jQuery('<td/>' , {text:'Create username:'});
	var text = document.createElement('td');
	text.colSpan = 2;
	text.textContent = 'Create username:';
	//var entry_field = jQuery('<input/>' , {type:'text'});
	var entry_field = document.createElement('input');
	entry_field.type = 'text';
	entry_field.className = 'text_input';
	entry_field.colSpan = 2;
	holder.appendChild(text);
	holder.appendChild(entry_field);
	document.getElementById('info_entry').appendChild(holder);
}

function create_password_entry(){
	var holder = document.createElement('tr');
	var text = document.createElement('td');
	text.colSpan = 2;
	text.textContent = 'Create password:';
	var entry_field = document.createElement('input');
	entry_field.type = 'password';
	entry_field.className = 'text_input';
	entry_field.colSpan = 2;
	holder.appendChild(text);
	holder.appendChild(entry_field);
	document.getElementById('info_entry').appendChild(holder);
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
	document.getElementById('info_entry').appendChild(holder);
}



/*
<table align="center">
	<tr>
		<th colspan="3" style="font-size:18px;">Tomorrow's Leading Rants</th>
	</tr>
	<tr style="color:rgb(52,52,52);">
		<th>Rank</th>
		<th>User</th>
		<th>Votes</th>
	</tr>
	<tr>
		<td>1.</td>
		<td>user123</td>
		<td>1,213</td>
	</tr>
	<tr>
		<td>2.</td>
		<td>user456</td>
		<td>1,108</td>
	</tr>
	<tr>
		<td>3.</td>
		<td>user789</td>
		<td>987</td>
	</tr>
	<tr>
		<td>4.</td>
		<td>someUser</td>
		<td>981</td>
	</tr>
	<tr>
		<td>5.</td>
		<td>aNoTh3r_Us3r</td>
		<td>954</td>
	</tr>
</table>
*/