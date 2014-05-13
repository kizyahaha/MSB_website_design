
function create_detailed_rant(){
	$('<div/>',{id:'detailed_rant_container'}).appendTo('body');
	$('<div/>',{id:'detailed_rant_space'}).appendTo('#detailed_rant_container');
	create_detailed_rant_info();
	if (is_owner()){
		create_detailed_rant_power_graph();
	}
}

function is_owner(){
	return true;
}

function create_detailed_rant_info(){
	$('<table/>',{id:'detailed_rant_info_table'}).appendTo('#detailed_rant_space');
	$('<tr/>',{id:'detailed_temp_row'}).appendTo('#detailed_rant_info_table');
	create_detailed_rant_title();
	create_detailed_rant_username();
	create_detailed_rant_level();
	create_detailed_rant_NSFW();
	create_detailed_rant_content();
}

function create_detailed_rant_NSFW(){
	$('<div/>',{id:'detailed_rant_NSFW' , addClass:'detailed_NSFW'}).appendTo('#detailed_rant_space');
	$('#detailed_rant_NSFW').text('NSFW');
}

function create_detailed_rant_title(){
	$('<td/>',{id:'detailed_rant_title'}).appendTo('#detailed_temp_row');
	$('#detailed_rant_title').text('This is the title of this rant');
}

function create_detailed_rant_username(){
	$('<td/>',{id:'detailed_rant_user'}).appendTo('#detailed_temp_row');
	$('<a/>',{id:'detailed_rant_user_link' , addClass:'detailed_username' , href:'user_profile.html'}).appendTo('#detailed_rant_user');
	$('#detailed_rant_user_link').text('Queen_of_Equestria');
}

function create_detailed_rant_level(){
	$('<div/>',{id:'detailed_rant_level'}).appendTo('#detailed_rant_space');
	$('#detailed_rant_level').text('Currently in ');
	$('<a/>',{id:'detailed_rant_level_link' , href:'hourly.html'}).appendTo('#detailed_rant_level');
	$('#detailed_rant_level_link').text('Hourly');
}

function create_detailed_rant_content(){
	$('<div/>',{id:'detailed_rant_content'}).appendTo('#detailed_rant_space');
	$('#detailed_rant_content').text('Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.');
	}

function create_detailed_rant_power_graph(){
	$('<div/>',{id:'detailed_power_graph'}).appendTo('#detailed_rant_container');
	create_detailed_rant_power_graph_axis_labels();
	create_detailed_rant_power_graph_power_limits();
	get_detailed_rant_power_graph();
}

function create_detailed_rant_power_graph_axis_labels(){
	$('<div/>',{id:'detailed_y_label'}).appendTo('#detailed_power_graph');
	$('#detailed_y_label').text('Power');
	$('<div/>',{id:'detailed_x_label'}).appendTo('#detailed_power_graph');
	$('#detailed_x_label').text('Time');
}

function create_detailed_rant_power_graph_power_limits(){
	$('<div/>',{id:'detailed_max_power'}).appendTo('#detailed_power_graph');
	$('#detailed_max_power').text('9,437');
	$('<div/>',{id:'detailed_min_power'}).appendTo('#detailed_power_graph');
	$('#detailed_min_power').text('0');
}

function get_detailed_rant_power_graph(){
	$('<div/>',{id:'detailed_power_bars' , width:'100%' , height:'100%'}).appendTo('#detailed_power_graph');
	var detailed_graph_width = $('#detailed_power_bars').width();
	var detailed_graph_height = $('#detailed_power_bars').height();
	var curr_power = 500;
	var curr_point = 0;
	var max_power = 9437;
	var events = new Array();
	events.push(curr_point);
	for (i=0 ; i<50 ; i++){ //initial rise until jump to 10 minute
		var detailed_power_bar = document.createElement('div');
		detailed_power_bar.className = 'detailed_power_bar';
		detailed_power_bar.title = 'time:' + curr_point + ', power:' + curr_power;
		detailed_power_bar.style.height = (curr_power / max_power) * detailed_graph_height;
		curr_power = curr_power + get_random_num(50);
		curr_point++;
		document.getElementById('detailed_power_bars').appendChild(detailed_power_bar);
	}
	events.push(curr_point);
	curr_power += 1000;
	for (i=0 ; i<50 ; i++){ //rise until leech
		var detailed_power_bar = document.createElement('div');
		detailed_power_bar.className = 'detailed_power_bar';
		detailed_power_bar.title = 'time:' + curr_point + ', power:' + curr_power;
		detailed_power_bar.style.height = (curr_power / max_power) * detailed_graph_height;
		curr_power = curr_power + get_random_num(100);
		curr_point++;
		document.getElementById('detailed_power_bars').appendChild(detailed_power_bar);
	}
	events.push(curr_point);
	for (i=0 ; i<25 ; i++){ //leech until "front of the line"
		var detailed_power_bar = document.createElement('div');
		detailed_power_bar.className = 'detailed_power_bar';
		detailed_power_bar.title = 'time:' + curr_point + ', power:' + curr_power;
		detailed_power_bar.style.height = (curr_power / max_power) * detailed_graph_height;
		curr_power = curr_power - get_random_num(100);
		curr_point++;
		document.getElementById('detailed_power_bars').appendChild(detailed_power_bar);
	}
	events.push(curr_point);
	while (curr_power<8000){ //rise due to "front of the line" until jump to hourly
		var detailed_power_bar = document.createElement('div');
		detailed_power_bar.className = 'detailed_power_bar';
		detailed_power_bar.title = 'time:' + curr_point + ', power:' + curr_power;
		detailed_power_bar.style.height = (curr_power / max_power) * detailed_graph_height;
		curr_power = curr_power + get_random_num(300);
		curr_point++;
		document.getElementById('detailed_power_bars').appendChild(detailed_power_bar);
	}
	events.push(curr_point);
	curr_power+=500;
	while (curr_power<9437){ //rise due in hourly until decay
		var detailed_power_bar = document.createElement('div');
		detailed_power_bar.className = 'detailed_power_bar';
		detailed_power_bar.title = 'time:' + curr_point + ', power:' + curr_power;
		detailed_power_bar.style.height = (curr_power / max_power) * detailed_graph_height;
		curr_power = curr_power + get_random_num(50);
		curr_point++;
		document.getElementById('detailed_power_bars').appendChild(detailed_power_bar);
	}
	events.push(curr_point);
	while (curr_power>7000){ //decay to current
		var detailed_power_bar = document.createElement('div');
		detailed_power_bar.className = 'detailed_power_bar';
		detailed_power_bar.title = 'time:' + curr_point + ', power:' + curr_power;
		detailed_power_bar.style.height = (curr_power / max_power) * detailed_graph_height;
		curr_power = curr_power - get_random_num(100);
		curr_point++;
		document.getElementById('detailed_power_bars').appendChild(detailed_power_bar);
	}
	events.push(curr_point);
	
	var detailed_power_bar_width = detailed_graph_width / (curr_point+1);
	var change_width = document.getElementsByClassName('detailed_power_bar');
	var i = change_width.length;
	while (i--){
		change_width[i].style.width = detailed_power_bar_width;
	}
	var all_bars = document.getElementById('detailed_power_bars').children;
	for (i=0 ; i<all_bars.length ; i++){
		all_bars[i].style.left = i*detailed_power_bar_width;
	}
	get_detailed_rant_power_graph_events(events , detailed_power_bar_width);
}

function get_random_num(range){
	var n = Math.floor(Math.random()*range);
	return n;
}

function get_detailed_rant_power_graph_events(events , bar_width){
	var events_length = events.length;
	for (i=0 ; i<events_length ; i++){
		var event_marker = document.createElement('div');
		event_marker.className = 'event_marker';
		event_marker.style.left = events[i]*bar_width;
		switch(i){
			case 0:
				event_marker.title = 'Rant initialized with 500 power';
				break;
			case 1:
				event_marker.title = 'Won minutely title!';
				break;
			case 2:
				event_marker.title = 'Queen_of_Equestria used a leech attack!';
				break;
			case 3:
				event_marker.title = 'You employed a "Front of the Pack" item';
				break;
			case 4:
				event_marker.title = 'You won the 10-minute title!';
				break;
			case 5:
				event_marker.title = 'Max power achieved: 9,437';
				break;
			case 6:
				event_marker.title = 'Current power: 7000';
				break;
			default:
				break;
		}
		document.getElementById('detailed_power_bars').appendChild(event_marker);
	}
}
/*
window.onresize = resize_power_bars;
function resize_power_bars(){
	var graph_width = $('#power_bars').width();
	var power_bar_width = graph_width*0.75 / num_contenders;
	var bar_spacing = graph_width*0.25 / (num_contenders+1);
	var power_bars = new Array();
	var power_bars = document.getElementById('power_bars').children;
	for (i=0 ; i<power_bars.length ; i++){
		power_bars[i].style.width = power_bar_width;
		power_bars[i].style.left = bar_spacing*(i+1) + power_bar_width*i;
	}
}
*/