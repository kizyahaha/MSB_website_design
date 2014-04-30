
function create_sign_up_success(){
	create_sign_up_success_message();
	create_sign_up_success_image();
}

function create_sign_up_success_message(){
	$("body").append("<div id='sign_up_success_message'><span style='color:white'>Congrats and thank you!</span><br/>A confirmation link has been e-mailed to you.</div>");
}

function create_sign_up_success_image(){
	$("body").append("<img id='sign_up_success_img' src='images/character_4.png' width='300' alt='sign_up_success_image'>");
}