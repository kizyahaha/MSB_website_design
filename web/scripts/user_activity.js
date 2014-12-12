function create_my_activity_content(){
	create_my_activity_categories();
	$('<div/>',{id:'my_activity_space'}).appendTo('#user_content_space');
	update_my_activity_space(0);
}

function create_my_activity_categories(){
	$('<table/>',{id:'my_activity_categories_table'}).appendTo('#user_content_space');
	$('<tr/>',{id:'my_activity_categories_row'}).appendTo('#my_activity_categories_table');
	$('<td/>',{id:'items_used_category', addClass:'my_activity_category current'}).appendTo('#my_activity_categories_row');
		$('<div/>',{id:'items_used', addClass:'current_my_category', text:'Items used'}).appendTo('#items_used_category');
	$('<td/>',{id:'rant_milestones_category', addClass:'my_activity_category other'}).appendTo('#my_activity_categories_row');
		$('<div/>',{id:'rant_milestones', addClass:'other_my_category', text:'Rant milestones'}).appendTo('#rant_milestones_category');
	$('<td/>',{id:'transactions_category', addClass:'my_activity_category other'}).appendTo('#my_activity_categories_row');
		$('<div/>',{id:'transactions', addClass:'other_my_category', text:'Transactions'}).appendTo('#transactions_category');
	$('#rant_milestones_category').css({'padding-left':100+'px' , 'padding-right':100+'px'});
	define_category_click_functionality();
}

function define_category_click_functionality(){
	$('#items_used').click(function(){set_category_click_functionality('#items_used' , 0)});
	$('#rant_milestones').click(function(){set_category_click_functionality('#rant_milestones' , 1)});
	$('#transactions').click(function(){set_category_click_functionality('#transactions' , 2)});
}

function set_category_click_functionality(id, cat_num){
	if ( $(id).hasClass('current_my_category') )
		return;
	else {
		set_current_to_other();
		$(id).addClass('current_my_category').removeClass('other_my_category');
		update_my_activity_space(cat_num);
	}
}

function set_current_to_other(){
	$('.current_my_category').addClass('other_my_category').removeClass('current_my_category');
}

function update_my_activity_space(num){
	if (num == 0){
		$('#my_activity_space').text('You used items and people used items against you.');
	}
	else if (num == 1){
		$('#my_activity_space').text('Your rants were born and won and died and stuff.');
	}
	else{
		$('#my_activity_space').text('You spent money and donated items or something.');
	}
}