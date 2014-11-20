function create_tabs(){
	var tabs = document.createElement('ul');
	tabs.id = 'tabs';
	document.body.appendChild(tabs);
	create_daily();
	create_hourly();
	create_ten_minutely();
	create_minutely();
	create_submit_rant_tab();
	create_submit_pointer();
	update_tabs();
}

function create_daily(){
	var daily_link = document.createElement('a');
	daily_link.href = 'daily';
	var daily = document.createElement('li');
	daily.className = 'other_tab';
	var king_crown_img = document.createElement('img');
	king_crown_img.src = "images/king_crown_1.png";
	king_crown_img.alt = 'king';
	king_crown_img.width = 25;
	daily.appendChild(king_crown_img);
	var text = document.createTextNode(" Daily");
	daily.appendChild(text);
	daily_link.appendChild(daily);
	document.getElementById('tabs').appendChild(daily_link);
}

function create_hourly(){
	var hourly_link = document.createElement('a');
	hourly_link.href = 'hourly';
	var hourly = document.createElement('li');
	hourly.className = 'other_tab';
	var queen_crown_img = document.createElement('img');
	queen_crown_img.src = "images/queen_crown_1.png";
	queen_crown_img.alt = 'queen';
	queen_crown_img.width = 25;
	hourly.appendChild(queen_crown_img);
	var text = document.createTextNode(" Hourly");
	hourly.appendChild(text);
	hourly_link.appendChild(hourly);
	document.getElementById('tabs').appendChild(hourly_link);
	
}

function create_ten_minutely(){
	var ten_min_link = document.createElement('a');
	ten_min_link.href = 'ten_minutely';
	var ten_min = document.createElement('li');
	ten_min.className = 'other_tab';
	ten_min.id = 'ten_min';
	var medal_img = document.createElement('img');
	medal_img.src = "images/medal_1.png";
	medal_img.alt = 'medal';
	medal_img.width = 20;
	ten_min.appendChild(medal_img);
	var text = document.createTextNode(" 10 Minutely");
	ten_min.appendChild(text);
	ten_min_link.appendChild(ten_min);
	document.getElementById('tabs').appendChild(ten_min_link);
}

function create_minutely(){
	var minutely_link = document.createElement('a');
	minutely_link.href = 'minutely';
	var minutely = document.createElement('li');
	minutely.className = 'other_tab';
	var star_img = document.createElement('img');
	star_img.src = "images/star_1.png";
	star_img.alt = 'star';
	star_img.width = 20;
	minutely.appendChild(star_img);
	var text = document.createTextNode(" Minutely");
	minutely.appendChild(text);
	minutely_link.appendChild(minutely);
	document.getElementById('tabs').appendChild(minutely_link);
}

function update_tabs(){
	var tabs = document.getElementById('tabs');
	tabs.children[get_level_index()].children[0].className = 'current_tab';
}

function create_submit_rant_tab(){
	$('<a/>',{id:'submit_rant_link'}).appendTo('#tabs');
	$('#submit_rant_link').attr('href','submit_rant.html');
	$('<li/>',{id:'submit_rant' , addClass:'other_tab'}).appendTo('#submit_rant_link');
	$('#submit_rant').text('Create a rant!');
}

function create_submit_pointer(){
	var submit_pointer = document.createElement('div');
	submit_pointer.id = "submit_pointer";
	document.body.appendChild(submit_pointer);
}