
function create_rant_submission(userID){
	$('<div/>',{id:'submit_rant_container'}).appendTo('body');
	$('<form/>',{name:'rant_submission_form' , id:'rant_submission_form'}).appendTo('#submit_rant_container');
	create_title_for_submit();
	create_rant_for_submit();
	create_submit_rant_inputs();
}

function create_title_for_submit(){
	$('#rant_submission_form').append("<div id='title_for_submit'>Title:<br/></div>");
	$('<input/>',{name:'title' , id:'title_input' , type:'text'}).appendTo('#title_for_submit');
	$('<div/>',{id: 'title_missing' , text:"*Please provide a title"}).appendTo('#title_for_submit');
	document.getElementById('title_missing').style.display = 'none';
}

function create_rant_for_submit(){
	$('#rant_submission_form').append("<div id='rant_for_submit'>Rant:<br/></div>");
	$('<textarea/>',{name:'contents' , id:'rant_input' , type:'text'}).appendTo('#rant_for_submit');
	document.getElementById('rant_input').rows=12;
	//CKEDITOR.replace('rant_input');
	$('<div/>',{id: 'rant_missing' , text:"*Please provide some rant content"}).appendTo('#rant_for_submit');
	document.getElementById('rant_missing').style.display = 'none';
}

function create_submit_rant_inputs(){
	$('<div/>',{id: 'submit_rant_inputs'}).appendTo('#rant_submission_form');
	create_NSFW_checkbox();
	create_submit_rant_button();
}

function create_NSFW_checkbox(){
	$('<input/>',{name:'nsfw' , type:'checkbox'}).appendTo('#submit_rant_inputs');
	$('<span/>',{id:'NSFW_checkbox_text'}).appendTo('#submit_rant_inputs');
	document.getElementById('NSFW_checkbox_text').textContent = 'NSFW';
}

function create_submit_rant_button(){
	$('<input/>',{id:'submit_rant_button' , type:'button' , value:'Submit'}).appendTo('#submit_rant_inputs');
	$('#submit_rant_button').click( function(){rant_submit(this.form);} );
	$(window).keypress(function (e) {
		var key = e.which;
		if(key == 13){
			$('#submit_rant_button').click();
			return false;  
		}
	});
}

function rant_submit(form){
	if (check_rant_filled(form)){
		//alert($('#rant_submission_form').serialize());
		
		$.ajax({
			type: "POST",
			url: "/api/rants/add",
			data: $("#rant_submission_form").serialize(),
			success: function(msg) {
				window.document.location.href = "daily.html";
			},
			error: function(msg) {
				alert("Computers suck");
			}
		});
		//$.post( '/api/rants/add' , $('#rant_submission_form').serialize());
	}
}
/*
function log_in(form){;
	alert($('#log_in_form').serialize());
	$.ajax({
		type: 'POST',
		url: '/api/login/login',
		data: $('#log_in_form').serialize(),
		success: function(msg) {
			userID = get_user();
		    window.document.location.href = 'daily.html';
		},
		error: function(msg) {
		    document.getElementById('log_in_error_message').style.display = 'initial';
		}
	});
}
*/

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