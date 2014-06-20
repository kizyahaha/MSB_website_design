
function create_my_rants_content(data){
	$('<div/>',{id:'my_rant_sorts'}).appendTo('#user_content_space');
	$('<div/>',{id:'my_rants_space'}).appendTo('#user_content_space');
	create_rant_filters(data);
}

function get_my_rants(data){
	var my_rants = document.getElementById('my_rants_space');
	my_rants.innerHTML = '';
	num_my_rants = data.length;
	for (i=0 ; i<num_my_rants; i++){
		var my_rant = document.createElement('div');
		my_rant.id = "my_rant";
		var is_rant_active = get_rant_status(i , data);
		create_vertical_info(my_rant, i , is_rant_active , data);
		create_horizontal_info(my_rant , i , is_rant_active , data);
		get_my_rant_rant(my_rant , i , data);
		my_rants.appendChild(my_rant);
	}
}

function create_vertical_info(my_rant , i , is_rant_active , data){	
	var my_rant_vertical_info = document.createElement('table');
	my_rant_vertical_info.className = 'my_rant_vertical_info';
	if (is_rant_active){
		my_rant_vertical_info.className = my_rant_vertical_info.className + ' active_rant';
	}
	else{
		my_rant_vertical_info.className = my_rant_vertical_info.className + ' inactive_rant';
	}
	
	var my_rant_num_tr = document.createElement('tr');
	get_my_rant_num(my_rant_num_tr , i);
	my_rant_vertical_info.appendChild(my_rant_num_tr);
	
	var my_rant_level_tr = document.createElement('tr');
	get_my_rant_level(my_rant_level_tr , i , is_rant_active , data);
	my_rant_vertical_info.appendChild(my_rant_level_tr);
	
	var my_rant_power_tr = document.createElement('tr');
	get_my_rant_power(my_rant_power_tr , i , data);
	my_rant_vertical_info.appendChild(my_rant_power_tr);

	my_rant.appendChild(my_rant_vertical_info);
}

function get_rant_status(i , data){
	//if rant is active return true else return false;
	if (data[i].power > 0){
		return true;
	}
	return false;
}

function get_my_rant_num(my_rant_num_tr , i){
	var my_rant_num_td = document.createElement('td');
	my_rant_num_td.className = 'my_rant_num';
	my_rant_num_td.innerHTML = i+1 + '.';
	my_rant_num_tr.appendChild(my_rant_num_td);
}

function get_my_rant_level(my_rant_level_tr , i , is_rant_active , data){
	var my_rant_level_td = document.createElement('td');
	var my_rant_level_link = document.createElement('a');
	if (is_rant_active)
		my_rant_level_link.className = 'active_rant';
	else
		my_rant_level_link.className = 'inactive_rant';
	if (data[i].level == 'Daily'){
		my_rant_level_link.innerHTML = 'Daily';
		my_rant_level_link.href = 'daily.html';
	}
	if (data[i].level == 'Hourly'){
		my_rant_level_link.innerHTML = 'Hourly';
		my_rant_level_link.href = 'hourly.html';
	}
	if (data[i].level == '10-Minutely'){
		my_rant_level_link.innerHTML = '10-Minutely';
		my_rant_level_link.href = 'ten_minutely.html';
	}
	if (data[i].level == 'Minutely'){
		my_rant_level_link.innerHTML = 'Minutely';
		my_rant_level_link.href = 'minutely.html';
	}
	my_rant_level_td.appendChild(my_rant_level_link);
	my_rant_level_tr.appendChild(my_rant_level_td);
}

function get_my_rant_power(my_rant_power_tr , i , data){
	var my_rant_power_td = document.createElement('td');
	my_rant_power_td.className = 'my_rant_power';
	my_rant_power_td.innerHTML = data[i].power;
	my_rant_power_tr.appendChild(my_rant_power_td);
}

function create_horizontal_info(my_rant , i, is_rant_active , data){
	var my_rant_horizontal_info = document.createElement('table');
	my_rant_horizontal_info.className = 'my_rant_horizontal_info';
	if (is_rant_active){
		my_rant_horizontal_info.className = my_rant_horizontal_info.className + ' active_rant';
	}
	else{
		my_rant_horizontal_info.className = my_rant_horizontal_info.className + ' inactive_rant';
	}
	var temp_row = document.createElement('tr');
	check_my_rant_NSFW(i , temp_row , data);
	get_my_rant_title(temp_row , is_rant_active , data , i);
	get_my_rant_dates(temp_row , i , data , is_rant_active);
	my_rant_horizontal_info.appendChild(temp_row);
	my_rant.appendChild(my_rant_horizontal_info);
}

function check_my_rant_NSFW(i , temp_row , data){
	if (data[i].nsfw){
		var NSFW = document.createElement('td');
		NSFW.className = 'NSFW';
		NSFW.textContent = 'NSFW';
		temp_row.appendChild(NSFW);
	}
}

function get_my_rant_title(temp_row , is_rant_active , data , i){
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
	my_rant_title_link.textContent = data[i].title;
	my_rant_title.appendChild(my_rant_title_link);
	temp_row.appendChild(my_rant_title);
}

function get_my_rant_dates(temp_row , i , data , is_rant_active){
	var my_rant_dates = document.createElement('td');
	my_rant_dates.id = "my_rant_dates";
	if (is_rant_active){
		my_rant_dates.textContent = data[i].birth;
		my_rant_dates.style.minWidth = '100px';
	}
	else{
		my_rant_dates.textContent = data[i].birth + ' - ' + data[i].death;
		my_rant_dates.style.minWidth = '200px';
	}
	temp_row.appendChild(my_rant_dates);
}

function get_my_rant_rant(my_rant , i, data){
	var my_rant_rant = document.createElement('div');
	my_rant_rant.className = 'my_rant_preview';
	my_rant_rant.textContent = data[i].contents;
	var fade = document.createElement('div');
	fade.className = 'my_rant_preview_fade';
	my_rant_rant.appendChild(fade);
	my_rant.appendChild(my_rant_rant);
}

function create_rant_filters(data){
	var filters = ['Any' , 'Any' , 'Age - new to old'];
	create_status_select(data , filters);
	create_level_select(data , filters);
	create_order_sort(data , filters);
	apply_filters(data , filters);
}

function create_status_select(data , filters){
	$('<form/>',{id:'status_pulldown'}).appendTo('#my_rant_sorts');
	$('#status_pulldown').text('Status: ');
	$('<select/>',{id:'status_select'}).appendTo('#status_pulldown');
	$('#status_select').append('<option>Any</option>');
	$('#status_select').append('<option>Active</option>');
	$('#status_select').append('<option>Past</option>');
	$('#status_select').change( function(){get_status_filter_value(filters);
									apply_filters(data , filters);
								}
						);
}

function create_level_select(data , filters){
	$('<form/>',{id:'level_pulldown'}).appendTo('#my_rant_sorts');
	$('#level_pulldown').text('Level: ');
	$('<select/>',{id:'level_select'}).appendTo('#level_pulldown');
	$('#level_select').append('<option>Any</option>');
	$('#level_select').append('<option>Daily</option>');
	$('#level_select').append('<option>Hourly</option>');
	$('#level_select').append('<option>10-Minutely</option>');
	$('#level_select').append('<option>Minutely</option>');
	$('#level_select').change( function(){get_level_filter_value(filters);
									apply_filters(data , filters);
								}
						);
}

function create_order_sort(data , filters){
	$('<form/>',{id:'order_pulldown'}).appendTo('#my_rant_sorts');
	$('#order_pulldown').text('Sort by: ');
	$('<select/>',{id:'order_select'}).appendTo('#order_pulldown');
	$('#order_select').append('<option>Age - new to old</option>');
	$('#order_select').append('<option>Age - old to new</option>');
	$('#order_select').append('<option>Power - high to low</option>');
	$('#order_select').append('<option>Power - low to high</option>');
	$('#order_select').change( function(){get_order_filter_value(filters);
									apply_filters(data , filters);
								}
						);
}

function get_status_filter_value(filters){
	filters[0] = document.getElementById("status_select").value;
}
function get_level_filter_value(filters){
	filters[1] = document.getElementById("level_select").value;
}
function get_order_filter_value(filters){
	filters[2] = document.getElementById("order_select").value;
}

function apply_filters(data , filters){
	var filtered_data = data.rants.slice(0);
	num_my_rants = filtered_data.length;
	if (filters[0] == 'Active'){
		for (i=0 ; i<num_my_rants ; i++){
			if (filtered_data[i].power == 0){
				filtered_data.splice(i,1);
				i--;
				num_my_rants--;
			}
		}
	}
	if (filters[0] == 'Past'){
		for (i=0 ; i<num_my_rants ; i++){
			if (filtered_data[i].power > 0){
				filtered_data.splice(i,1);
				i--;
				num_my_rants--;
			}
		}
	}
	if (filters[1] == 'Daily'){
	}
	if (filters[1] == 'Hourly'){
	}
	if (filters[1] == '10-Minutely'){
	}
	if (filters[1] == 'Minutely'){
	}
	if (filters[2] == 'Age - new to old'){
		filtered_data.sort( function(a,b){
								var c = new Date(a.birth);
								var d = new Date(b.birth);
								return (d-c);
							}
						);							
	}
	if (filters[2] == 'Age - old to new'){
		filtered_data.sort( function(a,b){
								var c = new Date(a.birth);
								var d = new Date(b.birth);
								return (c-d);
							}
						);							
	}
	if (filters[2] == 'Power - high to low'){
		filtered_data.sort( function(a,b){return (b.power - a.power);} );							
	}
	if (filters[2] == 'Power - low to high'){
		filtered_data.sort( function(a,b){return (a.power - b.power);} );							
	}
	get_my_rants(filtered_data);
}