
// function create_user_preferences_content(){
	// $('<div/>',{id:'user_preferences_space'}).appendTo('#user_info_content_space');
	// var options = [];
	// options = get_preference_options('nsfw');
	// create_preference_select('NSFW', options, 'dropdown');
	// options = get_preference_options('sound');
	// create_preference_select('Sounds', options, 'dropdown');
	// options = get_preference_options('animations');
	// create_preference_select('Animations', options, 'dropdown');
// }

// function get_preference_options(preference_name){
	// var options = [];
	// if (preference_name == 'nsfw'){
		// options[0] = "No, thanks.  Do not show me any NSFW content!";
		// options[1] = "Bring it.  Show me all NSFW content!";
		// options[2] = "Warn me about NSFW content.";
		// return options;
	// }
	// if (preference_name == 'sound'){
		// options[0] = "No, sounds are annoying.  Do not play any sounds.";
		// options[1] = "Yes, sounds enhance the user experience.  Please play sounds.";
		// return options;
	// }
	// if (preference_name == 'animations'){
		// options[0] = "No, animations are annoying too.  Do not show any animations.";
		// options[1] = "Yes, animations enhance the user experience even more and provide useful information.  Please show animations.";
		// return options;
	// }
	// return options;
// }

// function create_preference_select(preference_name, options, select_type){
	// var num = 0;
	// var ID = 'user_preference'+num;
	// while (document.getElementById(ID)){
		// num++;
		// ID = 'user_preference'+num;
	// }
	// $('<div/>',{addClass:'user_preference', id:ID}).appendTo('#user_preferences_space');
	// create_preference_name(preference_name, '#'+ID);
	// create_preference_options(preference_name + '_options', options, select_type, '#'+ID);
// }

// function create_preference_name(name, preference_id){
	// $('<div/>',{addClass:'user_preference_name', text:name}).appendTo(preference_id);
// }

// function create_preference_options(options_holder_id, options, type, preference_id){
	// $('<div/>',{addClass:'user_preference_options', id:options_holder_id}).appendTo(preference_id);
	////Hella broke.  And not really convenient for getting info to the back end.  But would look nicer.
	// /*if (type == 'radio'){
		// $('<form/>',{id:options_holder_id+'_form'}).appendTo('#' + options_holder_id);
		// for (i=0 ; i<options.length ; i++){
			// $('<input/>',{type:'radio', addClass:'user_preference_option', value:options[i]}).appendTo('#'+options_holder_id+'_form');
		// }
	// }*/
	// if (type == 'dropdown'){
		// $('<select/>',{addClass:'user_preference_dropdown', id:options_holder_id+'_dropdown'}).appendTo('#' + options_holder_id);
		// for (i=0 ; i<options.length ; i++){
			// $('#' + options_holder_id + '_dropdown').append('<option value="' + i + '">' + options[i] + '</option>');
		// }
		// set_initial_dropdown_value(options_holder_id);
	// }
// }

// function set_initial_dropdown_value(dropdown_name){
	// if (dropdown_name.toLowerCase().indexOf('nsfw') != -1){
		// $('#' + dropdown_name + '_dropdown').val(logged_user.nsfwPreference);
	// }
	// else if (dropdown_name.toLowerCase().indexOf('sound') != -1){
		// $('#' + dropdown_name + '_dropdown').val(logged_user.soundsPreference);
	// }
	// else if (dropdown_name.toLowerCase().indexOf('animation') != -1){
		// $('#' + dropdown_name + '_dropdown').val(logged_user.animationsPreference);
	// }
// }

// function create_user_preferences_submit_button(){
	// $('<div/>',{id:'submit_preferences_button' , text:'Save preferences'}).appendTo('#user_preferences_space');
	// $('#submit_preferences_button').click(function(){user_preferences_submit();});
	// $(window).keypress(function (e) {
		// var key = e.which;
		// if(key == 13){
			// $('#user_preferences_submit').click();
			// return false;  
		// }
	// });
// }

// function user_preferences_submit(){
	// $.ajax({
		// type: "POST",
		// url: "/api/users/updateUser",
		// data: {nsfwPreference: $('#NSFW_options_dropdown').val(), 
				// soundsPreference:$('#Sounds_options_dropdown').val(), 
				// animationsPreference:$('#Animations_options_dropdown').val()},
		// success: function(msg) {
			// window.document.location.href = "daily.html";
		// },
		// error: function(msg) {
			// window.document.location.href = "error_page.html";
		// }
	// });
// }





function create_user_preferences_content(){
	$('<div/>',{id:'user_preferences_space'}).appendTo('#user_info_content_space');
	var preferences = ['NSFW', 'Sounds', 'Animations'];
	for (var pref in preferences){
		var options = [];
		options = get_preference_options(preferences[pref]);
		create_preference_select(preferences[pref], options);
	}
	set_preference_option_classes();
	$("input:radio").click(function(){set_preference_option_classes();});
}

function get_preference_options(preference_name){
	var options = [];
	if (preference_name == 'NSFW'){
		options[0] = "No, thanks.  Do not show me any NSFW content!";
		options[1] = "Bring it.  Show me all NSFW content!";
		options[2] = "Warn me about NSFW content.";
		return options;
	}
	else if (preference_name == 'Sounds'){
		options[0] = "No, sounds are annoying.  Do not play any sounds.";
		options[1] = "Yes, sounds enhance the user experience.  Please play sounds.";
		return options;
	}
	else if (preference_name == 'Animations'){
		options[0] = "No, animations are annoying too.  Do not show any animations.";
		options[1] = "Yes, animations enhance the user experience even more and provide useful information.  Please show animations.";
		return options;
	}
	return options;
}

function create_preference_select(preference_name, options){
	var ID = 'user_preference_' + preference_name;
	$('<div/>',{addClass:'user_preference', id:ID}).appendTo('#user_preferences_space');
	$('<div/>',{addClass:'user_preference_name', text:preference_name}).appendTo('#'+ID); //create preference name
	create_preference_options(preference_name, options);
}

function create_preference_options(preference_name, options){
	var options_id = preference_name + '_options';
	var parent = '#user_preference_' + preference_name;
	$('<div/>',{addClass:'user_preference_options', id:options_id}).appendTo(parent);
	
	var form_id = options_id+'_form';
	$('<form/>',{id:form_id}).appendTo('#' + options_id);
	for (var i in options){
		$('<input/>', {type:'radio', name:preference_name+'_option', value:i}).appendTo('#'+form_id);
		$('<div/>', {addClass:'preference_options', text:options[i]}).appendTo('#'+form_id);
		$('<br/>').appendTo('#'+form_id);
	}
	set_initial_radio_value(preference_name);
}

function set_initial_radio_value(preference_name){
	form_id = preference_name + '_options_form';
	input_name = preference_name + '_option';
	if (preference_name == 'NSFW'){
		$('input[name=' + input_name + ']', '#'+form_id).val([logged_user.nsfwPreference]);
	}
	else if (preference_name == 'Sounds'){
		$('input[name=' + input_name + ']', '#'+form_id).val([logged_user.soundsPreference]);
	}
	else if (preference_name == 'Animations'){
		$('input[name=' + input_name + ']', '#'+form_id).val([logged_user.animationsPreference]);
	}
}

function set_preference_option_classes(){
	$("input:radio").next('div').removeClass('selected_preference_option');
	$("input:radio:checked").next('div').addClass('selected_preference_option');
}

function create_user_preferences_submit_button(){
	make_sobox_button('submit_preferences_button', '', 'user_preferences_space', 'Save preferences');
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
		data: {nsfwPreference: $('input[name=NSFW_option]:checked', '#NSFW_options_form').val(), 
				soundsPreference:$('input[name=Sounds_option]:checked', '#Sounds_options_form').val(), 
				animationsPreference:$('input[name=Animations_option]:checked', '#Animations_options_form').val()},
		success: function(msg) {
			window.document.location.href = "daily.html";
		},
		error: function(msg) {
			window.document.location.href = "error_page.html";
		}
	});
}