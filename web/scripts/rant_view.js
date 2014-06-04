
function create_detailed_rant(){
	$('<div/>',{id:'detailed_rant_container'}).appendTo('body');
	$('<div/>',{id:'detailed_rant_space'}).appendTo('#detailed_rant_container');
	create_detailed_rant_info();
	if (is_owner()){
		create_detailed_rant_power_graph();
	}
}

function is_owner(){
	return true;
}

function create_detailed_rant_info(){
	$('<table/>',{id:'detailed_rant_info_table'}).appendTo('#detailed_rant_space');
	$('<tr/>',{id:'detailed_temp_row'}).appendTo('#detailed_rant_info_table');
	create_detailed_rant_title();
	create_detailed_rant_username();
	create_detailed_rant_level();
	//create_detailed_rant_NSFW();
	create_detailed_rant_content();
}

function create_detailed_rant_NSFW(){
	$('<div/>',{id:'detailed_rant_NSFW' , addClass:'detailed_NSFW'}).appendTo('#detailed_rant_space');
	$('#detailed_rant_NSFW').text('NSFW');
}

function create_detailed_rant_title(){
	$('<td/>',{id:'detailed_rant_title'}).appendTo('#detailed_temp_row');
	$('#detailed_rant_title').text('This is the title of this rant - ');
}

function create_detailed_rant_username(){
	$('<td/>',{id:'detailed_rant_user'}).appendTo('#detailed_temp_row');
	$('<a/>',{id:'detailed_rant_user_link' , addClass:'detailed_username' , href:'user_profile.html'}).appendTo('#detailed_rant_user');
	$('#detailed_rant_user_link').text('Queen_of_Equestria');
}

function create_detailed_rant_level(){
	$('<div/>',{id:'detailed_rant_level'}).appendTo('#detailed_rant_space');
	$('#detailed_rant_level').text('Currently in ');
	$('<a/>',{id:'detailed_rant_level_link' , href:'/main/hourly'}).appendTo('#detailed_rant_level');
	$('#detailed_rant_level_link').text('Hourly');
}

function create_detailed_rant_content(){
	$('<div/>',{id:'detailed_rant_content'}).appendTo('#detailed_rant_space');
	$('#detailed_rant_content').text('Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.  Queen of Equestria?  More like Queer of E-queer-stria.');
}

function create_detailed_rant_power_graph(){
	$('<div/>',{id:'detailed_power_graph'}).appendTo('#detailed_rant_container');

    google.load('visualization', '1', {packages: ['corechart']});
	google.setOnLoadCallback(draw_detailed_power_graph);
    function draw_detailed_power_graph() {
        var data = new google.visualization.DataTable();
		data = get_detailed_rant_data();

        var options = {width:$('#detailed_power_graph').width(),
                       height:$('#detailed_power_graph').height(),
					   legend:'none',
					   colors:['rgb(52,52,52)'],
					   areaOpacity:0.4,
					   hAxis:{title:'Time' , titleTextStyle: {color: 'rgb(52,52,52)' , fontName:'lao ui' , italic:false , bold:true} ,
								gridlines:{color:'rgb(52,160,194)' , count:-1} , textStyle:{color: 'white' , fontName:'lao ui'} ,
								baselineColor:'none' , format:'0'},
					   vAxis:{title:'Power' , titleTextStyle: {color: 'rgb(52,52,52)' , fontName:'lao ui' , italic:false , bold:true} ,
								gridlines:{color:'rgb(52,52,52)' , count:5} , textStyle:{color: 'white' , fontName:'lao ui'} , 
								baselineColor:'rgb(52,52,52)'}, 
					   backgroundColor: 'transparent',
					   fontName: 'lao ui',
					   tooltip:{textStyle:{color:'rgb(52,52,52)' , fontName:'lao ui'}}
					   }

        var chart = new google.visualization.AreaChart(document.getElementById('detailed_power_graph'));
		chart.draw(data, options);
    }
}

function get_detailed_rant_data(){
	var data = new google.visualization.DataTable();
	data.addColumn('number', 'Time');
    data.addColumn('number', 'Power');
	data.addColumn({type: 'number', role: 'annotation'});
	data.addColumn({type: 'string', role: 'annotationText'});
	data.addRows(num_contenders);

	var under_9000 = true;
	var annotation_num = 1;
	var height = 200;
	for (var i=0 ; i<num_contenders/2 ; i++){
		data.setValue(i,0,i+1);
		data.setValue(i,1,height);
		if (height > 9000 && under_9000){
			data.setValue(i,2,annotation_num);
			data.setValue(i,3,"It's over 9000!");
			annotation_num++;
			under_9000 = false;
		}
		height = Math.floor(height*1.09);
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