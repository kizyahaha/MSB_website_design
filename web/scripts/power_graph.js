function create_power_graph(tab_num){
	$('<div/>',{id:'power_graph'}).appendTo('#contender_space');
	var data = get_contender_data();

	var power_graph = new Rickshaw.Graph( {
		element: document.querySelector("#power_graph"),
		renderer: 'bar',
		width: $('#power_graph').width(),
		height: $('#power_graph').height(),
		series: [ {
			color: 'rgb(52,52,52)',
			data: data
		} ]
	} );
	power_graph.render();
	
	create_x_axis(power_graph);
	create_y_axis(power_graph);
	
	$(window).on('resize',function(){
		power_graph.configure({
			width: $('#power_graph').width()
		});
		power_graph.render();
	});
}

function get_contender_data(){
	var data = [];
	var height = 1000;
	for (var i=0 ; i<num_contenders ; i++){
		var point = {x:0,y:0};
		point.x = i;
		point.y = height;
		height = height*0.9;
		data.push(point);
	}
	return data;
}

function create_x_axis(graph){
	$('<div/>',{id:'x_axis'}).appendTo('#power_graph');
	var x_axis = new Rickshaw.Graph.Axis.X({
		graph: graph,
		element: document.getElementById('x_axis'),
	});
	x_axis.render();
}

function create_y_axis(graph){
	$('<div/>',{id:'y_axis'}).appendTo('#power_graph');
	var y_axis = new Rickshaw.Graph.Axis.Y({
		graph: graph,
		element: document.getElementById('y_axis'),
		ticks:5
	});
	y_axis.render();
}


/*
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
	$('<div/>',{id:'power_bars' , width:'100%' , height:'100%'}).appendTo('#power_graph');
	var graph_width = Math.floor( $('#power_bars').width() );
	var graph_height = Math.floor( $('#power_bars').height() );
	var power_bar_width = Math.floor( graph_width*0.75 / num_contenders );
	var bar_spacing = Math.floor( graph_width*0.25 / (num_contenders+1) );
	var power_bar_height = Math.floor( graph_height*0.9 );
	for (i=0 ; i<num_contenders ; i++){
		var power_bar = document.createElement('div');
		power_bar.className = 'power_bar';
		var rank = i+1;
		power_bar.title = 'rank:' + rank + ', power:' + power_bar_height;
		power_bar.style.width = power_bar_width;
		power_bar.style.height = power_bar_height;
		power_bar_height = Math.floor( power_bar_height * 0.9 );
		power_bar.style.left = bar_spacing*(i+1) + power_bar_width*i;
		document.getElementById('power_bars').appendChild(power_bar);
	}	
}

function resize_power_bars(){
	var graph_width = $('#power_bars').width();
	var power_bar_width = graph_width*0.75 / num_contenders;
	var bar_spacing = graph_width*0.25 / (num_contenders+1);
	var power_bars = new Array();
	var power_bars = document.getElementById('power_bars').children;
	for (i=0 ; i<power_bars.length ; i++){
		power_bars[i].style.width = power_bar_width;
		power_bars[i].style.left = bar_spacing*(i+1) + power_bar_width*i;
	}
}
window.onresize = resize_stuff;
function resize_stuff(){
	update_sizes(); //rant bubble
	resize_detailed_power_graph();
	resize_power_bars();
}*/