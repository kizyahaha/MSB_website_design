
function create_my_rants_content(data){
	$('<div/>',{id:'my_rant_sorts'}).appendTo('#user_content_space');
	$('<div/>',{id:'my_rants_space'}).appendTo('#user_content_space');
	create_rant_filters(data);
}

function create_my_rants_navigation(){
	$('<table/>',{id:'my_rants_navigation_table'}).appendTo('#user_content_space');
	parent_id = 'my_rants_navigation_row';
	$('<tr/>',{id:parent_id}).appendTo('#my_rants_navigation_table');
	parent_id = '#' + parent_id;
	create_page_navigation(parent_id);
}

function get_my_rants(filtered_users_rant_ids){
	var my_rants = document.getElementById('my_rants_space');
	my_rants.innerHTML = '';
	var num_my_rants = filtered_users_rant_ids.length;
	for (i=0 ; i<num_my_rants ; i++){
		$.ajax({
			async: false,
			type: 'POST',
			url: '/api/rants/rantData',
			data: {id: filtered_users_rant_ids[i]},
			success: function(gotData) {
				rant_data = $.parseJSON(gotData);
				var rant_ID = create_rant_preview(true , 'my_rants_space' , i , rant_data.owner.id);
				populate_rant_preview(true , rant_ID , i , rant_data);
			},
			error: function(name,status) {
				alert(status);
			}
		});
		//var rant_ID = create_rant_preview(true , 'my_rants_space' , i , data[i].owner.id);
		//populate_rant_preview(true , rant_ID , i , data[i]);
	}
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
	var filtered_data = data.rantIds.slice(0); //make a copy of rantIds array
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
		for (i=0 ; i<num_my_rants ; i++){
			if (filtered_data[i].level != 'Daily'){
				filtered_data.splice(i,1);
				i--;
				num_my_rants--;
			}
		}
	}
	if (filters[1] == 'Hourly'){
		for (i=0 ; i<num_my_rants ; i++){
			if (filtered_data[i].level != 'Hourly'){
				filtered_data.splice(i,1);
				i--;
				num_my_rants--;
			}
		}
	}
	if (filters[1] == '10-Minutely'){
		for (i=0 ; i<num_my_rants ; i++){
			if (filtered_data[i].level != '10-Minutely'){
				filtered_data.splice(i,1);
				i--;
				num_my_rants--;
			}
		}
	}
	if (filters[1] == 'Minutely'){
		for (i=0 ; i<num_my_rants ; i++){
			if (filtered_data[i].level != 'Minutely'){
				filtered_data.splice(i,1);
				i--;
				num_my_rants--;
			}
		}
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