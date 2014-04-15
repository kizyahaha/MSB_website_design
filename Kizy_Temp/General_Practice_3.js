
function tab(tab) {
	document.getElementById('tab1').style.display = 'none';
	document.getElementById('tab2').style.display = 'none';
	document.getElementById('tab3').style.display = 'none';
	document.getElementById('tab4').style.display = 'none';
	/*document.getElementById('li_tab1').setAttribute("class", "");
	document.getElementById('li_tab2').setAttribute("class", "");
	document.getElementById('li_tab3').setAttribute("class", "");
	document.getElementById('li_tab4').setAttribute("class", "");*/
	document.getElementById('li_tab1').className = "other_tab";
	document.getElementById('li_tab2').className = "other_tab";
	document.getElementById('li_tab3').className = "other_tab";
	document.getElementById('li_tab4').className = "other_tab";
	document.getElementById(tab).style.display = 'block';
	/*document.getElementById('li_'+tab).setAttribute("class", "active");*/
	document.getElementById('li_'+tab).className = "current_tab";
}



var foo = setInterval(function(){get_random_num()},5000)
function get_random_num(){
	var n = Math.floor(Math.random()*101);
	n+=950;
	document.getElementById("num_audience").innerHTML = n;
}

window.onload=get_current_date;
function get_current_date(){
	var d=new Date();
	var weekday=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
	var monthname=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
	var date = weekday[d.getDay()] + ", " + monthname[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
	document.getElementById("date_holder").innerHTML = date;
}


var count=60*60*2+5;
var counter=setInterval(timer, 1000);
function timer(){
  count=count-1;
  if (count <= 0){
     clearInterval(counter);
     return;
  }
  var hours = Math.floor(count/3600);
  var minutes = Math.floor((count-hours*3600)/60);
  var secs = count - hours*3600-minutes*60;
  document.getElementById("countdown").innerHTML="Next Winner:\n"+hours+":"+minutes+":"+secs; // watch for spelling
}


window.onload=updateSizes;
function updateSizes(){
	$('#content').css('height',$('#rant_bubble').height()+100);
	$('#section_1').css('height',$('#rant_bubble').height());
	setInterval(function(){updateSizes()},500);
}
