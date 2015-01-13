function create_my_items_content(){
	$('<div/>',{id:'my_items_space'}).appendTo('#user_content_space');
	//document.getElementById('my_items_space').style.display = 'none';
	for (var i in tot_cost_per_item){
		tot_cost_per_item[i] = 0;
	}
	Item = Backbone.Model.extend({
		defaults:{
			type:'',
			cost:0,
			img_src:''
		},
        initialize: function(){
            alert("You have some backbone code in 'My items'");
        }
    });
    
    var leech = new Item ({type:'attack', cost:100, img_src:'foo'});

	create_bok_count();
	create_item_category_tabs();
	create_modal_window();
}

function create_bok_count(){
	$('<div/>',{id:'my_boks'}).appendTo('#my_items_space');
	$('<div/>',{id:'my_boks_count'}).appendTo('#my_boks');
	$('<img/>',{id:'my_bok_symbol' , src:'images/bok_symbol_1.png'}).appendTo('#my_boks_count');
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
	update_my_profile_content_size();
}

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
	$('<img/>',{addClass:'item_picture' , id:'defense_decoy_img' , src:get_item_image(0)}).appendTo('#decoy_item_info');
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
										tot_cost_per_item[0] = cost;
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
	$('<img/>',{addClass:'item_picture' , id:'defense_downvote_reduction_img' , src:get_item_image(1)}).appendTo('#downvote_reduction_item_info');
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
										tot_cost_per_item[1] = cost;
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
	$('<img/>',{addClass:'item_picture' , id:'defense_antiscout_img' , src:get_item_image(2)}).appendTo('#antiscout_item_info');
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
										tot_cost_per_item[2] = cost;
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
	
	create_attack_items(attack_tab_total);
}
function get_num_attack_items(){
	return get_curr_num_item(3) + get_curr_num_item(4) + get_curr_num_item(5);
}
function create_attack_items(attack_tab_total){
	create_attack_leach(attack_tab_total);
	create_attack_upvote_reduction(attack_tab_total);
	create_attack_scout(attack_tab_total);
}
function create_attack_leach(attack_tab_total){
	$('<div/>',{addClass:'item_container' , id:'attack_leach'}).appendTo('#attack_tab_content');
	
	$('<div/>',{addClass:'item_info' , id:'leach_item_info'}).appendTo('#attack_leach');
	$('<img/>',{addClass:'item_picture' , id:'attack_leach_img' , src:get_item_image(3)}).appendTo('#leach_item_info');
	$('#attack_leach_img').click(function(){display_modal_content(3)});
	$('<img/>',{id:'my_bok_symbol' , src:'images/bok_symbol_1.png'}).appendTo('#leach_item_info');
	var item_cost = get_item_cost(3);
	$('#leach_item_info').append(item_cost);
	
	$('<div/>',{addClass:'purchase_info' , id:'leach_purchase_info'}).appendTo('#attack_leach');
	$('#leach_purchase_info').append('Purchase Qty: ');
	$('<input/>',{addClass:'qty' , id:'leach_qty' , type:'text' , placeholder:'0-99' , max:99 , min:0}).appendTo('#leach_purchase_info');
	$('#leach_purchase_info').append(' = ');
	$('<img/>',{id:'my_bok_symbol' , src:'images/bok_symbol_1.png'}).appendTo('#leach_purchase_info');
	var qty_cost = document.createTextNode('0');
	$('#leach_qty').change(function(){	var cost = qty_check('#leach_qty',item_cost);
										qty_cost.textContent = cost;
										tot_cost_per_item[3] = cost;
										attack_tab_total.textContent = get_tab_total('attack');
										$('#total_num').text(get_tab_total('all'));
										});
	qty_check('leach_qty',item_cost)
	$('#leach_purchase_info').append(qty_cost);
	
	var curr_num_item = get_curr_num_item(3);
	if (curr_num_item > 0){
		$('<div/>',{addClass:'use_info' , id:'leach_use_info'}).appendTo('#attack_leach');
		$('#leach_use_info').append(' (' + curr_num_item +')');
	}
}
function create_attack_upvote_reduction(attack_tab_total){
	$('<div/>',{addClass:'item_container' , id:'attack_upvote_reduction'}).appendTo('#attack_tab_content');
	
	$('<div/>',{addClass:'item_info' , id:'upvote_reduction_item_info'}).appendTo('#attack_upvote_reduction');
	$('<img/>',{addClass:'item_picture' , id:'attack_upvote_reduction_img' , src:get_item_image(4)}).appendTo('#upvote_reduction_item_info');
	$('#attack_upvote_reduction_img').click(function(){display_modal_content(4)});
	$('<img/>',{id:'my_bok_symbol' , src:'images/bok_symbol_1.png'}).appendTo('#upvote_reduction_item_info');
	var item_cost = get_item_cost(4);
	$('#upvote_reduction_item_info').append(item_cost);
	
	$('<div/>',{addClass:'purchase_info' , id:'upvote_reduction_purchase_info'}).appendTo('#attack_upvote_reduction');
	$('#upvote_reduction_purchase_info').append('Purchase Qty: ');
	$('<input/>',{addClass:'qty' , id:'upvote_reduction_qty' , type:'text' , placeholder:'0-99' , max:99 , min:0}).appendTo('#upvote_reduction_purchase_info');
	$('#upvote_reduction_purchase_info').append(' = ');
	$('<img/>',{id:'my_bok_symbol' , src:'images/bok_symbol_1.png'}).appendTo('#upvote_reduction_purchase_info');
	var qty_cost = document.createTextNode('0');
	$('#upvote_reduction_qty').change(function(){	var cost = qty_check('#upvote_reduction_qty',item_cost);
										qty_cost.textContent = cost;
										tot_cost_per_item[4] = cost;
										attack_tab_total.textContent = get_tab_total('attack');
										$('#total_num').text(get_tab_total('all'));
										});
	qty_check('upvote_reduction_qty',item_cost)
	$('#upvote_reduction_purchase_info').append(qty_cost);
	
	var curr_num_item = get_curr_num_item(4);
	if (curr_num_item > 0){
		$('<div/>',{addClass:'use_info' , id:'upvote_reduction_use_info'}).appendTo('#attack_upvote_reduction');
		$('#upvote_reduction_use_info').append(' (' + curr_num_item +')');
	}
}
function create_attack_scout(attack_tab_total){
	$('<div/>',{addClass:'item_container' , id:'attack_scout'}).appendTo('#attack_tab_content');
	
	$('<div/>',{addClass:'item_info' , id:'scout_item_info'}).appendTo('#attack_scout');
	$('<img/>',{addClass:'item_picture' , id:'attack_scout_img' , src:get_item_image(5)}).appendTo('#scout_item_info');
	$('#attack_scout_img').click(function(){display_modal_content(5)});
	$('<img/>',{id:'my_bok_symbol' , src:'images/bok_symbol_1.png'}).appendTo('#scout_item_info');
	var item_cost = get_item_cost(5);
	$('#scout_item_info').append(item_cost);
	
	$('<div/>',{addClass:'purchase_info' , id:'scout_purchase_info'}).appendTo('#attack_scout');
	$('#scout_purchase_info').append('Purchase Qty: ');
	$('<input/>',{addClass:'qty' , id:'scout_qty' , type:'text' , placeholder:'0-99' , max:99 , min:0}).appendTo('#scout_purchase_info');
	$('#scout_purchase_info').append(' = ');
	$('<img/>',{id:'my_bok_symbol' , src:'images/bok_symbol_1.png'}).appendTo('#scout_purchase_info');
	var qty_cost = document.createTextNode('0');
	$('#scout_qty').change(function(){	var cost = qty_check('#scout_qty',item_cost);
										qty_cost.textContent = cost;
										tot_cost_per_item[5] = cost;
										attack_tab_total.textContent = get_tab_total('attack');
										$('#total_num').text(get_tab_total('all'));
										});
	qty_check('scout_qty',item_cost)
	$('#scout_purchase_info').append(qty_cost);
	
	var curr_num_item = get_curr_num_item(5);
	if (curr_num_item > 0){
		$('<div/>',{addClass:'use_info' , id:'scout_use_info'}).appendTo('#attack_scout');
		$('#scout_use_info').append(' (' + curr_num_item +')');
	}
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
	
	create_boost_items(boost_tab_total);
}
function get_num_boost_items(){
	return get_curr_num_item(6) + get_curr_num_item(7) + get_curr_num_item(8) + get_curr_num_item(9) + get_curr_num_item(10);
}
function create_boost_items(boost_tab_total){
	create_boost_upvote_increase(boost_tab_total);
	create_boost_list_jump(boost_tab_total);
	create_boost_granularity_jump(boost_tab_total);
	create_boost_bok_increase(boost_tab_total);
	create_boost_decay_reduction(boost_tab_total);
}
function create_boost_upvote_increase(boost_tab_total){
	$('<div/>',{addClass:'item_container' , id:'boost_upvote_increase'}).appendTo('#boost_tab_content');
	
	$('<div/>',{addClass:'item_info' , id:'upvote_increase_item_info'}).appendTo('#boost_upvote_increase');
	$('<img/>',{addClass:'item_picture' , id:'boost_upvote_increase_img' , src:get_item_image(6)}).appendTo('#upvote_increase_item_info');
	$('#boost_upvote_increase_img').click(function(){display_modal_content(6)});
	$('<img/>',{id:'my_bok_symbol' , src:'images/bok_symbol_1.png'}).appendTo('#upvote_increase_item_info');
	var item_cost = get_item_cost(6);
	$('#upvote_increase_item_info').append(item_cost);
	
	$('<div/>',{addClass:'purchase_info' , id:'upvote_increase_purchase_info'}).appendTo('#boost_upvote_increase');
	$('#upvote_increase_purchase_info').append('Purchase Qty: ');
	$('<input/>',{addClass:'qty' , id:'upvote_increase_qty' , type:'text' , placeholder:'0-99' , max:99 , min:0}).appendTo('#upvote_increase_purchase_info');
	$('#upvote_increase_purchase_info').append(' = ');
	$('<img/>',{id:'my_bok_symbol' , src:'images/bok_symbol_1.png'}).appendTo('#upvote_increase_purchase_info');
	var qty_cost = document.createTextNode('0');
	$('#upvote_increase_qty').change(function(){	var cost = qty_check('#upvote_increase_qty',item_cost);
										qty_cost.textContent = cost;
										tot_cost_per_item[6] = cost;
										boost_tab_total.textContent = get_tab_total('boost');
										$('#total_num').text(get_tab_total('all'));
										});
	qty_check('upvote_increase_qty',item_cost)
	$('#upvote_increase_purchase_info').append(qty_cost);
	
	var curr_num_item = get_curr_num_item(6);
	if (curr_num_item > 0){
		$('<div/>',{addClass:'use_info' , id:'upvote_increase_use_info'}).appendTo('#boost_upvote_increase');
		$('<div/>',{addClass:'use_item_button' , id:'upvote_increase_use_button' , text:'USE'}).appendTo('#upvote_increase_use_info');
		$('#upvote_increase_use_info').append(' (' + curr_num_item +')');
	}
}
function create_boost_list_jump(boost_tab_total){
	$('<div/>',{addClass:'item_container' , id:'boost_list_jump'}).appendTo('#boost_tab_content');
	
	$('<div/>',{addClass:'item_info' , id:'list_jump_item_info'}).appendTo('#boost_list_jump');
	$('<img/>',{addClass:'item_picture' , id:'boost_list_jump_img' , src:get_item_image(7)}).appendTo('#list_jump_item_info');
	$('#boost_list_jump_img').click(function(){display_modal_content(7)});
	$('<img/>',{id:'my_bok_symbol' , src:'images/bok_symbol_1.png'}).appendTo('#list_jump_item_info');
	var item_cost = get_item_cost(7);
	$('#list_jump_item_info').append(item_cost);
	
	$('<div/>',{addClass:'purchase_info' , id:'list_jump_purchase_info'}).appendTo('#boost_list_jump');
	$('#list_jump_purchase_info').append('Purchase Qty: ');
	$('<input/>',{addClass:'qty' , id:'list_jump_qty' , type:'text' , placeholder:'0-99' , max:99 , min:0}).appendTo('#list_jump_purchase_info');
	$('#list_jump_purchase_info').append(' = ');
	$('<img/>',{id:'my_bok_symbol' , src:'images/bok_symbol_1.png'}).appendTo('#list_jump_purchase_info');
	var qty_cost = document.createTextNode('0');
	$('#list_jump_qty').change(function(){	var cost = qty_check('#list_jump_qty',item_cost);
										qty_cost.textContent = cost;
										tot_cost_per_item[7] = cost;
										boost_tab_total.textContent = get_tab_total('boost');
										$('#total_num').text(get_tab_total('all'));
										});
	qty_check('list_jump_qty',item_cost)
	$('#list_jump_purchase_info').append(qty_cost);
	
	var curr_num_item = get_curr_num_item(7);
	if (curr_num_item > 0){
		$('<div/>',{addClass:'use_info' , id:'list_jump_use_info'}).appendTo('#boost_list_jump');
		$('<div/>',{addClass:'use_item_button' , id:'list_jump_use_button' , text:'USE'}).appendTo('#list_jump_use_info');
		$('#list_jump_use_info').append(' (' + curr_num_item +')');
	}
}
function create_boost_granularity_jump(boost_tab_total){
	$('<div/>',{addClass:'item_container' , id:'boost_granularity_jump'}).appendTo('#boost_tab_content');
	
	$('<div/>',{addClass:'item_info' , id:'granularity_jump_item_info'}).appendTo('#boost_granularity_jump');
	$('<img/>',{addClass:'item_picture' , id:'boost_granularity_jump_img' , src:get_item_image(8)}).appendTo('#granularity_jump_item_info');
	$('#boost_granularity_jump_img').click(function(){display_modal_content(8)});
	$('<img/>',{id:'my_bok_symbol' , src:'images/bok_symbol_1.png'}).appendTo('#granularity_jump_item_info');
	var item_cost = get_item_cost(8);
	$('#granularity_jump_item_info').append(item_cost);
	
	$('<div/>',{addClass:'purchase_info' , id:'granularity_jump_purchase_info'}).appendTo('#boost_granularity_jump');
	$('#granularity_jump_purchase_info').append('Purchase Qty: ');
	$('<input/>',{addClass:'qty' , id:'granularity_jump_qty' , type:'text' , placeholder:'0-99' , max:99 , min:0}).appendTo('#granularity_jump_purchase_info');
	$('#granularity_jump_purchase_info').append(' = ');
	$('<img/>',{id:'my_bok_symbol' , src:'images/bok_symbol_1.png'}).appendTo('#granularity_jump_purchase_info');
	var qty_cost = document.createTextNode('0');
	$('#granularity_jump_qty').change(function(){	var cost = qty_check('#granularity_jump_qty',item_cost);
										qty_cost.textContent = cost;
										tot_cost_per_item[8] = cost;
										boost_tab_total.textContent = get_tab_total('boost');
										$('#total_num').text(get_tab_total('all'));
										});
	qty_check('granularity_jump_qty',item_cost)
	$('#granularity_jump_purchase_info').append(qty_cost);
	
	var curr_num_item = get_curr_num_item(8);
	if (curr_num_item > 0){
		$('<div/>',{addClass:'use_info' , id:'granularity_jump_use_info'}).appendTo('#boost_granularity_jump');
		$('<div/>',{addClass:'use_item_button' , id:'granularity_jump_use_button' , text:'USE'}).appendTo('#granularity_jump_use_info');
		$('#granularity_jump_use_info').append(' (' + curr_num_item +')');
	}
}
function create_boost_bok_increase(boost_tab_total){
	$('<div/>',{addClass:'item_container' , id:'boost_bok_increase'}).appendTo('#boost_tab_content');
	
	$('<div/>',{addClass:'item_info' , id:'bok_increase_item_info'}).appendTo('#boost_bok_increase');
	$('<img/>',{addClass:'item_picture' , id:'boost_bok_increase_img' , src:get_item_image(9)}).appendTo('#bok_increase_item_info');
	$('#boost_bok_increase_img').click(function(){display_modal_content(9)});
	$('<img/>',{id:'my_bok_symbol' , src:'images/bok_symbol_1.png'}).appendTo('#bok_increase_item_info');
	var item_cost = get_item_cost(9);
	$('#bok_increase_item_info').append(item_cost);
	
	$('<div/>',{addClass:'purchase_info' , id:'bok_increase_purchase_info'}).appendTo('#boost_bok_increase');
	$('#bok_increase_purchase_info').append('Purchase Qty: ');
	$('<input/>',{addClass:'qty' , id:'bok_increase_qty' , type:'text' , placeholder:'0-99' , max:99 , min:0}).appendTo('#bok_increase_purchase_info');
	$('#bok_increase_purchase_info').append(' = ');
	$('<img/>',{id:'my_bok_symbol' , src:'images/bok_symbol_1.png'}).appendTo('#bok_increase_purchase_info');
	var qty_cost = document.createTextNode('0');
	$('#bok_increase_qty').change(function(){	var cost = qty_check('#bok_increase_qty',item_cost);
										qty_cost.textContent = cost;
										tot_cost_per_item[9] = cost;
										boost_tab_total.textContent = get_tab_total('boost');
										$('#total_num').text(get_tab_total('all'));
										});
	qty_check('bok_increase_qty',item_cost)
	$('#bok_increase_purchase_info').append(qty_cost);
	
	var curr_num_item = get_curr_num_item(9);
	if (curr_num_item > 0){
		$('<div/>',{addClass:'use_info' , id:'bok_increase_use_info'}).appendTo('#boost_bok_increase');
		$('<div/>',{addClass:'use_item_button' , id:'bok_increase_use_button' , text:'USE'}).appendTo('#bok_increase_use_info');
		$('#bok_increase_use_info').append(' (' + curr_num_item +')');
	}
}
function create_boost_decay_reduction(boost_tab_total){
	$('<div/>',{addClass:'item_container' , id:'boost_decay_reduction'}).appendTo('#boost_tab_content');
	
	$('<div/>',{addClass:'item_info' , id:'decay_reduction_item_info'}).appendTo('#boost_decay_reduction');
	$('<img/>',{addClass:'item_picture' , id:'boost_decay_reduction_img' , src:get_item_image(10)}).appendTo('#decay_reduction_item_info');
	$('#boost_decay_reduction_img').click(function(){display_modal_content(10)});
	$('<img/>',{id:'my_bok_symbol' , src:'images/bok_symbol_1.png'}).appendTo('#decay_reduction_item_info');
	var item_cost = get_item_cost(10);
	$('#decay_reduction_item_info').append(item_cost);
	
	$('<div/>',{addClass:'purchase_info' , id:'decay_reduction_purchase_info'}).appendTo('#boost_decay_reduction');
	$('#decay_reduction_purchase_info').append('Purchase Qty: ');
	$('<input/>',{addClass:'qty' , id:'decay_reduction_qty' , type:'text' , placeholder:'0-99' , max:99 , min:0}).appendTo('#decay_reduction_purchase_info');
	$('#decay_reduction_purchase_info').append(' = ');
	$('<img/>',{id:'my_bok_symbol' , src:'images/bok_symbol_1.png'}).appendTo('#decay_reduction_purchase_info');
	var qty_cost = document.createTextNode('0');
	$('#decay_reduction_qty').change(function(){	var cost = qty_check('#decay_reduction_qty',item_cost);
										qty_cost.textContent = cost;
										tot_cost_per_item[10] = cost;
										boost_tab_total.textContent = get_tab_total('boost');
										$('#total_num').text(get_tab_total('all'));
										});
	qty_check('decay_reduction_qty',item_cost)
	$('#decay_reduction_purchase_info').append(qty_cost);
	
	var curr_num_item = get_curr_num_item(10);
	if (curr_num_item > 0){
		$('<div/>',{addClass:'use_info' , id:'decay_reduction_use_info'}).appendTo('#boost_decay_reduction');
		$('<div/>',{addClass:'use_item_button' , id:'decay_reduction_use_button' , text:'USE'}).appendTo('#decay_reduction_use_info');
		$('#decay_reduction_use_info').append(' (' + curr_num_item +')');
	}
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
	update_my_profile_content_size();
	$('#modal_background').height($(document).height());
}

function get_item_description(num){
	switch (num){
		case 0: //decoy
			return 'Creates a decoy power supply....While this item is active, your rant gains power as usual, but an extra 50% is placed into a reserve '
					+ 'so that any attacks against your rant are drawn from this decoy power supply rather than your own.';
			break;
		case 1: //downvote reduction
			return 'Reduces the effect of down-votes....While this item is active, 50% of the down-votes levied against your rant will have no effect on your power.';
			break;
		case 2: //anti-scout
			return "People can't scout your rant....While this item is active, your rant cannot be scouted, but you will still be notified of "
					+ "individuals attempting to scout it.";
			break;
		case 3: //leach
			return "Leach power gained from another rant....While this item is active, 25% of an enemy rant's power gained will go to your rant";
			break;
		case 4: //upvote reduction
			return 'Reduces the effect of up-votes....While this item is active, 50% of the up-votes given to an enemy rant will have no effect on their power.';
			break;
		case 5: //upvote reduction
			return "Scout an enemy rant....Use this against an enemy rant to get an estimate of its power and any active items.";
			break;
		case 6: //upvote increse
			return "Increases the effect of up-votes....While this item is active, up-votes given to your rant will count as double.";
			break;
		case 7: //list jump
			return "Jump to top of contender list....Increase the likelihood that people will view your rant by using this item to jump to the top of the "
					+ "contender list in your rant's current level.";
			break;
		case 8: //granularity jump
			return "Jump to the next level....Use this item to automatically jump to the next level.  This item is limited to one use per rant.";
			break;
		case 9: //bok increse
			return "Increases your bok production rate....While this item is active, your bok/up-vote ratio will go up by 100%.";
			break;
		case 10: //decay reduction
			return "Decreases decay rate....While this item is active, your rant's natural power decay rate will be reduced by 50%.";
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
		case 3: //leach
			return 300;
			break;
		case 4: //upvote reduction
			return 200;
			break;
		case 5: //scout
			return 100;
			break;
		case 6: //upvote increase
			return 200;
			break;
		case 7: //list jump
			return 400;
			break;
		case 8: //granularity jump
			return 500;
			break;
		case 9: //bok increase
			return 200;
			break;
		case 10: //decay reduction
			return 300;
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
		case 3: //leach
			return 1;
			break;
		case 4: //upvote reduction
			return 2;
			break;
		case 5: //scout
			return 8;
			break;
		case 6: //upvote increase
			return 2;
			break;
		case 7: //list jump
			return 0;
			break;
		case 8: //granularity jump
			return 0;
			break;
		case 9: //bok increase
			return 1;
			break;
		case 10: //decay reduction
			return 1;
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
		return tot_cost_per_item[0] + tot_cost_per_item[1] + tot_cost_per_item[2];
	}
	if (tab == 'attack'){
		return tot_cost_per_item[3] + tot_cost_per_item[4] + tot_cost_per_item[5];
	}
	if (tab == 'boost'){
		return tot_cost_per_item[6] + tot_cost_per_item[7] + tot_cost_per_item[8] + tot_cost_per_item[9] + tot_cost_per_item[10];
	}
	if (tab == 'all'){
		return tot_cost_per_item[0] + tot_cost_per_item[1] + tot_cost_per_item[2] + tot_cost_per_item[3] + tot_cost_per_item[4] + tot_cost_per_item[5] + tot_cost_per_item[6] + tot_cost_per_item[7] + tot_cost_per_item[8] + tot_cost_per_item[9] + tot_cost_per_item[10];
	}
}

function create_modal_window(){
	$('<div/>',{id:'modal_background'}).appendTo('body');
	$('#modal_background').height($(document).height());
	$('<div/>',{addClass:'modal_message' , id:'modal_message'}).appendTo('#modal_background');
}
function display_modal_content(num){
	$('#modal_message').html('');
	$('<img/>',{addClass:'modal_item_picture' , src:get_item_image(num)}).appendTo('#modal_message');
	
	$('<div/>',{text:get_item_name(num)}).appendTo('#modal_message');
	$("#modal_message").append("<br/><br/>");
	$('<div/>',{text:get_item_description(num)}).appendTo('#modal_message');
	$("#modal_message").append("<br/><br/>");
	$('<div/>',{addClass:'modal_close' , id:'modal_close' , text:'CLOSE'}).appendTo('#modal_message');
	$('#modal_close').click(function(){document.getElementById('modal_background').style.display = 'none';});
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
			return 'images/defense_antiscout_2.png';
			break;
		case 3: //leach
			return 'images/attack_leach_power_1.png';
			break;
		case 4: //upvote reduction
			return 'images/attack_upvote_reduction_1.png';
			break;
		case 5: //scout
			return 'images/attack_scout_1.png';
			break;
		case 6: //upvote increase
			return 'images/boost_upvote_increase_1.png';
			break;
		case 7: //list jump
			return 'images/boost_list_jump_1.png';
			break;
		case 8: //granularity jump
			return 'images/boost_granularity_jump_1.png';
			break;
		case 9: //bok increase
			return 'images/boost_bok_increase_1.png';
			break;
		case 10: //decay reduction
			return 'images/boost_decay_reduction_1.png';
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
		case 3: //leach
			return '60-Minute Leach Power';
			break;
		case 4: //upvote reduction
			return '60-Minute Up-Vote Reduction';
			break;
		case 5: //scout
			return 'Scout';
			break;
		case 6: //upvote increase
			return '60-Minute Up-Vote Increase';
			break;
		case 7: //list jump
			return 'Front of the Pack';
			break;
		case 8: //granularity jump
			return 'Level Jump';
			break;
		case 9: //bok increase
			return '60-Minute Bok Incresae';
			break;
		case 10: //decay reduction
			return '60-Minute Decay Rate Reduction';
			break;
		default:
			break;
	}
}
