
function create_detailed_rant(){
	$('<div/>',{id:'detailed_rant_container'}).appendTo('body');
	$('<div/>',{id:'detailed_rant_space'}).appendTo('#detailed_rant_container');
	create_detailed_rant_info();
	if (is_owner()){
		create_detailed_rant_power_graph();
	}
}

function is_owner(){
	return true;
}

function create_detailed_rant_info(){
	$('<table/>',{id:'detailed_rant_info_table'}).appendTo('#detailed_rant_space');
	$('<tr/>',{id:'detailed_temp_row'}).appendTo('#detailed_rant_info_table');
	create_detailed_rant_title();
	create_detailed_rant_username();
	create_detailed_rant_level();
	create_detailed_rant_NSFW();
	create_detailed_rant_content();
}

function create_detailed_rant_NSFW(){
	$('<div/>',{id:'detailed_rant_NSFW' , addClass:'detailed_NSFW'}).appendTo('#detailed_rant_space');
	$('#detailed_rant_NSFW').text('NSFW');
}

function create_detailed_rant_title(){
	$('<td/>',{id:'detailed_rant_title'}).appendTo('#detailed_temp_row');
	$('#detailed_rant_title').text('This is the title of this rant');
}

function create_detailed_rant_username(){
	$('<td/>',{id:'detailed_rant_user'}).appendTo('#detailed_temp_row');
	$('<a/>',{id:'detailed_rant_user_link' , addClass:'detailed_username' , href:'user_profile.html'}).appendTo('#detailed_rant_user');
	$('#detailed_rant_user_link').text('Queen_of_Equestria');
}

function create_detailed_rant_level(){
	$('<div/>',{id:'detailed_rant_level'}).appendTo('#detailed_rant_space');
	$('#detailed_rant_level').text('Currently in ');
	$('<a/>',{id:'detailed_rant_level_link' , href:'hourly.html'}).appendTo('#detailed_rant_level');
	$('#detailed_rant_level_link').text('Hourly');
}

function create_detailed_rant_content(){
	$('<div/>',{id:'detailed_rant_content'}).appendTo('#detailed_rant_space');
	$('#detailed_rant_content').text('Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.  Queen of Equestria?  More like Queer of Equestria.');
}

function create_detailed_rant_power_graph(){
}
