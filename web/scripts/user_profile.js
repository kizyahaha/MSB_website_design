
function create_user_profile(user_tab_num , user_id){
	create_user_banner(user_id);
	//create_user_tabs(user_id , user_tab_num);
}

function create_user_banner(user_id){
	$('<div/>',{id: 'user_banner'}).appendTo('body');
	create_user_links(user_id);
	create_user_profile_pic(user_id);
	create_profile_username(user_id);
	create_member_date(user_id);
	create_trophy_case(user_id);
}

function create_user_links(user_id){
	$('<ul/>',{id: 'user_links'}).appendTo('#user_banner');
	$('<li/>',{id: 'user_messages'}).appendTo('#user_links');
	$('<a/>',{id: 'user_messages_link' , href:'#'}).appendTo('#user_messages');
	if (user_has_new_message(user_id)){
		$('#user_messages_link').append("<img id='mail_icon' src='images/mail_icon.png'>");
	}
	$('#user_messages_link').append("Messages");
	$('<li/>',{id: 'edit_user_info'}).appendTo('#user_links');
	$('#edit_user_info').append("<a id='edit_user_info_link' href='#'>Edit info</a>");
}

function user_has_new_message(user_id){
	return true;
}

function create_user_profile_pic(user_id){
	$('#user_banner').append("<img id='user_profile_pic'>");
	$('#user_profile_pic').attr('src', get_user_profile_pic(user_id));
}

function get_user_profile_pic(user_id){
	return 'images/jeremy.png';
}

function create_profile_username(user_id){
	$('#user_banner').append("<div id='profile_username'></div>");
	$('#profile_username').text(get_username(user_id));
}

function get_username(user_id){
	return 'Queen_of_Equestria';
}

function create_member_date(user_id){
	$('#user_banner').append("<div id='member_date'></div>");
	$('#member_date').text('Member since ' + get_member_date(user_id));
}

function get_member_date(user_id){
	return 'April 14, 2014';
}

function create_trophy_case(user_id){
	$('<ul/>',{id: 'trophy_case'}).appendTo('#user_banner');
	$('<li/>',{id: 'king_trophies'}).appendTo('#trophy_case');
	$('#king_trophies').text(get_user_king_trophies(user_id));
	$('#king_trophies').append("<img id='user_king_crown' src='images/king_crown_1.png'>");
	$('<li/>',{id: 'queen_trophies'}).appendTo('#trophy_case');
	$('#queen_trophies').text(get_user_queen_trophies(user_id));
	$('#queen_trophies').append("<img id='user_queen_crown' src='images/queen_crown_1.png'>");
	$('<li/>',{id: 'medal_trophies'}).appendTo('#trophy_case');
	$('#medal_trophies').text(get_user_medals(user_id));
	$('#medal_trophies').append("<img id='user_medal' src='images/medal_1.png'>");
	$('<li/>',{id: 'star_trophies'}).appendTo('#trophy_case');
	$('#star_trophies').text(get_user_stars(user_id));
	$('#star_trophies').append("<img id='user_star' src='images/star_1.png'>");
}

function get_user_king_trophies(user_id){
	return 2;
}
function get_user_queen_trophies(user_id){
	return 5;
}
function get_user_medals(user_id){
	return 9;
}
function get_user_stars(user_id){
	return 17;
}