
function create_user_preferences_content(){
	$('<div/>',{id:'user_preferences_space'}).appendTo('#user_info_content_space');
	var options = [];
	options = get_preference_options('nsfw');
	create_preference_select('NSFW', options, 'dropdown');
	options = get_preference_options('sound');
	create_preference_select('Sounds', options, 'dropdown');
	options = get_preference_options('animations');
	create_preference_select('Animations', options, 'dropdown');
}

function get_preference_options(preference_name){
	var options = [];
	if (preference_name == 'nsfw'){
		options[0] = "No, thanks.  Do not show me any NSFW content!";
		options[1] = "Bring it.  Show me all NSFW content!";
		options[2] = "Warn me about NSFW content.";
		return options;
	}
	if (preference_name == 'sound'){
		options[0] = "No, sounds are annoying.  Do not play any sounds.";
		options[1] = "Yes, sounds enhance the user experience.  Please play sounds.";
		return options;
	}
	if (preference_name == 'animations'){
		options[0] = "No, animations are annoying too.  Do not show any animations.";
		options[1] = "Yes, animations enhance the user experience even more and provide useful information.  Please show animations.";
		return options;
	}
	return options;
}

function create_preference_select(preference_name, options, select_type){
	var num = 0;
	var ID = 'user_preference'+num;
	while (document.getElementById(ID)){
		num++;
		ID = 'user_preference'+num;
	}
	$('<div/>',{addClass:'user_preference', id:ID}).appendTo('#user_preferences_space');
	create_preference_name(preference_name, '#'+ID);
	create_preference_options(preference_name + '_options', options, select_type, '#'+ID);
}

function create_preference_name(name, preference_id){
	$('<div/>',{addClass:'user_preference_name', text:name}).appendTo(preference_id);
}

function create_preference_options(options_holder_id, options, type, preference_id){
	$('<div/>',{addClass:'user_preference_options', id:options_holder_id}).appendTo(preference_id);
	//Hella broke.  And not really convenient for getting info to the back end.  But would look nicer.
	/*if (type == 'radio'){
		$('<form/>',{id:options_holder_id+'_form'}).appendTo('#' + options_holder_id);
		for (i=0 ; i<options.length ; i++){
			$('<input/>',{type:'radio', addClass:'user_preference_option', value:options[i]}).appendTo('#'+options_holder_id+'_form');
		}
	}*/
	if (type == 'dropdown'){
		$('<select/>',{addClass:'user_preference_dropdown', id:options_holder_id+'_dropdown'}).appendTo('#' + options_holder_id);
		for (i=0 ; i<options.length ; i++){
			$('#' + options_holder_id + '_dropdown').append('<option value="' + i + '">' + options[i] + '</option>');
		}
		set_initial_dropdown_value(options_holder_id);
	}
}

function set_initial_dropdown_value(dropdown_name){
	if (dropdown_name.toLowerCase().indexOf('nsfw') != -1){
		$('#' + dropdown_name + '_dropdown').val(logged_user.nsfwPreference);
	}
	else if (dropdown_name.toLowerCase().indexOf('sound') != -1){
		$('#' + dropdown_name + '_dropdown').val(logged_user.soundsPreference);
	}
	else if (dropdown_name.toLowerCase().indexOf('animation') != -1){
		$('#' + dropdown_name + '_dropdown').val(logged_user.animationsPreference);
	}
}

function create_user_preferences_submit_button(){
	$('<div/>',{id:'submit_preferences_button' , text:'Save preferences'}).appendTo('#user_preferences_space');
	$('#submit_preferences_button').click(function(){user_preferences_submit();});
	$(window).keypress(function (e) {
		var key = e.which;
		if(key == 13){
			$('#user_preferences_submit').click();
			return false;  
		}
	});
}

function user_preferences_submit(){
	$.ajax({
		type: "POST",
		url: "/api/users/updateUser",
		data: {nsfwPreference: $('#NSFW_options_dropdown').val(), 
				soundsPreference:$('#Sounds_options_dropdown').val(), 
				animationsPreference:$('#Animations_options_dropdown').val()},
		success: function(msg) {
			window.document.location.href = "daily.html";
		},
		error: function(msg) {
			window.document.location.href = "error_page.html";
		}
	});
}