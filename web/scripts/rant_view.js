
function create_detailed_rant(){
	google.load('visualization', '1', {'packages':['controls']});
    $.ajax({
		async: false,
        type: 'POST',
        url: '/api/rants/rantData',
        data: {id: get_rant_id() },
        success: function(gotData) {
			$('<div/>',{id:'detailed_rant_container'}).appendTo('body');
			$('<div/>',{id:'detailed_rant_space'}).appendTo('#detailed_rant_container');
			$("#detailed_rant_space").css({ "border-width": "20px 20px 20px 20px" });
            data = $.parseJSON(gotData);
			display_detailed_rant(data);
			if (data.owner == logged_user.id){
				create_detailed_rant_power_graph();
			}
			create_footer();
        },
        error: function(name,status) {
            window.document.location.href = "error_page.html";
        }
    });
}

function get_rant_id(){
	var url = window.location.href;
	index = url.indexOf('=') + 1;
	return url.substring(index);
}

function display_detailed_rant(rant_info){
	var detailed_rant_ID = create_rant_preview(false , 'detailed_rant_space' , 0 , rant_info.owner);
	populate_rant_preview(false , detailed_rant_ID , 0 , 1 , rant_info);
	update_detailed_rant_sizes();
}

function update_detailed_rant_sizes(){
	setTimeout(function(){$('#detailed_rant_container').css('height',$('#detailed_rant_space').height()+450);}, 250);
	var resizeTimer;
	$(window).resize(function() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function(){$('#detailed_rant_container').css('height',$('#detailed_rant_space').height()+450);}, 250);
	});
}

function create_detailed_rant_power_graph(){
	$('<div/>',{id:'detailed_power_graph'}).appendTo('#detailed_rant_container');
	$('<div/>',{id:'detailed_graph'}).appendTo('#detailed_power_graph');
	$('<div/>',{id:'detailed_rank_slider'}).appendTo('#detailed_power_graph');

	google.setOnLoadCallback(draw_detailed_dashboard);
    function draw_detailed_dashboard() {
        var detailed_data = new google.visualization.DataTable();
		detailed_data = get_detailed_rant_data();
		
		var detailed_rank_slider = new google.visualization.ControlWrapper({
          'controlType': 'NumberRangeFilter',
          'containerId': 'detailed_rank_slider',
          'options': {'filterColumnLabel': 'Time Range:' ,
						ui:{cssClass:'rank_slider'}
					}
        })
		
		var detailed_chart = new google.visualization.ChartWrapper({
          'chartType': 'AreaChart',
          'containerId': 'detailed_graph',
          'options': {width:$('#detailed_power_graph').width(),
                       height:$('#detailed_power_graph').height(),
					   legend:'none',
					   title:'Power Evolution',
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

		function draw_detailed_power_graph(){
			detailed_chart.setOption('width' , $('#detailed_power_graph').width());
			var dashboard = new google.visualization.Dashboard(document.getElementById('detailed_power_graph'));
			dashboard.bind(detailed_rank_slider, detailed_chart);
			dashboard.draw(detailed_data);
		}
		onload_manager(draw_detailed_power_graph);
		
		var resizeTimer;
		$(window).resize(function() {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function(){draw_detailed_power_graph();}, 250);
		});
    }
}

function get_detailed_rant_data(){
	var data = new google.visualization.DataTable();
	data.addColumn('number', 'Time Range:');
    data.addColumn('number', 'Power');
	data.addColumn({type: 'number', role: 'annotation'});
	data.addColumn({type: 'string', role: 'annotationText'});
	data.addRows(num_contenders);

	var under_9000 = true;
	var annotation_num = 1;
	var height = 200;
	for (var i=0 ; i<num_contenders/4 ; i++){
		data.setValue(i,0,i+1);
		data.setValue(i,1,height);
		height = Math.floor(height*1.09);
	}
	for (var i=num_contenders/4 ; i<num_contenders/2 ; i++){
		data.setValue(i,0,i+1);
		if (i == num_contenders/4){
			height = height + 3000;
			data.setValue(i,2,annotation_num);
			data.setValue(i,3,"You won the 1-minute level!");
			annotation_num++;
		}
		data.setValue(i,1,height);
		if (height > 9000 && under_9000){
			data.setValue(i,2,annotation_num);
			data.setValue(i,3,"It's over 9000!");
			annotation_num++;
			under_9000 = false;
		}
		height = Math.floor(height*1.04);
	}
	for (var i=num_contenders/2 ; i<(3*num_contenders/4) ; i++){
		data.setValue(i,0,i+1);
		data.setValue(i,1,height);
		if (i == num_contenders/2){
			data.setValue(i,2,annotation_num);
			data.setValue(i,3,"Queen_of_Equestria used a 60-min leech attack!");
			annotation_num++;
		}
		height = Math.floor(height*0.96);
	}
	for (var i=(3*num_contenders/4) ; i<num_contenders ; i++){
		data.setValue(i,0,i+1);
		data.setValue(i,1,height);
		if (i == 3*num_contenders/4){
			data.setValue(i,2,annotation_num);
			data.setValue(i,3,"You used a power up of sorts!");
			annotation_num++;
		}
		height = Math.floor(height*1.04);
	}
	return data;
}

