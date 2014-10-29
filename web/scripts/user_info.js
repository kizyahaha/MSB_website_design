function create_edit_user_info(){
    $.ajax({
        type: 'POST',
        url: '/api/users/userData',
        success: function(gotData) {
            logged_user = $.parseJSON(gotData);
			$('<form/>',{name:'edit_user_info_form' , id:'edit_user_info_form'}).appendTo('body');
			create_user_info_tabs();
			update_user_info_tabs(0);
			create_user_info_tab_content_space();
			update_user_info_tab_content(0);
			//create_submit_user_info_button();
			create_footer();
        },
        error: function(name,status) {
            window.document.location.href = "error_page.html";
        }
    });
}

function create_user_info_tabs(){
	$('<ul/>',{id: 'user_info_tabs'}).appendTo('body');
	create_preferences_tab();
	create_account_info_tab();
}

function create_preferences_tab(){
	$('<li/>',{id:'user_preferences_tab'}).appendTo('#user_info_tabs');
	$('#user_preferences_tab').text('Preferences');
	$('#user_preferences_tab').click(function(){user_info_tab_click(0);});
}

function create_account_info_tab(){
	$('<li/>',{id:'user_account_info_tab'}).appendTo('#user_info_tabs');
	$('#user_account_info_tab').text('Account info');
	$('#user_account_info_tab').click(function(){user_info_tab_click(1);});
}

function user_info_tab_click(user_info_tab_num){
	update_user_info_tabs(user_info_tab_num);
	update_user_info_tab_content(user_info_tab_num);	
}

function update_user_info_tabs(user_info_tab_num){
	$('#user_preferences_tab').attr('class','other_tab');
	$('#user_account_info_tab').attr('class','other_tab');
	switch(user_info_tab_num){
		case 0:
			$('#user_preferences_tab').attr('class','current_tab');
			break;
		case 1:
			$('#user_account_info_tab').attr('class','current_tab');
			break;
		default:
			break;
	}
}

function create_user_info_tab_content_space(){
	$('<div/>',{id:'user_info_content_space'}).appendTo('body');
}

function update_user_info_tab_content(user_info_tab_num){
	$('#user_info_content_space').empty();
	switch (user_info_tab_num){
		case 0:
			create_user_preferences_content();
			create_user_preferences_submit_button();
			break;
		case 1:
			//create_user_account_info_content();
			//create_user_account_info_submit_button();
			break;
		default:
			break;
	}
	update_user_info_content_size();
}

function update_user_info_content_size(){
	/*var user_preferences = document.getElementById('user_preferences_space');
	if (user_preferences){
		$('#my_rants_space').css('minHeight', 100 );
		$('#my_rants_space').css('maxHeight', 1050 );
		$('#user_content_space').css('height',$('#my_rants_space').height() + 170);
	}
	var user_account_info = document.getElementById('user_account_info_space');
	if (my_items){
		var item_height = 370;
		var defense = document.getElementById('defense_tab_content');
		if (defense.style.display == 'block'){
			item_height = item_height + 270;
		}
		var attack = document.getElementById('attack_tab_content');
		if (attack.style.display == 'block'){
			item_height = item_height + 270;
		}
		var boost = document.getElementById('boost_tab_content');
		if (boost.style.display == 'block'){
			item_height = item_height + 450;
		}
		$('#my_items_space').height( item_height );
		$('#user_content_space').height( item_height + 0);
	}*/
}

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

function create_user_account_info_content(){
}

/*function create_nsfw_preference_select(){
	$('<form/>',{id:'nsfw_preference'}).appendTo('#edit_user_info_form');
	$('#nsfw_preference').text('NSFW Preference: ');
	$('<select/>',{id:'nsfw_preference_select'}).appendTo('#nsfw_preference');
	$('#nsfw_preference_select').append('<option value="0">No, thanks.  Do not show me any NSFW content!</option>');
	$('#nsfw_preference_select').append('<option value="2">Warn me about NSFW content.</option>');
	$('#nsfw_preference_select').append('<option value="1">Screw it.  Show me all NSFW content!</option>');
	$('#nsfw_preference_select').val(logged_user.nsfwPreference);
}

function create_submit_user_info_button(){
	$('<input/>',{id:'submit_user_info_button' , type:'button' , value:'Save'}).appendTo('#edit_user_info_form');
	$('#submit_user_info_button').click( function(){user_info_submit(this.form);} );
	$(window).keypress(function (e) {
		var key = e.which;
		if(key == 13){
			$('#submit_user_info_button').click();
			return false;  
		}
	});
}

function user_info_submit(form){
	$.ajax({
		type: "POST",
		url: "/api/users/setPreferences",
		data: {nsfwPreference: $('#nsfw_preference_select').val()},
		success: function(msg) {
			window.document.location.href = "daily.html";
		},
		error: function(msg) {
			window.document.location.href = "error_page.html";
		}
	});
}*/