

function create_banner(){
	create_banner_background();
	create_banner_text();
	create_banner_logos();
	create_banner_audience_count();
	create_banner_links();
}

function create_banner_background(){
	var banner_background = document.createElement('div');
	banner_background.id = 'banner_background';
	//alternatively:   banner_background.setAttribute('id','banner_background');
	document.body.appendChild(banner_background);
	//alternatively:   document.getElementsByTagName('body')[0].appendChild(banner_background);
	
	// All of this can be replaced with:  document.body.innerHTML = "<div id='banner_background'</div>";
	// Some people claim using innerHTML is faster.
}

function create_banner_text(){	
	$('<img/>',{src:"images/MySoapBox_2.png", id:"banner_text"}).appendTo('#banner_background');
	$('#banner_text').click(function(){home_click();});
}

function home_click(){
	set_default_state();
	window.document.location.assign("daily");
}

function create_banner_logos(){
	var banner_logo_left = document.createElement('img');
	banner_logo_left.alt = 'logo';
	banner_logo_left.src = "images/SoapBox1.png";
	banner_logo_left.width=130;
	banner_logo_left.id = 'banner_logo_left';
	document.getElementById('banner_background').appendChild(banner_logo_left);
	var banner_logo_right = document.createElement('img');
	banner_logo_right.alt = 'logo';
	banner_logo_right.src = "images/SoapBox1.png";
	banner_logo_right.width=130;
	banner_logo_right.id = 'banner_logo_right';
	document.getElementById('banner_background').appendChild(banner_logo_right);
}

function create_banner_audience_count(){
	var audience_count = document.createElement('div')
	audience_count.id = 'audience_count';
	audience_count.textContent = "current audience: ";
	document.getElementById('banner_background').appendChild(audience_count);
	var count = document.createElement('span');
	count.id = 'audience_number';
	count.style.color = 'red';
	audience_count.appendChild(count);
	get_random_num();
}

function get_random_num(){
	var n = Math.floor(Math.random()*101);
	n+=950;
	document.getElementById('audience_number').innerHTML = n;
	var foo1 = setTimeout(get_random_num,5000);
}

function create_banner_links(){
	var banner_links = document.createElement('ul');
	banner_links.id = 'banner_links';
	var li_1 = document.createElement('li') , li_2 = document.createElement('li') , li_3 = document.createElement('li') , li_4 = document.createElement('li');
	var a_1 = document.createElement('a') , a_2 = document.createElement('a') , a_3 = document.createElement('a') , a_4 = document.createElement('a');
	a_1.href = 'FAQ.html';
	a_1.textContent = 'FAQ';
	li_1.appendChild(a_1);
	a_2.href = '#';
	a_2.textContent = 'Archives';
	li_2.appendChild(a_2);
	a_3.id = 'banner_log_in_link';
	a_4.id = 'banner_log_out_link';
	if (logged_user.id != -1){
		a_3.href = 'javascript:my_profile_click();';
		a_3.textContent = 'My profile';
		a_4.href = 'javascript:log_off_user();';
		a_4.textContent = 'Log out';
	}
	else{
		a_3.href = 'javascript:launch_login_modal();';
		a_3.textContent = 'Log in/Sign up';
	}
	li_3.appendChild(a_3);
	li_4.appendChild(a_4);
	banner_links.appendChild(li_1);
	banner_links.appendChild(li_2);
	banner_links.appendChild(li_3);
	banner_links.appendChild(li_4);
	
	document.getElementById('banner_background').appendChild(banner_links);
}

function my_profile_click(){
	set_default_state();
	window.document.location.assign('user_profile.html?u=' + logged_user.id);
}