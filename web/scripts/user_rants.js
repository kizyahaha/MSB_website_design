
function create_my_rants_content(){
	$('<div/>',{id:'my_rant_sorts'}).appendTo('#user_content_space');
	$('<div/>',{id:'my_rants_space'}).appendTo('#user_content_space');
	create_my_rants_navigation();
	create_rant_filters();
	get_my_rants();
}

function create_rant_filters(){
	create_status_select();
	create_level_select();
	create_order_sort();
}

function get_user_username(){
	username = '';
	$.ajax({
        type: 'POST',
		async: false,
        url: '/api/users/userData',
        data: {id: get_profile_id() }, // if you comment this line out, it will just get the currently logged in user
        success: function(gotData) {
            data = $.parseJSON(gotData);
			username = data.username;
        },
        error: function(name,status) {
            window.document.location.href = "error_page.html";
        }
    });
	return username;
}

function create_status_select(){
	$('<form/>',{id:'status_pulldown'}).appendTo('#my_rant_sorts');
	$('#status_pulldown').text('Status: ');
	$('<select/>',{id:'status_select'}).appendTo('#status_pulldown');
	$('#status_select').append('<option value=0>Any</option>');
	$('#status_select').append('<option value=1>Active</option>');
	$('#status_select').append('<option value=2>Past</option>');
	$('#status_select').get(0).selectedIndex = window.history.state.user_rants_status;
	$('#status_select').change( function(){apply_filters();});
}

function create_level_select(filters){
	$('<form/>',{id:'level_pulldown'}).appendTo('#my_rant_sorts');
	$('#level_pulldown').text('Level: ');
	$('<select/>',{id:'level_select'}).appendTo('#level_pulldown');
	$('#level_select').append('<option value=0>Any</option>');
	$('#level_select').append('<option value=1>Daily</option>');
	$('#level_select').append('<option value=2>Hourly</option>');
	$('#level_select').append('<option value=3>10-Minutely</option>');
	$('#level_select').append('<option value=4>Minutely</option>');
	$('#level_select').get(0).selectedIndex = window.history.state.user_rants_level;
	$('#level_select').change( function(){apply_filters();});
}

function create_order_sort(filters){
	$('<form/>',{id:'order_pulldown'}).appendTo('#my_rant_sorts');
	$('#order_pulldown').text('Sort by: ');
	$('<select/>',{id:'order_select'}).appendTo('#order_pulldown');
	$('#order_select').append('<option value=0>Age - new to old</option>');
	$('#order_select').append('<option value=1>Age - old to new</option>');
	$('#order_select').append('<option value=2>Power - high to low</option>');
	$('#order_select').append('<option value=3>Power - low to high</option>');
	$('#order_select').get(0).selectedIndex = window.history.state.user_rants_sort;
	$('#order_select').change( function(){apply_filters();});
}

function apply_filters(){
	history.pushState({user_tab_num:0,
						page_num:1,
						user_rants_status:$('#status_select').val(),
						user_rants_level:$('#level_select').val(),
						user_rants_sort:$('#order_select').val(),
						user_activity_cat:0}, '', '');
	$('#my_rants_space').empty();
	get_my_rants();
}

function convert_filter_options(filter_name, val, text){
	if (filter_name == 'status'){
		if (val > -1){
			if (val == 0)
				return 'Any';
			else if (val == 1)
				return 'Active';
			else if (val == 2)
				return 'Past';
		}
		else if (text.length){
			if (text == 'Any')
				return 0;
			else if (text == 'Active')
				return 1;
			else if (text == 'Past')
				return 2;
		}
	}
	else if (filter_name == 'level'){
		if (val > -1){
			if (val == 0)
				return 'Any';
			else if (val == 1)
				return 'Daily';
			else if (val == 2)
				return 'Hourly';
			else if (val == 3)
				return '10-Minutely';
			else if (val == 4)
				return 'Minutely';
		}
		else if (text.length){
			if (text == 'Any')
				return 0;
			else if (text == 'Daily')
				return 1;
			else if (text == 'Hourly')
				return 2;
			else if (text == '10-Minutely')
				return 3;
			else if (text == 'Minutely')
				return 4;
		}
	}
	else if(filter_name == 'sort'){
		if (val > -1){
			if (val == 0)
				return 'Age - new to old';
			else if (val == 1)
				return 'Age - old to new';
			else if (val == 2)
				return 'Power - high to low';
			else if (val == 3)
				return 'Power - low to high';
		}
		else if (text.length){
			if (text == 'Age - new to old')
				return 0;
			else if (text == 'Age - old to new')
				return 1;
			else if (text == 'Power - high to low')
				return 2;
			else if (text == 'Power - low to high')
				return 3;
		}
	}
}

function get_status_filter(){
	status = document.getElementById("status_select").value;
	if (status == 0)
		return 'any';
	else if (status == 1)
		return 'true';
	else // status == 'Past'
		return 'false';
}
function get_level_filter(){
	level = document.getElementById("level_select").value;
	if (level == 0)
		return 'any';
	else if (level == 1)
		return 'daily';
	else if (level == 2)
		return 'hourly';
	else if (level == 3)
		return 'ten_minutely';
	else // level == 'Minutely'
		return 'minutely';
}
function get_age_order(){
	order = document.getElementById("order_select").value;
	if (order == 0)
		return 'descending';
	else if (order == 1)
		return 'ascending';
	else
		return 'any';
}
function get_power_order(){
	order = document.getElementById("order_select").value;
	if (order == 2)
		return 'descending';
	else if (order == 3)
		return 'ascending';
	else
		return 'any';
}

//{appliedFilters: '{"level":"'+get_level_string()+'"}' , pageNum:page_num}
function get_my_rants(){
    $.ajax({
        type: 'POST',
		async: false,
        url: '/api/rants/list',
		data: {appliedFilters: '{"username":"'+get_user_username()+'", "nsfw":"'+logged_user.nsfwPreference+'", "alive":"'+get_status_filter()+'", "level":"'+get_level_filter()+'", "birthDate":"'+get_age_order()+'", "power":"'+get_power_order()+'"}', pageNum:window.history.state.page_num},
        success: function(gotData) {
            rants = $.parseJSON(gotData);
            display_my_rants(rants.firstRantNum , rants.rantsOnPage);
			update_my_rants_navigation(rants.numPages);
			update_my_profile_content_size();
        },
        error: function(name,status) {
            window.document.location.href = "error_page.html";
        }
    });
}

function display_my_rants(first_rant_num , rants){
	var num_my_rants = rants.length;
	for (i=0 ; i<num_my_rants ; i++){
		var rant_ID = create_rant_preview(true , 'my_rants_space' , i , rants[i].owner);
		populate_rant_preview(true , rant_ID , i , first_rant_num , rants[i]);
	}
	//alert($('#my_rants_space').height());
}

function create_my_rants_navigation(){
	$('<table/>',{id:'my_rants_navigation_table'}).appendTo('#user_content_space');
	parent_id = 'my_rants_navigation_row';
	$('<tr/>',{id:parent_id}).appendTo('#my_rants_navigation_table');
	parent_id = '#' + parent_id;
	create_page_navigation(parent_id);
}

function update_my_rants_navigation (num_pages){
	update_navigation('#my_rants_space', num_pages);
}