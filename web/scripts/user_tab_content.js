
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