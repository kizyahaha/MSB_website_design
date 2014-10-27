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
	$('#nsfw_preference_select').append('<option value="0">No, thanks.  Do not show me any NSFW content!</option>');
	$('#nsfw_preference_select').append('<option value="2">Warn me about NSFW content.</option>');
	$('#nsfw_preference_select').append('<option value="1">Screw it.  Show me all NSFW content!</option>');
	$('#nsfw_preference_select').val(current_preference);
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
}