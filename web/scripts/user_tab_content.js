
function create_user_tab_content(user_tab_num, user_id){
	$('<div/>',{id:'user_content_space'}).appendTo('body');
	create_my_rants_content(user_id);
	create_my_activity_content(user_id);
	create_my_items_content(user_id);
	update_user_tab_content(user_tab_num);
}

function create_my_rants_content(user_id){
	$('<div/>',{id:'my_rant_sorts'}).appendTo('#user_content_space');
	create_status_select();
	create_level_select();
	create_order_sort();
	$('<div/>',{id:'my_rants_space'}).appendTo('#user_content_space');
	get_my_rants();
}





function get_my_rants(){
	var my_rants = document.getElementById('my_rants_space');
	num_my_rants = get_num_my_rants();
	for (i=0 ; i<num_my_rants; i++){
		var my_rant = document.createElement('div');
		var is_rant_active = get_rant_status(i);
		create_vertical_info(my_rant, i , is_rant_active);
		create_horizontal_info(my_rant , i , is_rant_active);
		get_my_rant_rant(my_rant , i);
		my_rants.appendChild(my_rant);
	}
}

function get_num_my_rants(){
	return 10;
}

function create_vertical_info(my_rant , num , is_rant_active){
	num = num + 1;
	
	var my_rant_vertical_info = document.createElement('table');
	my_rant_vertical_info.className = 'my_rant_vertical_info';
	if (is_rant_active){
		my_rant_vertical_info.className = my_rant_vertical_info.className + ' active_rant';
	}
	else{
		my_rant_vertical_info.className = my_rant_vertical_info.className + ' inactive_rant';
	}
	
	var my_rant_num_tr = document.createElement('tr');
	get_my_rant_num(my_rant_num_tr , num);
	my_rant_vertical_info.appendChild(my_rant_num_tr);
	
	var my_rant_level_tr = document.createElement('tr');
	get_my_rant_level(my_rant_level_tr , num);
	my_rant_vertical_info.appendChild(my_rant_level_tr);
	
	var my_rant_power_tr = document.createElement('tr');
	get_my_rant_power(my_rant_power_tr , num);
	my_rant_vertical_info.appendChild(my_rant_power_tr);

	my_rant.appendChild(my_rant_vertical_info);
}

function get_rant_status(num){
	//if rant is active return true else return false;
	if ((num+1)%4 == 0){
		return true;
	}
	else{
		return false;
	}
}

function get_my_rant_num(my_rant_num_tr , num){
	var my_rant_num_td = document.createElement('td');
	my_rant_num_td.className = 'my_rant_num';
	my_rant_num_td.innerHTML = num + '.';
	my_rant_num_tr.appendChild(my_rant_num_td);
}

function get_my_rant_level(my_rant_level_tr , num){
	var my_rant_level_td = document.createElement('td');
	my_rant_level_td.className = 'my_rant_level';
	if (num%4 == 0){
		my_rant_level_td.innerHTML = 'Daily';
	}
	if (num%4 == 1){
		my_rant_level_td.innerHTML = 'Hourly';
	}
	if (num%4 == 2){
		my_rant_level_td.innerHTML = '10-Minutely';
	}
	if (num%4 == 3){
		my_rant_level_td.innerHTML = 'Minutely';
	}
	my_rant_level_tr.appendChild(my_rant_level_td);
}

function get_my_rant_power(my_rant_power_tr , num){
	var my_rant_power_td = document.createElement('td');
	my_rant_power_td.className = 'my_rant_power';
	my_rant_power_td.innerHTML = '9,437';
	my_rant_power_tr.appendChild(my_rant_power_td);
}

function create_horizontal_info(my_rant , num, is_rant_active){
	num = num + 1;
	var my_rant_horizontal_info = document.createElement('table');
	my_rant_horizontal_info.className = 'my_rant_horizontal_info';
	if (is_rant_active){
		my_rant_horizontal_info.className = my_rant_horizontal_info.className + ' active_rant';
	}
	else{
		my_rant_horizontal_info.className = my_rant_horizontal_info.className + ' inactive_rant';
	}
	var temp_row = document.createElement('tr');
	check_my_rant_NSFW(num , temp_row);
	get_my_rant_title(temp_row , is_rant_active);
	get_my_rant_dates(temp_row , num);
	my_rant_horizontal_info.appendChild(temp_row);
	my_rant.appendChild(my_rant_horizontal_info);
}

function check_my_rant_NSFW(num , temp_row){
	if (num%2 == 0){
		var NSFW = document.createElement('td');
		NSFW.className = 'NSFW';
		NSFW.textContent = 'NSFW';
		temp_row.appendChild(NSFW);
	}
}

function get_my_rant_title(temp_row , is_rant_active){
	var my_rant_title = document.createElement('td');
	var my_rant_title_link = document.createElement('a');
	my_rant_title_link.className = 'my_rant_title';
	if (is_rant_active){
		my_rant_title_link.className = my_rant_title_link.className + ' active_rant';
	}
	else{
		my_rant_title_link.className = my_rant_title_link.className + ' inactive_rant';
	}
	my_rant_title_link.href = '#';
	my_rant_title_link.textContent = 'This is one of my rants';
	my_rant_title.appendChild(my_rant_title_link);
	temp_row.appendChild(my_rant_title);
}

function get_my_rant_dates(temp_row , num){
	var my_rant_dates = document.createElement('td');
	if (num%4 == 0){
		my_rant_dates.textContent = '(April 14, 2014 - ?)';
	}
	else{
		my_rant_dates.textContent = '(April 14, 2014 - April 16, 2014)';
	}
	temp_row.appendChild(my_rant_dates);
}

function get_my_rant_rant(my_rant , num){
	num = num+1;
	var my_rant_rant = document.createElement('div');
	my_rant_rant.className = 'my_rant_preview';
	my_rant_rant.textContent = 'I completely agree with the "Jeremy is dumb" sentiment.  I completely agree with the "Jeremy is dumb" sentiment.  I completely agree with the "Jeremy is dumb" sentiment.  I completely agree with the "Jeremy is dumb" sentiment.  I completely agree with the "Jeremy is dumb" sentiment.  I completely agree with the "Jeremy is dumb" sentiment.  I completely agree with the "Jeremy is dumb" sentiment.  I completely agree with the "Jeremy is dumb" sentiment.  I completely agree with the "Jeremy is dumb" sentiment.  I completely agree with the "Jeremy is dumb" sentiment.  I completely agree with the "Jeremy is dumb" sentiment.  ';
	var fade = document.createElement('div');
	fade.className = 'my_rant_preview_fade';
	my_rant_rant.appendChild(fade);
	my_rant.appendChild(my_rant_rant);
}













function create_status_select(){
	$('<form/>',{id:'status_pulldown'}).appendTo('#my_rant_sorts');
	$('#status_pulldown').text('Status: ');
	$('<select/>',{id:'status_select'}).appendTo('#status_pulldown');
	$('#status_select').append('<option>Any</option>');
	$('#status_select').append('<option>Active</option>');
	$('#status_select').append('<option>Past</option>');
}

function create_level_select(){
	$('<form/>',{id:'level_pulldown'}).appendTo('#my_rant_sorts');
	$('#level_pulldown').text('Level: ');
	$('<select/>',{id:'level_select'}).appendTo('#level_pulldown');
	$('#level_select').append('<option>Any</option>');
	$('#level_select').append('<option>Daily</option>');
	$('#level_select').append('<option>Hourly</option>');
	$('#level_select').append('<option>10-Minutely</option>');
	$('#level_select').append('<option>Minutely</option>');
}

function create_order_sort(){
	$('<form/>',{id:'order_pulldown'}).appendTo('#my_rant_sorts');
	$('#order_pulldown').text('Sort by: ');
	$('<select/>',{id:'order_select'}).appendTo('#order_pulldown');
	$('#order_select').append('<option>Age - new to old</option>');
	$('#order_select').append('<option>Age - old to new</option>');
	$('#order_select').append('<option>Power - high to low</option>');
	$('#order_select').append('<option>Power - low to high</option>');
}

function create_my_activity_content(user_id){
	$('<div/>',{id:'my_activity_space'}).appendTo('#user_content_space');
	document.getElementById('my_activity_space').style.display = 'none';
}

function create_my_items_content(user_id){
	$('<div/>',{id:'my_items_space'}).appendTo('#user_content_space');
	document.getElementById('my_items_space').style.display = 'none';
}


function update_user_tab_content(user_tab_num){
	document.getElementById('my_rants_space').style.display = 'none';
	document.getElementById('my_rant_sorts').style.display = 'none';
	document.getElementById('my_activity_space').style.display = 'none';
	document.getElementById('my_items_space').style.display = 'none';
	switch (user_tab_num){
		case 0:
			document.getElementById('my_rants_space').style.display = 'initial';
			document.getElementById('my_rant_sorts').style.display = 'initial';
			break;
		case 1:
			document.getElementById('my_activity_space').style.display = 'initial';
			break;
		case 2:
			document.getElementById('my_items_space').style.display = 'initial';
			break;
		default:
			break;
	}
}