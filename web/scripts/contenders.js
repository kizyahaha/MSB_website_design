
function create_contender_space(){
	var contender_space = document.createElement('div');
	contender_space.id = 'contender_space';
	document.body.appendChild(contender_space);
	create_contender_title();
	create_contenders();
	create_power_graph();
	some_stupid_fucking_bullshit_workaround_for_a_god_damn_chrome_popstate_onload_bug();
	window.addEventListener('popstate', function(event) {
		update_contenders(event.state.page_num)
	});
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
	var contender_title = document.createElement('div');
	contender_title.id = 'contender_title';
	switch(get_level_index()){
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

function create_contenders(){
	var contenders = document.createElement('div');
	contenders.id = 'contenders';
	document.getElementById('contender_space').appendChild(contenders);
	create_contender_navigation();
	if (window.history.state){
		update_contenders(window.history.state.page_num);
		history.replaceState({page_num:window.history.state.page_num}, '', '');
	}
	else{
		update_contenders(1);
		history.replaceState({page_num:1}, '', '');
	}
}

function update_contenders(pageNum){
	$('#contenders').empty();
	get_contenders(pageNum);
}

function get_contenders(page_num){
    $.ajax({
        type: 'POST',
        url: '/api/rants/list',
		data: {appliedFilters: '{"level":"'+get_level_string()+'"}' , pageNum:page_num},
        success: function(gotData) {
            rants = $.parseJSON(gotData);
            display_contenders(rants.firstRantNum , rants.rantsOnPage);
			update_contender_navigation(rants.numPages);
        },
        error: function(name,status) {
            alert(status);
        }
    });
}

function display_contenders(first_rant_num , rants){
	var num_contenders2 = rants.length;
	for (i=0 ; i<num_contenders2 ; i++){
		var contender_ID = create_rant_preview(true , 'contenders' , i , rants[i].owner.id);
		populate_rant_preview(true , contender_ID , i , first_rant_num , rants[i]);
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

function update_contender_navigation (num_pages){
	update_navigation('#contenders', num_pages);
}
