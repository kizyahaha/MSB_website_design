"use strict";


function get_random_num(){
	var n = Math.floor(Math.random()*101);
	n+=950;
	document.getElementById("num_audience").innerHTML = n;
	var foo1 = setInterval(get_random_num,5000);
}

function get_current_date(){
	var d=new Date();
	var weekday=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
	var monthname=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
	var date = weekday[d.getDay()] + ", " + monthname[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
	document.getElementById("date_holder").innerHTML = date;
}



function countdown(){
	var d = new Date();
	var curr_hour = d.getHours();
	var curr_minute = d.getMinutes();
	var curr_second = d.getSeconds();
	var hours = 23 - curr_hour;
	var minutes = 59 - curr_minute;
	var seconds = 59 - curr_second;
	minutes = checkTime(minutes);
	seconds =checkTime(seconds);
	var daily = document.getElementById("countdown_timer_daily");
	if (daily)
		daily.innerHTML = hours + ":" + minutes + ":" + seconds;
	var hourly = document.getElementById("countdown_timer_hourly");
	if (hourly)
		hourly.innerHTML = minutes + ":" + seconds;
	var minutely = document.getElementById("countdown_timer_minutely");
	if (minutely)
		minutely.innerHTML = "0:" + seconds;
	var foo2 = setInterval(countdown,500);
}


function checkTime(t){
	if (t < 10){
		t = "0" + t;
	}
	return t;
}


window.onload = updateSizes;
function updateSizes(){
	$('#content').css('height',$('#rant_bubble').height()+150);
	$('#section_1').css('height',$('#rant_bubble').height());
	var foo3 = setInterval(updateSizes,500);
}
