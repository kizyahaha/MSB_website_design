function create_power_graph(tab_num){
	$('<div/>',{id:'power_graph'}).appendTo('#contender_space');
	$('<div/>',{id:'graph'}).appendTo('#power_graph');
	$('<div/>',{id:'rank_slider'}).appendTo('#power_graph');

	// Load the Visualization API and the piechart package.
    google.load('visualization', '1', {'packages':['controls']});

    // Set a callback to run when the Google Visualization API is loaded.
    google.setOnLoadCallback(drawDashboard);
	  
    // Callback that creates and populates a data table,
    // instantiates a dashboard, a range slider and a column chart,
    // passes in the data and draws it.
    function drawDashboard() {
		// Create the data table.
        var data = new google.visualization.DataTable();
		data = get_contender_data();
		
		// Create a dashboard

		
		// Create a range slider, passing some options
        var rank_slider = new google.visualization.ControlWrapper({
          'controlType': 'NumberRangeFilter',
          'containerId': 'rank_slider',
          'options': {'filterColumnLabel': 'Rank Range:' ,
						ui:{cssClass:'rank_slider'}
					}
        })
		
		// Create a column chart, passing some options
        var chart = new google.visualization.ChartWrapper({
          'chartType': 'ColumnChart',
          'containerId': 'graph',
          'options': {width:$('#power_graph').width(),
                       height:$('#power_graph').height(),
					   legend:'none',
					   colors:['rgb(52,52,52)'],
					   hAxis:{gridlines:{color:'rgb(12,120,154)' , count:-1} , textStyle:{color: 'white' , fontName:'lao ui'} ,
								baselineColor:'none' , format:'0'},
					   vAxis:{title:'Power' , titleTextStyle: {color: 'rgb(52,52,52)' , fontName:'lao ui' , italic:false , bold:true} ,
								gridlines:{color:'rgb(52,52,52)' , count:5} , textStyle:{color: 'white' , fontName:'lao ui'} , 
								baselineColor:'rgb(52,52,52)'},
					   backgroundColor: 'transparent',
					   fontName: 'lao ui',
					   tooltip:{textStyle:{color:'rgb(52,52,52)' , fontName:'lao ui'}}
					   }
        });
		
		// Establish dependencies, declaring that 'rank_slider' drives 'chart',
        // so that the graph will only display entries that are let through
        // given the chosen slider range.
        
		
        // Draw the dashboard.
        
		function draw_contender_power_graph(){
			chart.setOption('width' , $('#power_graph').width());
			var dashboard = new google.visualization.Dashboard(document.getElementById('power_graph'));
			dashboard.bind(rank_slider, chart);
			dashboard.draw(data);
		}
		window.onload = draw_contender_power_graph();
		
		var resizeTimer;
		$(window).resize(function() {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function(){draw_contender_power_graph();}, 250);
		});
    }
}

function get_contender_data(){
	var data = new google.visualization.DataTable();
	data.addColumn('number', 'Rank Range:');
    data.addColumn('number', 'Power');
	data.addRows(num_contenders);
	
	var height = 9437;
	for (var i=0 ; i<num_contenders ; i++){
		data.setValue(i,0,i+1);
		data.setValue(i,1,height);
		height = Math.floor(height*0.9);
	}
	return data;
}




/* Rickshaw
function create_power_graph(tab_num){
	$('<div/>',{id:'power_graph'}).appendTo('#contender_space');
	var data = get_contender_data();

	var power_graph = new Rickshaw.Graph( {
		element: document.querySelector("#power_graph"),
		renderer: 'bar',
		//interpolation: 'step-after',
		width: $('#power_graph').width(),
		height: $('#power_graph').height(),
		padding: {top:0.04, left:0.01, right:0.01},
		series: [ {
			color: 'rgb(52,52,52)',
			data: data
		} ]
	} );
	power_graph.render();
	
	create_x_axis(power_graph);
	create_y_axis(power_graph);
	
	var hover_text = new Rickshaw.Graph.HoverDetail({
		graph:power_graph,
		formatter: function(series,x,y){
			var content = 'Rank: ' + parseInt(x) + '<br>Power: ' + parseInt(y);
			return content;
		}
	});
	
	$(window).on('resize',function(){
		power_graph.configure({
			width: $('#power_graph').width()
		});
		power_graph.render();
	});
}

function get_contender_data(){
	var data = [];
	var height = 9437;
	for (var i=0 ; i<num_contenders ; i++){
		var point = {x:0,y:0};
		point.x = i+1;
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
		ticks:5,
	});
	y_axis.render();
}*/