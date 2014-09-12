function create_power_graph(){
	google.load('visualization', '1', {'packages':['controls']});
	$.ajax({
        type: 'POST',
        url: '/api/rants/list',
		async: false,
		data: {appliedFilters: '{"level":"' + get_level_string() + '", "power":"descending"}' , pageNum:0},
        success: function(gotData) {
            rants = $.parseJSON(gotData);
			$('<div/>',{id:'power_graph'}).appendTo('#contender_space');
			$('<div/>',{id:'graph'}).appendTo('#power_graph');
			$('<div/>',{id:'rank_slider'}).appendTo('#power_graph');
            do_contender_power_graph(rants);
        },
        error: function(name,status) {
            alert(status);
        }
    });
}

function do_contender_power_graph(rants){
    // Set a callback to run when the Google Visualization API is loaded.
    google.setOnLoadCallback(drawDashboard);
	  
    // Callback that creates and populates a data table,
    // instantiates a dashboard, a range slider and a column chart,
    // passes in the data and draws it.
    function drawDashboard() {
		// Create the data table.
        var data = new google.visualization.DataTable();
		data = get_contender_data(rants);
		
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
					   title:'Power Distribution of Contenders',
					   titleTextStyle: {color: 'rgb(52,52,52)' , fontName:'Lato' , italic:false , bold:true},
					   colors:['rgb(52,52,52)'],
					   hAxis:{gridlines:{color:'rgb(12,120,154)' , count:-1} , textStyle:{color: 'white' , fontName:'Lato'} ,
								baselineColor:'none' , format:'0'},
					   vAxis:{title:'Power' , titleTextStyle: {color: 'rgb(52,52,52)' , fontName:'Lato' , italic:false , bold:true} ,
								gridlines:{color:'rgb(52,52,52)' , count:5} , textStyle:{color: 'white' , fontName:'Lato'} , 
								baselineColor:'rgb(52,52,52)'},
					   backgroundColor: 'transparent',
					   fontName: 'Lato',
					   tooltip:{textStyle:{color:'rgb(52,52,52)' , fontName:'Lato'}}
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

function get_contender_data(rants){
	var data = new google.visualization.DataTable();
	data.addColumn('number', 'Rank Range:');
    data.addColumn('number', 'Power');
	
	num_rants = rants.length;
	data.addRows(num_rants);
	
	for (var i=0 ; i<num_rants ; i++){
		data.setValue(i,0,i+1);
		data.setValue(i,1,rants[i].power);
	}
	return data;
}