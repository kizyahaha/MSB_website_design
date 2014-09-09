var logged_user = get_user(); //logged_user of the currently logged in user
var num_contenders = 100; //temporary variable only because we have no array of contenders yet
var tot_cost_per_item = [0,0,0,0,0,0,0,0,0,0,0];  //how many boks are being spent for each item (quantity desired * price per).  amounts.length = number of special items
var is_owner = false; //temporary until we can actually check for this

function get_user(){
	var user = "";
	$.ajax({
		async: false,
        type: 'POST',
        url: '/api/users/userData',
        success: function(data) {
            user = $.parseJSON(data);
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
			window.document.location.href = 'daily.html';
        }
    });
	$.ajax({
		async: false,
		type: 'POST',
		url: '/api/login/logout',
		success: function(msg) {
		    window.document.location.href = 'daily.html';
		}
	});
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

function get_level(){
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
}
