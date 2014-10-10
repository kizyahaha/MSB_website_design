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
            var winner_ID = create_winner_rant('rant_bubble' , winner.owner.id);
			populate_winner_rant(winner_ID , winner);
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

/**************************************************************************************/

function create_winner_rant(parent , author_id){
	var winner = document.createElement('div');
	var ID = 'winner_rant';
	winner.id = ID;
	winner.className = 'winner_rant';
	ID = '#' + ID;
	document.getElementById(parent).appendChild(winner);

	create_winner_rant_info(ID);

	if (logged_user.id == author_id){
		owner_winner_rant_display(ID);
	}
	else {
		winner_rant_display(ID);
	}
	//owner_winner_rant_display(ID);
	return ID;
}

function create_winner_rant_info(winner_ID){
	$('<div/>',{addClass:'winner_rant_info'}).appendTo(winner_ID);
	create_winner_rant_title_line(winner_ID);
	create_winner_rant_dates_line(winner_ID);
	create_winner_rant_owner_info_line(winner_ID);
	create_winner_rant_content_line(winner_ID);
}

function create_winner_rant_title_line(winner_ID){
	$('<table/>',{addClass:'winner_rant_title_line'}).appendTo(winner_ID + ' .winner_rant_info');
	$('<tr/>',{addClass:'winner_rant_title_row'}).appendTo(winner_ID + ' .winner_rant_title_line');
	$('<td/>',{addClass:'winner_rant_title'}).appendTo(winner_ID + ' .winner_rant_title_row');
		$('<a/>',{addClass:'winner_rant_title_link'}).appendTo(winner_ID + ' .winner_rant_title');
	$('<td/>',{addClass:'winner_rant_author'}).appendTo(winner_ID + ' .winner_rant_title_row');
		$('<a/>',{addClass:'winner_rant_author_link'}).appendTo(winner_ID + ' .winner_rant_author');
}

function create_winner_rant_dates_line(winner_ID){
	$('<div/>',{addClass:'winner_rant_dates_line'}).appendTo(winner_ID + ' .winner_rant_info');
	$(winner_ID + ' .winner_rant_dates_line').css('display','none');
	$('<div/>',{addClass:'winner_rant_birth'}).appendTo(winner_ID + ' .winner_rant_dates_line');
	$('<img/>',{addClass:'winner_rant_star' , src:'images/star_1.png'}).appendTo(winner_ID + ' .winner_rant_dates_line');
	$('<img/>',{addClass:'winner_rant_medal' , src:'images/medal_2.png'}).appendTo(winner_ID + ' .winner_rant_dates_line');
	$('<img/>',{addClass:'winner_rant_queen' , src:'images/queen_crown_1.png'}).appendTo(winner_ID + ' .winner_rant_dates_line');
	$('<img/>',{addClass:'winner_rant_king' , src:'images/king_crown_1.png'}).appendTo(winner_ID + ' .winner_rant_dates_line');
	$('<div/>',{addClass:'winner_rant_death'}).appendTo(winner_ID + ' .winner_rant_dates_line');
}

function create_winner_rant_owner_info_line(winner_ID){
	$('<div/>',{addClass:'winner_rant_owner_info_line'}).appendTo(winner_ID + ' .winner_rant_info');
	$(winner_ID + ' .winner_rant_owner_info_line').css('display','none');
	$(winner_ID + ' .winner_rant_owner_info_line').append('Currently ranked ');
	$('<span/>',{addClass:'winner_rant_rank'}).appendTo(winner_ID + ' .winner_rant_owner_info_line');
	$(winner_ID + ' .winner_rant_owner_info_line').append(' in ');
	$('<a/>',{addClass:'winner_rant_level'}).appendTo(winner_ID + ' .winner_rant_owner_info_line');
	$(winner_ID + ' .winner_rant_owner_info_line').append(' with ');
	$('<span/>',{addClass:'winner_rant_power'}).appendTo(winner_ID + ' .winner_rant_owner_info_line');
	$(winner_ID + ' .winner_rant_owner_info_line').append(' power');
}

function create_winner_rant_content_line(winner_ID){
	$('<div/>',{addClass:'winner_rant_content_line'}).appendTo(winner_ID + ' .winner_rant_info');
	$('<div/>',{addClass:'winner_rant_content'}).appendTo(winner_ID + ' .winner_rant_content_line');
}

/**********************************************************************************************************/

function populate_winner_rant(winner_ID , rant_data){
	$(winner_ID).find('.winner_rant_title_link').text(rant_data.title);
		/*if (is_url(rant_data.contents)){
			$(winner_ID).find('.winner_rant_title_link').attr('href',rant_data.contents);
		}
		else{
			$(winner_ID).find('.winner_rant_title_link').attr('href','rant_view.html?r=' + rant_data.id);
		}*/
	$(winner_ID).find('.winner_rant_author_link').text(rant_data.ownername);
		$(winner_ID).find('.winner_rant_author_link').attr('href','user_profile.html?u=' + rant_data.owner);
		$(winner_ID).find('.winner_rant_author').css('width',(rant_data.ownername.length)*10+'px');	
	$(winner_ID).find('.winner_rant_rank').text(get_rant_rank(0));	
	$(winner_ID).find('.winner_rant_level').text(rant_data.level);
		$(winner_ID).find('.winner_rant_level').attr('href',get_winner_rant_level_link(rant_data));
	$(winner_ID).find('.winner_rant_power').text(rant_data.power);
	$(winner_ID).find('.winner_rant_birth').text('Created ' + translate_date(rant_data.birth));
	$(winner_ID).find('.winner_rant_death').text('Died ' + translate_date(rant_data.death));
	$(winner_ID).find('.winner_rant_content').text(rant_data.contents);
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

function get_winner_rant_level_link(rant_data){
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

function owner_winner_rant_display(winner_ID){
	$(winner_ID + ' .winner_rant_dates_line').show();
	$(winner_ID + ' .winner_rant_owner_info_line').show();
}

function winner_rant_display(rant_ID){
	$(rant_ID + ' .winner_rant_actions_line').css('margin-top','20px');
}


