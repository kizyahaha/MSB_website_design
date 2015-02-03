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
			create_user_account_info_content();
			create_user_account_info_submit_button();
			break;
		default:
			break;
	}
}
