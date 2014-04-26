
function create_power_graph(tab_num){
	var power_graph = document.createElement('div');
	power_graph.id = 'power_graph';
	document.getElementById('contender_space').appendChild(power_graph);
}

function update_power_graph(tab_num){
	create_axis_labels();
	get_power_scale(tab_num);
	get_powers(tab_num);
}

function create_axis_labels(){
	var y_label = document.createElement('div');
	y_label.id = 'y_label';
	y_label.textContent = 'Power';
	var x_label = document.createElement('div');
	x_label.id = 'x_label';
	x_label.textContent = 'Rank';
	document.getElementById('power_graph').appendChild(y_label);
	document.getElementById('power_graph').appendChild(x_label);
}

function get_power_scale(tab_num){
	var max_power = document.createElement('div');
	max_power.id = 'max_power';
	max_power.textContent = '(max)';
	var min_power = document.createElement('div');
	min_power.id = 'min_power';
	min_power.textContent = '(min)';
	document.getElementById('power_graph').appendChild(max_power);
	document.getElementById('power_graph').appendChild(min_power);
}

function get_powers(tab_num){
}



/*
<div id="power_graph">
	<div id="y_label">Power</div>
	<div id="x_label">Rank</div>
	<div id="max-power">10,000</div>
	<div id="min-power">6,500</div>
	<div class="power" id="power_1"></div>
	<div class="power" id="power_2"></div>
	<div class="power" id="power_3"></div>
	<div class="power" id="power_4"></div>
	<div class="power" id="power_5"></div>
	<div class="power" id="power_6"></div>
	<div class="rank" id="rank_1">1</div>
	<div class="rank" id="rank_2">2</div>
	<div class="rank" id="rank_3">3</div>
	<div class="rank" id="rank_4">4</div>
	<div class="rank" id="rank_5">5</div>
	<div class="rank" id="rank_6">6</div>
</div>
*/