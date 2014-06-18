
function create_my_rants_content(data){
	$('<div/>',{id:'my_rant_sorts'}).appendTo('#user_content_space');
	create_status_select();
	create_level_select();
	create_order_sort();
	$('<div/>',{id:'my_rants_space'}).appendTo('#user_content_space');
	get_my_rants(data);
}

function get_my_rants(data){
	var my_rants = document.getElementById('my_rants_space');
	num_my_rants = data.rants.length;
	for (i=0 ; i<num_my_rants; i++){
		var my_rant = document.createElement('div');
		my_rant.id = "my_rant";
		var is_rant_active = get_rant_status(i);
		create_vertical_info(my_rant, i , is_rant_active);
		create_horizontal_info(my_rant , i , is_rant_active , data);
		get_my_rant_rant(my_rant , i , data);
		my_rants.appendChild(my_rant);
	}
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
	if ((num+1)%3 == 0){
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
	//my_rant_level_td.className = 'my_rant_level';
	var my_rant_level_link = document.createElement('a');
	//my_rant_level_link.className = 'my_rant_level';
	if (num%3 == 0){
		my_rant_level_link.innerHTML = 'Daily';
		my_rant_level_link.href = 'daily.html';
		my_rant_level_link.className = 'active_rant';
	}
	if (num%3 == 1){
		my_rant_level_link.innerHTML = 'Hourly';
		my_rant_level_link.href = 'hourly.html';
		my_rant_level_link.className = 'inactive_rant';
	}
	if (num%3 == 2){
		my_rant_level_link.innerHTML = '10-Minutely';
		my_rant_level_link.href = 'ten_minutely.html';
		my_rant_level_link.className = 'inactive_rant';
	}
	my_rant_level_td.appendChild(my_rant_level_link);
	my_rant_level_tr.appendChild(my_rant_level_td);
}

function get_my_rant_power(my_rant_power_tr , num){
	var my_rant_power_td = document.createElement('td');
	my_rant_power_td.className = 'my_rant_power';
	my_rant_power_td.innerHTML = '9,437';
	my_rant_power_tr.appendChild(my_rant_power_td);
}

function create_horizontal_info(my_rant , num, is_rant_active , data){
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
	check_my_rant_NSFW(num , temp_row , data);
	get_my_rant_title(temp_row , is_rant_active , data , num);
	get_my_rant_dates(temp_row , num , data , num);
	my_rant_horizontal_info.appendChild(temp_row);
	my_rant.appendChild(my_rant_horizontal_info);
}

function check_my_rant_NSFW(num , temp_row , data){
	if (data.rants[num-1].nsfw){
		var NSFW = document.createElement('td');
		NSFW.className = 'NSFW';
		NSFW.textContent = 'NSFW';
		temp_row.appendChild(NSFW);
	}
}

function get_my_rant_title(temp_row , is_rant_active , data , num){
	var my_rant_title = document.createElement('td');
	var my_rant_title_link = document.createElement('a');
	my_rant_title_link.className = 'my_rant_title';
	if (is_rant_active){
		//my_rant_title_link.className = my_rant_title_link.className + ' active_rant';
	}
	else{
		//my_rant_title_link.className = my_rant_title_link.className + ' inactive_rant';
	}
	my_rant_title_link.href = 'rant_view.html';
	my_rant_title_link.textContent = data.rants[num-1].title;
	my_rant_title.appendChild(my_rant_title_link);
	temp_row.appendChild(my_rant_title);
}

function get_my_rant_dates(temp_row , num , data, num){
	var my_rant_dates = document.createElement('td');
	my_rant_dates.id = "my_rant_dates";
	if (num%3 == 0){
		my_rant_dates.textContent = data.rants[num-1].birth;
		my_rant_dates.style.minWidth = '100px';
	}
	else{
		my_rant_dates.textContent = data.rants[num-1].birth + ' - ' + data.rants[num-1].death;
		my_rant_dates.style.minWidth = '200px';
	}
	temp_row.appendChild(my_rant_dates);
}

function get_my_rant_rant(my_rant , num, data){
	num = num+1;
	var my_rant_rant = document.createElement('div');
	my_rant_rant.className = 'my_rant_preview';
	my_rant_rant.textContent = data.rants[num-1].contents;
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