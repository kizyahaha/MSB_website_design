function create_edit_user_info(){
    $.ajax({
        type: 'POST',
        url: '/api/users/userData',
        success: function(gotData) {
            user_data = $.parseJSON(gotData);
			$('<form/>',{name:'edit_user_info_form' , id:'edit_user_info_form'}).appendTo('body');
			//create_edit_user_info_tabs();
			//create_edit_account_info(user_data);
			create_edit_preferences(user_data);
			create_submit_user_info_button();
			create_footer();
        },
        error: function(name,status) {
            window.document.location.href = "error_page.html";
        }
    });
}

function create_edit_preferences(user_data){
	create_nsfw_preference_select(user_data.nsfwPreference);
}

function create_nsfw_preference_select(current_preference){
	$('<form/>',{id:'nsfw_preference'}).appendTo('#edit_user_info_form');
	$('#nsfw_preference').text('NSFW Preference: ');
	$('<select/>',{id:'nsfw_preference_select'}).appendTo('#nsfw_preference');
	$('#nsfw_preference_select').append('<option>No, thanks.  Do not show me any NSFW content!</option>');
	$('#nsfw_preference_select').append("<option>Warn me about NSFW content.</option>");
	$('#nsfw_preference_select').append('<option>Screw it.  Show me all NSFW content!</option>');
	set_nsfw_current_preference(current_preference);
}

function set_nsfw_current_preference(preference){
	var temp = "No, thanks.  Do not show me any NSFW content!";
	if (preference == 1){
		temp = "Screw it.  Show me all NSFW content!";
	}
	if (preference == 2){
		temp = "Warn me about NSFW content.";
	}
	$('#nsfw_preference_select').val(temp);
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
		data: {nsfwPreference: get_nsfw_preference()},
		success: function(msg) {
			window.document.location.href = "daily.html";
		},
		error: function(msg) {
			window.document.location.href = "error_page.html";
		}
	});
}

function get_nsfw_preference(){
	if ($('#nsfw_preference_select').val == "Screw it.  Show me all NSFW content!"){
		return 1;
	}
	if ($('#nsfw_preference_select').val == "Warn me about NSFW content."){
		return 2;
	}
	return 0;
}