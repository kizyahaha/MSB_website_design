
function create_user_profile(user_tab_num){
    $.ajax({
        type: 'POST',
        url: '/api/users/userData',
        data: {id: 2}, // if you comment this line out, it will just get the currently logged in user
        success: function(gotData) {
            data = $.parseJSON(gotData);
            create_user_banner(data);
            create_user_tabs(user_tab_num);
            create_user_tab_content(user_tab_num, data);
			create_footer();
        },
        error: function(name,status) {
            alert(status);
        }
    });
}

function create_user_banner(user_data){
	$('<div/>',{id: 'user_banner'}).appendTo('body');
	if (is_owner){
		create_user_links();
	}
	create_user_profile_pic(user_data); // NOT IMPLEMENTED ON THE BACKEND YET
	create_profile_username(user_data);
	create_member_date(user_data);
	create_trophy_case(user_data); // NOT IMPLEMENTED ON THE BACKEND YET
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
	//$('#user_profile_pic').attr('src', user_data.profilePic);
	$('#user_profile_pic').attr('src', "images/jeremy.png");
}

function create_profile_username(user_data){
	$('#user_banner').append("<div id='profile_username'></div>");
	$('#profile_username').text(user_data.username);
}

function create_member_date(user_data){
	$('#user_banner').append("<div id='member_date'></div>");
	$('#member_date').text('Member since ' + user_data.birth);
}

function create_trophy_case(user_data){
    var trophies = [2, 5, 9, 17];
	$('<ul/>',{id: 'trophy_case'}).appendTo('#user_banner');
	$('<li/>',{id: 'king_trophies'}).appendTo('#trophy_case');
	$('#king_trophies').text(trophies[0]);
	$('#king_trophies').append("<img id='user_king_crown' src='images/king_crown_1.png'>");
	$('<li/>',{id: 'queen_trophies'}).appendTo('#trophy_case');
	$('#queen_trophies').text(trophies[1]);
	$('#queen_trophies').append("<img id='user_queen_crown' src='images/queen_crown_1.png'>");
	$('<li/>',{id: 'medal_trophies'}).appendTo('#trophy_case');
	$('#medal_trophies').text(trophies[2]);
	$('#medal_trophies').append("<img id='user_medal' src='images/medal_1.png'>");
	$('<li/>',{id: 'star_trophies'}).appendTo('#trophy_case');
	$('#star_trophies').text(trophies[3]);
	$('#star_trophies').append("<img id='user_star' src='images/star_1.png'>");
}

function create_user_tab_content(user_tab_num, data){
	$('<div/>',{id:'user_content_space'}).appendTo('body');
	create_my_rants_content(data);
	create_my_rants_navigation();
	create_my_activity_content(data);
	create_my_items_content(data);
	update_user_tab_content(user_tab_num);
	update_my_profile_content_size();
}

function update_user_tab_content(user_tab_num){
	document.getElementById('my_rants_space').style.display = 'none';
	document.getElementById('my_rant_sorts').style.display = 'none';
	document.getElementById('my_rants_navigation_table').style.display = 'none';
	document.getElementById('my_activity_space').style.display = 'none';
	document.getElementById('my_items_space').style.display = 'none';
	switch (user_tab_num){
		case 0:
			document.getElementById('my_rants_space').style.display = 'initial';
			document.getElementById('my_rants_navigation_table').style.display = 'initial';
			document.getElementById('my_rant_sorts').style.display = 'initial';
			break;
		case 1:
			document.getElementById('my_activity_space').style.display = 'initial';
			break;
		case 2:
			document.getElementById('my_items_space').style.display = 'initial';
			break;
		default:
			break;
	}
	update_my_profile_content_size();
}

function update_my_profile_content_size(){
	var my_rants = document.getElementById('my_rants_space');
	if (my_rants.style.display == 'initial'){
		$('#my_rants_space').css('minHeight', 100 );
		$('#my_rants_space').css('maxHeight', 1050 );
		$('#user_content_space').css('height',$('#my_rants_space').height() + 170);
	}
	var my_items = document.getElementById('my_items_space');
	if (my_items.style.display == 'initial'){
		var item_height = 370;
		var defense = document.getElementById('defense_tab_content');
		if (defense.style.display == 'block'){
			item_height = item_height + 270;
		}
		var attack = document.getElementById('attack_tab_content');
		if (attack.style.display == 'block'){
			item_height = item_height + 270;
		}
		var boost = document.getElementById('boost_tab_content');
		if (boost.style.display == 'block'){
			item_height = item_height + 450;
		}
		$('#my_items_space').height( item_height );
		$('#user_content_space').height( item_height + 0);
	}
}

//eventually move once we create my activity
function create_my_activity_content(userID){
	$('<div/>',{id:'my_activity_space'}).appendTo('#user_content_space');
	document.getElementById('my_activity_space').style.display = 'none';
}
