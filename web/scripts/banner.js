//window.onload = create_banner;

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
	var banner_text_link = document.createElement('a');
	banner_text_link.id = 'banner_text';
	banner_text_link.href = 'daily.html';
	var banner_text_img = document.createElement('img');
	banner_text_img.alt = 'MSB';
	banner_text_img.src = "images/MySoapBox_1.png";
	banner_text_link.appendChild(banner_text_img);
	document.getElementById('banner_background').appendChild(banner_text_link);
}

function create_banner_logos(){
	/*var banner_logo = document.createElement('img');
	banner_logo.alt = 'logo';
	banner_logo.src = "images/SoapBox1.png";
	banner_logo.width=130;
	banner_logo.id = 'banner_logo_left';
	document.getElementById('banner_background').appendChild(banner_logo);
	banner_logo.id = 'banner_logo_right';
	document.getElementById('banner_background').appendChild(banner_logo);*/

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
	if (userID == ""){
		a_3.href = 'user_profile.html';
		a_3.textContent = 'My profile';
		a_4.href = 'javascript:delete_user_cookie();';
		a_4.textContent = 'Log out';
	}
	else{
		a_3.id = 'banner_log_in_link';
		a_3.href = 'log_in_sign_up.html';
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