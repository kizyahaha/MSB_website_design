
/*function create_detailed_rant(){
	$('<div/>',{id:'detailed_rant_container'}).appendTo('body');
	$('<div/>',{id:'detailed_rant_space'}).appendTo('#detailed_rant_container');
	if (is_owner){
		$("#detailed_rant_space").css({ "border-width": "20px 20px 20px 20px" });
	}
	else{
		$("#detailed_rant_space").css({ "border-width": "20px 20px 80px 20px" });
	}
	create_detailed_rant_info();
	if (is_owner){
		create_detailed_rant_power_graph();
	}
}*/

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
            data = $.parseJSON(gotData);
			if (data.owner == logged_user.username){
				is_owner = true;
			}
			else{
				is_owner = false;
			}
			if (is_owner){
				$("#detailed_rant_space").css({ "border-width": "20px 20px 20px 20px" });
			}
			else{
				$("#detailed_rant_space").css({ "border-width": "20px 20px 80px 20px" });
			}
			create_detailed_rant_info(data);
			if (is_owner){
				create_detailed_rant_power_graph();
			}
			create_footer();
        },
        error: function(name,status) {
            alert(status);
        }
    });
}

function get_rant_id(){
	var url = window.location.href;
	index = url.indexOf('=') + 1;
	return url.substring(index);
}

function create_detailed_rant_info(rant_data){
	$('<table/>',{id:'detailed_rant_info_table'}).appendTo('#detailed_rant_space');
	$('<tr/>',{id:'detailed_temp_row'}).appendTo('#detailed_rant_info_table');
	if (!is_owner && logged_user.id != 0){
		create_detail_vote_buttons(rant_data.id);
	}
	create_detailed_rant_title(rant_data.title);
	create_detailed_rant_username(rant_data.owner);
	create_detailed_rant_level(rant_data.level);
	if (rant_data.nsfw){
		create_detailed_rant_NSFW(rant_data.nsfw);
	}
	create_detailed_rant_content(rant_data.contents);
}

function create_detailed_rant_NSFW(){
	$('<div/>',{id:'detailed_rant_NSFW' , addClass:'detailed_NSFW'}).appendTo('#detailed_rant_space');
	$('#detailed_rant_NSFW').text('NSFW');
}

function create_detailed_rant_title(title){
	$('<td/>',{id:'detailed_rant_title'}).appendTo('#detailed_temp_row');
	$('#detailed_rant_title').text(title);
}

function create_detailed_rant_username(owner){
	$('<td/>',{id:'detailed_rant_user'}).appendTo('#detailed_temp_row');
	$('<a/>',{id:'detailed_rant_user_link' , addClass:'detailed_username' , href:'user_profile.html'}).appendTo('#detailed_rant_user');
	$('#detailed_rant_user_link').text(owner);
}

function create_detailed_rant_level(level){
	$('<div/>',{id:'detailed_rant_level'}).appendTo('#detailed_rant_space');
	if (is_owner){
		var rank = get_rant_current_rank();
		$('#detailed_rant_level').text('Currently ranked ' + rank + ' in ');
	}
	else{
		$('#detailed_rant_level').text('Currently in ');
	}
	$('<a/>',{id:'detailed_rant_level_link' , href:'/main/' + level}).appendTo('#detailed_rant_level');
	if (level == '10-Minutely'){
		$('#detailed_rant_level_link').attr('href','/main/ten_minutely');
	}
	$('#detailed_rant_level_link').text(level);
}

function get_rant_current_rank(){
	rank = 12;
	if (rank == 11 || rank == 12 || rank == 13){
		rank = rank + 'th';
	}
	else{
		var mod_10 = rank%10;
		switch (mod_10){
			case 1:
				rank = rank + 'st';
				break;
			case 2:
				rank = rank + 'nd';
				break;
			case 3:
				rank = rank + 'rd';
				break;
			default:
				rank = rank + 'th';
				break;
		}
	}
	return rank;
}

function create_detailed_rant_content(contents){
	$('<div/>',{id:'detailed_rant_content'}).appendTo('#detailed_rant_space');
	$('#detailed_rant_content').text(contents);
	update_detailed_rant_sizes();
	window.onload = function(){update_detailed_rant_sizes();};
}

function update_detailed_rant_sizes(){
	if (is_owner){
		$('#detailed_rant_container').css('height',$('#detailed_rant_space').height()+480);
	}
	else{
		$('#detailed_rant_container').css('height',$('#detailed_rant_space').height()+140);
	}
	var resizeTimer;
	$(window).resize(function() {
		clearTimeout(resizeTimer);
		if (is_owner){
			resizeTimer = setTimeout(function(){$('#detailed_rant_container').css('height',$('#detailed_rant_space').height()+480);}, 250);
		}
		else{
			resizeTimer = setTimeout(function(){$('#detailed_rant_container').css('height',$('#detailed_rant_space').height()+140);}, 250);
		}
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
		window.onload = draw_detailed_power_graph();
		
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

function create_detail_vote_buttons(rant_id){
	$('<div/>',{id:'detail_vote_buttons'}).appendTo('#detailed_rant_container');
	var up_button = document.createElement('img');
	up_button.src = 'images/up_button_2.png';
	up_button.alt = 'upvote';
	up_button.width = 40;
	up_button.className = 'detail_up_button';
	var down_button = document.createElement('img');
	down_button.src = 'images/down_button_2.png';
	down_button.alt = 'downvote';
	down_button.width = 40;
	down_button.className = 'detail_down_button';
	
	var detail_vote_buttons = document.getElementById('detail_vote_buttons');
	detail_vote_buttons.appendChild(down_button);
	detail_vote_buttons.appendChild(up_button);
	
	var track_votes = new Array();
	track_votes[0] = $('.detail_up_button');
	track_votes[1] = $('.detail_down_button');
	track_votes[0].click( function(){support_push(track_votes , rant_id);} );
	track_votes[1].click( function(){oppose_push(track_votes , rant_id);} );

}

