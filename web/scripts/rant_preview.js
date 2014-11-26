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
	
	/*if (true){
		owner_rant_preview_display(ID);
	}*/
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
	if (logged_user.id == -1){
		//track_votes[0].click( function(){window.document.location.href = 'log_in_sign_up.html'} );
		//track_votes[1].click( function(){window.document.location.href = 'log_in_sign_up.html'} );
		track_votes[0].click( function(){launch_login_modal();} );
		track_votes[1].click( function(){launch_login_modal();} );
	}
	else{
		track_votes[0].click( function(){support_push(track_votes , rant_ID);} );
		track_votes[1].click( function(){oppose_push(track_votes , rant_ID);} );
	}
}

function create_use_item_button_functionality(preview_ID , rant_ID){
	use_item_button = $(preview_ID + ' .rant_preview_use_item_button');
	if (logged_user.id == -1){
		use_item_button.click( function(){window.document.location.href = 'log_in_sign_up.html'} );
	}
	else{
		//use_item_button.click( function(){} );
	}
}

/**********************************************************************************************************/

function populate_rant_preview(is_list , preview_ID, list_num , first_list_num, rant_data){
	$(preview_ID).find('.rant_preview_number').text( (first_list_num+list_num+1) + '.' );
	$(preview_ID).find('.rant_preview_title_link').text(rant_data.title);
		if (is_url(rant_data.contents)){
			$(preview_ID).find('.rant_preview_title_link').attr('href',rant_data.contents);
		}
		else{
			if (rant_data.nsfw && logged_user.nsfwPreference == 2){
				$(preview_ID).find('.rant_preview_title_link').attr('href','javascript:launch_nsfw_warning_modal(' + rant_data.id + ')');
			}
			else{
				$(preview_ID).find('.rant_preview_title_link').attr('href','rant_view.html?r=' + rant_data.id);
			}
		}
	$(preview_ID).find('.rant_preview_author_link').text(rant_data.ownername);
		$(preview_ID).find('.rant_preview_author_link').attr('href','user_profile.html?u=' + rant_data.owner);
		$(preview_ID).find('.rant_preview_author').css('width',(rant_data.ownername.length)*10+'px');
	$(preview_ID).find('.rant_preview_rank').text(get_rant_rank(first_list_num+list_num+1));	
	$(preview_ID).find('.rant_preview_level').text(rant_data.level);
		$(preview_ID).find('.rant_preview_level').attr('href',get_rant_preview_level_link(rant_data));
	$(preview_ID).find('.rant_preview_power').text(get_rant_power(rant_data.id));
	//$(preview_ID).find('.rant_preview_power').text(rant_data.power);
	$(preview_ID).find('.rant_preview_birth').text('Created ' + translate_date(rant_data.birth));
	$(preview_ID).find('.rant_preview_death').text('Died ' + translate_date(rant_data.death));
	if (rant_data.nsfw && is_list && logged_user.nsfwPreference == 2){
		$(preview_ID).find('.rant_preview_content').text('NSFW');
		$(preview_ID).find('.rant_preview_content').addClass('rant_preview_NSFW_content');
		$(preview_ID + ' .rant_preview_content_fade').hide();
	}
	else{
		$(preview_ID).find('.rant_preview_content').text(rant_data.contents);
	}
	
	draw_downvote(rant_data, preview_ID);
	draw_upvote(rant_data, preview_ID);
	create_rant_preview_vote_button_functionality(preview_ID , rant_data.id);
	create_use_item_button_functionality(preview_ID , rant_data.id);
}

function draw_downvote(rant_data, preview_ID){
    $.ajax({
        type: 'POST',
        url: '/api/users/votes',
        success: function(gotData) {
            data = $.parseJSON(gotData);
			downvotes = data.downvotes;
			for (j = 0; j < downvotes.length; j++){
				if (downvotes[j] == rant_data.id){
					$(preview_ID).find('.rant_preview_oppose_button_image').attr('src','images/down_button_1.png');
					$(preview_ID).find('.rant_preview_support_button_image').css('opacity','0.3');
					return;
				}
			}
			$(preview_ID).find('.rant_preview_oppose_button_image').attr('src','images/down_button_2.png');
        },
        error: function(name,status) {
            window.document.location.href = "error_page.html";
        }
    });
}

function draw_upvote(rant_data, preview_ID){
	$.ajax({
        type: 'POST',
        url: '/api/users/votes',
        success: function(gotData) {
            data = $.parseJSON(gotData);
			upvotes = data.upvotes;
			for (j = 0; j < upvotes.length; j++){
				if (upvotes[j] == rant_data.id){
					$(preview_ID).find('.rant_preview_support_button_image').attr('src','images/up_button_1.png');
					$(preview_ID).find('.rant_preview_oppose_button_image').css('opacity','0.3');
					return;
				}
			}
			$(preview_ID).find('.rant_preview_support_button_image').attr('src','images/up_button_2.png');
        },
        error: function(name,status) {
            window.document.location.href = "error_page.html";
        }
    });
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

function get_rant_power(rant_id){
	var power = 0;
	$.ajax({
        type: 'POST',
		async: false,
        url: '/api/rants/power',
		data: {id: rant_id},
        success: function(gotData) {
            power = gotData;
        },
        error: function(name,status) {
            window.document.location.href = "error_page.html";
        }
    });
	return power;
}

/**********************************************************************************************************/

function owner_rant_preview_display(preview_ID){
	$(preview_ID + ' .rant_preview_dates_line').show();
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
}

function detailed_rant_display(rant_ID){
	$(rant_ID + ' .rant_preview_content_fade').hide();
	$(rant_ID + ' .rant_preview_actions_line').css('margin-top','20px');
	$(rant_ID + ' .rant_preview_actions_line').css('margin-left','auto');
	$(rant_ID + ' .rant_preview_actions_line').css('margin-right','auto');
}

/**********************************************************************************************************/

function launch_nsfw_warning_modal(rant_id){
	create_modal_blur_background('nsfw_warning_modal_blur_background');
	$('<div/>',{id:'nsfw_warning_background' , text:'This rant is NSFW!  Are you over 18 and wish to proceed?'}).appendTo('body');
	//create_nsfw_warning_text();
	create_nsfw_warning_mascot();
	create_nsfw_warning_buttons(rant_id);
}

function create_nsfw_warning_text(){
	$('<div/>',{id:'nsfw_warning_text'}).appendTo('nsfw_warning_background');
	$('#nsfw_warning_text').text('This rant is NSFW!  Are you over 18 and wish to proceed?');
}

function create_nsfw_warning_mascot(){
	$("#nsfw_warning_background").append("<img id='nsfw_warning_img' src='images/character_19.png' width='200' alt='nsfw_warning_image'>");
}

function create_nsfw_warning_buttons(rant_id){
	$('<div/>',{id:'nsfw_warning_close' , addClass:'nsfw_warning_button' , text:'No thanks'}).appendTo('#nsfw_warning_background');
	$('#nsfw_warning_close').click(function(){$('#nsfw_warning_modal_blur_background').remove();  $('#nsfw_warning_background').remove();});
	$('<div/>',{id:'nsfw_warning_proceed' , addClass:'nsfw_warning_button' , text:'Proceed'}).appendTo('#nsfw_warning_background');
	$('#nsfw_warning_proceed').click(function(){window.document.location.href = 'rant_view.html?r=' + rant_id;});
}