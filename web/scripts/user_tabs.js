function create_user_tabs(user_data){
	$('<ul/>',{id: 'user_tabs'}).appendTo('body');
	create_my_rants_tab(user_data);
	if (user_data.id == logged_user.id){
		create_my_activity_tab();
		create_my_items_tab();
	}
}

function create_my_rants_tab(user_data){
	$('<li/>',{id:'my_rants'}).appendTo('#user_tabs');
	if (user_data.id == logged_user.id){
		$('#my_rants').text('My rants');
	}
	else{
		$('#my_rants').text('Their rants');
	}
	$('#my_rants').click(function(){user_tab_click(0);});
}

function create_my_activity_tab(){
	$('<li/>',{id:'my_activity'}).appendTo('#user_tabs');
	$('#my_activity').text('My activity');
	$('#my_activity').click(function(){user_tab_click(1);});
}

function create_my_items_tab(){
	$('<li/>',{id:'my_items'}).appendTo('#user_tabs');
	$('#my_items').text('My items');
	$('#my_items').click(function(){user_tab_click(2);});
}

function update_user_tabs(){
	$('#my_rants').attr('class','other_tab');
	$('#my_activity').attr('class','other_tab');
	$('#my_items').attr('class','other_tab');
	userTabNum = window.history.state.user_tab_num;
	switch(userTabNum){
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

function user_tab_click(userTabNum){
	id = '#my_rants';
	if (userTabNum ==1){
		id = '#my_activity';
	}
	else if (userTabNum == 2){
		id = '#my_items';
	}
	if ( $(id).hasClass('current_tab') )
		return;
	history.pushState({user_tab_num:userTabNum,
						page_num:1,
						user_rants_status:0,
						user_rants_level:0,
						user_rants_sort:0,
						user_activity_cat:0}, '', '')
	update_user_tabs();
	update_user_tab_content();	
}