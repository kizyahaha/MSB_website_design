
function create_contender_space(){
	var contender_space = document.createElement('div');
	contender_space.id = 'contender_space';
	document.body.appendChild(contender_space);
	create_contender_title();
	create_contender_sorts();
	create_contenders();
	create_power_graph_link();
	some_stupid_fucking_bullshit_workaround_for_a_god_damn_chrome_popstate_onload_bug();
	window.addEventListener('popstate', function(event) {
		update_contender_sorts(event.state.contender_sort_num);
		update_contenders(event.state.page_num, event.state.contender_sort_num);
	});
}

function create_power_graph_link(){
	$('<div/>',{id:'power_graph_link', text:'Dar be power graphs'}).appendTo('body');
	$('#power_graph_link').click(function(){window.document.location.assign('level_power_graph.html')});
	$('#power_graph_link').css('text-align','center');
	$('#power_graph_link').css('margin-top',50);
	
}

 function some_stupid_fucking_bullshit_workaround_for_a_god_damn_chrome_popstate_onload_bug(){
	// There's nothing to do for older browsers ;)
	if (!window.addEventListener)
		return;
	var blockPopstateEvent = document.readyState!="complete";
	window.addEventListener("load", function() {
		// The timeout ensures that popstate-events will be unblocked right
		// after the load event occured, but not in the same event-loop cycle.
		setTimeout(function(){ blockPopstateEvent = false; }, 0);
	}, false);
	window.addEventListener("popstate", function(evt) {
		if (blockPopstateEvent && document.readyState=="complete") {
			evt.preventDefault();
			evt.stopImmediatePropagation();
		}
	}, false);
}

function create_contender_title(){
	$('<div/>',{id:'contender_title'}).appendTo('#contender_space');
	switch(get_level_index()){
		case 0:
			$('#contender_title').text("Contenders for Tomorrow's Title");
			break;
		case 1:
			$('#contender_title').text("Contenders for the Next 1-Hour Title");
			break;
		case 2:
			$('#contender_title').text("Contenders for the Next 10-Minute Title");
			break;
		case 3:
			$('#contender_title').text("Contenders for the Next 1-Minute Title");
			break;
		default:
			$('#contender_title').text("Something broke");
			break;
	}
}

function create_contender_sorts(){
	$('<table/>',{id:'contender_sorts_table'}).appendTo('#contender_title');
	$('<tr/>',{id:'contender_sorts_row'}).appendTo('#contender_sorts_table');
	$('<td/>',{text:'Sort by...'}).appendTo('#contender_sorts_row');
	add_contender_sort('Power');
	add_contender_sort('Trending');
	add_contender_sort('New');
}

function add_contender_sort(sort){
	var num_sorts = $('#contender_sorts_row').children('td').length;
	ID= 'contender_sort' + num_sorts;
	$('<td/>',{id:ID}).appendTo('#contender_sorts_row');
	if (window.history.state){
		status_class = check_current_status(num_sorts);
	}
	else if (num_sorts == 1){
		status_class = 'current_contender_sort';
	}
	else{
		status_class = 'other_contender_sort';
	}
	$('<div/>',{addClass:status_class + ' contender_sort' , id:ID + '_text' , text:sort}).appendTo('#' + ID);
	$('#' + ID + '_text').click(function(){contender_sort_click(num_sorts);});
}

function check_current_status(num_sorts){
	if (num_sorts == window.history.state.contender_sort_num)
		return 'current_contender_sort';
	else
		return 'other_contender_sort';
}

function contender_sort_click(contenderSortNum){
	if ( $('#contender_sort' + contenderSortNum + '_text').hasClass('current_contender_sort') )
		return;
	history.pushState({page_num:1 , contender_sort_num:contenderSortNum}, '', '');
	update_contender_sorts(contenderSortNum);
	update_contenders(1, contenderSortNum);
}

function update_contender_sorts(contenderSortNum){
	$('.current_contender_sort').attr('class','other_contender_sort');
	ID = '#contender_sort' + contenderSortNum + '_text';
	$(ID).attr('class','current_contender_sort');
}


function create_contenders(){
	var contenders = document.createElement('div');
	contenders.id = 'contenders';
	document.getElementById('contender_space').appendChild(contenders);
	create_contender_navigation();
	if (window.history.state){
		update_contenders(window.history.state.page_num, window.history.state.contender_sort_num);
		history.replaceState({page_num:window.history.state.page_num, contender_sort_num:window.history.state.contender_sort_num}, '', '');
	}
	else{
		update_contenders(1, 1);
		history.replaceState({page_num:1, contender_sort_num:1}, '', '');
	}
}

function update_contenders(pageNum, contenderSortNum){
	$('#contenders').empty();
	get_contenders(pageNum, contenderSortNum);
}

function get_contenders(page_num, contenderSortNum){
	if (contenderSortNum == 1){
		$.ajax({
			type: 'POST',
			url: '/api/rants/list',
			data: {appliedFilters: '{"level":"'+get_level_string(-1)+'", "nsfw":"'+logged_user.nsfwPreference+'", "power":"descending"}' , pageNum:page_num},
			success: function(gotData) {
				rants = $.parseJSON(gotData);
				display_contenders(rants.firstRantNum , rants.rantsOnPage);
				update_contender_navigation(rants.numPages);
				if (rants.rantsOnPage.length == 0){
					no_contender_display('#contenders');
				}
			},
			error: function(name,status) {
				window.document.location.href = "error_page.html";
			}
		});
	}
	else if (contenderSortNum == 2){
		$.ajax({
			type: 'POST',
			url: '/api/rants/list',
			data: {appliedFilters: '{"level":"'+get_level_string(-1)+'", "nsfw":"'+logged_user.nsfwPreference+'"}' , pageNum:page_num},
			success: function(gotData) {
				rants = $.parseJSON(gotData);
				display_contenders(rants.firstRantNum , rants.rantsOnPage);
				update_contender_navigation(rants.numPages);
				if (rants.rantsOnPage.length == 0){
					no_contender_display('#contenders');
				}
			},
			error: function(name,status) {
				window.document.location.href = "error_page.html";
			}
		});
	}
	else if (contenderSortNum == 3){
		$.ajax({
			type: 'POST',
			url: '/api/rants/list',
			data: {appliedFilters: '{"level":"'+get_level_string(-1)+'", "nsfw":"'+logged_user.nsfwPreference+'", "birthDate":"descending"}' , pageNum:page_num},
			success: function(gotData) {
				rants = $.parseJSON(gotData);
				display_contenders(rants.firstRantNum , rants.rantsOnPage);
				update_contender_navigation(rants.numPages);
				if (rants.rantsOnPage.length == 0){
					no_contender_display('#contenders');
				}
			},
			error: function(name,status) {
				window.document.location.href = "error_page.html";
			}
		});
	}
}

function no_contender_display(parent){
	$('<p/>', {id:'no_contender_message'}).appendTo(parent);
	$('#no_contender_message').text("There does not appear to be any contenders for this level at the moment.");
	$('<p/>', {id:'no_contender_protip'}).appendTo(parent);
	$('#no_contender_protip').append("(<span>Psst!</span> Might be a good time to submit a rant.  You'd be practically guaranteed victory!)");
}

function display_contenders(first_rant_num , rants){
	var num_contenders2 = rants.length;
	for (i=0 ; i<num_contenders2 ; i++){
		var contender_ID = create_rant_preview(true , 'contenders' , i , rants[i].owner);
		populate_rant_preview(true , contender_ID , i , first_rant_num , rants[i]);
	}
	//update_contender_sizes();
}

function update_contender_sizes(){
	setTimeout(function(){$('#contender_space').css('height',$('#contenders').height() + 250);}, 250);
	var resizeTimer;
	$(window).resize(function() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function(){$('#contender_space').css('height',$('#contenders').height()+250);}, 250);
	});
}

function create_contender_navigation(){
	$('<table/>',{id:'contender_navigation_table'}).appendTo('#contender_space');
	parent_id = 'contender_navigation_row';
	$('<tr/>',{id:parent_id}).appendTo('#contender_navigation_table');
	parent_id = '#' + parent_id;
	create_page_navigation(parent_id);
}

function update_contender_navigation (num_pages){
	update_navigation('#contenders', num_pages);
}
