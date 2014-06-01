
function create_rant_submission(userID){
	$('<div/>',{id:'submit_rant_container'}).appendTo('body');
	$('<form/>',{name:'rant_submission_form' , id:'rant_submission_form'}).appendTo('#submit_rant_container');
	create_title_for_submit();
	create_rant_for_submit();
	create_submit_rant_button();
}

function create_title_for_submit(){
	$('#rant_submission_form').append("<div id='title_for_submit'>Title:<br/></div>");
	$('<input/>',{id:'title_input' , type:'text'}).appendTo('#title_for_submit');
	$('<div/>',{id: 'title_missing' , text:"*Please provide a title"}).appendTo('#title_for_submit');
	document.getElementById('title_missing').style.display = 'none';
}

function create_rant_for_submit(){
	$('#rant_submission_form').append("<div id='rant_for_submit'>Rant:<br/></div>");
	//$('#rant_for_submit').append("<div id='rant_area' contenteditable='true'></div>");
	$('<textarea/>',{name:'rant_input' , id:'rant_input' , type:'text'}).appendTo('#rant_for_submit');
	document.getElementById('rant_input').rows=12;
	//CKEDITOR.replace('rant_input');
	$('<div/>',{id: 'rant_missing' , text:"*Please provide some rant content"}).appendTo('#rant_for_submit');
	document.getElementById('rant_missing').style.display = 'none';
}

function create_submit_rant_button(){
	$('<input/>',{id:'submit_rant_button' , type:'button' , value:'Submit'}).appendTo('#rant_submission_form');
	$('#submit_rant_button').click( function(){rant_submit(this.form);} );
}

function rant_submit(form){
	if (check_rant_filled(form)){
		//$.post( '/api/users/add' , $('#rant_submission_form').serialize() );
		window.document.location.href = 'daily.html';
	}
}

function check_rant_filled(form){
	document.getElementById('title_missing').style.display = 'none';
	document.getElementById('rant_missing').style.display = 'none';
	if (form.title_input.value.length == 0){
		document.getElementById('title_missing').style.display = 'initial';
		return false;
	}
	if (form.rant_input.value.length == 0){
		document.getElementById('rant_missing').style.display = 'initial';
		return false;
	}
	return true;
		
}