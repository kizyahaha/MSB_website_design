function create_user_account_info_content(){
	$('<div/>',{id:'user_account_info_space'}).appendTo('#user_info_content_space');
	create_account_email_input();
}

function create_account_email_input(){
	$('<div/>',{addClass:'user_account_info', id:'account_email'}).appendTo('#user_account_info_space');
	$('<div/>',{addClass:'user_account_info_name', text:'Email'}).appendTo('#account_email');
	$('<input/>',{addClass:'user_account_info_input', id:'account_email_input'}).appendTo('#account_email');
	$('#account_email_input').val('This needs to be gotten from back end');
}

function create_user_account_info_submit_button(){
	$('<div/>',{id:'submit_account_info_button' , text:'Save account info'}).appendTo('#user_account_info_space');
	$('#submit_account_info_button').click(function(){user_account_info_submit();});
	$(window).keypress(function (e) {
		var key = e.which;
		if(key == 13){
			$('#user_account_info_submit').click();
			return false;  
		}
	});
}

function user_account_info_submit(){
	/*$.ajax({
		type: "POST",
		url: "/api/users/setPreferences",
		data: {nsfwPreference: $('#NSFW_options_dropdown').val(), 
				soundsPreference:$('#Sounds_options_dropdown').val(), 
				animationsPreference:$('#Animations_options_dropdown').val()},
		success: function(msg) {
			window.document.location.href = "daily.html";
		},
		error: function(msg) {
			window.document.location.href = "error_page.html";
		}
	});*/
}