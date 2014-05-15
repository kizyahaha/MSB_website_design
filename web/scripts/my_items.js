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
	return get_curr_num_item(0) + get_curr_num_item(1) + get_curr_num_item(2);
}
function create_defensive_items(){
	create_defense_decoy();
	create_defense_downvote_reduction();
	create_defense_antiscout();
}
function create_defense_decoy(){
	$('<div/>',{addClass:'item_container' , id:'defense_decoy'}).appendTo('#defense_tab_content');
	
	$('<div/>',{addClass:'item_info' , id:'decoy_item_info'}).appendTo('#defense_decoy');
	$('<img/>',{addClass:'item_picture' , id:'defense_decoy_img' , src:'images/defense_decoy_1.png'}).appendTo('#decoy_item_info');
	$('#defense_decoy_img').click(function(){alert(get_item_description(0))});
	$('<img/>',{id:'my_bok_symbol' , src:'images/bok_symbol_1.png'}).appendTo('#decoy_item_info');
	var item_cost = get_item_cost(0);
	$('#decoy_item_info').append(item_cost);
	
	$('<div/>',{addClass:'purchase_info' , id:'decoy_purchase_info'}).appendTo('#defense_decoy');
	$('#decoy_purchase_info').append('Purchase Qty: ');
	$('<input/>',{addClass:'qty' , id:'decoy_qty' , type:'text' , placeholder:'0-99' , max:99 , min:0}).appendTo('#decoy_purchase_info');
	$('#decoy_purchase_info').append(' = ');
	$('<img/>',{id:'my_bok_symbol' , src:'images/bok_symbol_1.png'}).appendTo('#decoy_purchase_info');
	var qty_cost = document.createTextNode('');
	qty_cost.textContent = '0';
	$('#decoy_qty').change(function(){qty_cost.textContent = qty_check('#decoy_qty',item_cost);});
	qty_check('decoy_qty',item_cost)
	$('#decoy_purchase_info').append(qty_cost);
	
	var curr_num_item = get_curr_num_item(0);
	if (curr_num_item > 0){
		$('<div/>',{addClass:'use_info' , id:'decoy_use_info'}).appendTo('#defense_decoy');
		$('<div/>',{addClass:'use_item_button' , id:'decoy_use_button' , text:'USE'}).appendTo('#decoy_use_info');
		$('#decoy_use_info').append(' (' + curr_num_item +')');
	}
	
}
function create_defense_downvote_reduction(){	
	$('<div/>',{addClass:'item_container' , id:'defense_downvote_reduction'}).appendTo('#defense_tab_content');
	
	$('<div/>',{addClass:'item_info' , id:'downvote_reduction_item_info'}).appendTo('#defense_downvote_reduction');
	$('<img/>',{addClass:'item_picture' , id:'defense_downvote_reduction_img' , src:'images/defense_downvote_reduction_1.png'}).appendTo('#downvote_reduction_item_info');
	$('#defense_downvote_reduction_img').click(function(){alert(get_item_description(1))});
	$('<img/>',{id:'my_bok_symbol' , src:'images/bok_symbol_1.png'}).appendTo('#downvote_reduction_item_info');
	var item_cost = get_item_cost(1);
	$('#downvote_reduction_item_info').append(item_cost);
	
	$('<div/>',{addClass:'purchase_info' , id:'downvote_reduction_purchase_info'}).appendTo('#defense_downvote_reduction');
	$('#downvote_reduction_purchase_info').append('Purchase Qty: ');
	$('<input/>',{addClass:'qty' , id:'downvote_reduction_qty' , type:'text' , placeholder:'0-99' , max:99 , min:0}).appendTo('#downvote_reduction_purchase_info');
	$('#downvote_reduction_purchase_info').append(' = ');
	$('<img/>',{id:'my_bok_symbol' , src:'images/bok_symbol_1.png'}).appendTo('#downvote_reduction_purchase_info');
	var qty_cost = document.createTextNode('');
	qty_cost.textContent = '0';
	$('#downvote_reduction_qty').change(function(){qty_cost.textContent = qty_check('#downvote_reduction_qty',item_cost);});
	$('#downvote_reduction_purchase_info').append(qty_cost);
	
	var curr_num_item = get_curr_num_item(1);
	if (curr_num_item > 0){
		$('<div/>',{addClass:'use_info' , id:'downvote_reduction_use_info'}).appendTo('#defense_downvote_reduction');
		$('<div/>',{addClass:'use_item_button' , id:'downvote_reduction_use_button' , text:'USE'}).appendTo('#downvote_reduction_use_info');
		$('#downvote_reduction_use_info').append(' (' + curr_num_item +')');
	}
}
function create_defense_antiscout(){
	$('<div/>',{addClass:'item_container' , id:'defense_antiscout'}).appendTo('#defense_tab_content');
	
	$('<div/>',{addClass:'item_info' , id:'antiscout_item_info'}).appendTo('#defense_antiscout');
	$('<img/>',{addClass:'item_picture' , id:'defense_antiscout_img' , src:'images/defense_antiscout_1.png'}).appendTo('#antiscout_item_info');
	$('#defense_antiscout_img').click(function(){alert(get_item_description(2))});
	$('<img/>',{id:'my_bok_symbol' , src:'images/bok_symbol_1.png'}).appendTo('#antiscout_item_info');
	var item_cost = get_item_cost(2);
	$('#antiscout_item_info').append(item_cost);
	
	$('<div/>',{addClass:'purchase_info' , id:'antiscout_purchase_info'}).appendTo('#defense_antiscout');
	$('#antiscout_purchase_info').append('Purchase Qty: ');
	$('<input/>',{addClass:'qty' , id:'antiscout_qty' , type:'text' , placeholder:'0-99' , max:99 , min:0}).appendTo('#antiscout_purchase_info');
	$('#antiscout_purchase_info').append(' = ');
	$('<img/>',{id:'my_bok_symbol' , src:'images/bok_symbol_1.png'}).appendTo('#antiscout_purchase_info');
	var qty_cost = document.createTextNode('');
	qty_cost.textContent = '0';
	$('#antiscout_qty').change(function(){qty_cost.textContent = qty_check('#antiscout_qty',item_cost);});
	$('#antiscout_purchase_info').append(qty_cost);
	
	var curr_num_item = get_curr_num_item(2);
	if (curr_num_item > 0){
		$('<div/>',{addClass:'use_info' , id:'antiscout_use_info'}).appendTo('#defense_antiscout');
		$('<div/>',{addClass:'use_item_button' , id:'antiscout_use_button' , text:'USE'}).appendTo('#antiscout_use_info');
		$('#antiscout_use_info').append(' (' + curr_num_item +')');
	}
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
			return 300;
			break;
		case 1: //downvote reduction
			return 200;
			break;
		case 2: //anti-scout
			return 100;
			break;
		default:
			break;
	}
}

function get_curr_num_item(num){
	switch (num){
		case 0: //decoy
			return 1;
			break;
		case 1: //downvote reduction
			return 0;
			break;
		case 2: //anti-scout
			return 3;
			break;
		default:
			break;
	}
}

function qty_check(id , item_cost){
	if (isNaN($(id).val())){
		$(id).val(0);
	}
	$(id).val(Math.round($(id).val()));
	if ($(id).val() < 0){
		$(id).val(0);
	}
	else if ($(id).val() > 99){
		$(id).val(99);
	}
	return $(id).val() * item_cost;
}