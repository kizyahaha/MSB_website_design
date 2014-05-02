function create_contender_space(tab_num){
	var contender_space = document.createElement('div');
	contender_space.id = 'contender_space';
	document.body.appendChild(contender_space);
	create_contender_title();
	create_contenders(tab_num);
	create_power_graph(tab_num);
	update_contender_space(tab_num);
}

function create_contender_title(){
	var contender_title = document.createElement('div');
	contender_title.id = 'contender_title';
	document.getElementById('contender_space').appendChild(contender_title);
}

function create_contenders(tab_num){
	var contenders = document.createElement('div');
	contenders.id = 'contenders';
	document.getElementById('contender_space').appendChild(contenders);
}

function update_contender_space(tab_num){
	update_contender_title(tab_num);
	get_num_contenders(tab_num);
	update_contenders(tab_num);
	update_power_graph(tab_num);
}

var num_contenders;
function get_num_contenders(tab_num){
	num_contenders = 10;
}

function update_contender_title(tab_num){
	var contender_title = document.getElementById('contender_title');
	switch(tab_num){
		case 0:
			contender_title.innerText = "Contenders for Tomorrow's Title";
			break;
		case 1:
			contender_title.innerText = "Contenders for the Next 1-Hour Title";
			break;
		case 2:
			contender_title.innerText = "Contenders for the Next 10-Minute Title";
			break;
		case 3:
			contender_title.innerText = "Contenders for the Next 1-Minute Title";
			break;
		default:
			break;
	}
	$('#contender_title').append("<span style='color:rgb(52,52,52); font-size:18px;'><br/>(in no particular order)</span>");
}

function update_contenders(tab_num){
	var contenders = document.getElementById('contenders');
	var got_contenders = new Array();
	got_contenders = get_contenders(tab_num);
	for (i=0 ; i<got_contenders.length ; i++){
		contenders.appendChild(got_contenders[i]);
	}
}

function get_contenders(tab_num){
	var got_contenders = new Array();
	for (i=0 ; i<num_contenders ; i++){
		var contender = document.createElement('div');
		create_vote_buttons(contender);
		get_contender_info(contender , i);
		get_contender_rant(contender , i);
		got_contenders[i] = contender;
	}
	return got_contenders;
}

function create_vote_buttons(contender){
	var up_button = document.createElement('img');
	up_button.src = 'images/up_button_1.png';
	up_button.alt = 'upvote';
	up_button.width = 20;
	var down_button = document.createElement('img');
	down_button.src = 'images/down_button_1.png';
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
	var initImg = "up_button_1.png";
	var pushImg = "up_button_2.png";
	var currImg = track_votes[0].src.substring(track_votes[0].src.lastIndexOf('/') + 1);
	track_votes[0].src = "images/" + (currImg == initImg ? pushImg : initImg);
	track_votes[1].src = "images/down_button_1.png";
}

function downvote_push(track_votes){
	var initImg = "down_button_1.png";
	var pushImg = "down_button_2.png";
	var currImg = track_votes[1].src.substring(track_votes[1].src.lastIndexOf('/') + 1);
	track_votes[1].src = "images/" + (currImg == initImg ? pushImg : initImg);
	track_votes[0].src = "images/up_button_1.png";
}

function get_contender_info(contender , num){
	num = num + 1;
	var contender_info = document.createElement('table');
	var temp_row = document.createElement('tr');
	get_contender_num(num , temp_row);
	check_contender_NSFW(num , temp_row);
	get_contender_title(temp_row);
	get_contender_username(temp_row);
	contender_info.appendChild(temp_row);
	contender.appendChild(contender_info);
}

function get_contender_num(num , temp_row){
	var contender_num = document.createElement('td');
	contender_num.className = 'contender_num';
	contender_num.innerHTML = num + '.';
	temp_row.appendChild(contender_num);
}

function check_contender_NSFW(num , temp_row){
	if (num%2 == 0){
		var NSFW = document.createElement('td');
		NSFW.className = 'NSFW';
		NSFW.textContent = 'NSFW';
		temp_row.appendChild(NSFW);
	}
}

function get_contender_title(temp_row){
	var contender_title = document.createElement('td');
	var contender_title_link = document.createElement('a');
	contender_title_link.className = 'contender_title';
	contender_title_link.href = '#';
	contender_title_link.textContent = 'This is a contender rant';
	contender_title.appendChild(contender_title_link);
	temp_row.appendChild(contender_title);
}

function get_contender_username(temp_row){
	var username = document.createElement('td');
	var username_link = document.createElement('a');
	username_link.className = 'contender_username';
	username_link.href = 'user_profile.html';
	username_link.textContent = 'Queen_of_Equestria';
	username.appendChild(username_link);
	temp_row.appendChild(username);
}

function get_contender_rant(contender , num){
	num = num+1;
	var contender_rant = document.createElement('div');
	contender_rant.className = 'contender_rant_preview';
	if (num%2 == 0){
		thumbnail = document.createElement('img');
		thumbnail.src = 'images/jeremy.png';
		thumbnail.width=80;
		contender_rant.appendChild(thumbnail);
	}
	else {
		contender_rant.textContent = 'I completely agree with the "Jeremy is dumb" sentiment.  I completely agree with the "Jeremy is dumb" sentiment.  I completely agree with the "Jeremy is dumb" sentiment.  I completely agree with the "Jeremy is dumb" sentiment.  I completely agree with the "Jeremy is dumb" sentiment.  I completely agree with the "Jeremy is dumb" sentiment.  I completely agree with the "Jeremy is dumb" sentiment.  I completely agree with the "Jeremy is dumb" sentiment.  I completely agree with the "Jeremy is dumb" sentiment.  I completely agree with the "Jeremy is dumb" sentiment.  I completely agree with the "Jeremy is dumb" sentiment.  ';
	}
	var fade = document.createElement('div');
	fade.className = 'contender_preview_fade';
	contender_rant.appendChild(fade);
	contender.appendChild(contender_rant);
}