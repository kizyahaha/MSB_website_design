
function create_user_profile(user_tab_num){
	var user_data = get_user_data();
	create_user_banner(user_data);
	create_user_tabs(user_tab_num);
	create_user_tab_content(user_tab_num);
}

function get_user_data(){
	var data = {
		username: "Queen_of_Equestria",
		pic: "images/jeremy.png",
		birth: "April 14, 2014",
		rant_ids:[],
		trophies:[2,5,9,17]
	};
	
	$.ajax({
		type: 'POST',
		url: '/api/users/userData',
		//dataType: 'string',
		data: {id:userID},
		success: function(gotData) {
			data = gotData;
		},
		error: function(name,status) {
			alert(status);
		}
	});
	
	return data;
}

function create_user_banner(user_data){
	$('<div/>',{id: 'user_banner'}).appendTo('body');
	if (is_owner){
		create_user_links();
	}
	create_user_profile_pic(user_data);
	create_profile_username(user_data);
	create_member_date(user_data);
	create_trophy_case(user_data);
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

function create_user_profile_pic(user_data){
	$('#user_banner').append("<img id='user_profile_pic'>");
	$('#user_profile_pic').attr('src', user_data.pic);
}

function create_profile_username(user_data){
	$('#user_banner').append("<div id='profile_username'></div>");
	//$('#profile_username').text(user_data.username);
	$('#profile_username').text(userID);
}

function create_member_date(user_data){
	$('#user_banner').append("<div id='member_date'></div>");
	$('#member_date').text('Member since ' + user_data.birth);
}

function create_trophy_case(user_data){
	$('<ul/>',{id: 'trophy_case'}).appendTo('#user_banner');
	$('<li/>',{id: 'king_trophies'}).appendTo('#trophy_case');
	$('#king_trophies').text(user_data.trophies[0]);
	$('#king_trophies').append("<img id='user_king_crown' src='images/king_crown_1.png'>");
	$('<li/>',{id: 'queen_trophies'}).appendTo('#trophy_case');
	$('#queen_trophies').text(user_data.trophies[1]);
	$('#queen_trophies').append("<img id='user_queen_crown' src='images/queen_crown_1.png'>");
	$('<li/>',{id: 'medal_trophies'}).appendTo('#trophy_case');
	$('#medal_trophies').text(user_data.trophies[2]);
	$('#medal_trophies').append("<img id='user_medal' src='images/medal_1.png'>");
	$('<li/>',{id: 'star_trophies'}).appendTo('#trophy_case');
	$('#star_trophies').text(user_data.trophies[3]);
	$('#star_trophies').append("<img id='user_star' src='images/star_1.png'>");
}
