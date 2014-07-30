var logged_user = get_user(); //logged_user of the currently logged in user
var num_contenders = 100; //temporary variable only because we have no array of contenders yet
var tot_cost_per_item = [0,0,0,0,0,0,0,0,0,0,0];  //how many boks are being spent for each item (quantity desired * price per).  amounts.length = number of special items
var is_owner = true; //temporary until we can actually check for this

function get_user(){
	var user = "";
	$.ajax({
		async: false,
        type: 'POST',
        url: '/api/users/userData',
        //data: {id: 2}, // if you comment this line out, it will just get the currently logged in user
        success: function(gotData) {
            user = $.parseJSON(gotData);
        }
    });
	return user;
}

function log_off_user(){
	/*$.ajax({
		async: false,
		type: 'POST',
		url: '/api/login/logout',
		success: function(msg) {
			logged_user = "";
		    window.document.location.href = 'daily.html';
		}
	});*/
	$.ajax({
		async: false,
        type: 'POST',
        url: '/api/users/userData',
        data: {id: 3}, // if you comment this line out, it will just get the currently logged in user
        success: function(gotData) {
            logged_user = $.parseJSON(gotData);
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