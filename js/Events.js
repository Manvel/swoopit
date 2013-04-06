function Events() {
	this.allEvents = [];
}


Events.prototype = {
	//Show login page
	getEvents: function() {
		var thisObj = this;
		 $.getJSON('events.json', function(data) {
		 	thisObj.allEvents = data;
		 	sMap.populate();
		 	upcoming.populate();
		 });
	}
}
