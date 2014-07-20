function create_rant(tab_num){
	create_rant_container();
	create_winner_title();
	create_rant_bubble();
	create_triangle();
	create_soapbox();
	create_character();
	create_countdown();
	update_rant(tab_num);
}

function create_rant_container(){
	var rant_container = document.createElement('div');
	rant_container.id = "rant_container";
	document.body.appendChild(rant_container);
}

function create_winner_title(){
	var winner_title = document.createElement('div');
	winner_title.id = "winner_title";
	document.getElementById('rant_container').appendChild(winner_title);
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

function update_rant(tab_num){
	update_winner_title(tab_num);
	update_winning_user(tab_num); //include rant title and power
	//update_time_stamp(tab_num);
	update_rant_text(tab_num);
	update_character(tab_num);
	update_countdown(tab_num);
	//window.onload = function(){update_sizes();};
	update_sizes();
	window.onload = function(){update_sizes();};
}

function update_winner_title(tab_num){
	var winner_title = document.getElementById('winner_title');
	switch(tab_num){
		case 0:
			winner_title.innerText = "Today's Top Rant";
			break;
		case 1:
			winner_title.innerText = "Hour's Top Rant";
			break;
		case 2:
			winner_title.innerText = "Ten's Top Rant";
			break;
		case 3:
			winner_title.innerText = "Minute's Top Rant";
			break;
		default:
			break;
	}
}

function update_winning_user(tab_num){
	var rant_bubble = document.getElementById('rant_bubble');
	var user = get_username(tab_num);
	rant_bubble.appendChild(user);
	var text = document.createTextNode("'s rant");
	rant_bubble.appendChild(text);
}

function get_username(tab_num){
	var user = document.createElement('a');
	user.className = 'username';
	user.href = 'user_profile.html';
	user.textContent = 'Queen_of_Equestria';
	return user;
}

function update_rant_text(tab_num){
	var rant_bubble = document.getElementById('rant_bubble');
	var rant = get_rant(tab_num);
	rant_bubble.appendChild(document.createElement('br'));
	rant_bubble.appendChild(document.createElement('br'));
	rant_bubble.appendChild(rant);
}

function get_rant(tab_num){
	var rant;
	switch(tab_num){
		case 0:
			rant = document.createTextNode("Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  Jeremy is dumb.  ");
			break;
		case 1:
			rant = document.createTextNode("Jeremy?  More like Jere-gay!  Hehe!");
			break;
		case 2:
			rant = document.createTextNode('Jeremy likes ponies?....You mean, like, "My Little Pony" ponies?');
			break;
		case 3:
			rant = document.createTextNode("Clippity cloppity, clippity cloppity, clippity cloppity, boo!");
			break;
		default:
			break;
	}
	return rant;
}

function update_character(tab_num){
	get_character(tab_num);
}

function get_character(tab_num){
	var character = document.getElementById('character');
	switch(tab_num){
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

function update_countdown(tab_num){
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
	switch(tab_num){
		case 0:
			if (hours==0 && minutes==0 && seconds <= 1)
				clock.innerHTML="NOW!";
			else{
				clock.innerHTML = hours + ":" + minutes + ":" + seconds;
				var refresh_clock = setTimeout(function(){update_countdown(tab_num)},500);
			}
			break;
		case 1:
			if (minutes==0 && seconds <= 1)
				clock.innerHTML="NOW!";
			else{
				clock.innerHTML = minutes + ":" + seconds;
				var refresh_clock = setTimeout(function(){update_countdown(tab_num)},500);
			}
			break;
		case 2:
			if (minutes%10==0 && seconds <= 1)
				clock.innerHTML="NOW!";
			else{
				clock.innerHTML = minutes%10 + ":" + seconds;
				var refresh_clock = setTimeout(function(){update_countdown(tab_num)},500);
			}
			break;
		case 3:
			if (seconds <= 1)
				clock.innerHTML="NOW!";
			else{
				clock.innerHTML = "0:" + seconds;
				var refresh_clock = setTimeout(function(){update_countdown(tab_num)},500);
			}
			break;
		default:
			break;
	}
}

function update_sizes(){
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
