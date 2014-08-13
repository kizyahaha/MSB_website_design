
function create_contender_space(tab_num){
	var contender_space = document.createElement('div');
	contender_space.id = 'contender_space';
	document.body.appendChild(contender_space);
	create_contender_title();
	create_contenders(tab_num);
	create_contender_navigation();
	create_power_graph(tab_num);
}

function create_contender_title(){
	var contender_title = document.createElement('div');
	contender_title.id = 'contender_title';
	switch(tab_num){
		case 0:
			contender_title.innerText = "Contenders for Tomorrow's Title";
			break;
		case 1:
			contender_title.innerText = "Contenders for the Next 1-Hour Title";
			break;
		case 2:
			contender_title.innerText = "Contenders for the Next 10-Minute Title";
			break;
		case 3:
			contender_title.innerText = "Contenders for the Next 1-Minute Title";
			break;
		default:
			break;
	}
	document.getElementById('contender_space').appendChild(contender_title);
	$('#contender_title').append("<a href='FAQ.html#FAQ9' , style='color:rgb(52,52,52); font-size:14px;'><br/>in no particular order</a>");
}

function create_contenders(tab_num){
	var contenders = document.createElement('div');
	contenders.id = 'contenders';
	document.getElementById('contender_space').appendChild(contenders);
	get_contenders();
}

function get_contenders(){
    $.ajax({
        type: 'POST',
        url: '/api/rants/listAll',
        success: function(gotData) {
            rants = $.parseJSON(gotData);
            display_contenders(rants);
        },
        error: function(name,status) {
            alert(status);
        }
    });
}

function display_contenders(rants){
	var num_contenders2 = rants.length;
	for (i=0 ; i<num_contenders2 ; i++){
		var contender_ID = create_rant_preview(true , 'contenders' , i , rants[i].owner);
		populate_rant_preview(contender_ID , i , rants[i]);
	}
	update_contender_sizes();
}

function update_contender_sizes(){
	setTimeout(function(){$('#contender_space').css('height',$('#contenders').height()+650);}, 250);
	var resizeTimer;
	$(window).resize(function() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function(){$('#contender_space').css('height',$('#contenders').height()+650);}, 250);
	});
}

function create_contender_navigation(){
	$('<table/>',{id:'contender_navigation_table'}).appendTo('#contender_space');
	parent_id = 'contender_navigation_row';
	$('<tr/>',{id:parent_id}).appendTo('#contender_navigation_table');
	parent_id = '#' + parent_id;
	create_page_navigation(parent_id);
}