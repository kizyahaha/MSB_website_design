function create_user_tabs(user_tab_num){
	$('<ul/>',{id: 'user_tabs'}).appendTo('body');
	create_my_rants();
	create_my_activity();
	create_my_items();
	update_user_tabs(user_tab_num);
}

function create_my_rants(){
	$('<li/>',{id:'my_rants'}).appendTo('#user_tabs');
	//$('<a/>',{id: 'my_rants_link'}).appendTo('#my_rants');
	$('#my_rants').text('My rants');
	$('#my_rants').click(function(){create_user_tabs(0);});
}

function create_my_activity(){
	$('<li/>',{id:'my_activity'}).appendTo('#user_tabs');
	//$('<a/>',{id: 'my_activity_link'}).appendTo('#my_rants');
	$('#my_activity').text('My activity');
	$('#my_activity').click(function(){create_user_tabs(1);});
}

function create_my_items(){
	$('<li/>',{id:'my_items'}).appendTo('#user_tabs');
	//$('<a/>',{id: 'my_items_link'}).appendTo('#my_rants');
	$('#my_items').text('My items');
	$('#my_items').click(function(){create_user_tabs(2);});
}

function update_user_tabs(user_tab_num){
	$('#my_rants').attr('class','other_tab');
	$('#my_activity').attr('class','other_tab');
	$('#my_items').attr('class','other_tab');
	switch(user_tab_num){
		case 0:
			$('#my_rants').attr('class','current_tab');
			break;
		case 1:
			$('#my_activity').attr('class','current_tab');
			break;
		case 2:
			$('#my_items').attr('class','current_tab');
			break;
		default:
			break;
	}
}