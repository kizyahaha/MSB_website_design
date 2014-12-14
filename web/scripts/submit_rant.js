
function create_rant_submission(logged_user){
	$('<div/>',{id:'submit_rant_container'}).appendTo('body');
	$('<form/>',{name:'rant_submission_form' , id:'rant_submission_form'}).appendTo('#submit_rant_container');
	create_title_for_submit();
	create_rant_for_submit();
	create_submit_rant_inputs();
	bkLib.onDomLoaded(function() {
        new nicEditor({buttonList:['fontSize','bold','italic','underline','strikethrough','subscript','superscript','html','link']}).panelInstance('rant_input');
	});
}

function create_title_for_submit(){
	$('#rant_submission_form').append("<div id='title_for_submit'>Title:<br/></div>");
	$('<input/>',{name:'title' , id:'title_input' , type:'text'}).appendTo('#title_for_submit');
	$('<div/>',{id: 'title_missing' , text:"*Please provide a title"}).appendTo('#title_for_submit');
	document.getElementById('title_missing').style.display = 'none';
}

function create_rant_for_submit(){
	$('#rant_submission_form').append("<div id='rant_for_submit'>Rant:<br/></div>");
	$('<div/>',{id: 'rant_input_area'}).appendTo('#rant_for_submit');
	$('<textarea/>',{name:'contents' , id:'rant_input' , type:'text'}).appendTo('#rant_input_area');
	document.getElementById('rant_input').rows=12;
	//CKEDITOR.replace('rant_input');
	$('<div/>',{id: 'rant_missing' , text:"*Please provide some rant content"}).appendTo('#rant_input_area');
	document.getElementById('rant_missing').style.display = 'none';
}

function create_submit_rant_inputs(){
	$('<div/>',{id: 'submit_rant_inputs'}).appendTo('#rant_submission_form');
	//create_mascot_select();
	create_NSFW_checkbox();
	create_submit_rant_button();
}

function create_NSFW_checkbox(){
	$('<input/>',{name:'nsfw' , type:'checkbox'}).appendTo('#submit_rant_inputs');
	$('<span/>',{id:'NSFW_checkbox_text'}).appendTo('#submit_rant_inputs');
	document.getElementById('NSFW_checkbox_text').textContent = 'NSFW';
}

function create_submit_rant_button(){
	$('<input/>',{id:'submit_rant_button' , type:'button' , value:'Submit'}).appendTo('#submit_rant_inputs');
	if (logged_user.id == -1){
		$('#submit_rant_button').click(function(){launch_login_modal()});
	}
	else{
		$('#submit_rant_button').click( function(){rant_submit(this.form)} );
	}
	$(window).keypress(function (e) {
		var key = e.which;
		if(key == 13){
			$('#submit_rant_button').click();
			return false;  
		}
	});
}

function rant_submit(form){
	nicEditor_to_rant_input();
	if (check_rant_filled(form)){
		$.ajax({
			type: "POST",
			url: "/api/rants/add",
			data: $("#rant_submission_form").serialize(),
			success: function(msg) {
				window.document.location.href = "daily.html";
			},
			error: function(msg) {
				window.document.location.href = "error_page.html";
			}
		});
		//$.post( '/api/rants/add' , $('#rant_submission_form').serialize());
	}
}

function nicEditor_to_rant_input(){
	document.getElementById('rant_input').value = nicEditors.findEditor('rant_input').getContent();
}

function check_rant_filled(form){
	document.getElementById('title_missing').style.display = 'none';
	document.getElementById('rant_missing').style.display = 'none';
	if (form.title_input.value.length == 0){
		document.getElementById('title_missing').style.display = 'initial';
		return false;
	}
	if (form.rant_input.value.length == 0){
		document.getElementById('rant_missing').style.display = 'initial';
		return false;
	}
	return true;
		
}

function create_mascot_select(){
	create_modal_mascot_selection_background();
	create_modal_mascot_selection();
	create_modal_mascot_detail_background();
	create_modal_mascot_detail_selection();
	$('<img/>',{id:'selected_mascot_img' , src:'images/character_1.png'}).appendTo('#submit_rant_container');
	$('<div/>',{addClass:'mascot_button' , id:'select_mascot_button' , text:'Choose mascot'}).appendTo('#submit_rant_inputs');
	$('#select_mascot_button').click(function (){
										toggle_mascot_visibility('modal_mascot_selection_background');
										toggle_mascot_visibility('mascot_selection');
									}
								);
}

function create_modal_mascot_selection_background(){
	$('<div/>',{addClass:'modal_mascot_background' , id:'modal_mascot_selection_background'}).appendTo('body');
	$('#modal_mascot_selection_background').css('display','none');
	$('#modal_mascot_selection_background').height($(document).height());
}
function create_modal_mascot_detail_background(){
	$('<div/>',{addClass:'modal_mascot_background' , id:'modal_mascot_detail_background'}).appendTo('body');
	$('#modal_mascot_detail_background').css('display','none');
	$('#modal_mascot_detail_background').height($(document).height());
}

function create_modal_mascot_selection(){
	$('<div/>',{id:'mascot_selection'}).appendTo('body');
	$('#mascot_selection').css('display','none');
	var num_characters = 19;
	for (i=0 ; i<num_characters ; i++){
		var id = 'mascot_picture_' + i;
		$('<img/>',{addClass:'mascot_img' , id:id , src:get_mascot_image(i)}).appendTo('#mascot_selection');
		$('#' + id).click(function(arg){
							return function(){
								toggle_mascot_visibility('mascot_detail_selection'); 
								toggle_mascot_visibility('modal_mascot_detail_background');
								$('#detail_mascot_img').attr('src','images/character_' + (arg+1) + '.png');
							}
						}(i)
					);
	}
	$("#mascot_selection").append("<br/><br/>");
	$('<div/>',{addClass:'mascot_button' , id:'cancel_mascot_button' , text:'Cancel'}).appendTo('#mascot_selection');
	$('#cancel_mascot_button').click(function (){
										toggle_mascot_visibility('modal_mascot_selection_background');
										toggle_mascot_visibility('mascot_selection');
									}
								);
	
}

function create_modal_mascot_detail_selection(){
	$('<div/>',{id:'mascot_detail_selection'}).appendTo('body');
	$('#mascot_detail_selection').css('display','none');
	$('<img/>',{id:'detail_mascot_img' , src:'images/character_1.png'}).appendTo('#mascot_detail_selection');
	$("#mascot_detail_selection").append("<br/><br/>");
	$('<div/>',{addClass:'mascot_button' , id:'choose_this_mascot_button' , text:'Select'}).appendTo('#mascot_detail_selection');
	$('#choose_this_mascot_button').click(function (){
										toggle_mascot_visibility('modal_mascot_selection_background');
										toggle_mascot_visibility('mascot_selection');
										toggle_mascot_visibility('mascot_detail_selection');
										toggle_mascot_visibility('modal_mascot_detail_background');
										$('#selected_mascot_img').attr('src',$('#detail_mascot_img').attr('src'));
									}
								);
	$('<div/>',{addClass:'mascot_button' , id:'cancel_this_mascot_button' , text:'Nope'}).appendTo('#mascot_detail_selection');
	$('#cancel_this_mascot_button').click(function (){
										toggle_mascot_visibility('mascot_detail_selection');
										toggle_mascot_visibility('modal_mascot_detail_background');
									}
								);
}

function get_mascot_image(num){
	var foo = num+1;
	return 'images/character_' + foo + '.png';
	
}

function toggle_mascot_visibility(id){
	var el = document.getElementById(id);
	if (el.style.display == 'none'){
		el.style.display = 'block';
	}
	else{
		el.style.display = 'none';
	}
}