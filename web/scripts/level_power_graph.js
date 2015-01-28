function create_level_power_graph(){
	google.load('visualization', '1', {'packages':['controls']});
	$('<div/>',{id:'graph_level_select_space'}).appendTo('body');
	$('<div/>',{id:'level_graph_space'}).appendTo('body');
	create_graph_levels();
	google.setOnLoadCallback(function(){create_power_graph(0)});
}

function create_graph_levels(){
	$('<table/>',{id:'graph_levels_table'}).appendTo('#graph_level_select_space');
	$('<tr/>',{id:'graph_levels_row'}).appendTo('#graph_levels_table');
	add_graph_level('Daily');
	add_graph_level('Hourly');
	add_graph_level('10-Minutely');
	add_graph_level('Minutely');
}

function add_graph_level(level){
	var num_levels = $('#graph_levels_row').children('td').length;
	ID= 'graph_level' + num_levels;
	$('<td/>',{id:ID}).appendTo('#graph_levels_row');
	if (num_levels == 0){
		status_class = 'current_graph_level';
	}
	else{
		status_class = 'other_graph_level';
	}
	$('<div/>',{addClass:status_class + ' graph_level' , id:ID + '_text' , text:level}).appendTo('#' + ID);
	$('#' + ID + '_text').click(function(){graph_level_click(num_levels);});
}

function graph_level_click(level_num){
	if ( $('#graph_level' + level_num + '_text').hasClass('current_graph_level') )
		return;
	$(window).unbind('resize.level_power_graph_resize');
	update_graph_level(level_num);
	create_power_graph(level_num);
}

function update_graph_level(level_num){
	$('.current_graph_level').attr('class','other_graph_level');
	ID = '#graph_level' + level_num + '_text';
	$(ID).attr('class','current_graph_level');
}


function create_power_graph(level){
	$('#level_graph_space').empty();
	if (typeof google.visualization === 'object'){
		$.ajax({
			type: 'POST',
			url: '/api/rants/powers',
			async: false,
			data: {appliedFilters: '{"level":"' + get_level_string(level) + '", "power":"descending"}'},
			success: function(gotData) {
				powers = $.parseJSON(gotData);
				if (powers.length != 0){
					$('<div/>',{id:'power_graph'}).appendTo('#level_graph_space');
					$('<div/>',{id:'graph'}).appendTo('#power_graph');
					$('<div/>',{id:'rank_slider'}).appendTo('#power_graph');
					do_contender_power_graph(powers);
				}
				else{
					no_contender_display('#level_graph_space');
				}
			},
			error: function(name,status) {
				window.document.location.href = "error_page.html";
			}
		});
	}
}

function do_contender_power_graph(powers){
    // Set a callback to run when the Google Visualization API is loaded.
    //google.setOnLoadCallback(drawDashboard);
	  
    // Callback that creates and populates a data table,
    // instantiates a dashboard, a range slider and a column chart,
    // passes in the data and draws it.
    //function drawDashboard() {
	
		// Create the data table.
        var data = new google.visualization.DataTable();
		data = get_contender_data(powers);
		
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
		onload_manager(draw_contender_power_graph);
		
		var resizeTimer;
		$(window).bind('resize.level_power_graph_resize', level_power_graph_resize);
		function level_power_graph_resize(){
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function(){draw_contender_power_graph();}, 250);
		}
    //}
}

function get_contender_data(powers){
	var data = new google.visualization.DataTable();
	data.addColumn('number', 'Rank Range:');
    data.addColumn('number', 'Power');
	
	num_rants = powers.length;
	data.addRows(num_rants);
	
	for (var i=0 ; i<num_rants ; i++){
		data.setValue(i,0,i+1);
		data.setValue(i,1,powers[i]);
	}
	return data;
}