var view;
var sMap;
var events;
var startDate;
var endDate;
var search;
var optView;
var upcoming;
var settings;
//var bg = chrome.extension.getBackgroundPage();

$(document).ready(optionReady);

function optionReady() {
//	view = new View();
//	view.showPostSubmit();
	settings = new Settings();
	startDate = new SDatepicker('.startDate');
	if(settings.get('today'))
		startDate.today();
	endDate = new SDatepicker('.endDate');
	search = new Search('#search');
	search.clearButton('.clearSearch');
	startDate.clearButton('.clearStart');
	endDate.clearButton('.clearEnd');
	
	//upcoming
	upcoming = new Upcoming("#upEvents", 7);
	
	sMap = new SMap();
	events = new Events();
	sMap.initialize();
	events.getEvents();
	
	$("#extVer").html("v. "+chrome.app.getDetails().version);
	optView = new OptView();
    //  google.maps.event.addDomListener(window, 'load', initialize);
}

function eventBinding() {
	$("#login .submit").click(user.login);
	$("#post_submit .submit").click(post.submit);
}
