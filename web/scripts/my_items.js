function create_my_items_content(user_id){
	$('<div/>',{id:'my_items_space'}).appendTo('#user_content_space');
	document.getElementById('my_items_space').style.display = 'none';
	
	create_bok_count();
	create_item_category_tabs();
}

function create_bok_count(){
	$('<div/>',{id:'my_boks'}).appendTo('#my_items_space');
	$('<img/>',{id:'my_bok_symbol' , src:'images/bok_symbol_1.png'}).appendTo('#my_boks');
	$('<div/>',{id:'my_bok_count' , text:get_my_bok_count()}).appendTo('#my_boks');
	$('<div/>',{id:'get_more_boks_button' , text:'Get more' , click:get_more_boks}).appendTo('#my_boks');
}

function get_my_bok_count(){
	return '3,458';
}

function get_more_boks(){
	alert("Nice try you son of a bitch.");
}

function create_item_category_tabs(){
	create_defense_tab();
	create_attack_tab();
	create_boost_tab();
}

function create_defense_tab(){
	$('<div/>',{addClass:'closed_my_item_tab' , id:'defense_tab' , text:'Defense '}).appendTo('#my_items_space');
	$('<div/>',{addClass:'num_items' , id:'num_defense_items' , text:'(' + get_num_defense_items() + ')'}).appendTo('#defense_tab');
	$('<div/>',{id:'defense_tab_content'}).appendTo('#my_items_space');
	document.getElementById('defense_tab_content').style.display = 'none';
	$('#defense_tab').click(function(){toggle_visibility('defense_tab_content');});
	create_defensive_items();
}
function get_num_defense_items(){
	return 6;
}
function create_defensive_items(){
	create_defense_decoy();
	create_defense_downvote_reduction();
	create_defense_antiscout();
}
function create_defense_decoy(){
	$('<div/>',{addClass:'item_container' , id:'defense_decoy'}).appendTo('#defense_tab_content');
	$('<img/>',{addClass:'item_picture' , id:'defense_decoy_img' , src:'images/defense_decoy_1.png'}).appendTo('#defense_decoy');
	$('#defense_decoy_img').click(function(){alert(get_item_description(0))});
	$('<img/>',{id:'my_bok_symbol' , src:'images/bok_symbol_1.png'}).appendTo('#defense_decoy');
	$('<div/>',{addClass:'item_cost' , id:'defense_decoy_cost' , text:get_item_cost(0)}).appendTo('#defense_decoy');
	
}
function create_defense_downvote_reduction(){
	$('<div/>',{addClass:'item_container' , id:'defense_downvote_reduction'}).appendTo('#defense_tab_content');
	$('<img/>',{addClass:'item_picture' , id:'defense_downvote_reduction_img' , src:'images/defense_downvote_reduction_1.png'}).appendTo('#defense_downvote_reduction');
	$('#defense_downvote_reduction_img').click(function(){alert(get_item_description(1))});
	$('<img/>',{id:'my_bok_symbol' , src:'images/bok_symbol_1.png'}).appendTo('#defense_downvote_reduction');
	$('<div/>',{addClass:'item_cost' , id:'defense_downvote_reduction_cost' , text:get_item_cost(1)}).appendTo('#defense_downvote_reduction');
}
function create_defense_antiscout(){
	$('<div/>',{addClass:'item_container' , id:'defense_antiscout'}).appendTo('#defense_tab_content');
	$('<img/>',{addClass:'item_picture' , id:'defense_antiscout_img' , src:'images/defense_antiscout_1.png'}).appendTo('#defense_antiscout');
	$('#defense_antiscout_img').click(function(){alert(get_item_description(2))});
	$('<img/>',{id:'my_bok_symbol' , src:'images/bok_symbol_1.png'}).appendTo('#defense_antiscout');
	$('<div/>',{addClass:'item_cost' , id:'defense_antiscout_cost' , text:get_item_cost(2)}).appendTo('#defense_antiscout');
}

function create_attack_tab(){
	$('<div/>',{addClass:'closed_my_item_tab' , id:'attack_tab' , text:'Attack '}).appendTo('#my_items_space');
	$('<div/>',{addClass:'num_items' , id:'num_attack_items' , text:'(' + get_num_attack_items() + ')'}).appendTo('#attack_tab');
	$('<div/>',{id:'attack_tab_content'}).appendTo('#my_items_space');
	document.getElementById('attack_tab_content').style.display = 'none';
	$('#attack_tab').click(function(){toggle_visibility('attack_tab_content');});
}
function get_num_attack_items(){
	return 3;
}

function create_boost_tab(){
	$('<div/>',{addClass:'closed_my_item_tab' , id:'boost_tab' , text:'Boost '}).appendTo('#my_items_space');
	$('<div/>',{addClass:'num_items' , id:'num_boost_items' , text:'(' + get_num_boost_items() + ')'}).appendTo('#boost_tab');
	$('<div/>',{id:'boost_tab_content'}).appendTo('#my_items_space');
	document.getElementById('boost_tab_content').style.display = 'none';
	$('#boost_tab').click(function(){toggle_visibility('boost_tab_content');});
}
function get_num_boost_items(){
	return 8;
}

function toggle_visibility(id){
	var el = document.getElementById(id);
	if (el.style.display == 'none'){
		el.style.display = 'block';
	}
	else{
		el.style.display = 'none';
	}
}

function get_item_description(num){
	switch (num){
		case 0:
			return 'Creates a decoy';
			break;
		case 1:
			return 'Reduces effect of downvotes';
			break;
		case 2:
			return "People can't scout you";
			break;
		default:
			break;
	}
}

function get_item_cost(num){
	switch (num){
		case 0: //decoy
			return 100;
			break;
		case 1: //downvote reduction
			return 100;
			break;
		case 2: //anti-scout
			return 100;
			break;
		default:
			break;
	}
}