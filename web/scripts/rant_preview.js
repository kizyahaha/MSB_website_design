function create_rant_preview(is_list , parent , num , author){
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
	if (logged_user.id == 0){
		no_log_rant_preview_display(ID);
	}
	if (logged_user.username == author){
		owner_rant_preview_display(ID);
	}
	return ID;
}

function create_rant_preview_left_side(preview_ID){
	$('<div/>',{addClass:'rant_preview_left_side'}).appendTo(preview_ID);
	$('<div/>',{addClass:'rant_preview_number'}).appendTo(preview_ID + ' .rant_preview_left_side');
	//$('<div/>',{addClass:'rant_preview_power'}).appendTo(preview_ID + ' .rant_preview_left_side');
	//$(preview_ID + ' .rant_preview_power').hide();
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
	/*$('<td/>',{addClass:'rant_preview_level'}).appendTo(preview_ID + ' .rant_preview_title_row');
		$(preview_ID + ' .rant_preview_level').append('(');
		$('<a/>',{addClass:'rant_preview_level_link'}).appendTo(preview_ID + ' .rant_preview_level');
		$(preview_ID + ' .rant_preview_level').append(')');
	$(preview_ID + ' .rant_preview_level').css('display','none');*/
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
		$('<img/>',{addClass:'rant_preview_oppose_button_image' , src:'images/down_button_2.png'}).appendTo(preview_ID + ' .rant_preview_oppose_button');
	$('<td/>',{addClass:'rant_preview_use_item'}).appendTo(preview_ID + ' .rant_preview_action_row');	
		$('<div/>',{addClass:'rant_preview_use_item_button', text:'Apply item'}).appendTo(preview_ID + ' .rant_preview_use_item');
	$('<td/>',{addClass:'rant_preview_support_button'}).appendTo(preview_ID + ' .rant_preview_action_row');
		$('<img/>',{addClass:'rant_preview_support_button_image' , src:'images/up_button_2.png'}).appendTo(preview_ID + ' .rant_preview_support_button');
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

function populate_rant_preview(preview_ID, list_num , rant_data){
	$(preview_ID).find('.rant_preview_number').text( (list_num+1) + '.' );
	//$(preview_ID).find('.rant_preview_power').text(rant_data.power);
	$(preview_ID).find('.rant_preview_title_link').text(rant_data.title);
		$(preview_ID).find('.rant_preview_title_link').attr('href','rant_view.html?r=' + rant_data.id);
	$(preview_ID).find('.rant_preview_author_link').text(rant_data.owner);
		$(preview_ID).find('.rant_preview_author_link').attr('href','user_profile.html?u=3');
		$(preview_ID).find('.rant_preview_author').css('width',(rant_data.owner.length)*10+'px');
	/*$(preview_ID).find('.rant_preview_level_link').text(rant_data.level);
		$(preview_ID).find('.rant_preview_level_link').attr('href',get_rant_preview_level_link(rant_data));
		$(preview_ID).find('.rant_preview_level').css('width',(rant_data.level.length+2)*10+'px');*/
	
	$(preview_ID).find('.rant_preview_rank').text(get_rant_rank(list_num+1));	
	$(preview_ID).find('.rant_preview_level').text(rant_data.level);
		$(preview_ID).find('.rant_preview_level').attr('href',get_rant_preview_level_link(rant_data));
	$(preview_ID).find('.rant_preview_power').text(rant_data.power);
		
	$(preview_ID).find('.rant_preview_birth').text('Created ' + rant_data.birth);
	$(preview_ID).find('.rant_preview_death').text('Died ' + rant_data.death);
	if (!rant_data.nsfw){
		$(preview_ID).find('.rant_preview_content').text(rant_data.contents);
	}
	else{
		$(preview_ID).find('.rant_preview_content').text('NSFW');
		$(preview_ID).find('.rant_preview_content').addClass('rant_preview_NSFW_content');
		$(preview_ID + ' .rant_preview_content_fade').hide();
	}
	create_rant_preview_vote_button_functionality(preview_ID , rant_data.id);
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
	//$(preview_ID + ' .rant_preview_power').show();
	//$(preview_ID + ' .rant_preview_author').hide();
	//$(preview_ID + ' .rant_preview_level').show();
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


