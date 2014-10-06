function create_error_page(){
	$('<div/>',{id: 'error_message_space'}).appendTo('body');
	create_error_message();
}

function create_error_message(){
	create_error_apology();
	create_error_mascot();
	create_error_action();
}

function create_error_apology(){
	$('<div/>',{id: 'error_apology'}).appendTo('#error_message_space');
	$('#error_apology').text("Oops, sorry about that.  Something went wrong.");
}

function create_error_mascot(){
	$('<div/>',{id: 'error_mascot'}).appendTo('#error_message_space');
	$('<img/>',{id:'error_mascot_img' , src:get_error_mascot()}).appendTo('#error_mascot');
}

function create_error_action(){
	$('<div/>',{id: 'error_action'}).appendTo('#error_message_space');
	$('#error_action').text("We're looking into it.");
}

function get_error_mascot(){
	var n = Math.random();
	if (n <= 0.25){
		return 'images/character_16.png'
	}
	else if (n <= 0.5){
		return 'images/character_3.png'
	}
	else if (n <= 0.75){
		return 'images/character_11.png'
	}
	else{
		return 'images/character_12.png'
	}
}