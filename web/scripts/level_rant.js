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
		data: {appliedFilters: '{"level":"'+get_level_string()+'"}'},
        success: function(gotData) {
            winner = $.parseJSON(gotData);
            var winner_ID = create_rant_preview(false , 'rant_bubble' , -1 , winner.owner.id);
			populate_rant_preview(false , winner_ID , -1 , 1 , winner);
			update_winner_headline(get_level_index());
			update_character(get_level_index());
			update_countdown(get_level_index());
			update_rant_sizes();
			window.onload = function(){update_rant_sizes();};
        },
        error: function(name,status) {
            window.document.location.href = "error_page.html";
        }
    });
}

function update_winner_headline(level){
	var winner_headline = document.getElementById('winner_headline');
	switch(level){
		case 0:
			winner_headline.innerText = "Today's Top Rant";
			break;
		case 1:
			winner_headline.innerText = "Hour's Top Rant";
			break;
		case 2:
			winner_headline.innerText = "Ten's Top Rant";
			break;
		case 3:
			winner_headline.innerText = "Minute's Top Rant";
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
	switch(level){
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
	}
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

function update_rant_sizes(){
	//Size and position everything based on the size of the rant bubble
	$('#rant_container').css('height',$('#rant_bubble').height()+190);
	var resizeTimer;
	$(window).resize(function() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function(){$('#rant_container').css('height',$('#rant_bubble').height()+190);}, 250);
	});
}


function leading_zero(t){
	if (t < 10){
		t = "0" + t;
	}
	return t;
}