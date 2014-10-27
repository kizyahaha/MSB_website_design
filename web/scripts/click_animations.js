function play_sound(path){
	//$('<audio/>',{id:'sound', src:path}).appendTo('body');
	//var sound = document.getElementById('sound');
	//sound.play();
	var sound = new Audio(path);
	sound.play();
	//var snd = new Audio("https://mobile-text-alerts.com/3.0/system/nexmo/messages/1404764969.mp3");
	//snd.play();
}

function text_animation(boks , xp){
	if (document.getElementById("text_animation") == null){
		$('<div/>', {id:'text_animation'}).appendTo('body');
	}
	if (boks){
		create_bok_text_animation(boks);
	}
	if (xp){
		create_xp_text_animation(xp);
	}
	$("#text_animation").css("top", mouseY - 60);
    $("#text_animation").css("left", mouseX);
	$('#text_animation').fadeOut(1500, function(){ $('#text_animation').remove();});
}

function create_bok_text_animation(boks){
	$('<div/>', {id:'bok_text_animation'}).appendTo('#text_animation');
	if (boks >= 0){
		$('#bok_text_animation').text('+' + boks + ' boks!');
		$('#bok_text_animation').addClass('positive_text_animation');
	}
	else{
		$('#bok_text_animation').text(boks + ' boks');
		$('#bok_text_animation').addClass('negative_text_animation');
	}
}

function create_xp_text_animation(xp){
	$('<div/>', {id:'xp_text_animation'}).appendTo('#text_animation');
	if (xp >= 0){
		$('#xp_text_animation').text('+' + xp + ' XP!');
		$('#xp_text_animation').addClass('positive_text_animation');
	}
	else{
		$('#xp_text_animation').text(xp + ' XP');
		$('#xp_text_animation').addClass('negative_text_animation');
	}
}