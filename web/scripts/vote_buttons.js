function support_push(track_votes){
	var initImg = "up_button_2.png";
	var pushImg = "up_button_1.png";
	var currImg = track_votes[0].attr('src').substring(7);
	if (currImg == initImg){
		track_votes[0].attr('src','images/' + pushImg);
		track_votes[1].css('opacity','0.3');
		track_votes[0].css('opacity','1.0');
	}
	else{
		track_votes[0].attr('src','images/' + initImg);
		track_votes[0].css('opacity','1.0');
		track_votes[1].css('opacity','1.0');
	}
	track_votes[1].attr('src','images/down_button_2.png');
}

function oppose_push(track_votes){
	var initImg = "down_button_2.png";
	var pushImg = "down_button_1.png";
	var currImg = track_votes[1].attr('src').substring(7);
	if (currImg == initImg){
		track_votes[1].attr('src','images/' + pushImg);
		track_votes[0].css('opacity','0.3');
		track_votes[1].css('opacity','1.0');
	}
	else{
		track_votes[1].attr('src','images/' + initImg);
		track_votes[1].css('opacity','1.0');
		track_votes[0].css('opacity','1.0');
	}
	track_votes[0].attr('src','images/up_button_2.png');

}