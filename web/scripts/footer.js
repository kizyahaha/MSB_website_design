

function create_footer(){
	var footer = document.createElement('ul');
	footer.id = 'footer';
	create_footer_links(footer);
	document.body.appendChild(footer);
}

function create_footer_links(footer){
	create_copyright_link(footer);
	create_privacy_policy_link(footer);
	create_terms_of_use_link(footer);
	create_contact_us_link(footer);
}

function create_copyright_link(footer){
	var copyright = document.createElement('li');
	var copyright_link = document.createElement('a');
	copyright_link.href = 'copyright.html';
	copyright_link.textContent = 'Copyright';
	copyright.appendChild(copyright_link);
	footer.appendChild(copyright);
}

function create_privacy_policy_link(footer){
	var privacy_policy = document.createElement('li');
	var privacy_policy_link = document.createElement('a');
	privacy_policy_link.href = 'privacy_policy.html';
	privacy_policy_link.textContent = 'Privacy policy';
	privacy_policy.appendChild(privacy_policy_link);
	footer.appendChild(privacy_policy);
}

function create_terms_of_use_link(footer){
	var terms_of_use = document.createElement('li');
	var terms_of_use_link = document.createElement('a');
	terms_of_use_link.href = 'terms_of_use.html';
	terms_of_use_link.textContent = 'Terms of use';
	terms_of_use.appendChild(terms_of_use_link);
	footer.appendChild(terms_of_use);
}

function create_contact_us_link(footer){
	var contact_us = document.createElement('li');
	var contact_us_link = document.createElement('a');
	contact_us_link.href = 'javascript:launch_contact_us_modal();';
	contact_us_link.textContent = 'Contact us';
	contact_us.appendChild(contact_us_link);
	footer.appendChild(contact_us);
}

function launch_contact_us_modal(){
	create_modal_blur_background('contact_us_modal_blur_background');
	create_contact_us();
}

function create_contact_us(){
	$('<div/>',{id:'contact_us_background'}).appendTo('body');
	$('<div/>',{id:'contact_us_space'}).appendTo('#contact_us_background');
	create_contact_us_message();
	//create_contact_us_form();
	create_contact_us_close_button();
}

function create_contact_us_message(){
	$('<div/>',{id:'contact_us_message', text:'We appreciate your feedback!'}).appendTo('#contact_us_space');
}

function create_contact_us_close_button(){
	$('<div/>',{id:'contact_us_close' , text:'CLOSE'}).appendTo('#contact_us_background');
	$('#contact_us_close').click(function(){$('#contact_us_modal_blur_background').remove();  $('#contact_us_background').remove();});
}