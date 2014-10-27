
function create_user_profile(){
    $.ajax({
        type: 'POST',
        url: '/api/users/userData',
        data: {id: get_profile_id() }, // if you comment this line out, it will just get the currently logged in user
        success: function(gotData) {
            data = $.parseJSON(gotData);
			if (data.id == logged_user.id){
				is_owner = true;
			}
			else{
				is_owner = false;
			}
            create_user_banner(data);
            create_user_tabs(data);
			update_user_tabs(0);
            create_user_tab_content_space();
			update_user_tab_content(0);
			create_footer();
        },
        error: function(name,status) {
            window.document.location.href = "error_page.html";
        }
    });
	window.addEventListener('popstate', function(event) {
		update_user_tabs(event.state.user_tab_num);
		update_user_tab_content(event.state.user_tab_num);
	});
}

function get_profile_id(){
	var url = window.location.href;
	index = url.indexOf('u=') + 2;
	return url.substring(index);
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
	$('#edit_user_info').append("<a id='edit_user_info_link' href='user_info.html'>Edit info</a>");
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
	$('#member_date').text('Member since ' + translate_date(user_data.date));
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

function create_user_tab_content_space(){
	$('<div/>',{id:'user_content_space'}).appendTo('body');
	if (window.history.state){
		history.replaceState({user_tab_num:window.history.state.user_tab_num, page_num:window.history.state.page_num}, '', '');
	}
	else{
		history.replaceState({user_tab_num:0, page_num:1}, '', '');
	}
}

function update_user_tab_content(user_tab_num){
	$('#user_content_space').empty();
	switch (user_tab_num){
		case 0:
			create_my_rants_content();
			break;
		case 1:
			create_my_activity_content(data);
			break;
		case 2:
			create_my_items_content(data);
			break;
		default:
			break;
	}
	update_my_profile_content_size();
}

function update_my_profile_content_size(){
	var my_rants = document.getElementById('my_rants_space');
	if (my_rants){
		$('#my_rants_space').css('minHeight', 100 );
		$('#my_rants_space').css('maxHeight', 1050 );
		$('#user_content_space').css('height',$('#my_rants_space').height() + 170);
	}
	var my_items = document.getElementById('my_items_space');
	if (my_items){
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
/*
function update_contender_sizes(){
	setTimeout(function(){$('#contender_space').css('height',$('#contenders').height()+650);}, 250);
	var resizeTimer;
	$(window).resize(function() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function(){$('#contender_space').css('height',$('#contenders').height()+650);}, 250);
	});
}
*/

//eventually move once we create my activity
function create_my_activity_content(logged_user){
	$('<div/>',{id:'my_activity_space'}).appendTo('#user_content_space');
	document.getElementById('my_activity_space').style.display = 'none';
}
