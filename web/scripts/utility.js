function get_user(){
	var user = "";
	$.ajax({
		async: false,
        type: 'POST',
        url: '/api/users/userData',
        success: function(data) {
            user = $.parseJSON(data);
        },
		error: function(name,status) {
			window.document.location.href = "error_page.html";
		}
    });
	return user;
}

function log_off_user(){
	$.ajax({
		async: false,
        type: 'POST',
        url: '/api/users/userData',
        data: {id: -1},
        success: function(data) {
            logged_user = $.parseJSON(data);
			//window.document.location.href = 'daily.html';
        },
		error: function(name,status) {
			window.document.location.href = "error_page.html";
		}
    });
	$.ajax({
		async: false,
		type: 'POST',
		url: '/api/login/logout',
		success: function(msg) {
		    //window.document.location.href = 'daily.html';
			$('#banner_log_in_link').text('Log in/Sign up');
			$('#banner_log_in_link').attr('href','javascript:launch_login_modal();');
			$('#banner_log_out_link').text('');
			$('#banner_log_out_link').attr('href','#');
		},
		error: function(name,status) {
			window.document.location.href = "error_page.html";
		}
	});
	//logged_user = get_user();
}

function translate_date(date){
	var month = '';
	switch (date.monthOfYear){
		case 1:
			month = "January";
			break;
		case 2:
			month = "February";
			break;
		case 3:
			month = "March";
			break;
		case 4:
			month = "April";
			break;
		case 5:
			month = "May";
			break;
		case 6:
			month = "June";
			break;
		case 7:
			month = "July";
			break;
		case 8:
			month = "August";
			break;
		case 9:
			month = "September";
			break;
		case 10:
			month = "October";
			break;
		case 11:
			month = "November";
			break;
		case 12:
			month = "December";
			break;
	}
	return month + ' ' + date.dayOfMonth + ', ' + date.year;
}

function get_level_index(){
	//alert(window.location.href);
	url = window.location.href;
	if (url.indexOf("daily") >= 0){
		return 0;
	}
	if (url.indexOf("hourly") >= 0){
		return 1;
	}
	if (url.indexOf("ten_minutely") >= 0){
		return 2;
	}
	if (url.indexOf("minutely") >= 0){
		return 3;
	}
	return 4;
}

function get_level_string(level){
	if (level == -1)
		level = get_level_index();
	if (level == 0)
		return 'Daily';
	else if (level == 1)
		return 'Hourly';
	else if (level == 2)
		return '10-Minutely';
	return 'Minutely';
}

function is_url(text){
	return validator.isURL(text);
}

var mouseX, mouseY;
$(document).mousemove(function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
}).mouseover();


/*function onload_manager(func) {
	//alert(document.body.scrollTop);
    // assign any pre-defined functions on 'window.onload' to a variable
    var current_onload = window.onload;
    // if there is not any function hooked to it
    if (typeof window.onload != 'function') {
        // you can hook your function with it
        window.onload = func();
    } else {     // someone already hooked a function
        window.onload = function () {
			alert('here');
            // call the function hooked already
            current_onload();
            // call your awesome function
            func();
        }
    }
}*/
function onload_manager(func) {
    if (typeof window.onload != 'function') {
        window.onload = func();
    }
	else {
		var cache = window.onload;
        window.onload = function () {
			if(cache){
				cache();
			}
            func();
        }
    }
}

function set_default_state(){
	history.pushState({user_tab_num:0,
							contender_sort_num:1,
							page_num:1,
							user_rants_status:0,
							user_rants_level:0,
							user_rants_sort:0,
							user_activity_cat:0}, '', '');
}

function make_sobox_button(ID, Class, parent, Text){
	if (ID.length) {
		$('<div/>',{id:ID, addClass:'sobox_button', text:Text}).appendTo('#' + parent);
	}
	else if (Class.length) {
		$('<div/>',{addClass:'sobox_button ' + Class, text:Text}).appendTo(parent);
	}
}
