
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
	$('#status_select').append('<option>Any</option>');
	$('#status_select').append('<option>Active</option>');
	$('#status_select').append('<option>Past</option>');
	$('#status_select').change( function(){apply_filters();});
}

function create_level_select(filters){
	$('<form/>',{id:'level_pulldown'}).appendTo('#my_rant_sorts');
	$('#level_pulldown').text('Level: ');
	$('<select/>',{id:'level_select'}).appendTo('#level_pulldown');
	$('#level_select').append('<option>Any</option>');
	$('#level_select').append('<option>Daily</option>');
	$('#level_select').append('<option>Hourly</option>');
	$('#level_select').append('<option>10-Minutely</option>');
	$('#level_select').append('<option>Minutely</option>');
	$('#level_select').change( function(){apply_filters();});
}

function create_order_sort(filters){
	$('<form/>',{id:'order_pulldown'}).appendTo('#my_rant_sorts');
	$('#order_pulldown').text('Sort by: ');
	$('<select/>',{id:'order_select'}).appendTo('#order_pulldown');
	$('#order_select').append('<option>Age - new to old</option>');
	$('#order_select').append('<option>Age - old to new</option>');
	$('#order_select').append('<option>Power - high to low</option>');
	$('#order_select').append('<option>Power - low to high</option>');
	$('#order_select').change( function(){apply_filters();});
}

function apply_filters(){
	$('#my_rants_space').empty();
	history.pushState({user_tab_num:0, page_num:1}, '', '');
	get_my_rants();
}

function get_status_filter(){
	status = document.getElementById("status_select").value;
	if (status == 'Any')
		return 'any';
	else if (status == 'Active')
		return 'true';
	else // status == 'Past'
		return 'false';
}
function get_level_filter(){
	level = document.getElementById("level_select").value;
	if (level == 'Any')
		return 'any';
	else if (level == 'Daily')
		return 'daily';
	else if (level == 'Hourly')
		return 'hourly';
	else if (level == '10-Minutely')
		return 'ten_minutely';
	else // level == 'Minutely'
		return 'minutely';
}
function get_age_order(){
	order = document.getElementById("order_select").value;
	if (order == 'Age - new to old')
		return 'descending';
	else if (order == 'Age - old to new')
		return 'ascending';
	else
		return 'any';
}
function get_power_order(){
	order = document.getElementById("order_select").value;
	if (order == 'Power - high to low')
		return 'descending';
	else if (order == 'Power - low to high')
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
		data: {appliedFilters: '{"username":"'+get_user_username()+'", "alive":"'+get_status_filter()+'", "level":"'+get_level_filter()+'", "birthDate":"'+get_age_order()+'", "power":"'+get_power_order()+'"}', pageNum:window.history.state.page_num},
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
		var rant_ID = create_rant_preview(true , 'my_rants_space' , i , rants[i].owner.id);
		populate_rant_preview(true , rant_ID , i , first_rant_num , rants[i]);
	}
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