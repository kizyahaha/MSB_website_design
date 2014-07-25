function create_page_navigation(parent){
	var num_pages = 13;
	create_jump_to_begin(parent);
	create_prev(parent);
	create_jump_to_page(parent , num_pages);
	create_next(parent);
	create_jump_to_end(parent , num_pages);
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

function create_jump_to_page(parent , num_pages){
	$('<td/>',{addClass:'navigation_element' , id:'jump_to_page'}).appendTo(parent);
	$('<div/>',{id:'jump_to_page_bound_box'}).appendTo('#jump_to_page');
	$('<input/>',{id:'jump_to_page_input' , maxlength:5 , placeholder:'1-'+num_pages}).appendTo('#jump_to_page_bound_box');
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

function create_jump_to_end(parent , num_pages){
	$('<td/>',{addClass:'navigation_element' , id:'jump_to_end'}).appendTo(parent);
	$('<div/>',{addClass:'nav_ele_bound_box' , id:'jump_to_end_bound_box'}).appendTo('#jump_to_end');
	$('<img/>',{id:'end_arrows' , src:'images/jump_to_end_arrows.png'}).appendTo('#jump_to_end_bound_box');
	$('<div/>',{id:'end_text'}).appendTo('#jump_to_end_bound_box');
	$('#end_text').text('last (' + num_pages + ')');
}