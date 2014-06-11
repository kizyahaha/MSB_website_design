
function create_user_profile(user_tab_num){
	create_user_banner();
	create_user_tabs(user_tab_num);
	create_user_tab_content(user_tab_num);
}

function create_user_banner(){
	$('<div/>',{id: 'user_banner'}).appendTo('body');
	if (is_owner){
		create_user_links();
	}
	create_user_profile_pic();
	create_profile_username();
	create_member_date();
	create_trophy_case();
}

function create_user_links(){
	$('<ul/>',{id: 'user_links'}).appendTo('#user_banner');
	$('<li/>',{id: 'user_messages'}).appendTo('#user_links');
	$('<a/>',{id: 'user_messages_link' , href:'#'}).appendTo('#user_messages');
	if (user_has_new_message()){
		$('#user_messages_link').append("<img id='mail_icon' src='images/mail_icon.png'>");
	}
	$('#user_messages_link').append("Messages");
	$('<li/>',{id: 'edit_user_info'}).appendTo('#user_links');
	$('#edit_user_info').append("<a id='edit_user_info_link' href='#'>Edit info</a>");
}

function user_has_new_message(){
	return true;
}

function create_user_profile_pic(){
	$('#user_banner').append("<img id='user_profile_pic'>");
	$('#user_profile_pic').attr('src', get_user_profile_pic());
}

function get_user_profile_pic(){
	return 'images/jeremy.png';
}

function create_profile_username(){
	$('#user_banner').append("<div id='profile_username'></div>");
	//$('#profile_username').text(get_profile_username());
	$('#profile_username').text(userID);
}

function get_profile_username(){
	return 'Queen_of_Equestria';
}

function create_member_date(){
	$('#user_banner').append("<div id='member_date'></div>");
	$('#member_date').text('Member since ' + get_member_date());
}

function get_member_date(){
	return 'April 14, 2014';
}

function create_trophy_case(){
	$('<ul/>',{id: 'trophy_case'}).appendTo('#user_banner');
	$('<li/>',{id: 'king_trophies'}).appendTo('#trophy_case');
	$('#king_trophies').text(get_user_king_trophies());
	$('#king_trophies').append("<img id='user_king_crown' src='images/king_crown_1.png'>");
	$('<li/>',{id: 'queen_trophies'}).appendTo('#trophy_case');
	$('#queen_trophies').text(get_user_queen_trophies());
	$('#queen_trophies').append("<img id='user_queen_crown' src='images/queen_crown_1.png'>");
	$('<li/>',{id: 'medal_trophies'}).appendTo('#trophy_case');
	$('#medal_trophies').text(get_user_medals());
	$('#medal_trophies').append("<img id='user_medal' src='images/medal_1.png'>");
	$('<li/>',{id: 'star_trophies'}).appendTo('#trophy_case');
	$('#star_trophies').text(get_user_stars());
	$('#star_trophies').append("<img id='user_star' src='images/star_1.png'>");
}

function get_user_king_trophies(){
	return 2;
}
function get_user_queen_trophies(){
	return 5;
}
function get_user_medals(){
	return 9;
}
function get_user_stars(){
	return 17;
}
