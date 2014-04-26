

function create_footer(){
	var footer = document.createElement('ul');
	footer.id = 'footer';
	create_footer_links(footer);
	document.body.appendChild(footer);
}

function create_footer_links(footer){
	create_copyright(footer);
	create_contact_us(footer);
	create_terms_of_use(footer);
}

function create_copyright(footer){
	var copyright = document.createElement('li');
	var copyright_link = document.createElement('a');
	copyright_link.href = '#';
	copyright_link.textContent = 'Copyright';
	copyright.appendChild(copyright_link);
	footer.appendChild(copyright);
}

function create_contact_us(footer){
	var contact_us = document.createElement('li');
	var contact_us_link = document.createElement('a');
	contact_us_link.href = '#';
	contact_us_link.textContent = 'Contact Us';
	contact_us.appendChild(contact_us_link);
	footer.appendChild(contact_us);
}

function create_terms_of_use(footer){
	var terms_of_use = document.createElement('li');
	var terms_of_use_link = document.createElement('a');
	terms_of_use_link.href = '#';
	terms_of_use_link.textContent = 'Terms of Use';
	terms_of_use.appendChild(terms_of_use_link);
	footer.appendChild(terms_of_use);
}