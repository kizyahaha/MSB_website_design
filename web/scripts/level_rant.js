function create_rant(){
	create_rant_container();
	create_winner_headline();
	create_rant_bubble();
	create_triangle();
	create_soapbox();
	create_character();
	create_countdown();
	update_winner_rant();
}

function create_rant_container(){
	var rant_container = document.createElement('div');
	rant_container.id = "rant_container";
	document.body.appendChild(rant_container);
}

function create_winner_headline(){
	var winner_headline = document.createElement('div');
	winner_headline.id = "winner_headline";
	document.getElementById('rant_container').appendChild(winner_headline);
}

function create_rant_bubble(){
	var rant_bubble = document.createElement('div');
	rant_bubble.id = "rant_bubble";
	document.getElementById('rant_container').appendChild(rant_bubble);	
}

function create_triangle(){
	var triangle = document.createElement('div');
	triangle.id = "triangle";
	document.getElementById('rant_container').appendChild(triangle);
}

function create_soapbox(){
	var soapbox = document.createElement('img');
	soapbox.id = "soapbox";
	soapbox.src = 'images/SoapBox2.png';
	soapbox.alt = 'soapbox';
	soapbox.height = 150;
	document.getElementById('rant_container').appendChild(soapbox);
}

function create_character(){
	var character = document.createElement('img');
	character.id = "character";
	character.alt = 'character';
	character.height = 200;
	document.getElementById('rant_container').appendChild(character);
}

function create_countdown(){
	var countdown = document.createElement('div');
	countdown.id = "countdown";
	countdown.textContent = "Next winner in: ";
	var clock = document.createElement('span');
	clock.id = 'clock';
	clock.style.color = 'white';
	countdown.appendChild(clock);
	document.getElementById('rant_container').appendChild(countdown);	
}

function update_winner_rant(){
	$.ajax({
        type: 'POST',
        url: '/api/rants/winner',
		data: {level:get_level_string(-1)},
        success: function(gotData) {
			if (!gotData) {
				no_winner_display();
			}
			else {
				winner = $.parseJSON(gotData);
				display_winner_rant(winner);
			}
			//var winner_ID = create_rant_preview(false, 'rant_bubble', winner.owner.id);
			//populate_rant_preview(false, winner_ID, 0, 1, winner);			
			update_winner_headline(get_level_index());
			update_character(get_level_index());
			update_countdown(get_level_index());		
        },
        error: function(gotData) {
            window.document.location.href = "error_page.html";
        }
    });
}

function no_winner_display(){
	$('<p/>', {id:'no_winner_message'}).appendTo('#rant_bubble');
	$('#no_winner_message').text("There is no winner this time - most likely because there were no contenders.");
	$('<p/>', {id:'no_winner_protip'}).appendTo('#rant_bubble');
	$('#no_winner_protip').append("<span>protip:</span> Submit a rant.  You'd be a shoo-in!");
	//$('<br/><br/><br/>').appendTo('#no_winner_protip');
	//$('<a/>', {id:'no_winner_link_to_prev', href:'daily.html'}).appendTo('#no_winner_protip');
	//$('#no_winner_link_to_prev').append("Check out the previous winner");
}

function display_winner_rant(winner){
	if (winner.nsfw && logged_user.nsfwPreference == 0){
		$('#rant_bubble').text('Sorry, the current winning rant is tagged as NSFW! Sign in and/or change your preferences to view NSFW rants.');
	}
	else if (winner.nsfw && logged_user.nsfwPreference == 2){
		var winner_ID = create_rant_preview(false, 'rant_bubble', -1, winner.owner);
		populate_rant_preview(true, winner_ID, 0, 1, winner);
	}
	else{
		var winner_ID = create_rant_preview(false, 'rant_bubble', -1, winner.owner);
		populate_rant_preview(false, winner_ID, 0, 1, winner);
	}
}

function update_winner_headline(level){
	switch(level){
		case 0:
			$('#winner_headline').text("Today's Top Rant");
			break;
		case 1:
			$('#winner_headline').text("Hour's Top Rant");
			break;
		case 2:
			$('#winner_headline').text("Ten's Top Rant");
			break;
		case 3:
			$('#winner_headline').text("Minute's Top Rant");
			break;
		default:
			break;
	}
}

function update_character(level){
	get_character(level);
}

function get_character(level){
	var character = document.getElementById('character');
	/*switch(level){
		case 0:
			character.src = "images/character_1.png";
			break;
		case 1:
			character.src = "images/character_2.png";
			break;
		case 2:
			character.src = "images/character_3.png";
			break;
		case 3:
			character.src = "images/character_4.png";
			break;
		default:
			break;
	}*/
	character.src = "images/character_1.png"
}

function update_countdown(level){
	var d = new Date();
	var curr_hour = d.getHours();
	var curr_minute = d.getMinutes();
	var curr_second = d.getSeconds();
	var hours = 23 - curr_hour;
	var minutes = 59 - curr_minute;
	var seconds = 59 - curr_second;
	minutes = leading_zero(minutes);
	seconds = leading_zero(seconds);
	var clock = document.getElementById('clock');
	switch(level){
		case 0:
			if (hours==0 && minutes==0 && seconds <= 1)
				clock.innerHTML="NOW!";
			else{
				clock.innerHTML = hours + ":" + minutes + ":" + seconds;
				var refresh_clock = setTimeout(function(){update_countdown(level)},500);
			}
			break;
		case 1:
			if (minutes==0 && seconds <= 1)
				clock.innerHTML="NOW!";
			else{
				clock.innerHTML = minutes + ":" + seconds;
				var refresh_clock = setTimeout(function(){update_countdown(level)},500);
			}
			break;
		case 2:
			if (minutes%10==0 && seconds <= 1)
				clock.innerHTML="NOW!";
			else{
				clock.innerHTML = minutes%10 + ":" + seconds;
				var refresh_clock = setTimeout(function(){update_countdown(level)},500);
			}
			break;
		case 3:
			if (seconds <= 1)
				clock.innerHTML="NOW!";
			else{
				clock.innerHTML = "0:" + seconds;
				var refresh_clock = setTimeout(function(){update_countdown(level)},500);
			}
			break;
		default:
			break;
	}
}


function leading_zero(t){
	if (t < 10){
		t = "0" + t;
	}
	return t;
}


