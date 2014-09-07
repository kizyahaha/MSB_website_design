function create_rant_preview(is_list , parent , num , author_id){
	var preview = document.createElement('div');
	var ID = 'rant_preview' + num;
	preview.id = ID;
	preview.className = 'rant_preview';
	ID = '#' + ID;
	document.getElementById(parent).appendChild(preview);
	if (is_list){
		create_rant_preview_left_side(ID);
	}
	create_rant_preview_right_side(ID);
	if (logged_user.id == -1){
		no_log_rant_preview_display(ID);
	}
	if (logged_user.id == author_id){
		owner_rant_preview_display(ID);
	}
	if (is_list){
		preview_rant_display(ID);
	}
	if (!is_list){
		detailed_rant_display(ID);
	}
	return ID;
}

function create_rant_preview_left_side(preview_ID){
	$('<div/>',{addClass:'rant_preview_left_side'}).appendTo(preview_ID);
	$('<div/>',{addClass:'rant_preview_number'}).appendTo(preview_ID + ' .rant_preview_left_side');
}

function create_rant_preview_right_side(preview_ID){
	$('<div/>',{addClass:'rant_preview_right_side'}).appendTo(preview_ID);
	create_rant_preview_title_line(preview_ID);
	create_rant_preview_dates_line(preview_ID);
	create_rant_preview_owner_info_line(preview_ID);
	create_rant_preview_content_line(preview_ID);
	create_rant_preview_actions_line(preview_ID);
}

function create_rant_preview_title_line(preview_ID){
	$('<table/>',{addClass:'rant_preview_title_line'}).appendTo(preview_ID + ' .rant_preview_right_side');
	$('<tr/>',{addClass:'rant_preview_title_row'}).appendTo(preview_ID + ' .rant_preview_title_line');
	$('<td/>',{addClass:'rant_preview_title'}).appendTo(preview_ID + ' .rant_preview_title_row');
		$('<a/>',{addClass:'rant_preview_title_link'}).appendTo(preview_ID + ' .rant_preview_title');
	$('<td/>',{addClass:'rant_preview_author'}).appendTo(preview_ID + ' .rant_preview_title_row');
		$('<a/>',{addClass:'rant_preview_author_link'}).appendTo(preview_ID + ' .rant_preview_author');
}

function create_rant_preview_dates_line(preview_ID){
	$('<div/>',{addClass:'rant_preview_dates_line'}).appendTo(preview_ID + ' .rant_preview_right_side');
	$(preview_ID + ' .rant_preview_dates_line').css('display','none');
	$('<div/>',{addClass:'rant_preview_birth'}).appendTo(preview_ID + ' .rant_preview_dates_line');
	$('<img/>',{addClass:'rant_preview_star' , src:'images/star_1.png'}).appendTo(preview_ID + ' .rant_preview_dates_line');
	$('<img/>',{addClass:'rant_preview_medal' , src:'images/medal_2.png'}).appendTo(preview_ID + ' .rant_preview_dates_line');
	$('<img/>',{addClass:'rant_preview_queen' , src:'images/queen_crown_1.png'}).appendTo(preview_ID + ' .rant_preview_dates_line');
	$('<img/>',{addClass:'rant_preview_king' , src:'images/king_crown_1.png'}).appendTo(preview_ID + ' .rant_preview_dates_line');
	$('<div/>',{addClass:'rant_preview_death'}).appendTo(preview_ID + ' .rant_preview_dates_line');
}

function create_rant_preview_owner_info_line(preview_ID){
	$('<div/>',{addClass:'rant_preview_owner_info_line'}).appendTo(preview_ID + ' .rant_preview_right_side');
	$(preview_ID + ' .rant_preview_owner_info_line').css('display','none');
	$(preview_ID + ' .rant_preview_owner_info_line').append('Currently ranked ');
	$('<span/>',{addClass:'rant_preview_rank'}).appendTo(preview_ID + ' .rant_preview_owner_info_line');
	$(preview_ID + ' .rant_preview_owner_info_line').append(' in ');
	$('<a/>',{addClass:'rant_preview_level'}).appendTo(preview_ID + ' .rant_preview_owner_info_line');
	$(preview_ID + ' .rant_preview_owner_info_line').append(' with ');
	$('<span/>',{addClass:'rant_preview_power'}).appendTo(preview_ID + ' .rant_preview_owner_info_line');
	$(preview_ID + ' .rant_preview_owner_info_line').append(' power');
}

function create_rant_preview_content_line(preview_ID){
	$('<div/>',{addClass:'rant_preview_content_line'}).appendTo(preview_ID + ' .rant_preview_right_side');
	$('<div/>',{addClass:'rant_preview_content'}).appendTo(preview_ID + ' .rant_preview_content_line');
	$('<div/>',{addClass:'rant_preview_content_fade'}).appendTo(preview_ID + ' .rant_preview_content_line');
}

function create_rant_preview_actions_line(preview_ID){
	$('<table/>',{addClass:'rant_preview_actions_line'}).appendTo(preview_ID + ' .rant_preview_right_side');
	$('<tr/>',{addClass:'rant_preview_action_row'}).appendTo(preview_ID + ' .rant_preview_actions_line');
	$('<td/>',{addClass:'rant_preview_oppose_button'}).appendTo(preview_ID + ' .rant_preview_action_row');
		$('<img/>',{addClass:'rant_preview_oppose_button_image'}).appendTo(preview_ID + ' .rant_preview_oppose_button');
	$('<td/>',{addClass:'rant_preview_use_item'}).appendTo(preview_ID + ' .rant_preview_action_row');	
		$('<div/>',{addClass:'rant_preview_use_item_button', text:'Apply item'}).appendTo(preview_ID + ' .rant_preview_use_item');
	$('<td/>',{addClass:'rant_preview_support_button'}).appendTo(preview_ID + ' .rant_preview_action_row');
		$('<img/>',{addClass:'rant_preview_support_button_image'}).appendTo(preview_ID + ' .rant_preview_support_button');
}

/**********************************************************************************************************/

function create_rant_preview_vote_button_functionality(preview_ID , rant_ID){
	var track_votes = new Array();
	track_votes[0] = $(preview_ID + ' .rant_preview_support_button_image');
	track_votes[1] = $(preview_ID + ' .rant_preview_oppose_button_image');
	track_votes[0].click( function(){support_push(track_votes , rant_ID);} );
	track_votes[1].click( function(){oppose_push(track_votes , rant_ID);} );
}

/**********************************************************************************************************/

function populate_rant_preview(is_list , preview_ID, list_num , first_list_num, rant_data){
	$(preview_ID).find('.rant_preview_number').text( (first_list_num+list_num+1) + '.' );
	$(preview_ID).find('.rant_preview_title_link').text(rant_data.title);
		$(preview_ID).find('.rant_preview_title_link').attr('href','rant_view.html?r=' + rant_data.id);
	$(preview_ID).find('.rant_preview_author_link').text(rant_data.owner.username);
		$(preview_ID).find('.rant_preview_author_link').attr('href','user_profile.html?u=' + rant_data.owner.id);
		$(preview_ID).find('.rant_preview_author').css('width',(rant_data.owner.username.length)*10+'px');	
	$(preview_ID).find('.rant_preview_rank').text(get_rant_rank(first_list_num+list_num+1));	
	$(preview_ID).find('.rant_preview_level').text(rant_data.level);
		$(preview_ID).find('.rant_preview_level').attr('href',get_rant_preview_level_link(rant_data));
	$(preview_ID).find('.rant_preview_power').text(rant_data.power);
	$(preview_ID).find('.rant_preview_birth').text('Created ' + translate_date(rant_data.birth));
	$(preview_ID).find('.rant_preview_death').text('Died ' + translate_date(rant_data.death));
	if (rant_data.nsfw && is_list){
		$(preview_ID).find('.rant_preview_content').text('NSFW');
		$(preview_ID).find('.rant_preview_content').addClass('rant_preview_NSFW_content');
		$(preview_ID + ' .rant_preview_content_fade').hide();
	}
	else{
		$(preview_ID).find('.rant_preview_content').text(rant_data.contents);
	}
	
	if (user_did_oppose(rant_data)){
		$(preview_ID).find('.rant_preview_oppose_button_image').attr('src','images/down_button_1.png');
		$(preview_ID).find('.rant_preview_support_button_image').css('opacity','0.3');
	}
	else {
		$(preview_ID).find('.rant_preview_oppose_button_image').attr('src','images/down_button_2.png');
	}
	if (user_did_support(rant_data)){
		$(preview_ID).find('.rant_preview_support_button_image').attr('src','images/up_button_1.png');
		$(preview_ID).find('.rant_preview_oppose_button_image').css('opacity','0.3');
	}
	else{
		$(preview_ID).find('.rant_preview_support_button_image').attr('src','images/up_button_2.png');
	}
	create_rant_preview_vote_button_functionality(preview_ID , rant_data.id);
}

function user_did_oppose(rant_data){
	num_voters = rant_data.downvotes.length;
	for (j=0 ; j<num_voters; j++){
		if (rant_data.downvotes[j] == logged_user.id){
			return true;
		}
	}
	return false;
}
function user_did_support(rant_data){
	num_voters = rant_data.upvotes.length;
	for (j=0 ; j<num_voters; j++){
		if (rant_data.upvotes[j] == logged_user.id){
			return true;
		}
	}
	return false;
}

function get_rant_rank(rank){
	if (rank == 11 || rank == 12 || rank == 13){
		rank = rank + 'th';
	}
	else{
		var mod_10 = rank%10;
		switch (mod_10){
			case 1:
				rank = rank + 'st';
				break;
			case 2:
				rank = rank + 'nd';
				break;
			case 3:
				rank = rank + 'rd';
				break;
			default:
				rank = rank + 'th';
				break;
		}
	}
	return rank;
}

function get_rant_preview_level_link(rant_data){
	if (rant_data.level == 'Daily'){
		return 'daily.html';
	}
	else if (rant_data.level == 'Hourly'){
		return 'hourly.html';
	}
	else if(rant_data.level == '10-Minutely'){
		return 'ten_minutely.html';
	}
	return 'minutely.html';
}

/**********************************************************************************************************/

function owner_rant_preview_display(preview_ID){
	$(preview_ID + ' .rant_preview_dates_line').show();
	$(preview_ID + ' .rant_preview_support_button').hide();
	$(preview_ID + ' .rant_preview_oppose_button').hide();
	
	$(preview_ID + ' .rant_preview_owner_info_line').show();
}

function no_log_rant_preview_display(preview_ID){
	$(preview_ID + ' .rant_preview_support_button').hide();
	$(preview_ID + ' .rant_preview_oppose_button').hide();
	$(preview_ID + ' .rant_preview_use_item').hide();
}

function preview_rant_display(rant_ID){
	$(rant_ID + ' .rant_preview_content_line').css('max-height','80px');
	$(rant_ID + ' .rant_preview_content_line').css('overflow','hidden');
	$(rant_ID + ' .rant_preview_right_side').css('margin-left','70px');
	$(rant_ID + ' .rant_preview_actions_line').css('margin-top','5px');
	$('.rant_preview').css('margin-bottom','40px');
}

function detailed_rant_display(rant_ID){
	$(rant_ID + ' .rant_preview_content_fade').hide();
	$(rant_ID + ' .rant_preview_actions_line').css('margin-top','20px');
	$(rant_ID + ' .rant_preview_actions_line').css('margin-left','auto');
	$(rant_ID + ' .rant_preview_actions_line').css('margin-right','auto');
}


