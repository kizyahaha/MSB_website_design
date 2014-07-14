function create_rant_preview(parent , num){
	var preview = document.createElement('div');
	var ID = 'rant_preview' + num;
	preview.id = ID;
	preview.className = 'rant_preview';
	ID = '#' + ID;
	document.getElementById('contenders').appendChild(preview);
	create_rant_preview_left_side(ID);
	create_rant_preview_right_side(ID);
	if (is_owner){
		owner_rant_preview_display(ID);
	}
	return ID;
}

function create_rant_preview_left_side(preview_ID){
	$('<div/>',{addClass:'rant_preview_left_side'}).appendTo(preview_ID);
	$('<div/>',{addClass:'rant_preview_number'}).appendTo(preview_ID + ' .rant_preview_left_side');
	$('<div/>',{addClass:'rant_preview_power'}).appendTo(preview_ID + ' .rant_preview_left_side');
	$(preview_ID + ' .rant_preview_power').hide();
}

function create_rant_preview_right_side(preview_ID){
	$('<div/>',{addClass:'rant_preview_right_side'}).appendTo(preview_ID);
	create_rant_preview_title_line(preview_ID);
	create_rant_preview_dates_line(preview_ID);
	create_rant_preview_content_line(preview_ID);
	create_rant_preview_actions_line(preview_ID);
}

function create_rant_preview_title_line(preview_ID){
	/*$('<div/>',{addClass:'rant_preview_title_line'}).appendTo(preview_ID + ' .rant_preview_right_side');
	$('<div/>',{addClass:'rant_preview_title'}).appendTo(preview_ID + ' .rant_preview_title_line');
	$('<div/>',{addClass:'rant_preview_author'}).appendTo(preview_ID + ' .rant_preview_title_line');
	$('<div/>',{addClass:'rant_preview_level'}).appendTo(preview_ID + ' .rant_preview_title_line');
	$(preview_ID + ' .rant_preview_level').css('display','none');*/
	$('<table/>',{addClass:'rant_preview_title_line'}).appendTo(preview_ID + ' .rant_preview_right_side');
	$('<tr/>',{addClass:'title_row'}).appendTo(preview_ID + ' .rant_preview_title_line');
	$('<td/>',{addClass:'rant_preview_title'}).appendTo(preview_ID + ' .title_row');
		$('<a/>',{addClass:'rant_preview_title_link'}).appendTo(preview_ID + ' .rant_preview_title');
	$('<td/>',{addClass:'rant_preview_author'}).appendTo(preview_ID + ' .title_row');
		$('<a/>',{addClass:'rant_preview_author_link'}).appendTo(preview_ID + ' .rant_preview_author');
	$('<td/>',{addClass:'rant_preview_level'}).appendTo(preview_ID + ' .title_row');
	$(preview_ID + ' .rant_preview_level').css('display','none');
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

function create_rant_preview_content_line(preview_ID){
	$('<div/>',{addClass:'rant_preview_content_line'}).appendTo(preview_ID + ' .rant_preview_right_side');
	$('<div/>',{addClass:'rant_preview_content'}).appendTo(preview_ID + ' .rant_preview_content_line');
	$('<div/>',{addClass:'rant_preview_content_fade'}).appendTo(preview_ID + ' .rant_preview_content_line');
}

function create_rant_preview_actions_line(preview_ID){
	$('<div/>',{addClass:'rant_preview_actions_line'}).appendTo(preview_ID + ' .rant_preview_right_side');
	$('<img/>',{addClass:'rant_preview_support_button' , src:'images/up_button_2.png'}).appendTo(preview_ID + ' .rant_preview_actions_line');
	$('<div/>',{addClass:'rant_preview_use_item_button', text:'Apply item'}).appendTo(preview_ID + ' .rant_preview_actions_line');
	$('<img>',{addClass:'rant_preview_oppose_button' , src:'images/down_button_2.png'}).appendTo(preview_ID + ' .rant_preview_actions_line');
}

/*function create_vote_buttons(contender){
	var up_button = document.createElement('img');
	up_button.src = 'images/up_button_2.png';
	up_button.alt = 'upvote';
	up_button.width = 20;
	var down_button = document.createElement('img');
	down_button.src = 'images/down_button_2.png';
	down_button.alt = 'downvote';
	down_button.width = 20;
	
	var track_votes = new Array();
	track_votes[0] = up_button;
	track_votes[1] = down_button;
	track_votes[0].onclick = function(){upvote_push(track_votes);};
	track_votes[1].onclick = function(){downvote_push(track_votes);};
	
	var vote_buttons = document.createElement('div');
	vote_buttons.className = 'vote_buttons';
	vote_buttons.appendChild(track_votes[0]);
	vote_buttons.appendChild(track_votes[1]);
	contender.appendChild(vote_buttons);
}

function upvote_push(track_votes){
	var initImg = "up_button_2.png";
	var pushImg = "up_button_1.png";
	var currImg = track_votes[0].src.substring(track_votes[0].src.lastIndexOf('/') + 1);
	if (currImg == initImg){
		track_votes[0].src = "images/" + pushImg;
		track_votes[1].style.opacity = 0.3;
		track_votes[0].style.opacity = 1.0;
	}
	else{
		track_votes[0].src = "images/" + initImg;
		track_votes[0].style.opacity = 1.0;
		track_votes[1].style.opacity = 1.0;
	}
	track_votes[1].src = "images/down_button_2.png";
}

function downvote_push(track_votes){
	var initImg = "down_button_2.png";
	var pushImg = "down_button_1.png";
	var currImg = track_votes[1].src.substring(track_votes[1].src.lastIndexOf('/') + 1);
	if (currImg == initImg){
		track_votes[1].src = "images/" + pushImg;
		track_votes[0].style.opacity = 0.3;
		track_votes[1].style.opacity = 1.0;
	}
	else{
		track_votes[1].src = "images/" + initImg;
		track_votes[1].style.opacity = 1.0;
		track_votes[0].style.opacity = 1.0;
	}
	track_votes[0].src = "images/up_button_2.png";

}*/

/**********************************************************************************************************/

function populate_rant_preview(preview_ID, list_num , rant_data){
	$(preview_ID).find('.rant_preview_number').text( (list_num+1) + '.' );
	$(preview_ID).find('.rant_preview_power').text(rant_data.power);
	$(preview_ID).find('.rant_preview_title_link').text(rant_data.title);
		$(preview_ID).find('.rant_preview_title_link').attr('href','rant_view.html');
	$(preview_ID).find('.rant_preview_author_link').text('Queen_of_Equestria');
		$(preview_ID).find('.rant_preview_author_link').attr('href','user_profile.html');
		$(preview_ID).find('.rant_preview_author').css('width',('Queen_of_Equestria'.length)*10+'px');
	$(preview_ID).find('.rant_preview_level').text('(' + rant_data.level + ')');
		$(preview_ID).find('.rant_preview_level').css('width',(rant_data.level.length+2)*10+'px');
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
}

/**********************************************************************************************************/

function owner_rant_preview_display(preview_ID){
	$(preview_ID + ' .rant_preview_power').show();
	$(preview_ID + ' .rant_preview_author').hide();
	$(preview_ID + ' .rant_preview_level').show();
	$(preview_ID + ' .rant_preview_dates_line').show();
	$(preview_ID + ' .rant_preview_support_button').hide();
	$(preview_ID + ' .rant_preview_oppose_button').hide();
}


