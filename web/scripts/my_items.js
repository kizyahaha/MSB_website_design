function create_my_items_content(user_id){
	$('<div/>',{id:'my_items_space'}).appendTo('#user_content_space');
	document.getElementById('my_items_space').style.display = 'none';
	
	create_bok_count();
	create_item_category_tabs();
	create_modal_window();
}

function create_bok_count(){
	$('<div/>',{id:'my_boks'}).appendTo('#my_items_space');
	$('<div/>',{id:'my_boks_count'}).appendTo('#my_boks');
	$('<img/>',{id:'my_bok_symbol' , src:'images/bok_symbol_2.png'}).appendTo('#my_boks_count');
	$('#my_boks_count').append(get_my_bok_count());
	$('<a/>',{id:'get_more_boks_link' , href:'#' , text:'Get more'}).appendTo('#my_boks');
}

function get_my_bok_count(){
	return '3,458';
}

function create_item_category_tabs(){
	create_defense_tab();
	create_attack_tab();
	create_boost_tab();
	create_total_tab();
}
var amounts = [0,0,0];
function create_defense_tab(){
	$('<div/>',{addClass:'my_item_tab' , id:'defense_tab' , text:'Defense '}).appendTo('#my_items_space');
	$('<div/>',{addClass:'num_items' , id:'num_defense_items' , text:'(' + get_num_defense_items() + ')'}).appendTo('#defense_tab');
	$('<div/>',{id:'defense_tab_content'}).appendTo('#my_items_space');
	document.getElementById('defense_tab_content').style.display = 'none';
	$('#defense_tab').click(function(){toggle_visibility('defense_tab_content');});
	
	$('<div/>',{addClass:'tab_total' , id:'defense_tab_total'}).appendTo('#defense_tab');
	$('<img/>',{id:'my_bok_symbol' , src:'images/bok_symbol_3.png'}).appendTo('#defense_tab_total');
	var defense_tab_total = document.createTextNode('0');
	$('#defense_tab_total').append(defense_tab_total);
	
	create_defensive_items(defense_tab_total);
	
}
function get_num_defense_items(){
	return get_curr_num_item(0) + get_curr_num_item(1) + get_curr_num_item(2);
}
function create_defensive_items(defense_tab_total){
	create_defense_decoy(defense_tab_total);
	create_defense_downvote_reduction(defense_tab_total);
	create_defense_antiscout(defense_tab_total);
}
function create_defense_decoy(defense_tab_total){
	$('<div/>',{addClass:'item_container' , id:'defense_decoy'}).appendTo('#defense_tab_content');
	
	$('<div/>',{addClass:'item_info' , id:'decoy_item_info'}).appendTo('#defense_decoy');
	$('<img/>',{addClass:'item_picture' , id:'defense_decoy_img' , src:'images/defense_decoy_1.png'}).appendTo('#decoy_item_info');
	$('#defense_decoy_img').click(function(){display_modal_content(0)});
	$('<img/>',{id:'my_bok_symbol' , src:'images/bok_symbol_1.png'}).appendTo('#decoy_item_info');
	var item_cost = get_item_cost(0);
	$('#decoy_item_info').append(item_cost);
	
	$('<div/>',{addClass:'purchase_info' , id:'decoy_purchase_info'}).appendTo('#defense_decoy');
	$('#decoy_purchase_info').append('Purchase Qty: ');
	$('<input/>',{addClass:'qty' , id:'decoy_qty' , type:'text' , placeholder:'0-99' , max:99 , min:0}).appendTo('#decoy_purchase_info');
	$('#decoy_purchase_info').append(' = ');
	$('<img/>',{id:'my_bok_symbol' , src:'images/bok_symbol_1.png'}).appendTo('#decoy_purchase_info');
	var qty_cost = document.createTextNode('0');
	$('#decoy_qty').change(function(){	var cost = qty_check('#decoy_qty',item_cost);
										qty_cost.textContent = cost;
										amounts[0] = cost;
										defense_tab_total.textContent = get_tab_total('defense');
										$('#total_num').text(get_tab_total('all'));
										});
	qty_check('decoy_qty',item_cost)
	$('#decoy_purchase_info').append(qty_cost);
	
	var curr_num_item = get_curr_num_item(0);
	if (curr_num_item > 0){
		$('<div/>',{addClass:'use_info' , id:'decoy_use_info'}).appendTo('#defense_decoy');
		$('<div/>',{addClass:'use_item_button' , id:'decoy_use_button' , text:'USE'}).appendTo('#decoy_use_info');
		$('#decoy_use_info').append(' (' + curr_num_item +')');
	}
	
}
function create_defense_downvote_reduction(defense_tab_total){	
	$('<div/>',{addClass:'item_container' , id:'defense_downvote_reduction'}).appendTo('#defense_tab_content');
	
	$('<div/>',{addClass:'item_info' , id:'downvote_reduction_item_info'}).appendTo('#defense_downvote_reduction');
	$('<img/>',{addClass:'item_picture' , id:'defense_downvote_reduction_img' , src:'images/defense_downvote_reduction_1.png'}).appendTo('#downvote_reduction_item_info');
	$('#defense_downvote_reduction_img').click(function(){display_modal_content(1)});
	$('<img/>',{id:'my_bok_symbol' , src:'images/bok_symbol_1.png'}).appendTo('#downvote_reduction_item_info');
	var item_cost = get_item_cost(1);
	$('#downvote_reduction_item_info').append(item_cost);
	
	$('<div/>',{addClass:'purchase_info' , id:'downvote_reduction_purchase_info'}).appendTo('#defense_downvote_reduction');
	$('#downvote_reduction_purchase_info').append('Purchase Qty: ');
	$('<input/>',{addClass:'qty' , id:'downvote_reduction_qty' , type:'text' , placeholder:'0-99' , max:99 , min:0}).appendTo('#downvote_reduction_purchase_info');
	$('#downvote_reduction_purchase_info').append(' = ');
	$('<img/>',{id:'my_bok_symbol' , src:'images/bok_symbol_1.png'}).appendTo('#downvote_reduction_purchase_info');
	var qty_cost = document.createTextNode('0');
	$('#downvote_reduction_qty').change(function(){	var cost = qty_check('#downvote_reduction_qty',item_cost);
										qty_cost.textContent = cost;
										amounts[1] = cost;
										defense_tab_total.textContent = get_tab_total('defense');
										$('#total_num').text(get_tab_total('all'));
										});
	$('#downvote_reduction_purchase_info').append(qty_cost);
	
	var curr_num_item = get_curr_num_item(1);
	if (curr_num_item > 0){
		$('<div/>',{addClass:'use_info' , id:'downvote_reduction_use_info'}).appendTo('#defense_downvote_reduction');
		$('<div/>',{addClass:'use_item_button' , id:'downvote_reduction_use_button' , text:'USE'}).appendTo('#downvote_reduction_use_info');
		$('#downvote_reduction_use_info').append(' (' + curr_num_item +')');
	}
}
function create_defense_antiscout(defense_tab_total){
	$('<div/>',{addClass:'item_container' , id:'defense_antiscout'}).appendTo('#defense_tab_content');
	
	$('<div/>',{addClass:'item_info' , id:'antiscout_item_info'}).appendTo('#defense_antiscout');
	$('<img/>',{addClass:'item_picture' , id:'defense_antiscout_img' , src:'images/defense_antiscout_1.png'}).appendTo('#antiscout_item_info');
	$('#defense_antiscout_img').click(function(){display_modal_content(2)});
	$('<img/>',{id:'my_bok_symbol' , src:'images/bok_symbol_1.png'}).appendTo('#antiscout_item_info');
	var item_cost = get_item_cost(2);
	$('#antiscout_item_info').append(item_cost);
	
	$('<div/>',{addClass:'purchase_info' , id:'antiscout_purchase_info'}).appendTo('#defense_antiscout');
	$('#antiscout_purchase_info').append('Purchase Qty: ');
	$('<input/>',{addClass:'qty' , id:'antiscout_qty' , type:'text' , placeholder:'0-99' , max:99 , min:0}).appendTo('#antiscout_purchase_info');
	$('#antiscout_purchase_info').append(' = ');
	$('<img/>',{id:'my_bok_symbol' , src:'images/bok_symbol_1.png'}).appendTo('#antiscout_purchase_info');
	var qty_cost = document.createTextNode('0');
	$('#antiscout_qty').change(function(){	var cost = qty_check('#antiscout_qty',item_cost);
										qty_cost.textContent = cost;
										amounts[2] = cost;
										defense_tab_total.textContent = get_tab_total('defense');
										$('#total_num').text(get_tab_total('all'));
										});
	$('#antiscout_purchase_info').append(qty_cost);
	
	var curr_num_item = get_curr_num_item(2);
	if (curr_num_item > 0){
		$('<div/>',{addClass:'use_info' , id:'antiscout_use_info'}).appendTo('#defense_antiscout');
		$('<div/>',{addClass:'use_item_button' , id:'antiscout_use_button' , text:'USE'}).appendTo('#antiscout_use_info');
		$('#antiscout_use_info').append(' (' + curr_num_item +')');
	}
}

function create_attack_tab(){
	$('<div/>',{addClass:'my_item_tab' , id:'attack_tab' , text:'Attack '}).appendTo('#my_items_space');
	$('<div/>',{addClass:'num_items' , id:'num_attack_items' , text:'(' + get_num_attack_items() + ')'}).appendTo('#attack_tab');
	$('<div/>',{id:'attack_tab_content'}).appendTo('#my_items_space');
	document.getElementById('attack_tab_content').style.display = 'none';
	$('#attack_tab').click(function(){toggle_visibility('attack_tab_content');});
	
	$('<div/>',{addClass:'tab_total' , id:'attack_tab_total'}).appendTo('#attack_tab');
	$('<img/>',{id:'my_bok_symbol' , src:'images/bok_symbol_3.png'}).appendTo('#attack_tab_total');
	var attack_tab_total = document.createTextNode('0');
	$('#attack_tab_total').append(attack_tab_total);
}
function get_num_attack_items(){
	return 3;
}

function create_boost_tab(){
	$('<div/>',{addClass:'my_item_tab' , id:'boost_tab' , text:'Boost '}).appendTo('#my_items_space');
	$('<div/>',{addClass:'num_items' , id:'num_boost_items' , text:'(' + get_num_boost_items() + ')'}).appendTo('#boost_tab');
	$('<div/>',{id:'boost_tab_content'}).appendTo('#my_items_space');
	document.getElementById('boost_tab_content').style.display = 'none';
	$('#boost_tab').click(function(){toggle_visibility('boost_tab_content');});
	
	$('<div/>',{addClass:'tab_total' , id:'boost_tab_total'}).appendTo('#boost_tab');
	$('<img/>',{id:'my_bok_symbol' , src:'images/bok_symbol_3.png'}).appendTo('#boost_tab_total');
	var boost_tab_total = document.createTextNode('0');
	$('#boost_tab_total').append(boost_tab_total);
}
function get_num_boost_items(){
	return 8;
}

function create_total_tab(){
	$('<div/>',{addClass:'purchase_total_tab' , id:'purchase_total_tab' , text:'Total: '}).appendTo('#my_items_space');
	
	$('<div/>',{addClass:'purchase_total' , id:'purchase_total'}).appendTo('#purchase_total_tab');
	$('<img/>',{id:'my_bok_symbol' , src:'images/bok_symbol_3.png'}).appendTo('#purchase_total');
	$('<div/>',{addClass:'total_num' , id:'total_num'}).appendTo('#purchase_total');
	$('#total_num').text(get_tab_total('all'));
	
	$('<div/>',{addClass:'purchase_items_button' , id:'purchase_items_button' , text:'Purchase'}).appendTo('#purchase_total');
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
			return 'Creates a decoy power supply....While this item is active, you gain power as usual, but an extra 50% is placed into a reserve '
					+ 'so that any attacks against you are drawn from this decoy power supply rather than your own.';
			break;
		case 1:
			return 'Reduces effect of down-votes....While this item is active, 50% of the down-votes levied against your rant will have no effect on your power.';
			break;
		case 2:
			return "People can't scout you....While this item is active, your rant cannot be scouted, but you will still be notified of "
					+ "individuals attempting to scout you.";
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

function get_tab_total(tab){
	if (tab == 'defense'){
		return amounts[0] + amounts[1] + amounts[2]
	}
	if (tab == 'all'){
		return amounts[0] + amounts[1] + amounts[2]
	}
}

function create_modal_window(){
	$('<div/>',{id:'modal_background'}).appendTo('body');
	$('#modal_background').height($(document).height());
	$('<div/>',{addClass:'modal_message' , id:'modal_message'}).appendTo('#modal_background');
}
function display_modal_content(num){
	$('#modal_message').html('');
	$('<img/>',{addClass:'item_picture' , src:get_item_image(num)}).appendTo('#modal_message');
	
	$('<div/>',{text:get_item_name(num)}).appendTo('#modal_message');
	$("#modal_message").append("<br/><br/>");
	$('<div/>',{text:get_item_description(num)}).appendTo('#modal_message');
	$("#modal_message").append("<br/><br/>");
	$('<div/>',{addClass:'modal_close' , id:'modal_close' , text:'CLOSE'}).appendTo('#modal_message');
	$('#modal_background').click(function(){document.getElementById('modal_background').style.display = 'none';});
	document.getElementById('modal_background').style.display = 'block';
}

function get_item_image(num){
	switch (num){
		case 0: //decoy
			return 'images/defense_decoy_1.png';
			break;
		case 1: //downvote reduction
			return 'images/defense_downvote_reduction_1.png';
			break;
		case 2: //anti-scout
			return 'images/defense_antiscout_1.png';
			break;
		default:
			break;
	}
}
function get_item_name(num){
	switch (num){
		case 0: //decoy
			return '60-Minute Decoy';
			break;
		case 1: //downvote reduction
			return '60-Minute Down-Vote Reduction';
			break;
		case 2: //anti-scout
			return '60-Minute Anti-Scout';
			break;
		default:
			break;
	}
}
