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
	qNa.push("One rant to rule them all.  That is the basic concept.  Get your message in front of as large an audience as possible.  At other sites you can " +
				"make a post and maybe it'll be seen, but more likely, it'll be buried.  You can say what you want on your social profiles, " +
				"but who sees that other than your existing friends?  On Sobox, if your rant wins, it is seen by EVERYONE.  And much like the real word, " +
				"we provide you with the ability to fight for your rant and beat out the competition rather than leaving it to chance.  Wanna give your " + 
				"take on Coke vs. Pepsi?  Or wish your friend a happy birthday? Maybe exhibit your poetry, link us to your band's music, voice your " + 
				"political views, or even bash your ex?  Whatever you want to say, you can say it here.  Our entire site is dedicated to one thing and " +
				"one thing only - your message.");
	//1
	qNa.push("How does this all work?");
	qNa.push("It's simple.  First, craft your rant and submit it.  It will be placed into the contenders for the 1-minute title.  People can then " +
				"view your rant and provide support or opposition.  If they support your rant, its power grows.  If they oppose it, its power drops.  " + 
				"At the same time, you may apply a multitude of special items to influence the growth and defense of your rant.  " +
				"If at the end of 1 minute your rant has the highest power of all the 1-minute contenders, it will be displayed as the winner and " +
				"move into the contenders for the 10-minute title where the process repeats until (hopefully) your rant wins the daily title!  After " +
				"a rant wins the daily title and has its 24 hours to bask in the glory of victory on the front page, it is retired to the archives.  " +
				"And if your rant's power ever drops to zero, it is officially dead and is removed from the contender list.");
	//2
	qNa.push("Are there limits to what I can put in a rant?");
	qNa.push("Good question.  The short answer is, 'I don't know.'  Let's see how this plays out.  With that being said, there is an option to " +
				"flag something as NSFW (Not Safe For Work) and we ask that the community use this respectfully....Also, maybe don't list personal info.");
	//3
	qNa.push("How long will my rant survive?");
	qNa.push("As long as it has power.  Power is lost at a very slow rate over time and by others opposing your rant.  A rant is initialized with " +
				"enough power so that if it recieves no support and no opposition, it will survive at least 1 day.  Once your rant's power " +
				"hits 0, it is removed from the list of contenders.");
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
				"these categories you'll find particular items available for purchase using the site's bok currency system.  Click the item for a " +
				"description.  These items can be used to defend your rant against attacks, attack competitor rants, or boost your rant's "+
				"performance.");
	//7
	qNa.push("Do I have to use special items and 'battle' in order to win?");
	qNa.push("Nope.  The special items are designed to be a fun way to fight for your rant rather than leaving its success to chance.  They allow " +
				"you to implement some strategy and edge out the close competition.  But the majority of your rant's power will still be derived from " +
				"the number of supports and oppositions it receives.  So if you make a very popular rant, you may still win without using any " +
				"special items.");
	//8
	qNa.push("What is a bok?");
	qNa.push("Boks are the site's currency system.  Get it?  Boks.  Like 'box' and 'bucks' kinda smashed together.  We're friggin' clever over here. " +
				"You earn boks primarily by getting support for your rants.  Each time someone supports one of your rants, you earn a certain number of " +
				"boks.  You can also earn them by winning titles, signing in each day, and of course, they're available for purchase if you're the shortcut type.");
	//9
	qNa.push("What order are the contenders displayed in?");
	qNa.push("Uh, no order.  Or random order.  Sort of.  We can explain....We wanted to make this site as 'fair' as possible to all potential " +
				"rants.  One thing that we very much wanted to avoid was the so-called 'front page bias' which comes about as a result of the " +
				"fact that most people visiting the site will only view a handful of rants at a time - most likely those that are at the top of the " +
				"contender list.  This produces a runaway success effect where those at the top of the list get more views, so they get more support, " +
				"so they stay at the top of the list, so they get more views, so they get more support, etc.  Meanwhile, those at the bottom of the list " +
				"are struggling to break into this cycle and most likely dying in the process.  Because of this phenomenon, we wanted all rants to have "+
				"an equal chance of being viewed by an equal number of people, so we display the contenders in a random order.  This random order, " +
				"however, is constant for a particular viewer.  For example, rants numbered 1-100 for you will still be 1-100 the next time you visit the page " +
				"(assuming none have died or there were no new entries).  We do this to avoid disorientation.  But your friend will have a completely "+
				"different 1-100.  Over the thousands of people viewing the site at any time, on average, each rant will be at the top and the bottom " +
				"of the list an equal number of times.  Furthermore, the order of the contenders has absolutely no correlation to the graph showing the " +
				"powers of each rank.  This graph simply exists to say, 'Whichever rant is currently in Nth place has X power.'");
	//10
	qNa.push("How is my power transferred from one level to the next?");
	qNa.push("When you enter a new level (for example entering the daily level after winning the hourly level) your power will be set to which ever " +
				"is greater - your current power or the median of the level you're entering.  We want to make sure you at least start on a level playing " +
				"field with the other contenders at that level.");
	return qNa
}

function create_question_links(qNa){
	$('<div/>',{id: 'FAQ_link_space'}).appendTo('#FAQ_space');
	var num_qNa = qNa.length/2;
	for (var i=0 ; i<num_qNa ; i++){
		var q_index = i*2;
		var link = $('<a/>',{addClass:'FAQ_question_link'}).appendTo('#FAQ_link_space');
		link.attr('href','#FAQ'+i);
		link.text(qNa[q_index]);
	}
}

function create_FAQ_info(qNa){
	$('<div/>',{id: 'FAQ_info_space'}).appendTo('#FAQ_space');
	var num_qNa = qNa.length/2;
	for (var i=0 ; i<num_qNa ; i++){
		var q_index = i*2;
		var a_index = i*2+1;
		var question = $('<p/>',{addClass:'FAQ_question'}).appendTo('#FAQ_info_space');
		question.attr('id','FAQ'+i);
		question.text(qNa[q_index]);
		var answer = $('<p/>',{addClass:'FAQ_answer'}).appendTo('#FAQ_info_space');
		answer.text(qNa[a_index]);
		$('#FAQ_info_space').append("<a href='#FAQ_space' , class='FAQ_top_return'><br/>Top</a>");
	}
}