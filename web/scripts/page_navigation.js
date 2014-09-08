function create_page_navigation(parent , num_pages){
	create_jump_to_begin(parent);
	create_prev(parent);
	create_jump_to_page(parent);
	create_next(parent);
	create_jump_to_end(parent);
}

function create_jump_to_begin(parent){
	$('<td/>',{addClass:'navigation_element' , id:'jump_to_begin'}).appendTo(parent);
	$('<div/>',{addClass:'nav_ele_bound_box' , id:'jump_to_begin_bound_box'}).appendTo('#jump_to_begin');
	$('<img/>',{id:'beginning_arrows' , src:'images/jump_to_begin_arrows.png'}).appendTo('#jump_to_begin_bound_box');
	$('<div/>',{id:'beginning_text'}).appendTo('#jump_to_begin_bound_box');
	$('#beginning_text').text('first');
}

function create_prev(parent){
	$('<td/>',{addClass:'navigation_element' , id:'prev'}).appendTo(parent);
	$('<div/>',{addClass:'nav_ele_bound_box' , id:'prev_bound_box'}).appendTo('#prev');
	$('<img/>',{id:'prev_arrow' , src:'images/prev_arrow.png'}).appendTo('#prev_bound_box');
	$('<div/>',{id:'prev_text'}).appendTo('#prev_bound_box');
	$('#prev_text').text('prev');
}

function create_jump_to_page(parent){
	$('<td/>',{addClass:'navigation_element' , id:'jump_to_page'}).appendTo(parent);
	$('<div/>',{id:'jump_to_page_bound_box'}).appendTo('#jump_to_page');
	$('<input/>',{id:'jump_to_page_input' , maxlength:5}).appendTo('#jump_to_page_bound_box');
	$('#jump_to_page_input').attr('size',8);
	$('<div/>',{id:'jump_to_page_text'}).appendTo('#jump_to_page_bound_box');
	$('#jump_to_page_text').text('jump to');
}

function create_next(parent){
	$('<td/>',{addClass:'navigation_element' , id:'next'}).appendTo(parent);
	$('<div/>',{addClass:'nav_ele_bound_box' , id:'next_bound_box'}).appendTo('#next');
	$('<img/>',{id:'next_arrow' , src:'images/next_arrow.png'}).appendTo('#next_bound_box');
	$('<div/>',{id:'next_text'}).appendTo('#next_bound_box');
	$('#next_text').text('next');
}

function create_jump_to_end(parent){
	$('<td/>',{addClass:'navigation_element' , id:'jump_to_end'}).appendTo(parent);
	$('<div/>',{addClass:'nav_ele_bound_box' , id:'jump_to_end_bound_box'}).appendTo('#jump_to_end');
	$('<img/>',{id:'end_arrows' , src:'images/jump_to_end_arrows.png'}).appendTo('#jump_to_end_bound_box');
	$('<div/>',{id:'end_text'}).appendTo('#jump_to_end_bound_box');
}

function update_navigation(navigated_space , num_pages){
	page_num = get_page_num();
	unbind_navigations();
	$('#jump_to_page_input').attr('placeholder','1-'+num_pages);
	if (num_pages == 1){
		one_page_navigator_display();
	}
	else{
		if (page_num == 1){
			first_page_navigator_display(num_pages , page_num , navigated_space);
		}
		else if (page_num == num_pages){
			last_page_navigator_display(num_pages , page_num , navigated_space);
		}
		else {
			general_page_navigator_display(num_pages , page_num , navigated_space);
		}
	}	
}

function unbind_navigations(){
	$('#jump_to_begin_bound_box').unbind();
	$('#prev_bound_box').unbind();
	$('#next_bound_box').unbind();
	$('#jump_to_end_bound_box').unbind();
}

function one_page_navigator_display(){
	$('#end_text').text('last');
	$('#jump_to_begin_bound_box').attr('class','inactive_nav_ele_bound_box');
	$('#prev_bound_box').attr('class','inactive_nav_ele_bound_box');
	$('#jump_to_page_bound_box').css('opacity','0.3');
	$('#next_bound_box').attr('class','inactive_nav_ele_bound_box');
	$('#jump_to_end_bound_box').attr('class','inactive_nav_ele_bound_box');
}

function first_page_navigator_display(num_pages , page_num , navigated_space){
	$('#jump_to_begin_bound_box').attr('class','inactive_nav_ele_bound_box');

	$('#prev_text').text('prev');
	$('#prev_bound_box').attr('class','inactive_nav_ele_bound_box');
	
	$('#jump_to_page_bound_box').css('opacity','1.0');
	
	$('#next_text').text('next (' + (page_num+1) + ')');
	$('#next_bound_box').attr('class','active_nav_ele_bound_box');
	$('#next_bound_box').click(function(){click_navigation('next' , navigated_space , num_pages);});
	
	$('#end_text').text('last (' + num_pages + ')');
	$('#jump_to_end_bound_box').attr('class','active_nav_ele_bound_box');
	$('#jump_to_end_bound_box').click(function(){click_navigation('end' , navigated_space , num_pages);});
}

function last_page_navigator_display(num_pages, page_num , navigated_space){
	$('#jump_to_begin_bound_box').attr('class','active_nav_ele_bound_box');
	$('#jump_to_begin_bound_box').click(function(){click_navigation('beginning' , navigated_space);});

	$('#prev_text').text('prev (' + (page_num-1) + ')');
	$('#prev_bound_box').attr('class','active_nav_ele_bound_box');
	$('#prev_bound_box').click(function(){click_navigation('prev' , navigated_space);});
	
	$('#jump_to_page_bound_box').css('opacity','1.0');
	
	$('#next_text').text('next');
	$('#next_bound_box').attr('class','inactive_nav_ele_bound_box');
	
	$('#end_text').text('last');
	$('#jump_to_end_bound_box').attr('class','inactive_nav_ele_bound_box');
}

function general_page_navigator_display(num_pages , page_num , navigated_space){
	$('#jump_to_begin_bound_box').attr('class','active_nav_ele_bound_box');
	$('#jump_to_begin_bound_box').click(function(){click_navigation('beginning' , navigated_space);});

	$('#prev_text').text('prev (' + (page_num-1) + ')');
	$('#prev_bound_box').attr('class','active_nav_ele_bound_box');
	$('#prev_bound_box').click(function(){click_navigation('prev' , navigated_space);});
	
	$('#jump_to_page_bound_box').css('opacity','1.0');
	
	$('#next_text').text('next (' + (page_num+1) + ')');
	$('#next_bound_box').attr('class','active_nav_ele_bound_box');
	$('#next_bound_box').click(function(){click_navigation('next' , navigated_space , num_pages);});
	
	$('#end_text').text('last (' + num_pages + ')');
	$('#jump_to_end_bound_box').attr('class','active_nav_ele_bound_box');
	$('#jump_to_end_bound_box').click(function(){click_navigation('end' , navigated_space , num_pages);});
}

function click_navigation(navigator , navigated_space , num_pages){
	current_page = get_page_num();
	desired_page = 1;
	
	if (navigator == 'next'){
		desired_page = current_page + 1;
	}
	else if (navigator == 'prev'){
		desired_page = current_page - 1;
	}
	else if (navigator == 'beginning'){
		desired_page = 1;
	}
	else if (navigator == 'end'){
		desired_page = num_pages;
	}
	else{
		alert("Sorry, that's not a valid navigator");
	}
	
	$(navigated_space).empty();
	if (navigated_space == '#contenders'){
		update_contenders(desired_page);
	}
	else if (navigated_space == '#my_rants_space'){
	}
	history.pushState({page_num:desired_page}, '', '');
}

function get_page_num(){
	return window.history.state.page_num;
}
