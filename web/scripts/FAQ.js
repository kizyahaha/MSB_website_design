function create_FAQ(){
	var qNa = create_questions_and_answers();
	$('<div/>',{id: 'FAQ_space'}).appendTo('body');
	create_question_links(qNa);
	create_FAQ_info(qNa);
}

function create_questions_and_answers(){
	var qNa = [];
	//0
	qNa.push("What is Sobox?");
	qNa.push("Everyone wants to be heard.  But getting your message in front of an audience can be a challenge.  At other sites like Reddit you can " +
				"can make a post and maybe it'll be seen.  Or more likely, it'll be buried.  You can say what you want on your Facebook and Twitter, " +
				"but who sees that other than your existing friends?  On Sobox, we have gathered the audience for you.  With thousands of viewers " +
				"every single day, your message is sure to be heard.  Wanna give your take on Coke vs. Pepsi?  Or wish your friend a happy birthday?  " +
				"Maybe exhibit your poetry, link us to your band's music, voice your political views, or even bash your ex?  Whatever you want to say, " +
				"you can say it here.  Our entire site is dedicated to one thing and one thing only: your message.");
	//1
	qNa.push("How does it work?");
	qNa.push("It's simple.  First, craft your message and submit it.  It will be placed into the contenders for the 1-minute title.  People can then " +
				"view your rant and provide support or opposition.  If they support your rant, its power grows.  If they oppose it, its power drops.  " + 
				"At the same time, you may apply a multitude of special items to influence the growth and defense of your rant.  " +
				"If at the end of 1 minute your rant has the highest power of all the 1-minute contenders, it will be displayed as the winner and " +
				"move into the contenders for the 10-minute title where the process repeats until (hopefully) your rant wins the daily title!");
	//2
	qNa.push("Are there limits to what I can put in a rant?");
	qNa.push("Good question.  The short answer is, 'I don't know.'  Let's see how this plays out.  With that being said, there is an option to " +
				"flag something as NSFW (Not Safe For Work) and we ask that the community use this respectfully....Also, maybe don't list personal info.");
	//3
	qNa.push("How long will my rant survive?");
	qNa.push("As long as it has power.  Power is lost at a very slow rate over time and by others opposing your rant.  A rant is initialized with " +
				"enough power so that if it recieves no support and no opposition, it will survive at least 1 day.  Once your rant's power " +
				"hits 0, it is removed from the list of contenders for which ever level it is currently in.");
	//4
	qNa.push("Why does my rant lose power even if no one opposes it?");
	qNa.push("We do this to assure that rants can't simply persist forever.  We want to have a fresh turn over of new rants on a regular basis " +
				"to keep the site from stagnating and becoming boring.");
	//5
	qNa.push("Can I view my rant after it dies?");
	qNa.push("Sure.  It will still be viewable on the 'My rants' tab of your profile where you can review its performance.  And others who visit " +
				"your profile will also still be able to see it, but it will no longer be in the running for any titles.");
	//6
	qNa.push("What are these 'special items' of which you speak and how do I get them?");
	qNa.push("On the 'My items' tab of your profile, you'll see three categories of special items: defense, attack, and boost.  Inside each of " +
				"these categories you'll find particular items available for purchase using the site's bok currency system.  Click the item for a description.");
	//7
	qNa.push("What is a bok?");
	qNa.push("Boks are the site's currency system...Get it?...Boks....You earn boks primarily by getting support for your rants.  Each time someone " +
				"supports one of your rants, you earn a certain number of boks.  You can also earn them by winning titles, signing in each day, and " +
				"of course, they're available for purchase if you're the shortcut type.");
	//8
	qNa.push("What order are the contenders displayed in?");
	qNa.push("Uh, no order.  Or random order.  Sort of.  We can explain....We wanted to make this site as 'fair' as possible to all potential " +
				"ranters.  One thing that we very much wanted to avoid was the so-called 'front page bias' which comes about as a result of the " +
				"fact that most people visiting the site will only view a handful of rants at a time.  Most likely those that are at the top of the " +
				"list.  This produces a runaway success effect.  If we ordered the rants, say by date of creation, then those rants that were " + 
				"created first would be on the top of the list.  Most people would only view these so their odds of gaining support would be much greater " +
				"than for those rants at the bottom of the list (created later).  Because of this phenomenon, we wanted all rants to have an equal " +
				"chance of being viewed by an equal number of people, so we display the contenders in a random order.  This random order, however, is constant " +
				"for a particular viewer.  For example, rants numbered 1-100 will still be 1-100 the next time you visit the page (assuming "+
				"none have died or there were no new entries).  We do this to avoid disorientation.  But your friend will have a completely "+
				"different 1-100.  Over the thousands of people viewing the site at any time, on average, each rant will equally be at the top and the "+
				"bottom of the list.  Furthermore, the order of the contenders has absolutely no correlation to the graph showing the powers of each " +
				"rank.  This graph simply exists to say, 'which ever rant is in N place has X power.'");
	return qNa
}

function create_question_links(qNa){
	var num_qNa = qNa.length/2;
	for (var i=0 ; i<num_qNa ; i++){
		var q_index = i*2;
		var link = $('<a/>',{addClass:'FAQ_question_link'}).appendTo('#FAQ_space');
		link.attr('href','#FAQ'+i);
		link.text(qNa[q_index]);
	}
}

function create_FAQ_info(qNa){
	var num_qNa = qNa.length/2;
	for (var i=0 ; i<num_qNa ; i++){
		var q_index = i*2;
		var a_index = i*2+1;
		var question = $('<p/>',{addClass:'FAQ_question'}).appendTo('#FAQ_space');
		question.attr('id','FAQ'+i);
		question.text(qNa[q_index]);
		var answer = $('<p/>',{addClass:'FAQ_answer'}).appendTo('#FAQ_space');
		answer.text(qNa[a_index]);
		$('#FAQ_space').append("<a href='FAQ.html' , class='FAQ_top_return'><br/>Top</a>");
	}
}