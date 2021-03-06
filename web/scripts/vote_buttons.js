function support_push(track_votes , rant_ID){
	support_power(rant_ID);
	var initImg = "up_button_2.png";
	var pushImg = "up_button_1.png";
	var currImg = track_votes[0].attr('src').substring(7);
	if (currImg == initImg){
		track_votes[0].attr('src','images/' + pushImg);
		track_votes[1].css('opacity','0.3');
		if (track_votes[0].css('opacity') == 1){
			if (logged_user.animationsPreference)
				text_animation(-1 , 1);
			if (logged_user.soundsPreference)
				play_sound('sounds/cash_register.mp3');
		}
		track_votes[0].css('opacity','1.0');
	}
	else{
		track_votes[0].attr('src','images/' + initImg);
		track_votes[0].css('opacity','1.0');
		track_votes[1].css('opacity','1.0');
	}
	track_votes[1].attr('src','images/down_button_2.png');
}

function support_power(rant_ID){
    $.ajax({
        type: 'POST',
        url: '/api/rants/upvote',
		data: {id: rant_ID},
    });
}

function oppose_push(track_votes , rant_ID){
	oppose_power(rant_ID);
	var initImg = "down_button_2.png";
	var pushImg = "down_button_1.png";
	var currImg = track_votes[1].attr('src').substring(7);
	if (currImg == initImg){
		track_votes[1].attr('src','images/' + pushImg);
		track_votes[0].css('opacity','0.3');
		if (track_votes[1].css('opacity') == 1) {
			if (logged_user.animationsPreference)
				text_animation(-1 , 1);
			if (logged_user.soundsPreference)
				play_sound('sounds/cash_register.mp3');
		}
		track_votes[1].css('opacity','1.0');
	}
	else{
		track_votes[1].attr('src','images/' + initImg);
		track_votes[1].css('opacity','1.0');
		track_votes[0].css('opacity','1.0');
	}
	track_votes[0].attr('src','images/up_button_2.png');

}

function oppose_power(rant_ID){
    $.ajax({
        type: 'POST',
        url: '/api/rants/downvote',
		data: {id: rant_ID}
    });
}